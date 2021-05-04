<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Signup</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 133</ion-title>
        </ion-toolbar>
      </ion-header>
      <Signup/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Signup from '@/components/Signup.vue';

export default  {
  name: 'Tab1',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Signup }
}
</script>