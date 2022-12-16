<script setup>
import HelloWorld from './components/HelloWorld.vue'
import imgvite from "./assets/vue.svg";
import { qpunit } from "@mcpronovost/qpfilters";
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img :src="imgvite" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div>
    aaa <span v-text="qpunit(1214)"></span>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
