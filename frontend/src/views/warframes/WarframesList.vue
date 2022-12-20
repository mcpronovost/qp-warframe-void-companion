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
    <qp-header :title="$t('Warframes')" page-type="warframes" />
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

<style scoped>
.qp-warframes-list {
  font-size: 0;
  line-height: 0;
}
.qp-warframes-item {
  text-align: center;
  list-style: none;
  display: block;
  flex: 0 1 20%;
  padding: 0;
  margin: 0;
}
.qp-warframes-item:hover {
  cursor: pointer;
  opacity: 0.8;
}
.qp-warframes-item:active {
  opacity: 0.5;
}
.qp-warframes-item-wrapper {
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

.qp-warframes-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100px;
  flex: 1 1 100px;
  padding: 12px 6px 0;
}

.qp-warframes-name {
  background-color: #f1f1f1;
  color: #010101;
  font-size: 16px;
  line-height: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 6px;
}

.qp-warframe-completion {
  background-color: #767676;
  display: block;
  height: 4px;
  position: relative;
}

.qp-warframe-completed {
  background-color: #3db99b;
  width: 0%;
  height: 4px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

.qp-warframe-complete {
  background-color: #3db99b;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
}

.qp-warframe-complete::after {
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
</style>
