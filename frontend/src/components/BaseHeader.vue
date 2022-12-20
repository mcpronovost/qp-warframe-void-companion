<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    pageType: {
        type: String,
        required: false
    }
})
</script>

<template>
    <el-row>
        <el-col>
            <header class="qp-header">
                <h1 class="qp-header-title">
                    <span v-text="props.title"></span>
                </h1>
                <div v-if="props.content" class="qp-header-content">
                    <p v-text="props.content"></p>
                </div>
                <hr class="qp-header-divider" />
            </header>
        </el-col>
    </el-row>
</template>

<style scoped>
.qp-header {
    padding: 20px 0 0;
    margin: 0;
}
h1.qp-header-title {
    font-size: 48px;
    line-height: 120%;
}
.qp-header-title {
    font-family: "Nunito", sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    padding: 0;
    margin: 0 0 24px;
}
.qp-header-divider {
    background-color: var(--qp-primary);
    border: none;
    display: block;
    width: 72px;
    height: 2px;
    padding: 0;
    margin: 20px 2px;
}
@media (max-width: 767px) {
    h1.qp-header-title {
        font-size: 32px;
        line-height: 120%;
    }
}
</style>
