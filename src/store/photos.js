import * as fb from '../firebase'
import router from "@/router";

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
        // async savePhoto({dispatch}, photo) {
        //     await fb.uploadAvatar(photo)
        // },
        async setAvatar({dispatch}, photo) {
            await fb.uploadAvatar(photo)
            await router.push('/users/'+  fb.auth.currentUser.uid)
        },

    }
}