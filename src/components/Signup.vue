<template>
  <div class="signup">

    <div class="logo-wrapper">
      <img src="../../resources/icon.png" alt="logo"/>
    </div>
    <div class="descr">
      Pierwsze koty za płoty
    </div>
  </div>
</template>

<script>
import { IonButtons, IonBackButton } from '@ionic/vue';

export default {
  name: 'Signup',
  props: {
    name: String
  },
  components:{
    IonButtons,
    IonBackButton
  }
}
</script>

<style scoped lang="scss">
.signup {
  width: 100%;
  display: flex;
  flex-direction: column;

  .logo-wrapper{
    height: 200px;
    display: flex;
    justify-content: center;

    .logo{
      height: 100%;
    }
  }
  .descr{
    display: flex;
    justify-content: center;
  }
}

</style>