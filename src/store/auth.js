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
                description: "",
            })
        },
        async fetchUserProfile({commit}, user) {
            if (user) {
                let userProfile = await fb.usersCollection.doc(user.uid).get()


                let userModel = userProfile.data()
                try{
                    userModel['avatar'] = await fb.storage.ref(`Users/${user.uid}.jpg`).getDownloadURL()
                }
                catch(err){
                    console.log(err)
                }



                commit('setUserProfile', userModel)
            } else {
                await router.push('login')
            }
        },

    }
}