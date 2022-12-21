<script setup lang="ts">
import { ref } from "vue";

const isLoading = ref<boolean>(false)
const hasError = ref<string|null>(null)
</script>

<template>
    <div v-if="!isLoading && !hasError" class="qp-container">
        <qp-header :title="$t('SecondaryWeapons')" page-type="secondaryweapons" />
        <qp-underconstruction style="height:50vh" />
    </div>
    <qp-notfound v-else-if="!isLoading" />
    <qp-loading v-else />
</template>
