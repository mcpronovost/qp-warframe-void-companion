<script setup lang="ts">
import type { TypeRelic } from "../../types/warframe";
import { PropType } from "vue";
import imgRelicLith from "../../assets/img/relic_lith.png";
import imgRelicMeso from "../../assets/img/relic_meso.png";
import imgRelicNeo from "../../assets/img/relic_neo.png";
import imgRelicAxi from "../../assets/img/relic_axi.png";

const props = defineProps({
  relic: {
    type: Object as PropType<TypeRelic>,
    required: true
  }
})

const has_rarity = (relic: TypeRelic, has_type: "gold"|"silver"|"bronze") => {
  const is_ok = (r: any) => {
    if (has_type == "gold" && r.is_owned === false && r.percent < 0.10) return true
    if (has_type == "silver" && r.is_owned === false && r.percent < 0.20 && r.percent > 0.09) return true
    if (has_type == "bronze" && r.is_owned === false && r.percent > 0.19) return true
    return false
  }
  if (relic.warframe_rewards?.some(r => is_ok(r))) return true
  if (relic.primaryweapon_rewards?.some(r => is_ok(r))) return true
  if (relic.secondaryweapon_rewards?.some(r => is_ok(r))) return true
  if (relic.meleeweapon_rewards?.some(r => is_ok(r))) return true
  return false
}
</script>

<template>
  <div class="qp-relics-item">
    <div class="qp-relics-item-wrapper">
      <div class="qp-relics-image">
        <Transition>
          <el-image v-if="props.relic.era == 'Lith'" :src="imgRelicLith" />
          <el-image v-else-if="props.relic.era == 'Meso'" :src="imgRelicMeso" />
          <el-image v-else-if="props.relic.era == 'Neo'" :src="imgRelicNeo" />
          <el-image v-else-if="props.relic.era == 'Axi'" :src="imgRelicAxi" />
        </Transition>
      </div>
      <div class="qp-relics-name">
        <span v-text="`${props.relic.era} ${props.relic.name}`"></span>
      </div>
      <div v-if="props.relic.components?.length > 1" class="qp-relics-components-count">
        <span v-text="`x${props.relic.components.length}`"></span>
      </div>
      <div class="qp-relics-rarities">
        <span v-if="has_rarity(props.relic, 'gold')" class="qp-relics-rarities-gold"></span>
        <span v-if="has_rarity(props.relic, 'silver')" class="qp-relics-rarities-silver"></span>
        <span v-if="has_rarity(props.relic, 'bronze')" class="qp-relics-rarities-bronze"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
