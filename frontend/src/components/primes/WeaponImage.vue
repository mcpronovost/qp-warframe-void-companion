<script setup lang="ts">
import imgBlueprint from "../../assets/img/blueprint.png";
import imgBarrel from "../../assets/img/prime_barrel.png";
import imgBlade from "../../assets/img/prime_blade.png";
import imgGrip from "../../assets/img/prime_grip.png";
import imgHandle from "../../assets/img/prime_handle.png";
import imgLink from "../../assets/img/prime_link.png";
import imgLowerLimb from "../../assets/img/prime_lowerlimb.png";
import imgPouch from "../../assets/img/prime_pouch.png";
import imgReceiver from "../../assets/img/prime_receiver.png";
import imgStars from "../../assets/img/prime_stars.png";
import imgStock from "../../assets/img/prime_stock.png";
import imgString from "../../assets/img/prime_string.png";
import imgUpperLimb from "../../assets/img/prime_upperlimb.png";

const props = defineProps({
  component: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div>
    <el-image v-if="props.component == 'blueprint'" :src="imgBlueprint" />
    <el-image v-else-if="props.component == 'barrel'" :src="imgBarrel" />
    <el-image v-else-if="props.component == 'blade'" :src="imgBlade" />
    <el-image v-else-if="props.component == 'grip'" :src="imgGrip" />
    <el-image v-else-if="props.component == 'handle'" :src="imgHandle" />
    <el-image v-else-if="props.component == 'link'" :src="imgLink" />
    <el-image v-else-if="props.component == 'lowerlimb'" :src="imgLowerLimb" />
    <el-image v-else-if="props.component == 'pouch'" :src="imgPouch" />
    <el-image v-else-if="props.component == 'receiver'" :src="imgReceiver" />
    <el-image v-else-if="props.component == 'stars'" :src="imgStars" />
    <el-image v-else-if="props.component == 'stock'" :src="imgStock" />
    <el-image v-else-if="props.component == 'string'" :src="imgString" />
    <el-image v-else-if="props.component == 'upperlimb'" :src="imgUpperLimb" />
  </div>
</template>
