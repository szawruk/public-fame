<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <app-header name="Comments"/>
      <div class="comments-container">
        <post :post="post" :key="post.postId" :hide-show-comments-button="true" v-if="post"/>
        <div class="comment" v-for="comment in comments" :key="comment.content" >
          <div class="avatar-wrapper">
            
            <img v-if="comment.authorAvatar" :src="comment.authorAvatar" class="comment-avatar"/>
            <img v-else src="../../resources/icon.png" class="comment-avatar"/>
          </div>
          <div class="content-container">
            <div class="content-header">
              <span class="nick">{{ comment.nick }}</span>
              <span class="time">{{ timeConverter(comment.createdOn.seconds) }}</span>
            </div>
            <div>
              {{ comment.content }}
            </div>

          </div>

        </div>
        <div class="add-comment-container">
          <ion-input :value="newComment" type="text" placeholder="Enter comment..." required
                     @change="newComment= $event.target.value"></ion-input>
          <ion-button @click="addComment()">
            <i class="fas fa-paper-plane"></i>
          </ion-button>
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
  data() {
    return {
      newComment: ''
    }
  },
  methods: {
    addComment() {
      this.$store.dispatch('comments/addComment', {postId: this.post.postId, comment: this.newComment})
      this.newComment = ''
    },
    timeConverter(UNIX_timestamp) {
      let a = new Date(UNIX_timestamp * 1000);
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let year = a.getFullYear();
      let month = months[a.getMonth()];
      let date = a.getDate();
      let hour = a.getHours();
      let min = a.getMinutes();
      let sec = a.getSeconds();
      return date + ' ' + month + ' ' + year;
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments.comments
    },
    post() {
      return this.$store.state.posts.openedPost
    }
  },
  mounted() {
    this.$store.dispatch('comments/loadComments', this.$route.params.id)
    this.$store.dispatch('posts/loadOpenedPost', this.$route.params.id)
  },
}
</script>

<style scoped lang="scss">
.comments-container {
  padding-bottom: 45px;

  .comment {
    width: 100%;
    padding: 7px 10px;
    display: flex;
    border-bottom: 1px grey solid;

    .avatar-wrapper {
      width: 25px;
      display: flex;
      justify-content: center;

      .comment-avatar {
        height: 25px;
        width: 25px;
        border-radius: 50%;
      }
    }

    .content-container {
      display: flex;
      flex-direction: column;
      padding-left: 8px;

      .content-header {
        margin: 0;
        padding-bottom: 5px;
        color: #d7d7d7;
        font-size: 14px;

        .nick {
          font-weight: bold;
          color: #e000a6;
          padding-right: 8px;
        }

        .time {
          font-size: 12px;
          color: grey;
        }
      }
    }

  }

  .add-comment-container {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 45px;
    background-color: #292929;
    align-items: center;
  }
}

</style>