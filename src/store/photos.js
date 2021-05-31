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
            await dispatch('auth/fetchUserProfile', fb.auth.currentUser, {root:true})
            await router.push('/user/'+  fb.auth.currentUser.uid)
        },

    }
}