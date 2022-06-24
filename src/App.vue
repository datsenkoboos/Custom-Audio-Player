<template>
  <BeatstorePlayer
    :mp3="`${publicPath}audio/10TD_s1kebeats_140BPM.mp3`"
    :wav="`${publicPath}audio/10TD_s1kebeats_140BPM.wav`"
  />
</template>

<script setup>
import {  } from 'vue'
import BeatstorePlayer from './components/BeatstorePlayer.vue';

document.addEventListener('play', (e) => {
  console.log(1)
  console.log(e.target)
})

const publicPath = process.env.BASE_URL
</script>

<style lang="scss">
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  src: url('@/assets/font/montserrat.woff2');
}  

html {
  font-family: Poppins, sans-serif;
  font-size: 10px;
}
html, body, #app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-size: 1rem;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(52deg, rgb(42,79,87), rgb(222,211,5));
  flex-direction: column;
}
</style>
