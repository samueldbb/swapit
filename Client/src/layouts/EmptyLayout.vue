<template>
  <div>
    <router-view class="principal-screen" />
  </div>
</template>

<script>

import { LocalStorage } from 'quasar'

export default {
  name: 'EmptyLayout',

  computed: {

  },
  created () {
    if(!LocalStorage.getItem('tokenAdded')) {
      LocalStorage.set('tokenAdded', true)
      SmartRepository.addToken();
    }
    window.addEventListener('load', this.setVh);
    window.addEventListener('resize', () => {
      this.setVh();
    });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.setVh();
        setTimeout(() => {
          window.scrollTo(0, 1);
        }, 500);
      }, 500);
    });
    this.setVh();
    setInterval(() => {
      this.setVh();
    }, 1000);
  },
  methods: {
    setVh () {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },

  }
};
</script>

<style>
html, body{
  width: 100%;
  height: 100vh;
  font-family: 'Quicksand', sans-serif;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  background-color: #E5E5E5;
}
html, body, #app, .v-application--wrap, #inspire, .container{
  overflow: hidden !important;
}
.v-application--wrap{
  height: 100%;
  min-height: 100%;
}
.principal-screen{
  position: absolute;
  top: 0;
  right: 0;
  bottom:0;
  left: 0;
}
#inspire > .v-application--wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom:0;
  left: 0;
  overflow: auto;
}
.row{
  margin-top: unset;
  margin-bottom: unset;
}

.v-application{
  background-color: unset !important;
}
#q-app{
  max-width: 500px;
  margin: auto;
  position: static;
  height: calc(var(--vh, 1vh) * 100);
}

.blackText{
  color: #3A3A3A !important;
}
.blackBackground{
  background-color: #3A3A3A !important;
}
</style>
