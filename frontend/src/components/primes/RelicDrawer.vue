<script setup lang="ts">
import { PropType } from "vue";
import type { TypeRelic, TypeReward } from "../../types/warframe";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { API, HEADERS } from "../../plugins/store/index";
import { storeUser } from "../../plugins/store";
import QpRelicDrawerItem from "../primes/RelicDrawerItem.vue";

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
          ElMessage.success({
            message: t("ComponentUpdated"),
            showClose: true
          })
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

const not_owned = (relics: Array<TypeReward>|undefined) => {
  return relics?.filter(r => (!r.is_owned))
}
</script>

<template>
  <el-scrollbar height="100%">
    <ul v-if="props.relic" v-loading="isLoadingOwning" class="qp-relics-drawer-components-list">
      <li v-for="(component, n) in not_owned(props.relic.warframe_rewards)" :key="`warframe-components-${n}`" :class="`qp-relics-drawer-components-item${readonly ? ' qp-readonly' : ''}`" @click="!readonly ? doComponentOwn(component.component.id, 'warframes') : undefined">
        <QpRelicDrawerItem :component="component" />
      </li>
      <li v-for="(component, n) in not_owned(props.relic.primaryweapon_rewards)" :key="`primaryweapon-components-${n}`" :class="`qp-relics-drawer-components-item${readonly ? ' qp-readonly' : ''}`" @click="!readonly ? doComponentOwn(component.component.id, 'primary-weapons') : undefined">
        <QpRelicDrawerItem :component="component" />
      </li>
      <li v-for="(component, n) in not_owned(props.relic.secondaryweapon_rewards)" :key="`secondaryweapon-components-${n}`" :class="`qp-relics-drawer-components-item${readonly ? ' qp-readonly' : ''}`" @click="!readonly ? doComponentOwn(component.component.id, 'secondary-weapons') : undefined">
        <QpRelicDrawerItem :component="component" />
      </li>
      <li v-for="(component, n) in not_owned(props.relic.meleeweapon_rewards)" :key="`meleeweapon-components-${n}`" :class="`qp-relics-drawer-components-item${readonly ? ' qp-readonly' : ''}`" @click="!readonly ? doComponentOwn(component.component.id, 'melee-weapons') : undefined">
        <QpRelicDrawerItem :component="component" />
      </li>
    </ul>
  </el-scrollbar>
</template>

<style scoped>
.qp-relics-drawer-components-list {
  list-style: none;
  padding-top: 0;
  padding-left: 0;
  padding-right: var(--el-drawer-padding-primary);
  padding-bottom: var(--el-drawer-padding-primary);
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
