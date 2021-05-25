import * as fb from '../firebase'


export default {
    namespaced: true,
    state: {
        dashboardPosts: [],
        openedUserPosts: [],
        openedPost: {}
    },
    mutations: {
        setOpenedPost(state, val) {
            state.openedPost = val
        },
        setOpenedUserPosts(state, val) {
            state.openedUserPosts = val
        },
        setDashboardPosts(state, val) {
            state.dashboardPosts = val
        },
    },
    actions: {
        async loadOpenedPost({dispatch, commit}, postId) {
            commit('setOpenedPost', null)

            let post = await fb.postsCollection.where('postId', '==', postId).get()
            post = post.docs[0].data()

            let user = await fb.usersCollection.where('userId', '==', post.userId).get()
            user = user.docs[0].data()

            post['authorNick'] = user.nick
            post['authorAvatar'] = 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/avatar1.jpg?alt=media&token=e2af1daa-5165-40d6-8e86-09a707082561'
            
            let postReactions = await fb.reactionsCollection.where('postId', '==', postId).get();
            let likeCount = 0;
            let dislikeCount = 0;
            let fameCount = 0;
            let shameCount = 0;
            postReactions.forEach(reaction => {
                let reactionData = reaction.data()
                if(reactionData.type === 'like')
                    likeCount++;
                else if(reactionData.type === 'dislike')
                    dislikeCount++
                else if(reactionData.type === 'fame')
                    fameCount++
                else if(reactionData.type === 'shame')
                    shameCount++
            });
            post['likeCount'] = likeCount;
            post['dislikeCount'] = dislikeCount;
            post['fameCount'] = fameCount;
            post['shameCount'] = shameCount;
            console.log(post)
            commit('setOpenedPost', post)
        },
        async addComment({dispatch, commit, rootState}, data) {
            await fb.commentsCollection.add({
                createdOn: new Date(),
                content: data.comment,
                postId: data.postId,
                userId: fb.auth.currentUser.uid,
            })

            dispatch('loadComments', data.postId)
        },
        async loadDashboardPosts({commit}) {
            commit('setDashboardPosts', [])

            let posts = await fb.postsCollection.limit(20).get()

            let tempPosts = []
            let usersIds = []

            posts.forEach(post => {
                let postData = post.data()
                tempPosts.push(postData)
                if (!usersIds.includes(postData.userId)) {
                    usersIds.push(postData.userId)
                }
            })

            let tempUsers = {}
            while (usersIds.length) {
                const batch = usersIds.splice(0, 10);
                const users = await fb.usersCollection.where('userId', 'in', batch).get()
                users.forEach(user => {
                    let userData = user.data()
                    tempUsers[userData.userId] = userData
                })
            }

            for (let i = 0; i < tempPosts.length; i++) {
                tempPosts[i]['authorNick'] = tempUsers[tempPosts[i].userId].nick;
                tempPosts[i]['authorAvatar'] = tempUsers[tempPosts[i].userId].avatar;

                let postReactions = await fb.reactionsCollection.where('postId', '==', tempPosts[i].postId).get();
                let likeCount = 0;
                let dislikeCount = 0;
                let fameCount = 0;
                let shameCount = 0;
                postReactions.forEach(reaction => {
                    let reactionData = reaction.data()
                    if(reactionData.type === 'like')
                        likeCount++;
                    else if(reactionData.type === 'dislike')
                        dislikeCount++
                    else if(reactionData.type === 'fame')
                        fameCount++
                    else if(reactionData.type === 'shame')
                        shameCount++
                });
                tempPosts[i]['likeCount'] = likeCount;
                tempPosts[i]['dislikeCount'] = dislikeCount;
                tempPosts[i]['fameCount'] = fameCount;
                tempPosts[i]['shameCount'] = shameCount;
            }

            commit('setDashboardPosts', tempPosts)
        },
        async loadOpenedUserPosts({commit}, userId) {
            commit('setOpenedUserPosts', [])

            let posts = await fb.postsCollection.where('userId', '==', userId).get()

            let tempPosts = []
            let usersIds = []

            posts.forEach(post => {
                let postData = post.data()
                tempPosts.push(postData)
                if (!usersIds.includes(postData.userId)) {
                    usersIds.push(postData.userId)
                }
            })

            let user = await fb.usersCollection.where('userId', '==', userId).get()
            user = await user.docs[0].data()

            tempPosts.forEach(comment => {
                comment['authorNick'] = user.nick
                comment['authorAvatar'] = user.avatar
            })

            commit('setOpenedUserPosts', tempPosts)
        },
        async addLike({dispatch, commit}, postId) {
            let postReactions = fb.reactionsCollection.where('postId', '==', postId);
            postReactions = await postReactions.where('userId', '==', fb.auth.currentUser.uid).get();
            let response = null

            if (postReactions.docs.length === 0) {
                response = await fb.reactionsCollection.add({
                    postId: postId,
                    type: 'like',
                    userId: fb.auth.currentUser.uid,
                });
            } else if(postReactions.docs[0].data().type !== 'fame' && postReactions.docs[0].data().type !== 'shame') {
                await fb.reactionsCollection.doc(postReactions.docs[0].id).delete();
            }
            console.log(response);
        },
        async addDislike({dispatch, commit}, postId) {
            let postReactions = fb.reactionsCollection.where('postId', '==', postId);
            postReactions = await postReactions.where('userId', '==', fb.auth.currentUser.uid).get();
            let response = null

            if (postReactions.docs.length === 0) {
                response = await fb.reactionsCollection.add({
                    postId: postId,
                    type: 'dislike',
                    userId: fb.auth.currentUser.uid,
                });
            } else if(postReactions.docs[0].data().type !== 'fame' && postReactions.docs[0].data().type !== 'shame'){
                await fb.reactionsCollection.doc(postReactions.docs[0].id).delete();
            }
            console.log(response);
        },
        async addFame({dispatch, commit, rootState}, postId) {
            let postReactions = fb.reactionsCollection.where('postId', '==', postId);
            postReactions = await postReactions.where('userId', '==', fb.auth.currentUser.uid).get();
            let response = null

            if(postReactions.docs.length === 0){
                if(rootState.auth.userProfile.fameCD.seconds < new Date().getTime() / 1000 )
                {
                    response = await fb.reactionsCollection.add({
                        postId: postId,
                        type: 'fame',
                        userId: fb.auth.currentUser.uid,
                    });
                    fb.usersCollection.doc(fb.auth.currentUser.uid).update({
                        fameCD: new Date(new Date().setDate(new Date().getDate()+1))
                    });
                }
                else{
                    console.log("Nie możesz używać Fame więcej niż raz na 24h")
                }
            }
            else{
                console.log("Już dodano reakcje");
            }
            console.log(response);
        },
        async addShame({dispatch, commit, rootState}, postId) {
            let postReactions = fb.reactionsCollection.where('postId', '==', postId);
            postReactions = await postReactions.where('userId', '==', fb.auth.currentUser.uid).get();
            let response = null

            if(postReactions.docs.length === 0){
                if(rootState.auth.userProfile.shameCD.seconds < new Date().getTime() / 1000 )
                {
                    response = await fb.reactionsCollection.add({
                        postId: postId,
                        type: 'shame',
                        userId: fb.auth.currentUser.uid,
                    });
                    fb.usersCollection.doc(fb.auth.currentUser.uid).update({
                        shameCD: new Date(new Date().setDate(new Date().getDate()+1))
                    });
                }
                else{
                    console.log("Nie możesz używać Shame więcej niż raz na 24h")
                }
            }
            else{
                console.log("Już dodano reakcje");
            }
            
            console.log(response);
        },
    }
}