<script setup lang="ts">
import type { TypeRelic, TypeWeapon } from "../../types/warframe";
import { computed, reactive, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { API, HEADERS } from "../../plugins/store/index";
import { storeUser } from "../../plugins/store";
import imgBlueprint from "../../assets/img/blueprint.png";
import imgBarrel from "../../assets/img/prime_barrel.png";
import imgBlade from "../../assets/img/prime_blade.png";
import imgGrip from "../../assets/img/prime_grip.png";
import imgHandle from "../../assets/img/prime_handle.png";
import imgLowerLimb from "../../assets/img/prime_lowerlimb.png";
import imgReceiver from "../../assets/img/prime_receiver.png";
import imgStock from "../../assets/img/prime_stock.png";
import imgString from "../../assets/img/prime_string.png";
import imgUpperLimb from "../../assets/img/prime_upperlimb.png";

const { t } = useI18n()

const route = useRoute()

const useStoreUser = storeUser()
const { rat, lang, id } = storeToRefs(useStoreUser)

const isLoading = ref<boolean>(false)
const isLoadingOwning = ref<boolean>(false)
const hasError = ref<string|null>(null)
const hasErrorOwning = ref<string|null>(null)

const weapon = ref<TypeWeapon>()

const doWeaponDetail = async (update = false) => {
    if (!update) isLoading.value = true
    hasError.value = null
    // ===---
    try {
        let f = await fetch(`${API}/primary-weapons/${route.params.pk}/`, {
            method: "GET",
            headers: HEADERS(rat.value, lang.value)
        })
        .then((r) => {return r})
        .catch(() => {return new Response(null,{status: 400})})
        if (f.status === 200) {
            let r = await f.json()
            weapon.value = r
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

const doWeaponOwn = async (id: Number, doall: Boolean = false) => {
  isLoadingOwning.value = true
  hasErrorOwning.value = null
  // ===---
  let data = new FormData()
  if (weapon.value && doall) {
    data.append("id", weapon.value.components.map(c => c.id.toString()).join(","))
  } else {
    data.append("id", id.toString())
  }
  // ===---
  try {
      let f = await fetch(`${API}/me/primary-weapons/components/create/`, {
          method: "POST",
          body: data,
          headers: HEADERS(rat.value, lang.value)
      })
      .then((r) => {return r})
      .catch(() => {return new Response(null,{status: 400})})
      if (f.status === 201) {
          ElMessage.success(t("ComponentUpdated"))
          isLoadingOwning.value = false
          doWeaponDetail(true)
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

const doWeaponUnown = async (id: Number, doall: Boolean = false) => {
  isLoadingOwning.value = true
  hasErrorOwning.value = null
  // ===---
  let data = new FormData()
  if (weapon.value && doall) {
    data.append("ids", weapon.value.components.map(c => c.id.toString()).join(","))
  }
  // ===---
  try {
      let f = await fetch(`${API}/me/primary-weapons/components/${id}/delete/`, {
          method: "DELETE",
          body: data,
          headers: HEADERS(rat.value, lang.value)
      })
      .then((r) => {return r})
      .catch(() => {return new Response(null,{status: 400})})
      if (f.status === 204) {
          ElMessage.success(t("ComponentUpdated"))
          isLoadingOwning.value = false
          doWeaponDetail(true)
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

onMounted(() => {doWeaponDetail()})
</script>

<template>
  <div v-if="!isLoading && !hasError && weapon" class="qp-container">
    <qp-header :title="weapon.name" page-type="weapon" />
    <div class="qp-weapons-actions">
      <div class="qp-weapons-actions-extra">
        <el-button-group>
          <el-button v-if="weapon.completion < 100" @click="doWeaponOwn(0, true)"><span v-text="$t('CompleteAll')"></span></el-button>
          <el-button v-else @click="doWeaponUnown(0, true)"><span v-text="$t('RemoveAll')"></span></el-button>
        </el-button-group>
      </div>
    </div>
    <el-row class="qp-weapons-detail">
      <el-col :span="24" :md="14" class="qp-weapons-detail-info">
        <ul v-loading="isLoadingOwning" class="qp-weapons-detail-components-list">
          <li v-for="(component, n) in weapon.components" :key="`weapon-components-${n}`" :class="`qp-weapons-detail-components-item${component.is_owned ? ' qp-isowned' : ''}`" @click="component.is_owned ? doWeaponUnown(component.id) : doWeaponOwn(component.id)">
            <div class="qp-weapons-detail-components-item-wrapper">
              <div class="qp-weapons-detail-components-img">
                <el-image v-if="component.name == 'blueprint'" :src="imgBlueprint" />
                <el-image v-else-if="component.name == 'barrel'" :src="imgBarrel" />
                <el-image v-else-if="component.name == 'blade'" :src="imgBlade" />
                <el-image v-else-if="component.name == 'grip'" :src="imgGrip" />
                <el-image v-else-if="component.name == 'handle'" :src="imgHandle" />
                <el-image v-else-if="component.name == 'lowerlimb'" :src="imgLowerLimb" />
                <el-image v-else-if="component.name == 'receiver'" :src="imgReceiver" />
                <el-image v-else-if="component.name == 'stock'" :src="imgStock" />
                <el-image v-else-if="component.name == 'string'" :src="imgString" />
                <el-image v-else-if="component.name == 'upperlimb'" :src="imgUpperLimb" />
              </div>
              <div>
                <div class="qp-weapons-detail-components-name">
                  <span v-text="$t(component.name)"></span>
                </div>
                <div class="qp-weapons-detail-components-relics">
                  <div>
                    <span v-for="(relic, nn) in sortByEra(component.relics, 'Lith')" :key="`component-relics-${nn}`">
                      <span v-if="nn > 0">, </span>
                      <span v-else class="qp-weapons-detail-components-era">Lith&nbsp;:&nbsp;</span>
                      <span v-text="relic.name"></span>
                    </span>
                  </div>
                  <div>
                    <span v-for="(relic, nn) in sortByEra(component.relics, 'Meso')" :key="`component-relics-${nn}`">
                      <span v-if="nn > 0">, </span>
                      <span v-else class="qp-weapons-detail-components-era">Meso&nbsp;:&nbsp;</span>
                      <span v-text="relic.name"></span>
                    </span>
                  </div>
                  <div>
                    <span v-for="(relic, nn) in sortByEra(component.relics, 'Neo')" :key="`component-relics-${nn}`">
                      <span v-if="nn > 0">, </span>
                      <span v-else class="qp-weapons-detail-components-era">Neo&nbsp;:&nbsp;</span>
                      <span v-text="relic.name"></span>
                    </span>
                  </div>
                  <div>
                    <span v-for="(relic, nn) in sortByEra(component.relics, 'Axi')" :key="`component-relics-${nn}`">
                      <span v-if="nn > 0">, </span>
                      <span v-else class="qp-weapons-detail-components-era">Axi&nbsp;:&nbsp;</span>
                      <span v-text="relic.name"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :span="24" :md="10" class="qp-weapons-detail-picture">
        <div class="qp-weapons-detail-image">
          <div class="qp-weapons-detail-img" :style="`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${weapon.image_name}')`"></div>
        </div>
      </el-col>
    </el-row>
  </div>
  <qp-notfound v-else-if="!isLoading" />
  <qp-loading v-else />
</template>

<style scoped>
.qp-weapons-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px 20px;
}
.qp-weapons-actions-extra {
  text-align: left;
}
/* ===---=== */
.qp-weapons-detail-components-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.qp-weapons-detail-components-item {
  background-color: var(--qp-card-bg);
  border: 1px solid var(--qp-card-bg-light-1);
  box-sizing: border-box;
  list-style: none;
  display: block;
  position: relative;
  padding: 0;
  margin: 0 0 12px 0;
}
.qp-weapons-detail-components-item:hover {
  border-color: var(--qp-card-bg-light-2);
  cursor: pointer;
}
.qp-weapons-detail-components-item-wrapper {
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
.qp-weapons-detail-components-item-wrapper::after {
  content: "";
  background-color: var(--qp-primary);
  width: 0;
  height: 3px;
  position: absolute;
  left: 0;
  bottom: 0;
  transition: width 0.3s;
}
.qp-weapons-detail-components-item.qp-isowned .qp-weapons-detail-components-item-wrapper::after,
.qp-weapons-detail-components-item:hover .qp-weapons-detail-components-item-wrapper::after {
  width: 100%;
}
.qp-weapons-detail-components-item.qp-isowned .qp-weapons-detail-components-item-wrapper::before {
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
.qp-weapons-detail-components-img {
  flex: 0 0 80px;
  width: 80px;
  height: 80px;
  padding: 12px 12px 0 0;
}
.qp-weapons-detail-components-name {
  color: var(--qp-primary);
  font-size: 16px;
  line-height: 120%;
  text-transform: uppercase;
  padding: 12px 80px 2px 0;
}
.qp-weapons-detail-components-relics {
  padding: 2px 80px 12px 0;
}
.qp-weapons-detail-components-era {
  color: var(--qp-card-color);
}
/* ===---=== */
.qp-weapons-detail-image {
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
.qp-weapons-detail-img {
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
  .qp-weapons-detail-info {
    order: 2;
  }
  .qp-weapons-detail-picture {
    order: 1;
  }
}
</style>
