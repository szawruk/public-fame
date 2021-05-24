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
              {{user.followers}} followers
            </div>
            <div class="action-button">
              <ion-button  @click="editAccount()" v-if="user.userId === loggedUser.userId">
                Edit
              </ion-button>
              <ion-button  @click="followUser()" v-if="user.userId !== loggedUser.userId">
                Follow
              </ion-button>
            </div>
          </div>
          <div class="right-side">
            <div class="nick">
              {{ user.nick }}
            </div>
            <div class="description">
              {{ user.description }}
            </div>
          </div>
        </div>
        <div class="posts-container">
          <post v-for="post in posts" :post="post" :key="post.name" :hide-user-header="true"/>
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
    editAccount(){
      this.$router.push('/user/edit')
    },
    followUser(){

    }
  },
  computed: {
    user() {
      return this.$store.state.users.openedUser
    },
    loggedUser() {
      return this.$store.state.auth.userProfile
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
.user-container {
  width: 100%;

  .user-info-container {
    display: flex;
    padding: 10px;
    padding-right: 20px;
    background-color: rgb(47, 47, 47);
    margin-bottom: 10px;

    .left-side {
      width: 120px;
      padding: 0 20px 0 0;

      .avatar-wrapper {
        img {
          border-radius: 50%;
          height: 100px;
          object-fit: cover;
          object-position: center;
        }
      }
      .followers-count, .action-button{
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .followers-count{
        font-weight: bold;
        padding-top: 5px;
        font-size: 15px;
      }
    }

    .right-side {
      display: flex;
      flex-direction: column;
      flex: 1;

      .nick {
        width: 100%;
        font-weight: bold;
        font-size: 28px;
      }

      .description {
        padding-top: 10px;
        text-align: justify;
        font-size: 15px;
      }
    }
  }

  .posts-container {

  }
}
</style>