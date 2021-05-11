<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header class="ion-no-border">
        <ion-toolbar color="translucent">
          <ion-buttons slot="start">
            <ion-back-button default-href="/" text=""></ion-back-button>
          </ion-buttons>
          dupa
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

          <ion-item  class="login-input">
            <ion-input  name="name" type="text" placeholder="Enter email..."  required clear-input></ion-input>
          </ion-item>
          <ion-item color="translucent" class="password-input">
            <ion-input  name="name" type="text" placeholder="Enter password..." ngModel required  clear-input ></ion-input>
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
  height: calc(100% - 44px); // because of header
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
    height: 400px;
    color: white;
    .title{
      color: white;
      font-size: 36px;
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .login-input, .password-input{
      padding-bottom: 20px;
    }
    ion-button{
      --color: grey;
      width: 150px;
    }
    ion-item{
      --border-color: white;
    }
    .input{
      margin: 5% 10%;
      position: relative;
      width: fit-content;
    }
    input{
      padding: 10px 10px 10px 5px;
      font-size: 18px;
      width: 280px;
      border:  1px solid ;
      border-color: transparent transparent gray;
      background-color: transparent;
    }
    input:focus{outline: none;}
    /*Label */
    label{
      position: absolute;
      top: 30%;
      font-size: 18px;
      color: rgb(165, 165, 165);
      left: 3%;
      z-index: -1;
      pointer-events: none;
      transition: all 0.3s  ;
      -webkit-transition: all 0.3s  ;
      -moz-transition: all 0.3s  ;
      -ms-transition: all 0.3s  ;
      -o-transition: all 0.3s  ;
    }
    /* Activate State */
    input:focus +label , input:valid + label {
      font-size: 12px;
      color: rgb(148, 98, 255);
      top: -1%;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
    }
    /*End Label */
    /*Bar*/
    .bar{
      width: 100%;
      height: 2px;
      position: absolute;
      background-color:  rgb(148, 98, 255);
      top: calc(100% - 2px);
      left: 0;
      transform: scaleX(0.0);
      -webkit-transform: scaleX(0.0);
      -moz-transform: scaleX(0.0);
      -ms-transform: scaleX(0.0);
      -o-transform: scaleX(0.0);
    }
    /*Activate State */
    input:focus ~ .bar ,input:valid ~ .bar  {
      transform: scaleX(1.0);
      -webkit-transform: scaleX(1.0);
      -moz-transform: scaleX(1.0);
      -ms-transform: scaleX(1.0);
      -o-transform: scaleX(1.0);
      transition: transform 0.3s ;
      -webkit-transition: transform 0.3s ;
      -moz-transition: transform 0.3s ;
      -ms-transition: transform 0.3s ;
      -o-transition: transform 0.3s ;
    }
    /*End Bar */
    /*Highlight */
    .highlight{
      width: 100%;
      height: 85%;
      position: absolute;
      background-color:  rgba(148, 98, 255, 0.2);
      top: 15%;
      left: 0;
      visibility: hidden;
      z-index: -1;
    }
    input:focus ~ .highlight{
      width: 0;
      visibility: visible;
      transition: all 0.09s linear;
      -webkit-transition: all 0.09s linear;
      -moz-transition: all 0.09s linear;
      -ms-transition: all 0.09s linear;
      -o-transition: all 0.09s linear;
    }
  }
  .register-button-wrapper{
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-bottom: 40px;
    ion-button{
      --color: grey;
      width: 200px;
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