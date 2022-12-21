<script setup lang="ts">
import { PropType } from "vue";
import type { TypeRelic } from "../../types/warframe";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { API, HEADERS } from "../../plugins/store/index";
import { storeUser } from "../../plugins/store";
import imgBlueprint from "../../assets/img/blueprint.png";
import imgChassis from "../../assets/img/chassis.png";
import imgNeuroptics from "../../assets/img/neuroptics.png";
import imgSystems from "../../assets/img/systems.png";
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

const useStoreUser = storeUser()
const { rat, lang } = storeToRefs(useStoreUser)

const props = defineProps({
  relic: {
    type: Object as PropType<TypeRelic>,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false,
    required: false
  }
})

const emits = defineEmits(["close"])

const isLoadingOwning = ref<boolean>(false)
const hasErrorOwning = ref<string|null>(null)

const doComponentOwn = async (id: Number, component_type: String) => {
  isLoadingOwning.value = true
  hasErrorOwning.value = null
  // ===---
  let data = new FormData()
  data.append("id", id.toString())
  // ===---
  try {
      let f = await fetch(`${API}/me/${component_type}/components/create/`, {
          method: "POST",
          body: data,
          headers: HEADERS(rat.value, lang.value)
      })
      .then((r) => {return r})
      .catch(() => {return new Response(null,{status: 400})})
      if (f.status === 201) {
          ElMessage.success(t("ComponentUpdated"))
          isLoadingOwning.value = false
          emits("close")
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
</script>

<template>
  <div>
    <ul v-if="props.relic?.components" v-loading="isLoadingOwning" class="qp-relics-drawer-components-list">
      <li v-for="(component, n) in props.relic.components" :key="`warframe-components-${n}`" :class="`qp-relics-drawer-components-item${readonly ? ' qp-readonly' : ''}`" @click="!readonly ? doComponentOwn(component.id, component.type) : undefined">
        <div class="qp-relics-drawer-components-item-wrapper">
          <div class="qp-relics-drawer-components-img">
            <el-image v-if="component.component == 'blueprint'" :src="imgBlueprint" />
            <el-image v-else-if="component.component == 'chassis'" :src="imgChassis" />
            <el-image v-else-if="component.component == 'neuroptics'" :src="imgNeuroptics" />
            <el-image v-else-if="component.component == 'systems'" :src="imgSystems" />
            <el-image v-else-if="component.component == 'barrel'" :src="imgBarrel" />
            <el-image v-else-if="component.component == 'blade'" :src="imgBlade" />
            <el-image v-else-if="component.component == 'grip'" :src="imgGrip" />
            <el-image v-else-if="component.component == 'handle'" :src="imgHandle" />
            <el-image v-else-if="component.component == 'lowerlimb'" :src="imgLowerLimb" />
            <el-image v-else-if="component.component == 'receiver'" :src="imgReceiver" />
            <el-image v-else-if="component.component == 'stock'" :src="imgStock" />
            <el-image v-else-if="component.component == 'string'" :src="imgString" />
            <el-image v-else-if="component.component == 'upperlimb'" :src="imgUpperLimb" />
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
</template>

<style scoped>
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
.qp-relics-drawer-components-item:not(.qp-readonly):hover {
  border-color: var(--qp-card-bg-light-2);
  cursor: pointer;
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
.qp-relics-drawer-components-item-wrapper::after {
  content: "";
  background-color: var(--qp-primary);
  width: 0;
  height: 3px;
  position: absolute;
  left: 0;
  bottom: 0;
  transition: width 0.3s;
}
.qp-relics-drawer-components-item:not(.qp-readonly):hover .qp-relics-drawer-components-item-wrapper::after {
  width: 100%;
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
