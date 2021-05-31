import * as fb from '../firebase'
import router from "@/router";

export default {
    namespaced: true,
    state: {
        posts: [],
        openedPost: {}
    },
    mutations: {
        setOpenedPost(state, val) {
            state.openedPost = val
        },
        setOpenedUserPosts(state, val) {
            state.posts = val
        },
        setDashboardPosts(state, val) {
            state.posts = val
        },
    },
    actions: {
        async loadOpenedPost({dispatch, commit}, postId) {
            // commit('setOpenedPost', null)

            let post = await fb.postsCollection.where('postId', '==', postId).get()
            post = post.docs[0].data()

            let user = await fb.usersCollection.where('userId', '==', post.userId).get()
            user = user.docs[0].data()

            try {
                let url = await fb.storage.ref(`Users/${user.userId}.jpg`).getDownloadURL();
                post['avatar'] = url;
            } catch (err) {
                console.log(err)
            }

            let postReactions = await fb.reactionsCollection.where('postId', '==', postId).get();
            let likeCount = 0;
            let dislikeCount = 0;
            let fameCount = 0;
            let shameCount = 0;
            postReactions.forEach(reaction => {
                let reactionData = reaction.data()
                if (reactionData.userId === fb.auth.currentUser.uid) {
                    console.log("xd")
                    post['myReaction'] = reactionData.type;
                }
                if (reactionData.type === 'like')
                    likeCount++;
                else if (reactionData.type === 'dislike')
                    dislikeCount++
                else if (reactionData.type === 'fame')
                    fameCount++
                else if (reactionData.type === 'shame')
                    shameCount++
            });

            post['likeCount'] = likeCount;
            post['dislikeCount'] = dislikeCount;
            post['fameCount'] = fameCount;
            post['shameCount'] = shameCount;
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

            for (let i = 0; i < tempPosts.length; i++) {
                try {
                    let url = await fb.storage.ref(`Users/${tempPosts[i].userId}.jpg`).getDownloadURL();
                    tempPosts[i]['avatar'] = url;
                } catch (err) {
                    console.log(err)
                }

                let postReactions = await fb.reactionsCollection.where('postId', '==', tempPosts[i].postId).get();
                let likeCount = 0;
                let dislikeCount = 0;
                let fameCount = 0;
                let shameCount = 0;
                postReactions.forEach(reaction => {
                    let reactionData = reaction.data()
                    if (reactionData.userId === fb.auth.currentUser.uid) {
                        tempPosts[i]['myReaction'] = reactionData.type;
                    }
                    if (reactionData.type === 'like')
                        likeCount++;
                    else if (reactionData.type === 'dislike')
                        dislikeCount++
                    else if (reactionData.type === 'fame')
                        fameCount++
                    else if (reactionData.type === 'shame')
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

            for (let i = 0; i < tempPosts.length; i++) {
                try {
                    let url = await fb.storage.ref(`Users/${tempPosts[i].userId}.jpg`).getDownloadURL();
                    tempPosts[i]['avatar'] = url;
                } catch (err) {
                    console.log(err)
                }

                let postReactions = await fb.reactionsCollection.where('postId', '==', tempPosts[i].postId).get();
                let likeCount = 0;
                let dislikeCount = 0;
                let fameCount = 0;
                let shameCount = 0;
                postReactions.forEach(reaction => {
                    let reactionData = reaction.data()
                    if (reactionData.userId === fb.auth.currentUser.uid) {
                        tempPosts[i]['myReaction'] = reactionData.type;
                        console.log(tempPosts[i]['myReaction'])
                    }
                    if (reactionData.type === 'like')
                        likeCount++;
                    else if (reactionData.type === 'dislike')
                        dislikeCount++
                    else if (reactionData.type === 'fame')
                        fameCount++
                    else if (reactionData.type === 'shame')
                        shameCount++
                });
                tempPosts[i]['likeCount'] = likeCount;
                tempPosts[i]['dislikeCount'] = dislikeCount;
                tempPosts[i]['fameCount'] = fameCount;
                tempPosts[i]['shameCount'] = shameCount;
            }


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
            } else if (postReactions.docs[0].data().type !== 'fame' && postReactions.docs[0].data().type !== 'shame') {
                await fb.reactionsCollection.doc(postReactions.docs[0].id).delete();
            }


            console.log(response);
            dispatch('updatePosts', postId)
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
            } else if (postReactions.docs[0].data().type !== 'fame' && postReactions.docs[0].data().type !== 'shame') {
                await fb.reactionsCollection.doc(postReactions.docs[0].id).delete();
            }
            console.log(response);
            dispatch('updatePosts', postId)
        },
        async addFame({dispatch, commit, rootState}, postId) {
            let postReactions = fb.reactionsCollection.where('postId', '==', postId);
            postReactions = await postReactions.where('userId', '==', fb.auth.currentUser.uid).get();
            let response = null

            if (postReactions.docs.length === 0) {
                if (rootState.auth.userProfile.fameCD.seconds < new Date().getTime() / 1000) {
                    response = await fb.reactionsCollection.add({
                        postId: postId,
                        type: 'fame',
                        userId: fb.auth.currentUser.uid,
                    });
                    fb.usersCollection.doc(fb.auth.currentUser.uid).update({
                        fameCD: new Date(new Date().setDate(new Date().getDate() + 1))
                    });
                } else {
                    console.log("Nie możesz używać Fame więcej niż raz na 24h")
                }
            } else {
                console.log("Już dodano reakcje");
            }
            console.log(response);
            dispatch('updatePosts', postId)

        },
        async addShame({dispatch, commit, rootState}, postId) {
            let postReactions = fb.reactionsCollection.where('postId', '==', postId);
            postReactions = await postReactions.where('userId', '==', fb.auth.currentUser.uid).get();
            let response = null

            if (postReactions.docs.length === 0) {
                if (rootState.auth.userProfile.shameCD.seconds < new Date().getTime() / 1000) {
                    response = await fb.reactionsCollection.add({
                        postId: postId,
                        type: 'shame',
                        userId: fb.auth.currentUser.uid,
                    });
                    fb.usersCollection.doc(fb.auth.currentUser.uid).update({
                        shameCD: new Date(new Date().setDate(new Date().getDate() + 1))
                    });
                } else {
                    console.log("Nie możesz używać Shame więcej niż raz na 24h")
                }
            } else {
                console.log("Już dodano reakcje");
            }

            console.log(response);
            dispatch('updatePosts', postId)
        },
        updatePosts({dispatch, commit, rootState}, postId) {
           dispatch('loadOpenedPost', postId)
            console.log(router.currentRoute.value)
            if(router.currentRoute.value.name === 'dashboard'){
                dispatch('loadDashboardPosts')
            }
            else if(router.currentRoute.value.name === 'user'){
                dispatch('loadOpenedUserPosts', router.currentRoute.value.params.id)
            }
        },
    }
}