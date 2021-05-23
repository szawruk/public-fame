<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import * as fb from "@/firebase";

export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  mounted() {
    fb.auth.onAuthStateChanged((user) => {
      if (user){
        this.$store.dispatch('auth/fetchUserProfile', user)
      }
      else{
        this.$store.commit('auth/setUserProfile', null)
      }
    })
  }
};
</script>

<style>

</style>