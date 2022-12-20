<script setup lang="ts">
import type { TypeRelic } from "../types/warframe";
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { API, HEADERS } from "../plugins/store/index";
import { storeUser } from "../plugins/store";
import imgRelicLith from "../assets/img/relic_lith.png";
import imgRelicMeso from "../assets/img/relic_meso.png";
import imgRelicNeo from "../assets/img/relic_neo.png";
import imgRelicAxi from "../assets/img/relic_axi.png";
import imgBlueprint from "../assets/img/blueprint.png";
import imgChassis from "../assets/img/chassis.png";
import imgNeuroptics from "../assets/img/neuroptics.png";
import imgSystems from "../assets/img/systems.png";

const { t } = useI18n()

const route = useRoute()

const useStoreUser = storeUser()
const { rat, lang } = storeToRefs(useStoreUser)

const isLoading = ref<boolean>(false)
const hasError = ref<string|null>(null)

const showDrawerRelic = ref<boolean>(false)
const dataDrawerRelic = ref<TypeRelic|null>(null)

const listRelicsOriginal = ref<Array<any>>([])
const listRelics = ref<Array<any>>([])

const winWidth = ref(window.innerWidth)

const doRelicsList = async (era: null|string = null) => {
    isLoading.value = true
    hasError.value = null
    // ===---
    let params = ""
    if (era) params = `?era=${era}`
    // ===---
    try {
        let f = await fetch(`${API}/users/${route.params.slug}/relics/${params}`, {
            method: "GET"
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
            listRelicsOriginal.value = sortedObj
            listRelics.value = sortedObj
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

const sortByEra = (relics: Array<TypeRelic>, era: String) => {
  let result = relics.filter((r) => {
    return r.era == era
  })
  if (result != undefined && result.length) return result
  return []
}

const doRelicsSortByEra = (era: null|string = null) => {
  if (era) {
    listRelics.value = sortByEra(listRelicsOriginal.value, era)
  } else {
    listRelics.value = listRelicsOriginal.value
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

onMounted(() => {
    doRelicsList()
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
      <div class="qp-relics-actions-era">
        <el-button-group>
          <el-button @click="doRelicsSortByEra()"><span v-text="$t('All')"></span></el-button>
          <el-button @click="doRelicsSortByEra('Lith')"><span v-text="$t('Lith')"></span></el-button>
          <el-button @click="doRelicsSortByEra('Meso')"><span v-text="$t('Meso')"></span></el-button>
          <el-button @click="doRelicsSortByEra('Neo')"><span v-text="$t('Neo')"></span></el-button>
          <el-button @click="doRelicsSortByEra('Axi')"><span v-text="$t('Axi')"></span></el-button>
        </el-button-group>
      </div>
      <el-row class="qp-relics-list">
        <TransitionGroup name="list" mode="out-in">
          <el-col v-for="(relic, n) in listRelics" :key="`relics-${n}`" :span="12" :sm="8" :md="6" :lg="4" class="qp-relics-col">
            <div class="qp-relics-item" @click="openDrawerRelic(relic)">
              <div class="qp-relics-item-wrapper">
                <div class="qp-relics-image">
                  <Transition>
                    <el-image v-if="relic.era == 'Lith'" :src="imgRelicLith" />
                    <el-image v-else-if="relic.era == 'Meso'" :src="imgRelicMeso" />
                    <el-image v-else-if="relic.era == 'Neo'" :src="imgRelicNeo" />
                    <el-image v-else-if="relic.era == 'Axi'" :src="imgRelicAxi" />
                  </Transition>
                </div>
                <div class="qp-relics-name">
                  <span v-text="`${relic.era} ${relic.name}`"></span>
                </div>
                <div v-if="relic.components.length > 1" class="qp-relics-components-count">
                  <span v-text="`x${relic.components.length}`"></span>
                </div>
                <div class="qp-relics-rarities">
                  <span v-if="relic.rarities.gold" class="qp-relics-rarities-gold"></span>
                  <span v-if="relic.rarities.silver" class="qp-relics-rarities-silver"></span>
                  <span v-if="relic.rarities.bronze" class="qp-relics-rarities-bronze"></span>
                </div>
              </div>
            </div>
          </el-col>
        </TransitionGroup>
      </el-row>
      <el-drawer v-model="showDrawerRelic" direction="rtl" :size="winWidth < 992 ? '90%' : '30%'" :before-close="closeDrawerRelic">
        <template #header>
          <span v-if="dataDrawerRelic" class="el-drawer__title" v-text="`${dataDrawerRelic.era} ${dataDrawerRelic.name}`"></span>
        </template>
        <div>
          <ul v-if="dataDrawerRelic?.components" class="qp-relics-drawer-components-list">
            <li v-for="(component, n) in dataDrawerRelic.components" :key="`warframe-components-${n}`" class="qp-relics-drawer-components-item">
              <div class="qp-relics-drawer-components-item-wrapper">
                <div class="qp-relics-drawer-components-img">
                  <el-image v-if="component.component == 'blueprint'" :src="imgBlueprint" />
                  <el-image v-else-if="component.component == 'chassis'" :src="imgChassis" />
                  <el-image v-else-if="component.component == 'neuroptics'" :src="imgNeuroptics" />
                  <el-image v-else-if="component.component == 'systems'" :src="imgSystems" />
                </div>
                <div>
                  <div class="qp-relics-drawer-components-name">
                    <span v-text="component.name"></span>
                  </div>
                  <div class="qp-relics-drawer-rarities">
                    <span v-if="component.percent < 10" class="qp-relics-drawer-rarities-gold"></span>
                    <span v-else-if="component.percent > 9 && component.percent < 20" class="qp-relics-drawer-rarities-silver"></span>
                    <span v-else-if="component.percent > 19" class="qp-relics-drawer-rarities-bronze"></span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-drawer>
    </div>
    <qp-notfound v-else-if="!isLoading" />
    <qp-loading v-else />
  </qp-page>
</template>

<style scoped>
.qp-relics-actions-era {
  text-align: right;
  padding: 0 20px 12px;
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
.qp-relics-item {
  text-align: center;
  list-style: none;
  display: block;
  flex: 0 1 20%;
  padding: 0;
  margin: 0;
}
.qp-relics-item:hover {
  cursor: pointer;
  opacity: 0.8;
}
.qp-relics-item-wrapper {
  background-color: #222324;
  border: 1px solid #404040;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 0;
  margin: 0;
}
.qp-relics-image {
  width: 100%;
  max-width: 120px;
  aspect-ratio: 1/1;
  position: relative;
  padding: 0;
  margin: 0 auto;
}
.qp-relics-image .el-image {
  width: 100%;
  max-width: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.qp-relics-name {
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
  padding: 4px 6px;
}
.qp-relics-components-count {
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
  position: absolute;
  top: 4px;
  left: 4px;
  opacity: 0.8;
}
.qp-relics-rarities {
  position: absolute;
  top: 4px;
  right: 4px;
}
.qp-relics-rarities > span {
  background-color: var(--qp-primary);
  display: block;
  width: 8px;
  height: 8px;
  opacity: 0.7;
  margin: 4px;
}
.qp-relics-rarities > span.qp-relics-rarities-gold {
  background-color: #998b2b;
}
.qp-relics-rarities > span.qp-relics-rarities-silver {
  background-color: #818181;
}
.qp-relics-rarities > span.qp-relics-rarities-bronze {
  background-color: #99532b;
}
/* ===---=== */
.qp-relics-drawer-components-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.qp-relics-drawer-components-item {
  background-color: var(--qp-card-bg);
  border: 1px solid var(--qp-card-bg-light-1);
  box-sizing: border-box;
  list-style: none;
  display: block;
  position: relative;
  padding: 0;
  margin: 0 0 10px 0;
}
.qp-relics-drawer-components-item-wrapper {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  min-height: 104px;
  position: relative;
  padding: 0 2px 12px 0;
  margin: 0;
}
.qp-relics-drawer-components-img {
  flex: 0 0 80px;
  width: 80px;
  height: 80px;
  padding: 12px 12px 0 0;
}
.qp-relics-drawer-components-name {
  font-size: 16px;
  line-height: 120%;
  padding: 12px 4px 2px 0;
}
.qp-relics-drawer-rarities {
  position: absolute;
  top: 4px;
  right: 4px;
}
.qp-relics-drawer-rarities > span {
  background-color: var(--qp-primary);
  display: block;
  width: 8px;
  height: 8px;
  opacity: 0.7;
  margin: 4px;
}
.qp-relics-drawer-rarities > span.qp-relics-drawer-rarities-gold {
  background-color: #998b2b;
}
.qp-relics-drawer-rarities > span.qp-relics-drawer-rarities-silver {
  background-color: #818181;
}
.qp-relics-drawer-rarities > span.qp-relics-drawer-rarities-bronze {
  background-color: #99532b;
}
</style>