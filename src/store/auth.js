import router from "@/router";
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
        async login({dispatch}, form) {
            const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            if (user) {
                dispatch('fetchUserProfile', user)
            }
        },
        async logout() {
            await fb.auth.signOut()
            await router.push('/')
        },
        async signup({dispatch}, form) {
            const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            await fb.usersCollection.doc(user.uid).set({
                userId: user.uid,
                email: form.email,
                nick: form.nick,
                fameCD: new Date(),
                shameCD: new Date(),
            })
        },
        async fetchUserProfile({commit}, user) {
            if (user) {
                const userProfile = await fb.usersCollection.doc(user.uid).get()
                commit('setUserProfile', userProfile.data())
            } else {
                await router.push('login')
            }
        },

    }
}