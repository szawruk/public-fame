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
            user = user.docs[0].data()
            user["followed"] = true;
            if(userId !== fb.auth.currentUser.uid){
                let followed = fb.followsCollection.where('userFollowedId', '==', userId);
                followed = await fb.followsCollection.where('userFollowingId', '==', fb.auth.currentUser.uid).get();
    
                if(followed.docs.length === 0)
                    user["followed"] = false;
            }
                      
            user["followerCount"] = (await fb.followsCollection.where('userFollowedId', '==', userId).get()).docs.length;
            commit('setOpenedUser', user)
        },
        async updateUser({dispatch, commit}, data) {
            await fb.usersCollection.doc(fb.auth.currentUser.uid).update({description: data.description})
            dispatch('loadOpenedUser', fb.auth.currentUser.uid)
            await router.push('/user/' + fb.auth.currentUser.uid)
        },
        async follow({dispatch, commit}, userId) {
            
            let followed = fb.followsCollection.where('userFollowedId', '==', userId);
            followed = await fb.followsCollection.where('userFollwingId', '==', fb.auth.currentUser.uid).get();

            let follow = true;

            if(followed.docs.length === 0)
                follow = true;
            else
                follow = false;

            let response = null;
            // We are adding follower
            if(follow){
                response = await fb.followsCollection.add({
                    userFollowedId: userId,
                    userFollowingId: fb.auth.currentUser.uid,
                });
            }
            // Unfollowing
            else{
                await fb.followsCollection.doc(followed.docs[0].id).delete();
            }
            console.log(response);
        },
    }
}