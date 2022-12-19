<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import QpAppbar from "@/components/core/AppSystembar.vue";
import QpTopbar from "@/components/core/AppTopbar.vue";

const route = useRoute()

const routeName = computed<string|null>(() => {
  return (route?.name?.toString() || null)
})

const setVH = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

onMounted(() => {
  setVH()
  addEventListener("resize", () => {
    setVH()
  })
})
</script>

<template>
  <div id="qp-app" :class="routeName?.startsWith('Auth') ? 'qp-app-auth' : ''">
    <QpAppbar />
    <QpTopbar v-if="routeName && !routeName?.startsWith('Auth')" />
    <div id="qp-main">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<style scoped>
#qp-app {
  display: grid;
  grid-template-rows: 1px 48px auto;
  width: 100vw;
  min-width: 300px;
  height: 100vh;
}
#qp-app.qp-app-auth {
  grid-template-rows: 1px auto;
}
</style>
