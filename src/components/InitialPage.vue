<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="signup">
        <div class="logo-wrapper">
          <img src="../../resources/icon.png" alt="logo"/>
        </div>
        <div class="signup-button-wrapper">
          <ion-button @click="openLogin">
            <img src="../../resources/icon.png" alt="logo"/>
            Sign in
          </ion-button>
        </div>
        <div class="acef-signature">
          ACEF GROUP
        </div>
      </div>
    </ion-content>
  </ion-page>

</template>

<script>

import {IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/vue';

export default {
  name: 'InitialPage',
  props: {
    name: String
  },
  components: {
    IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton
  },
  methods: {
    openLogin(){
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">
.signup {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .logo-wrapper {
    height: 150px;
    display: flex;
    justify-content: center;

    img {
      height: 100%;
    }
  }

  .signup-button-wrapper{
    display: flex;
    justify-content: center;
    margin-top: 100px;

    ion-button{
      img{
        height: 100%;
        padding: 5px 0;
        margin-right: 10px;
      }
    }
  }

  .acef-signature{
    position: absolute;
    bottom: 0;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 13px;
    color: #a5a5a5;
  }

}

</style>

