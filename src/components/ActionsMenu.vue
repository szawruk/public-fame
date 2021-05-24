<template>
  <ion-action-sheet
      :is-open="actionsMenuOpened"
      :buttons="buttons"
      @onWillDismiss="closeMenu()">
  </ion-action-sheet>
</template>

<script>
import {IonActionSheet} from '@ionic/vue';

export default {
  name: 'ActionsMenu',
  components: {
    IonActionSheet
  },
  props: {
    isOpened: Boolean
  },
  data() {
    return {
      buttons: [
        {
          text: 'My account',
          handler: () => {
            this.closeMenu()
            this.$router.push('/user/' + this.loggedUser.userId)
          },
        },
        {
          text: 'Log out',
          role: 'destructive',
          handler: () => {
            this.closeMenu()
            this.$store.dispatch('auth/logout')
          },
        },
      ]
    }
  },
  methods:{
    closeMenu(){
      this.$store.commit('main/setActionsMenuOpened', false)
    }
  },
  computed:{
    actionsMenuOpened:{
      get: function(){
        return this.$store.state.main.actionsMenuOpened
      },
      set: function(value){
        this.$store.commit('main/setActionsMenuOpened', value)
      }
    },
    loggedUser() {
      return this.$store.state.auth.userProfile
    },
  }
}
</script>

<style scoped lang="scss">

</style>