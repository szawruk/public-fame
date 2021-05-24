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
        async loadComments({dispatch, commit, rootState}, postId) {
            commit('setComments', [])
            const comments = await fb.commentsCollection.where('postId', '==', postId).orderBy('createdOn').get()

            let tempComments = []

            comments.forEach(async function(comment)  {
                let commentData = comment.data()
                let url = ""
                try{
                    url = await fb.storage.ref(`Users/${commentData.userId}.jpg`).getDownloadURL();
                    commentData['authorAvatar'] = url; 
                }
                catch(err){
                    console.log(err)
                }
                  
                tempComments.push(commentData)
            })
            commit('setComments', tempComments)
        },
        async addComment({dispatch, commit, rootState}, data) {
            let response = await fb.commentsCollection.add({
                createdOn: new Date(),
                content: data.comment,
                postId: data.postId,
                nick: rootState.auth.userProfile.nick,
                userId: fb.auth.currentUser.uid,
            })

            console.log(response)

            dispatch('loadComments', data.postId)
        },
    }
}