<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-title size="small">{{name}}</ion-title>
      <ion-buttons slot="start" v-if="!hideBackButton">
        <ion-back-button default-href="/" text=""></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <img src="../../resources/icon.png" alt="logo" class="header-logo" @click="openMenu"/>
      </ion-buttons>
    </ion-toolbar>
    <actions-menu/>
  </ion-header>
</template>

<script>

import {
  IonButtons,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButton,
} from '@ionic/vue';
import ActionsMenu from "@/components/ActionsMenu";

export default {
  name: 'AppHeader',
  props: {
    name: String,
    hideBackButton: Boolean
  },
  components: {
    IonButtons, IonBackButton, IonHeader, IonToolbar, IonButton, ActionsMenu
  },
  data() {
    return {
      openedMenu: false,
    }
  },
  methods:{
    async openMenu() {
      this.$store.commit('main/setActionsMenuOpened', true)
    },
  }
}
</script>

<style scoped lang="scss">
ion-header {
  position: sticky;
  top: 0;
  z-index: 10000;
}

ion-toolbar {
  --background-color: transparent;
  --ion-color-base: transparent !important;
  overflow: visible !important;

  .header-logo {
    height: 30px;
    margin-right: 10px;
  }
}

</style>