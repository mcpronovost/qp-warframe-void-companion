<script setup lang="ts">
import type { TypeRelic } from "../../types/warframe";
import { computed, reactive, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { API, HEADERS } from "../../plugins/store/index";
import { storeUser } from "../../plugins/store";
import imgBlueprint from "../../assets/img/blueprint.png";
import imgChassis from "../../assets/img/chassis.png";
import imgNeuroptics from "../../assets/img/neuroptics.png";
import imgSystems from "../../assets/img/systems.png";

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const useStoreUser = storeUser()
const { rat, lang, id } = storeToRefs(useStoreUser)

const isLoading = ref<boolean>(false)
const isLoadingOwning = ref<boolean>(false)
const hasError = ref<string|null>(null)
const hasErrorOwning = ref<string|null>(null)

const warframe = ref<any>()

const doWarframeDetail = async (update = false) => {
    if (!update) isLoading.value = true
    hasError.value = null
    // ===---
    try {
        let f = await fetch(`${API}/warframes/${route.params.pk}/`, {
            method: "GET",
            headers: HEADERS(rat.value, lang.value)
        })
        .then((r) => {return r})
        .catch(() => {return new Response(null,{status: 400})})
        if (f.status === 200) {
            let r = await f.json()
            warframe.value = r
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

const doWarframeOwn = async (id: Number, doall: Boolean = false) => {
  isLoadingOwning.value = true
  hasErrorOwning.value = null
  // ===---
  let data = new FormData()
  if (warframe.value && doall) {
    data.append("id", warframe.value.components.map(c => c.id.toString()).join(","))
  } else {
    data.append("id", id.toString())
  }
  // ===---
  try {
      let f = await fetch(`${API}/me/warframes/components/create/`, {
          method: "POST",
          body: data,
          headers: HEADERS(rat.value, lang.value)
      })
      .then((r) => {return r})
      .catch(() => {return new Response(null,{status: 400})})
      if (f.status === 201) {
          ElMessage.success(t("ComponentsUpdated"))
          isLoadingOwning.value = false
          if (doall) router.push({name: "Warframes"})
          else doWarframeDetail(true)
      } else {
          throw f.status
      }
  } catch (e) {
      if (e === 401) ElMessage.error("not authorized")
      else ElMessage.error(t("AnErrorOccurred"))
      hasErrorOwning.value = `${e}`
      isLoadingOwning.value = false
  }
}

const doWarframeUnown = async (id: Number, doall: Boolean = false) => {
  isLoadingOwning.value = true
  hasErrorOwning.value = null
  // ===---
  let data = new FormData()
  if (warframe.value && doall) {
    data.append("ids", warframe.value.components.map(c => c.id.toString()).join(","))
  }
  // ===---
  try {
      let f = await fetch(`${API}/me/warframes/components/${id}/delete/`, {
          method: "DELETE",
          body: data,
          headers: HEADERS(rat.value, lang.value)
      })
      .then((r) => {return r})
      .catch(() => {return new Response(null,{status: 400})})
      if (f.status === 204) {
          ElMessage.success(t("ComponentUpdated"))
          isLoadingOwning.value = false
          doWarframeDetail(true)
      } else {
          throw f.status
      }
  } catch (e) {
      if (e === 401) ElMessage.error("not authorized")
      else ElMessage.error(t("AnErrorOccurred"))
      hasErrorOwning.value = `${e}`
      isLoadingOwning.value = false
  }
}

const sortByEra = (relics: Array<TypeRelic>, era: String) => {
  let result = relics.filter((r) => {
    return r.era == era
  })
  if (result != undefined && result.length) return result
  return []
}

const sortRelicsOld = (relics: Array<TypeRelic>) => {
  const eraList = ["Lith", "Meso", "Neo", "Axi"]
  const sortedObj = relics.sort((a: any, b: any) => {
      return (
        eraList.indexOf(a.era) - eraList.indexOf(b.era)
      );
  });
  return sortedObj
}

onMounted(() => {doWarframeDetail()})
</script>

<template>
  <div v-if="!isLoading && !hasError && warframe" class="qp-container">
    <qp-header :title="warframe.name" page-type="warframe" />
    <div class="qp-warframes-actions">
      <div class="qp-warframes-actions-extra">
        <el-button-group>
          <el-button v-if="warframe.completion < 100" @click="doWarframeOwn(0, true)"><span v-text="$t('CompleteAll')"></span></el-button>
          <el-button v-else @click="doWarframeUnown(0, true)"><span v-text="$t('RemoveAll')"></span></el-button>
        </el-button-group>
      </div>
    </div>
    <el-row class="qp-warframes-detail">
      <el-col :span="24" :md="14" class="qp-warframes-detail-info">
        <ul v-loading="isLoadingOwning" class="qp-warframes-detail-components-list">
          <li v-for="(component, n) in warframe.components" :key="`warframe-components-${n}`" :class="`qp-warframes-detail-components-item${component.is_owned ? ' qp-isowned' : ''}`" @click="component.is_owned ? doWarframeUnown(component.id) : doWarframeOwn(component.id)">
            <div class="qp-warframes-detail-components-item-wrapper">
              <div class="qp-warframes-detail-components-img">
                <el-image v-if="component.name == 'blueprint'" :src="imgBlueprint" />
                <el-image v-else-if="component.name == 'chassis'" :src="imgChassis" />
                <el-image v-else-if="component.name == 'neuroptics'" :src="imgNeuroptics" />
                <el-image v-else-if="component.name == 'systems'" :src="imgSystems" />
              </div>
              <div>
                <div class="qp-warframe-detail-components-name">
                  <span v-text="$t(component.name)"></span>
                </div>
                <div class="qp-warframe-detail-components-relics">
                  <div>
                    <span v-for="(relic, nn) in sortByEra(component.relics, 'Lith')" :key="`component-relics-${nn}`">
                      <span v-if="nn > 0">, </span>
                      <span v-else class="qp-warframe-detail-components-era">Lith&nbsp;:&nbsp;</span>
                      <span v-text="relic.name"></span>
                    </span>
                  </div>
                  <div>
                    <span v-for="(relic, nn) in sortByEra(component.relics, 'Meso')" :key="`component-relics-${nn}`">
                      <span v-if="nn > 0">, </span>
                      <span v-else class="qp-warframe-detail-components-era">Meso&nbsp;:&nbsp;</span>
                      <span v-text="relic.name"></span>
                    </span>
                  </div>
                  <div>
                    <span v-for="(relic, nn) in sortByEra(component.relics, 'Neo')" :key="`component-relics-${nn}`">
                      <span v-if="nn > 0">, </span>
                      <span v-else class="qp-warframe-detail-components-era">Neo&nbsp;:&nbsp;</span>
                      <span v-text="relic.name"></span>
                    </span>
                  </div>
                  <div>
                    <span v-for="(relic, nn) in sortByEra(component.relics, 'Axi')" :key="`component-relics-${nn}`">
                      <span v-if="nn > 0">, </span>
                      <span v-else class="qp-warframe-detail-components-era">Axi&nbsp;:&nbsp;</span>
                      <span v-text="relic.name"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :span="24" :md="10" class="qp-warframes-detail-picture">
        <div class="qp-warframes-detail-image">
          <div class="qp-warframes-detail-img" :style="`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${warframe.image_name}')`"></div>
        </div>
      </el-col>
    </el-row>
  </div>
  <qp-notfound v-else-if="!isLoading" />
  <qp-loading v-else />
</template>

<style scoped>
.qp-warframes-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px 20px;
}
.qp-warframes-actions-extra {
  text-align: left;
}
/* ===---=== */
.qp-warframes-detail-components-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.qp-warframes-detail-components-item {
  background-color: var(--qp-card-bg);
  border: 1px solid var(--qp-card-bg-light-1);
  box-sizing: border-box;
  list-style: none;
  display: block;
  position: relative;
  padding: 0;
  margin: 0 0 12px 0;
}
.qp-warframes-detail-components-item:hover {
  border-color: var(--qp-card-bg-light-2);
  cursor: pointer;
}
.qp-warframes-detail-components-item-wrapper {
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  min-height: 104px;
  position: relative;
  padding: 0 100px 0 0;
  margin: 0;
}
.qp-warframes-detail-components-item-wrapper::after {
  content: "";
  background-color: var(--qp-primary);
  width: 0;
  height: 3px;
  position: absolute;
  left: 0;
  bottom: 0;
  transition: width 0.3s;
}
.qp-warframes-detail-components-item.qp-isowned .qp-warframes-detail-components-item-wrapper::after,
.qp-warframes-detail-components-item:hover .qp-warframes-detail-components-item-wrapper::after {
  width: 100%;
}
.qp-warframes-detail-components-item.qp-isowned .qp-warframes-detail-components-item-wrapper::before {
  content: "\2713";
  background-color: var(--qp-primary);
  color: #fff;
  font-size: 80px;
  line-height: 100%;
  text-align: right;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
  z-index: 1;
  padding: 12px 12px 0 0;
}
.qp-warframes-detail-components-img {
  flex: 0 0 80px;
  width: 80px;
  height: 80px;
  padding: 12px 12px 0 0;
}
.qp-warframe-detail-components-name {
  color: var(--qp-primary);
  font-size: 16px;
  line-height: 120%;
  text-transform: uppercase;
  padding: 12px 80px 2px 0;
}
.qp-warframe-detail-components-relics {
  padding: 2px 80px 12px 0;
}
.qp-warframe-detail-components-era {
  color: var(--qp-card-color);
}
/* ===---=== */
.qp-warframes-detail-image {
  border-radius: 100%;
  font-size: 0;
  line-height: 0;
  width: 100%;
  max-width: 400px;
  position: relative;
  aspect-ratio: 1/1;
  padding: 0;
  margin: 0 auto;
}
.qp-warframes-detail-img {
  background-color: var(--qp-card-bg-dark-1);
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 100%;
  font-size: 0;
  line-height: 0;
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  position: relative;
  aspect-ratio: 1/1;
  padding: 0;
  margin: 0 auto;
}
@media (max-width: 991px) {
  .qp-warframes-detail-info {
    order: 2;
  }
  .qp-warframes-detail-picture {
    order: 1;
  }
}
</style>
