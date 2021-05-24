import * as fb from '../firebase'

export default {
    namespaced: true,
    state: {
        openedUser: {}
    },
    mutations: {
        setOpenedUser(state, val) {
            state.openedUser = val
        },
    },
    actions: {
        async loadOpenedUser({dispatch, commit}, userId) {
            commit('setOpenedUser', null)

            let user = await fb.usersCollection.where('userId', '==', userId).get()
            user = await user.docs[0].data()

            commit('setOpenedUser', user)
        },
    }
}