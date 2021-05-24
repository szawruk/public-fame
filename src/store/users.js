import * as fb from '../firebase'
import router from "@/router";

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
        async updateUser({dispatch, commit}, data) {
            await fb.usersCollection.doc(fb.auth.currentUser.uid).update({description: data.description})
            dispatch('loadOpenedUser', fb.auth.currentUser.uid)
            await router.push('/user/' + fb.auth.currentUser.uid)
        },
    }
}