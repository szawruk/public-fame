<template>
  <ion-action-sheet
      :is-open="actionsMenuOpened"
      :buttons="buttons"
      @onWillDismiss="closeMenu()">
  </ion-action-sheet>
</template>

<script>
import {IonActionSheet} from '@ionic/vue';
// import { ImagePicker } from '@ionic-native/image-picker';
import { Capacitor as cap} from '@capacitor/core';

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
        {
          text: 'New post',
          handler: () => {
            this.newPost()
            // this.$store.dispatch('auth/logout')
          },
        },
      ]
    }
  },
  methods: {
    closeMenu() {
      this.$store.commit('main/setActionsMenuOpened', false)
    },
    newPost() {
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
          // imageResponse.push('data:image/jpeg;base64,' + results[i]);
          this.$store.dispatch('photos/savePhoto', cap.convertFileSrc(results[i]))
        }
      }, (err) => {
        alert(err);
      });
    },
  },
  computed: {
    actionsMenuOpened: {
      get: function () {
        return this.$store.state.main.actionsMenuOpened
      },
      set: function (value) {
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