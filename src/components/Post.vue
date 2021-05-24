<template>
  <div class="post" :class="hideShowCommentsButton ? '' : 'margin-bottom'">
    <div class="post-header" v-if="!hideUserHeader">
      <img class="post-author-avatar" :src="post.authorAvatar" :alt="post.authorNick"/>
      <div class="post-author-name">
        {{ post.authorNick }}
      </div>
    </div>
    <div class="post-image-wrapper">
      <img :src="post.postImage" class="post-image"/>
    </div>
    <div class="reactions-container">
      <div class="left-side">
        <div class="reaction reaction-thumbs-up">
          <i class="fas fa-thumbs-up"></i>
          <div class="count">122</div>
        </div>
        <div class="reaction reaction-thumbs-down">
          <i class="fas fa-thumbs-down"></i>
          <div class="count">3</div>
        </div>
      </div>
      <div class="right-side">
        <div class="reaction reaction-fame">
          <img
              src="https://firebasestorage.googleapis.com/v0/b/publicfame-6e82f.appspot.com/o/fame.png?alt=media&token=6a8b95af-70f3-4fcd-887b-e55f159d85be"
              alt="fame-reaction"/>
          <div class="count">23</div>
        </div>
        <div class="reaction reaction-shame">
          <i class="fas fa-times-circle"></i>
          <div class="count">13</div>
        </div>
      </div>
    </div>
    <div class="description-wrapper">
      <p class="description">
        <span>{{ post.authorNick }}</span> {{ post.description }}
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
      }

      .reaction-thumbs-down {
        color: red;
        margin-left: 20px;
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

        img {
          height: 16px;
          width: 16px;
        }
      }

      .reaction-shame {
        color: #7878ff;
        padding-right: 10px;
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