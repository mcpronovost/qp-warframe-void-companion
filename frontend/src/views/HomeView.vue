<script setup lang="ts">
import type { TypeRelic } from "../types/warframe";
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { WEB, API, HEADERS } from "../plugins/store/index";
import { storeUser } from "../plugins/store";
import QpRelicDrawer from "../components/primes/RelicDrawer.vue";
import QpRelicItem from "../components/primes/RelicItem.vue";

const { t } = useI18n()

const useStoreUser = storeUser()
const { rat, lang, slug } = storeToRefs(useStoreUser)

const isLoading = ref<boolean>(false)
const isLoadingUpdate = ref<boolean>(false)
const hasError = ref<string|null>(null)

const showDrawerRelic = ref<boolean>(false)
const dataDrawerRelic = ref<TypeRelic|null>(null)

const listRelicsOriginal = ref<Array<any>>([])
const listRelics = ref<Array<any>>([])
  
const relics_page = ref<number>(1)
const relics_size = ref<number>(1)
const relics_total = ref<number>(0)

const currentEra = ref<string|null>(null)
const winWidth = ref(window.innerWidth)

const doRelicsList = async (page: string|null, era: string|null, update = true) => {
  if (!update) isLoading.value = true
  else isLoadingUpdate.value = true
  hasError.value = null
  // ===---
  let query = page ? `?page=${page}` : "?page=1"
  query += era ? `&era=${era}` : ""
  // ===---
  currentEra.value = era
  // ===---
  let f: Response;
  try {
    if (rat.value) {
      f = await fetch(`${API}/me/relics/${query}`, {
        method: "GET",
        headers: HEADERS(rat.value, lang.value)
      })
      .then((r) => {return r})
      .catch(() => {return new Response(null,{status: 400})})
    } else {
      f = await fetch(`${API}/relics/${query}`, {
        method: "GET"
      })
      .then((r) => {return r})
      .catch(() => {return new Response(null,{status: 400})})
    }
    if (f.status === 200) {
      let r = await f.json()
      relics_size.value = r.size
      relics_total.value = r.count
      listRelicsOriginal.value = r.results
      listRelics.value = r.results
      isLoading.value = false
      isLoadingUpdate.value = false
    } else {
      throw f.status
    }
  } catch (e) {
    if (e === 401) ElMessage.error(t("Yourenotauthorized"))
    else ElMessage.error(t("AnErrorOccurred"))
    hasError.value = `${e}`
    isLoading.value = false
    isLoadingUpdate.value = false
  }
}

const openDrawerRelic = (relic: TypeRelic|null = null) => {
  dataDrawerRelic.value = relic
  showDrawerRelic.value = true
}

const closeDrawerRelic = () => {
  showDrawerRelic.value = false
  dataDrawerRelic.value = null
}

const doUpdateWinWidth = () => {
  winWidth.value = window.innerWidth
}

const doCopyShareLink = () => {
  navigator.clipboard.writeText(`${WEB}/u/${slug.value}`);
  ElMessage.success(t("Sharelinkcopiedtoclipboard"))
}

onMounted(() => {
  doRelicsList(null, null, false)
  window.addEventListener("resize", doUpdateWinWidth)
})

onUnmounted(() => {
  window.removeEventListener("resize", doUpdateWinWidth)
})
</script>

<template>
  <qp-page>
    <div v-if="!isLoading && !hasError" class="qp-container">
      <qp-header :title="$t('Relics')" page-type="relics" />
      <div class="qp-relics-actions">
        <div class="qp-relics-actions-extra">
          <el-button-group v-if="rat">
            <el-button @click="doCopyShareLink()">
              <el-icon class="mdi mdi-share-variant" />
              <span v-text="$t('Share')"></span>
            </el-button>
          </el-button-group>
        </div>
        <div class="qp-relics-actions-era">
          <el-button-group>
            <el-button :disabled="isLoadingUpdate" @click="doRelicsList(null, null, true)"><span v-text="$t('All')"></span></el-button>
            <el-button :disabled="isLoadingUpdate" @click="doRelicsList(null, 'Lith', true)"><span v-text="$t('Lith')"></span></el-button>
            <el-button :disabled="isLoadingUpdate" @click="doRelicsList(null, 'Meso', true)"><span v-text="$t('Meso')"></span></el-button>
            <el-button :disabled="isLoadingUpdate" @click="doRelicsList(null, 'Neo', true)"><span v-text="$t('Neo')"></span></el-button>
            <el-button :disabled="isLoadingUpdate" @click="doRelicsList(null, 'Axi', true)"><span v-text="$t('Axi')"></span></el-button>
          </el-button-group>
        </div>
      </div>
      <el-row class="qp-relics-list">
        <TransitionGroup name="list" mode="out-in">
          <el-col v-for="(relic, n) in listRelics" :key="`relics-${n}`" v-loading="isLoadingUpdate" :span="12" :sm="8" :md="6" :lg="4" class="qp-relics-col">
            <QpRelicItem :relic="relic" @click="openDrawerRelic(relic)" />
          </el-col>
        </TransitionGroup>
        <el-col>
            <el-pagination background hide-on-single-page layout="prev, pager, next" v-model:current-page="relics_page" :page-size="relics_size" :total="relics_total" @current-change="doRelicsList" />
        </el-col>
      </el-row>
      <!---->
      <el-drawer v-model="showDrawerRelic" direction="rtl" :size="winWidth < 992 ? '90%' : '30%'" :before-close="closeDrawerRelic" class="qp-relic-drawer">
        <template #header>
          <span v-if="dataDrawerRelic" class="el-drawer__title" v-text="`${dataDrawerRelic.era} ${dataDrawerRelic.name}`"></span>
        </template>
        <QpRelicDrawer v-if="dataDrawerRelic" :relic="dataDrawerRelic" @close="closeDrawerRelic(); doRelicsList(null, currentEra, true);" />
      </el-drawer>
    </div>
    <qp-notfound v-else-if="!isLoading" />
    <qp-loading v-else />
  </qp-page>
</template>

<style scoped>
.qp-relics-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px 20px;
}
.qp-relics-actions-extra {
  text-align: left;
}
.qp-relics-actions-era {
  text-align: right;
}
/* ===---=== */
.qp-relics-list {
  font-size: 0;
  line-height: 0;
  padding-bottom: 64px;
}
.qp-relics-col {
  transition: all 0.5s;
}
</style>
