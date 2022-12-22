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
const { rat, lang, hide_completed_warframes } = storeToRefs(useStoreUser)
const { doUpdateHideCompletedWarframes } = useStoreUser

const isLoading = ref<boolean>(false)
const isLoadingUpdate = ref<boolean>(false)
const hasError = ref<string|null>(null)
  
const weapons_page = ref<number>(1)
const weapons_size = ref<number>(1)
const weapons_total = ref<number>(0)

const listWeaponsOriginal = ref<Array<any>>([])
const listWeapons = ref<Array<any>>([])

const doWeaponsList = async (page: string|null = null, update = true) => {
    if (!update) isLoading.value = true
    else isLoadingUpdate.value = true
    hasError.value = null
    // ===---
    let query = page ? `?page=${page}` : "?page=1"
    // ===---
    try {
        let f = await fetch(`${API}/melee-weapons/${query}`, {
            method: "GET",
            headers: HEADERS(rat.value, lang.value)
        })
        .then((r) => {return r})
        .catch(() => {return new Response(null,{status: 400})})
        if (f.status === 200) {
            let r = await f.json()
            weapons_size.value = r.size
            weapons_total.value = r.count
            listWeaponsOriginal.value = r.results
            listWeapons.value = doFormatWeaponsList(hide_completed_warframes.value)
            isLoading.value = false
            isLoadingUpdate.value = false
        } else {
            throw f.status
        }
    } catch (e) {
        if (e === 401) ElMessage.error("not authorized")
        else ElMessage.error(t("AnErrorOccurred"))
        hasError.value = `${e}`
        isLoading.value = false
        isLoadingUpdate.value = false
    }
}

const doFormatWeaponsList = (hide: Boolean = false) => {
  if (hide) {
    let result = listWeaponsOriginal.value.filter((w) => {
      return w.completion < 100
    })
    return result
  } else {
    return listWeaponsOriginal.value
  }
}

const showCompletedWeapons = () => {
    doUpdateHideCompletedWarframes(false)
    listWeapons.value = doFormatWeaponsList(false)
}

const hideCompletedWeapons = () => {
    doUpdateHideCompletedWarframes(true)
    listWeapons.value = doFormatWeaponsList(true)
}

onMounted(() => {doWeaponsList(null, false)})
</script>

<template>
  <div v-if="!isLoading && !hasError" class="qp-container">
    <qp-header :title="$t('MeleeWeapons')" page-type="weapons" />
    <div class="qp-weapons-actions">
      <el-button-group v-if="rat">
        <el-button v-if="hide_completed_warframes" @click="showCompletedWeapons()"><span v-text="$t('ShowCompleted')"></span></el-button>
        <el-button v-else @click="hideCompletedWeapons()"><span v-text="$t('HideCompleted')"></span></el-button>
      </el-button-group>
    </div>
    <el-row v-if="listWeapons.length" class="qp-weapons-list">
      <TransitionGroup name="list" mode="out-in">
        <el-col v-for="(weapon, n) in listWeapons" :key="`weapons-${n}`" v-loading="isLoadingUpdate" :span="12" :sm="8" :md="6" :lg="4">
          <div class="qp-weapons-item" @click="$router.push({name:'MeleeWeaponsDetail',params:{pk:weapon.id,slug:qpslug(weapon.name)}})">
            <div class="qp-weapons-item-wrapper">
              <div class="qp-weapons-image" :style="`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${weapon.image_name}')`"></div>
              <div class="qp-weapons-name">
                <span v-text="weapon.name"></span>
              </div>
              <div v-if="weapon.completion == 100" class="qp-weapons-complete"></div>
              <div class="qp-weapons-completion">
                <div class="qp-weapons-completed" :style="`width:${weapon.completion}%;`"></div>
              </div>
            </div>
          </div>
        </el-col>
      </TransitionGroup>
      <el-col>
        <el-pagination background hide-on-single-page layout="prev, pager, next" v-model:current-page="weapons_page" :page-size="weapons_size" :total="weapons_total" @current-change="doWeaponsList" />
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col>
        <div class="qp-weapons-allcomplete">
          <el-icon size="132" class="mdi mdi-emoticon-happy-outline" />
          <p v-text="$t('YoucompletedallPrimeSecondaryWeapons')"></p>
        </div>
      </el-col>
    </el-row>
  </div>
  <qp-notfound v-else-if="!isLoading" />
  <qp-loading v-else />
</template>

<style scoped>
.qp-weapons-actions {
  text-align: right;
  padding: 0 20px 12px;
}
/* ===---=== */
.qp-warframe-list {
  font-size: 0;
  line-height: 0;
}
.qp-weapons-item {
  text-align: center;
  list-style: none;
  display: block;
  flex: 0 1 20%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.qp-weapons-item:hover {
  cursor: pointer;
  opacity: 0.8;
}
.qp-weapons-item:active {
  opacity: 0.5;
}
.qp-weapons-item-wrapper {
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

.qp-weapons-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100px;
  flex: 1 1 100px;
  padding: 12px 6px 0;
}

.qp-weapons-name {
  background-color: #f1f1f1;
  color: #010101;
  font-size: 16px;
  line-height: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 6px;
}

.qp-weapons-completion {
  background-color: #767676;
  display: block;
  height: 4px;
  position: relative;
}

.qp-weapons-completed {
  background-color: #3db99b;
  width: 0%;
  height: 4px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

.qp-weapons-complete {
  background-color: #3db99b;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
}

.qp-weapons-complete::after {
  content: "\2713";
  border: 4px solid #fff;
  border-radius: 100%;
  color: #fff;
  font-size: 128px;
  line-height: 100%;
  display: inline-block;
  width: 128px;
  height: 128px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* ===---=== */
.qp-weapons-allcomplete {
  font-size: 24px;
  line-height: 120%;
  text-align: center;
}
</style>
