<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { API, HEADERS } from "../plugins/store/index";
import { storeUser } from "../plugins/store";

const useStoreUser = storeUser()
const { rat, lang, id } = storeToRefs(useStoreUser)

const isLoading = ref<boolean>(false)
const hasError = ref<string|null>(null)

const listRelics = ref<Array<any>>([])

const doRelicsList = async () => {
    isLoading.value = true
    hasError.value = null
    // ===---
    let f = await fetch(`${API}/me/relics/`, {
        method: "GET",
        headers: HEADERS(rat.value, lang.value)
    })
    .then((r) => {return r})
    .catch(() => {return new Response(null,{status: 400})})
    if (f.status === 200) {
        let r = await f.json()
        const eraList = ["Lith", "Meso", "Neo", "Axi"]
        const sortedObj = r.results.sort((a: any, b: any) => {
            return (
              eraList.indexOf(a.era) - eraList.indexOf(b.era)
            );
        });
        listRelics.value = sortedObj
        isLoading.value = false
    } else {
        if (f.status === 401) ElMessage.error("not authorized")
        else ElMessage.error("AnErrorOccurred")
        hasError.value = `${f.status}`
        isLoading.value = false
    }
}

onMounted(() => {doRelicsList()})
</script>

<template>
  <qp-page>
    <div v-if="!isLoading && !hasError" class="qp-container">
      <el-row class="qp-me-relics-list">
        <el-col v-for="(relic, n) in listRelics" :key="`relics-${n}`" :span="24">
          {{ relic.era }} {{ relic.name }}<br />
          {{ relic.components }}
        </el-col>
      </el-row>
    </div>
    <qp-notfound v-else-if="!isLoading" />
  </qp-page>
</template>
