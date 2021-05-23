<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header name="Posts" :hide-back-button="true"/>
      <div class="posts-container">
        <post v-for="post in posts" :post="post" :key="post.name"/>
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
    IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, Post, IonActionSheet, AppHeader
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
    posts() {
      return this.$store.state.posts.dashboardPosts
    }
  },
  mounted() {
    this.$store.dispatch('posts/loadDashboardPosts')
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