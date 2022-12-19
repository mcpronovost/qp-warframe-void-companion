<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { API, HEADERS } from "../../plugins/store/index";
import { storeUser } from "../../plugins/store";
import { qpslug } from "@mcpronovost/qpfilters";

const { t } = useI18n()

const useStoreUser = storeUser()
const { rat, lang, id } = storeToRefs(useStoreUser)

const isLoading = ref<boolean>(false)
const hasError = ref<string|null>(null)

const listWarframes = ref<Array<any>>([])

const doWarframesList = async () => {
    isLoading.value = true
    hasError.value = null
    // ===---
    try {
        let f = await fetch(`${API}/warframes/`, {
            method: "GET",
            headers: HEADERS(rat.value, lang.value)
        })
        .then((r) => {return r})
        .catch(() => {return new Response(null,{status: 400})})
        if (f.status === 200) {
            let r = await f.json()
            listWarframes.value = r.results
            isLoading.value = false
        } else {
            throw f.status
        }
    } catch (e) {
        if (e === 401) ElMessage.error("not authorized")
        else ElMessage.error(t("AnErrorOccurred"))
        hasError.value = `${e}`
        isLoading.value = false
    }
}

onMounted(() => {doWarframesList()})
</script>

<template>
  <div v-if="!isLoading && !hasError" class="qp-container">
    <el-row class="qp-warframes-list">
      <el-col v-for="(warframe, n) in listWarframes" :key="`warframes-${n}`" :span="12" :sm="8" :md="6" :lg="4">
        <div class="qp-warframes-item" @click="$router.push({name:'WarframesDetail',params:{pk:warframe.id,slug:qpslug(warframe.name)}})">
          <div class="qp-warframes-item-wrapper">
            <div class="qp-warframes-image" :style="`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${warframe.image_name}')`"></div>
            <div class="qp-warframes-name">
              <span v-text="warframe.name"></span>
            </div>
            <div v-if="warframe.completion == 100" class="qp-warframe-complete"></div>
            <div class="qp-warframe-completion">
              <div class="qp-warframe-completed" :style="`width:${warframe.completion}%;`"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <qp-notfound v-else-if="!isLoading" />
  <qp-loading v-else />
</template>
