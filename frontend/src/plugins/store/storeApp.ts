import type { TypeAppStore } from "./types";
import { defineStore } from "pinia";
import { QpInitStore } from "./index";

const initState = {
    "isLoading": false
}

export const QpStoreApp = defineStore("storeApp", {
    state: () => { return QpInitStore("app", initState) as TypeAppStore },
    actions: {
        updateIsLoading (payload: boolean) {
            this.$patch((state) => {
                state.isLoading = payload
            })
        }
    }
})
