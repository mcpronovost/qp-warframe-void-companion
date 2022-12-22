<script setup lang="ts">
import { PropType } from "vue";
import type { TypeReward } from "../../types/warframe";
import QpWeaponImage from "../primes/WeaponImage.vue";

const props = defineProps({
  component: {
    type: Object as PropType<TypeReward>,
    required: true
  }
})

</script>

<template>
  <div class="qp-relics-drawer-components-item-wrapper">
    <div class="qp-relics-drawer-components-img">
      <QpWeaponImage :component="component.component.name" />
    </div>
    <div>
      <div class="qp-relics-drawer-components-name">
        <span v-text="component.component.fullname"></span>
      </div>
      <div class="qp-relics-drawer-rarities">
        <span v-if="component.percent < 0.10" class="qp-relics-drawer-rarities-gold"></span>
        <span v-else-if="component.percent > 0.09 && component.percent < 0.20" class="qp-relics-drawer-rarities-silver"></span>
        <span v-else-if="component.percent > 0.19" class="qp-relics-drawer-rarities-bronze"></span>
      </div>
    </div>
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
