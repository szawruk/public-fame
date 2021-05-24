<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header name=""/>
      <div class="edit-container">
        <div class="title">
          Edit account
        </div>
        <div class="avatar-wrapper">
          <img :src="loggedUser.avatar" class="user-avatar" v-if="loggedUser.avatar"/>
          <div class="user-avatar-scam" v-if="!loggedUser.avatar">NO IMAGE</div>
        </div>
        <div class="description-container">
          <div class="description-wrapper">
            <ion-textarea  class="textbox" :value="description" type="text" placeholder="Enter description..."
                          @change="description= $event.target.value" autoGrow></ion-textarea>
          </div>
        </div>
        <div class="action-button">
          <ion-button  @click="saveChanges()">
            Confirm
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>

import {
  IonButtons,
  IonBackButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonActionSheet,
    IonTextarea
} from '@ionic/vue';

import ActionsMenu from "@/components/ActionsMenu";
import AppHeader from "@/components/AppHeader";
import Post from "@/components/Post";

export default {
  name: 'EditAccount',
  props: {
    name: String
  },
  data() {
    return {
      description: ''
    }
  },
  components: {
    ActionsMenu,
    IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, Post, IonActionSheet, AppHeader, IonTextarea
  },
  methods: {
    saveChanges() {
      this.$store.dispatch('users/updateUser', {description: this.description})
      this.$router.push('/dashboard')
    },

  },
  computed: {
    loggedUser() {
      return this.$store.state.auth.userProfile
    },
  },
  mounted() {
      this.description = this.loggedUser.description
  }
}
</script>

<style scoped lang="scss">
.edit-container{
  width: 100%;
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;

  .title{
    width: 100%;
    min-height: 50px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 20px;
  }

  .avatar-wrapper{
    width: 100%;
    min-height: 170px;
    display: flex;
    justify-content: center;

    .user-avatar-scam, .user-avatar{
      width: 170px;
      height: 170px;
      border-radius: 50%;
    }
    .user-avatar{
      object-fit: cover;
    }

    .user-avatar-scam{
      background-color: grey;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .description-container{
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 20px;

    .description-wrapper{
      height: 100%;
      width: 70%;
      font-size: 15px;
      border: solid white 2px;
      border-radius: 10px;

      .textbox{
        height: 100%;
      }
    }
  }
  .action-button{
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
}

</style>