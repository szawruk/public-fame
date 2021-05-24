<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header class="ion-no-border">
        <ion-toolbar color="translucent">
          <ion-buttons slot="start">
            <ion-back-button default-href="/" text=""></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <div class="login">
        <div class="logo-wrapper">
          <img src="../../resources/icon.png" alt="logo"/>
        </div>
        <div class="login-form-container">
          <div class="title">
            Login
          </div>

          <ion-item color="translucent" class="login-input">
            <ion-input :value="loginForm.email" type="text" placeholder="Enter email..." required clear-input
                       @change="loginForm.email= $event.target.value"></ion-input>
          </ion-item>
          <ion-item color="translucent" class="password-input">
            <ion-input :value="loginForm.password" name="name" type="password" placeholder="Enter password..." required
                       clear-input @change="loginForm.password= $event.target.value"></ion-input>
          </ion-item>
          <ion-button @click="doLogin">
            Login
          </ion-button>
        </div>
        <div class="register-button-wrapper">
          <ion-button @click="openRegisterPage">
            Create new account
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

import {IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput} from '@ionic/vue';

export default {
  name: 'Login',
  props: {
    name: String
  },
  components: {
    IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    doLogin() {
      this.$store.dispatch('auth/login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    openRegisterPage() {
      this.$router.push('/signup')
    }
  },
  mounted() {
    if (this.$store.state.auth.userProfile) {
      this.$router.push('/dashboard')
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
  height: calc(100% - 56px); // because of header
  display: flex;
  flex-direction: column;
  position: relative;

  .logo-wrapper {
    height: 100px;
    display: flex;
    justify-content: center;
    margin-top: 10px;

    img {
      height: 100%;
    }
  }

  .login-form-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 300px;

    .title {
      color: white;
      font-size: 36px;
      margin-top: 30px;
      margin-bottom: 40px;
    }

    .login-input, .password-input {
      padding-bottom: 10px;
    }

    ion-button {
      width: 150px;
      margin-top: 15px;
    }

  }

  .register-button-wrapper {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-bottom: 40px;

    ion-button {
      width: 200px;
    }

  }

  .acef-signature {
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