<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header/>
      <div class="comments-container">
        <post :post="post" :key="post.name" :hide-show-comments-button="true"/>
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
  IonActionSheet
} from '@ionic/vue';

import ActionsMenu from "@/components/ActionsMenu";
import AppHeader from "@/components/AppHeader";
import Post from "@/components/Post";

export default {
  name: 'Login',
  props: {
    name: String
  },
  components: {
    ActionsMenu,
    IonButtons,
    IonBackButton,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    Post,
    IonActionSheet,
    AppHeader
  },
  methods: {
    doLogin() {
      this.$router.push('/dashboard')
    },
    openRegisterPage() {
      this.$router.push('/register')
    },

  },
  computed: {
    post() {
      return (
          {
            authorAvatar: 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/avatar1.jpg?alt=media&token=e2af1daa-5165-40d6-8e86-09a707082561',
            authorName: 'Petro Wineto',
            postImage: 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/post1.jpg?alt=media&token=00106521-1da5-4e02-8a97-effae5ef8404',
            description: 'To bardzo ciekawa inicjatywa podjęta przez moją osobę. Sam murowałem to. Dzięki temu wykształciłem podstawowe zachowania prepperskie.'
          }
      )
    }
  },
  mounted() {
    if (!this.$store.state.auth.userProfile) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.cancel-button {
  color: red;
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

  .login-form-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 300px;

    .title {
      color: white;
      font-size: 36px;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .login-input, .password-input {
      padding-bottom: 20px;
    }

  }

}

</style>