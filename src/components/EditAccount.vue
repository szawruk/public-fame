<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header name=""/>
      <div class="edit-container">
        <div class="title">
          Edit account
        </div>
        <div class="avatar-wrapper">
          <img v-if="loggedUser.avatar" :src="loggedUser.avatar" class="user-avatar" alt="avatar" @click="updateAvatar()"/>
          <img v-else src="../../resources/icon.png" class="user-avatar" alt="avatar" @click="updateAvatar()"/>
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
import {Capacitor as cap} from "@capacitor/core/dist/esm/global";

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
      this.$router.push('/users/'+ this.loggedUser.userId)
    },
    updateAvatar() {
      let options = {
        // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
        // selection of a single image, the plugin will return it.
        maximumImagesCount: 1,

        // max width and height to allow the images to be.  Will keep aspect
        // ratio no matter what.  So if both are 800, the returned image
        // will be at most 800 pixels wide and 800 pixels tall.  If the width is
        // 800 and height 0 the image will be 800 pixels wide if the source
        // is at least that wide.
        width: 200,
        //height: 200,

        // quality of resized image, defaults to 100
        quality: 25,

        // output type, defaults to FILE_URIs.
        // available options are
        // window.imagePicker.OutputType.FILE_URI (0) or
        // window.imagePicker.OutputType.BASE64_STRING (1)
        outputType: 1
      };
      let imageResponse = [];
      this.$imagePicker.getPictures(this.options).then((results) => {
        for (let i = 0; i < results.length; i++) {
          this.$store.dispatch('photos/setAvatar', cap.convertFileSrc(results[i]))
        }
      }, (err) => {
        alert(err);
      });
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