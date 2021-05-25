import * as fb from '../firebase'

export default {
    namespaced: true,
    state: {
        userLoggedIn: false,
        userProfile: null
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        }
    },
    actions: {
        async savePhoto({dispatch}, photo) {
            await fb.uploadAvatar(photo)
        },

    }
}