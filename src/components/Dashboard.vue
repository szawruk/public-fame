<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header class="ion-no-border">
        <ion-toolbar color="translucent">
          <ion-buttons slot="start">
            <ion-back-button default-href="/" text="tu co bedzie"></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <div class="login">
        DUPAA MARYNY
        <div class="login-form-container">
          <div class="title">
            Login
          </div>
          <ion-item color="translucent" class="login-input">
            <ion-input  name="name" type="text" placeholder="Enter email..."  required clear-input></ion-input>
          </ion-item>
          <ion-item color="translucent" class="password-input">
            <ion-input  name="name" type="text" placeholder="Enter password..." ngModel required  clear-input></ion-input>
          </ion-item>
          <ion-button color="dark" @click="doLogin">
            Create new account
          </ion-button>
        </div>
        <div class="register-button-wrapper">
          <ion-button color="dark" @click="openRegisterPage">
            Create new account
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>

</template>

<script>

import {IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/vue';

export default {
  name: 'Login',
  props: {
    name: String
  },
  components: {
    IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton
  },
  methods: {
    doLogin() {
      this.$router.push('/dashboard')
    },
    openRegisterPage() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped lang="scss">
ion-toolbar {
  --background-color: transparent;
  --ion-color-base: transparent !important;
}

.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  color: white;

  .logo-wrapper {
    height: 150px;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    img {
      height: 100%;
    }
  }

  .login-form-container{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 300px;
    .title{
      color: white;
      font-size: 36px;
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .login-input, .password-input{
      padding-bottom: 20px;
    }

  }

}

</style>