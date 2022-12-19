<script setup lang="ts">
//
</script>

<template>
  <main>
    <div id="qp-mainview">
      <el-scrollbar height="100%">
        <slot></slot>
      </el-scrollbar>
    </div>
  </main>
</template>

<style scoped>
#qp-main main {
  display: grid;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
