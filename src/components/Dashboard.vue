<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header/>
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
      return [
        {
          authorAvatar: 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/avatar1.jpg?alt=media&token=e2af1daa-5165-40d6-8e86-09a707082561',
          authorName: 'Petro Wineto',
          postImage: 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/post1.jpg?alt=media&token=00106521-1da5-4e02-8a97-effae5ef8404',
          description: 'To bardzo ciekawa inicjatywa podjęta przez moją osobę. Sam murowałem to. Dzięki temu wykształciłem podstawowe zachowania prepperskie.'
        },
        {
          authorAvatar: 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/avatar2.jpg?alt=media&token=e76b1781-ec2f-445b-a12d-236aa81790bb',
          authorName: 'Miko Helko',
          postImage: 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/post2.jpg?alt=media&token=285b58a2-4c21-490b-9a91-58d1ac989233',
          description: 'To ja gdy opalam się na plaży. Nie było gorąco, ale wystarczająco, żeby krem do opalania się rozsmarował. Pozdrawiam ze słonecznego jeziora.'
        },
        {
          authorAvatar: 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/avatar3.jpg?alt=media&token=fc31b77a-9cfa-47cd-abd6-9e0e32feab41',
          authorName: 'Adamo Wirtuozo',
          postImage: 'https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/post3.jpg?alt=media&token=c385ec5e-d843-47f2-982d-94955f758b57',
          description: 'To ja w czasie pisania książki. Zostałem oświecony i fajnie wyszło :) Można zakupić za 15zł na mojej stronie. Wysyłka trochę droga, ale myślę, że dacie radę.'
        }
      ]
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