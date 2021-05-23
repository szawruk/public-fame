<template>
  <ion-app>
    <ion-router-outlet v-if="runApp()"/>
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
  computed: {
    userProfile() {
      return this.$store.state.auth.userProfile
    },
  },
  methods: {
    runApp() {
      return (this.$route.name === 'login' || this.$route.name === 'init' || this.userProfile)
    }
  },
  watch: {
    userProfile() {
      if (this.userProfile) {
        if (this.$route.name === 'login' || this.$route.name === 'init') {
          this.$router.push('/dashboard')
        }
      }
    }
  },
  mounted() {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('auth/fetchUserProfile', user)
      } else {
        this.$store.commit('auth/setUserProfile', null)
      }
    })
  },
};
</script>

<style>

</style>