<template>
  <div class="post" :class="hideShowCommentsButton ? '' : 'margin-bottom'">
    <div class="post-header" v-if="!hideUserHeader" @click="openUser()">
        <img v-if="post.avatar" :src="post.avatar" class="post-author-avatar" alt="avatar"/>
        <img v-else src="../../resources/icon.png" class="post-author-avatar" alt="avatar"/>
        <div class="post-author-name">
          {{ post.nick }}
        </div>
    </div>
    <div class="post-image-wrapper">
      <img :src="post.postImage" class="post-image"/>
    </div>
    <div class="reactions-container">
      <div class="left-side">
        <div class="reaction reaction-thumbs-up"  @click="addLike(post.postId)">
          <i class="fas fa-thumbs-up" v-bind:class="{'reaction-thumbs-up-chosen': post.myReaction == 'like'}"></i>
          <div class="count">{{ post.likeCount }}</div>
        </div>
        <div class="reaction reaction-thumbs-down"  @click="addDislike(post.postId)">
          <i class="fas fa-thumbs-down" v-bind:class="{'reaction-thumbs-down-chosen': post.myReaction == 'dislike'}"></i>
          <div class="count">{{ post.dislikeCount }}</div>
        </div>
      </div>
      <div class="right-side">
        <div class="reaction reaction-fame"  @click="addFame(post.postId)">
          <img v-bind:class="{'reaction-fame-chosen': post.myReaction == 'fame'}"
              src="https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/fame.png?alt=media&token=6a8b95af-70f3-4fcd-887b-e55f159d85be"
              alt="fame-reaction"/>
          <div class="count">{{ post.fameCount }}</div>
        </div>
        <div class="reaction reaction-shame"  @click="addShame(post.postId)">
          <i class="fas fa-times-circle" v-bind:class="{'reaction-shame-chosen': post.myReaction === 'shame'}"></i>
          <div class="count">{{ post.shameCount }} </div>
        </div>
      </div>
    </div>
    <div class="description-wrapper">
      <p class="description">
        <span>{{ post.nick }}</span> {{ post.description }}
      </p>
    </div>
    <div class="comments-wrapper" v-if="!hideShowCommentsButton">
      <ion-button  @click="openComments(post.postId)">
        Show comments
      </ion-button>
    </div>
  </div>
</template>

<script>
import {IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/vue';

export default {
  name: "Post",
  props: ['post', 'hideShowCommentsButton', 'hideUserHeader'],
  components: {
    IonButtons, IonBackButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton
  },
  methods:{
    openComments(){
      this.$router.push('/post/' + this.post.postId)
    },
    addLike(postId){
      this.$store.dispatch('posts/addLike', postId)
    },
    addDislike(postId){
      this.$store.dispatch('posts/addDislike', postId)
    },
    addFame(postId){
      this.$store.dispatch('posts/addFame', postId)
    },
    addShame(postId){
      this.$store.dispatch('posts/addShame', postId)
    },
    openUser(){
      this.$router.push('/user/' + this.post.userId)
    }

  }
}
</script>

<style scoped lang="scss">
.post {
  width: 100%;
  display: flex;
  flex-direction: column;

  &.margin-bottom{
    margin-bottom: 20px;
  }

  .post-header {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15px;
    background-color: rgb(47, 47, 47);
    color: #e000a6;
    font-weight: bold;
    cursor: pointer;

    .post-author-avatar {
      height: 25px;
      width: 25px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }

  .post-image-wrapper {
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    background-color: rgb(159, 159, 159);

    .post-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      //background-size: contain;
      //content-position: center;
      //background-repeat: no-repeat;
    }
  }

  .reactions-container {
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: rgb(47, 47, 47);

    .reaction {
      display: flex;
      cursor: pointer;

      .count {
        margin-left: 8px;
      }
    }

    .left-side {
      display: flex;
      justify-content: flex-start;
      flex: 1;
      padding-left: 10px;

      .reaction-thumbs-up {
        color: green;
        transition: all 0.2s ease-in-out;
      }
      .reaction-thumbs-up-chosen {
        box-shadow: 0 0 1em rgba(15, 221, 15, 0.7);
        background:rgba(15, 221, 15, 0.2);
        border-radius: 25px; 
      }
      .reaction-thumbs-up:active > i {
        box-shadow: 0 0 2em rgba(15, 221, 15, 0.8);
        border-radius: 25px; 
        background:rgba(15, 221, 15, 0.2);
      }

      .reaction-thumbs-down {
        color: red;
        margin-left: 20px;
        transition: all 0.2s ease-in-out;
      }
      .reaction-thumbs-down-chosen {
        box-shadow: 0 0 1em rgba(255, 40, 40, 0.8);
        background:rgba(255, 59, 59, 0.3);
        border-radius: 25px;       
      }
      .reaction-thumbs-down:active > i{
        box-shadow: 0 0 2em rgb(255, 40, 40);
        background:rgba(255, 59, 59, 0.2);
      }
    }

    .right-side {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      padding-right: 10px;

      .reaction-fame {
        color: #ff48ce;
        margin-right: 20px;
        transition: all 0.2s ease-in-out;
        img {
          height: 16px;
          width: 16px;
        }
      }
      .reaction-fame-chosen{
        box-shadow: 0 0 1em #ff7adb;
        background:#ff7adc46;
        border-radius: 25px;
      }
      .reaction-fame:active > img {
        box-shadow: 0 0 2em #ff7adb;
        background:#ff60d56b;
        border-radius: 25px;
      }
      .reaction-shame {
        color: #7878ff;
        padding-right: 10px;
        transition: all 0.2s ease-in-out;
      }
      .reaction-shame-chosen{
        box-shadow: 0 0 1em #9292ffef;
        background:#9292ff54;
        border-radius: 25px;
      }
      .reaction-shame:active >i {
        box-shadow: 0 0 2em #5e5efff5;
        background:#9292ff63;
        border-radius: 25px;
      }
    }
  }

  .description-wrapper {
    background-color: rgb(31, 31, 31);
    width: 100%;
    padding: 10px 8px;

    .description {
      margin: 0;
      color: #d7d7d7;
      font-size: 14px;

      span {
        font-weight: bold;
        color: #e000a6;
        padding-right: 20px;
      }
    }
  }

  .comments-wrapper{
    background-color: rgb(31, 31, 31);
    width: 100%;
    padding: 0 8px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>