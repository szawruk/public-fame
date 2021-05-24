import * as fb from '../firebase'

export default {
    namespaced: true,
    state: {
        comments: [],
    },
    mutations: {
        setComments(state, val) {
            state.comments = val
        },
    },
    actions: {
        async loadComments({dispatch, commit}, postId) {
            commit('setComments', [])
            const comments = await fb.commentsCollection.where('postId', '==', postId).orderBy('createdOn').get()

            let tempComments = []
            let usersIds = []

            comments.forEach(comment => {
                let commentData = comment.data()
                tempComments.push(commentData)
                if (!usersIds.includes(commentData.userId)){
                    usersIds.push(commentData.userId)
                }
            })

            let tempUsers = {}
            while (usersIds.length){
                const batch = usersIds.splice(0, 10);
                const users = await fb.usersCollection.where('userId', 'in', batch).get()
                users.forEach(user => {
                    let userData = user.data()
                    tempUsers[userData.userId] = userData
                })
            }
            tempComments.forEach(comment => {
                comment['nick'] = tempUsers[comment.userId].nick
                comment['authorAvatar'] = tempUsers[comment.userId].avatar
            })

            commit('setComments', tempComments)
        },
        async addComment({dispatch, commit, rootState}, data) {
            let response = await fb.commentsCollection.add({
                createdOn: new Date(),
                content: data.comment,
                postId: data.postId,
                userId: fb.auth.currentUser.uid,
            })

            console.log(response)

            dispatch('loadComments', data.postId)
        },
    }
}