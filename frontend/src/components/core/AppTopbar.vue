<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { Bell, Message } from "@element-plus/icons-vue";
import { storeUser } from "../../plugins/store";
import { API, HEADERS } from "../../plugins/store/index";

const router = useRouter()

const useStoreUser = storeUser()
const { rat, username, name } = storeToRefs(useStoreUser)

const goToTab = (name: string) => {
    router.push({name:name})
}

const goTo = (obj: any) => {
    router.push(obj)
}
</script>

<template>
    <div id="qp-topbar">
        <div id="qp-topbar-left">
            <el-button text @click="router.push({name:'Home'})">
                <span id="qp-topbar-logo-text">Warframe Void Companion</span>
                <span id="qp-topbar-logo-initial">WVC</span>
            </el-button>
        </div>
        <div id="qp-topbar-center">
            <div id="qp-topbar-topnav">
                <el-tabs v-model="$route.name" stretch @tab-change="goToTab">
                    <el-tab-pane :label="$t('Relics')" name="Home" />
                    <el-tab-pane :label="$t('Warframes')" name="Warframes" />
                    <el-tab-pane :label="$t('Primary')" name="PrimaryWeapons" />
                    <el-tab-pane :label="$t('Secondary')" name="SecondaryWeapons" />
                    <el-tab-pane :label="$t('Melee')" name="MeleeWeapons" />
                </el-tabs>
            </div>
        </div>
        <div v-if="rat" id="qp-topbar-right">
            <div class="qp-topbar-item">
                <el-badge :value="0" :hidden="true">
                    <el-button :icon="Message" round disabled></el-button>
                </el-badge>
            </div>
            <div class="qp-topbar-item">
                <el-badge :value="0" :hidden="true">
                    <el-button :icon="Bell" round disabled></el-button>
                </el-badge>
            </div>
            <div class="qp-topbar-item qp-player">
                <el-dropdown trigger="click" placement="bottom-end" popper-class="qp-topbar-popper" @command="goTo">
                    <el-avatar>
                        <span v-text="name?.charAt(0)"></span>
                    </el-avatar>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item class="qp-dropdown-text" disabled>
                                <div>
                                    <div v-text="$t('SignedInAs')"></div>
                                    <div style="color:var(--qp-primary)" v-text="username"></div>
                                </div>
                            </el-dropdown-item>
                            <el-divider />
                            <el-dropdown-item :command="{name:'Home'}" :disabled="$route.name=='Home'">
                                <span v-text="$t('Relics')"></span>
                            </el-dropdown-item>
                            <el-dropdown-item :command="{name:'Warframes'}" :disabled="$route.name=='Warframes'">
                                <span v-text="$t('Warframes')"></span>
                            </el-dropdown-item>
                            <el-dropdown-item :command="{name:'PrimaryWeapons'}" :disabled="$route.name=='PrimaryWeapons'">
                                <span v-text="$t('PrimaryWeapons')"></span>
                            </el-dropdown-item>
                            <el-dropdown-item :command="{name:'SecondaryWeapons'}" :disabled="$route.name=='SecondaryWeapons'">
                                <span v-text="$t('SecondaryWeapons')"></span>
                            </el-dropdown-item>
                            <el-dropdown-item :command="{name:'MeleeWeapons'}" :disabled="$route.name=='MeleeWeapons'">
                                <span v-text="$t('MeleeWeapons')"></span>
                            </el-dropdown-item>
                            <el-dropdown-item :command="{name:'Archwings'}" :disabled="true">
                                <span v-text="$t('Archwings')"></span>
                            </el-dropdown-item>
                            <el-dropdown-item :command="{name:'Companions'}" :disabled="true">
                                <span v-text="$t('Companions')"></span>
                            </el-dropdown-item>
                            <el-divider />
                            <el-dropdown-item :command="{name:'Settings'}" :disabled="$route.name=='Settings'">
                                <span v-text="$t('Settings')"></span>
                            </el-dropdown-item>
                            <el-divider />
                            <el-dropdown-item :command="{name:'AuthLogout'}" :disabled="$route.name=='AuthLogout'">
                                <span v-text="$t('Logout')"></span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div v-else id="qp-topbar-right">
            <div class="qp-topbar-item">
                <el-button @click="goTo({name:'AuthLogin'})">
                    <el-icon class="mdi mdi-login-variant el-icon--left" />
                    <span v-text="$t('Login')"></span>
                </el-button>
            </div>
            <div class="qp-topbar-item">
                <el-button @click="goTo({name:'AuthRegister'})">
                    <el-icon class="mdi mdi-card-account-details-outline el-icon--left" />
                    <span v-text="$t('Register')"></span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #qp-topbar {
        background-color: var(--qp-topbar-bg);
        font-size: 0;
        line-height: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        grid-row: 2 / 3;
    }
    /* ===--- LEFT ---=== */
    #qp-topbar-left {
        font-size: 16px;
        line-height: 100%;
        display: flex;
        flex: 1 1 35%;
        align-items: center;
        justify-content: flex-start;
        padding: 0 0 0 12px;
    }
    /* ===--- CENTER ---=== */
    #qp-topbar-center {
        flex: 0 1 200px;
    }
    #qp-topbar-topnav {
        max-width: 50vw;
    }
    @media (max-width: 1023px) {
        #qp-topbar-center {
            display: none;
        }
    }
    /* ===--- RIGHT ---=== */
    #qp-topbar-right {
        display: flex;
        flex: 1 1 35%;
        align-items: center;
        justify-content: flex-end;
        padding: 0 12px 0 0;
    }
    .qp-topbar-item {
        padding: 0 16px;
    }
    .qp-topbar-item .el-avatar {
        --el-avatar-size: 32px;
        background-color: var(--qp-primary);
        color: #fff;
        opacity: 0.8;
        transition: opacity 0.3s;
    }
    .qp-topbar-item .el-avatar:hover {
        opacity: 1;
    }
    .qp-topbar-item .el-badge {
        --el-bg-color: var(--qp-topbar-bg);
        --el-badge-font-size: 9px;
        --el-badge-size: 14px;
        --el-badge-padding: 4px;
    }
    .qp-topbar-item .el-button {
        background-color: transparent!important;
        border-color: transparent!important;
        font-size: 16px;
        height: auto;
        padding: 2px 4px;
    }
    .qp-topbar-item .el-button.is-round {
        font-size: 20px;
    }
    .qp-topbar-item .el-dropdown .el-tooltip__trigger {
        cursor: pointer;
    }
</style>
