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
            post = await post.docs[0].data()

            let user = await fb.usersCollection.where('userId', '==', post.userId).get()
            user = await user.docs[0].data()

            post['authorNick'] = user.nick
            post['authorAvatar'] = 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/avatar1.jpg?alt=media&token=e2af1daa-5165-40d6-8e86-09a707082561'
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

            tempPosts.forEach(comment => {
                comment['authorNick'] = tempUsers[comment.userId].nick
                comment['authorAvatar'] = tempUsers[comment.userId].avatar
            })

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

            if(postReactions.length == 0){
                let response = await fb.reactionsCollection.add({
                    postId: postId,
                    type: 'like',
                    userId: fb.auth.currentUser.uid,
                });
            }
            else{
                console.log("Już dodano reakcje");
            }
            console.log(response);
        },
    }
}