<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header name=""/>
      <div class="user-container" v-if="user">
        <div class="user-info-container">
          <div class="left-side">
            <div class="avatar-wrapper">
              <img :src="user.avatar" class="user-image"/>
            </div>
            <div class="followers-count">

            </div>
            <div class="action-button">

            </div>
          </div>
          <div class="right-side">
              <div class="nick">
                {{user.nick}}
              </div>
            <div class="description">
              {{user.description}}
            </div>
          </div>
        </div>
        <div class="posts-container">
          <post v-for="post in posts" :post="post" :key="post.name"/>
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
    user() {
      return this.$store.state.users.openedUser
    },
    posts() {
      return this.$store.state.posts.openedUserPosts
    }
  },
  mounted() {
    this.$store.dispatch('users/loadOpenedUser', this.$route.params.id)
    this.$store.dispatch('posts/loadOpenedUserPosts', this.$route.params.id)
  }
}
</script>

<style scoped lang="scss">
.user-container{
  width: 100%;

  .user-info-container{
    display: flex;

    .left-side{
      width: 25%;
    }
  }

  .posts-container{

  }
}
</style>