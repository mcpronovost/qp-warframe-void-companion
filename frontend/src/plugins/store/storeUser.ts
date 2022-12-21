import type { TypeUserStore } from "./types";
import { defineStore } from "pinia";
import { API, HEADERS, QpInitStore } from "./index";
import i18n from "../i18n";

const initState: TypeUserStore = {
    "rat": null,
    "id": null,
    "username": null,
    "email": null,
    "name": null,
    "slug": null,
    "lang": "fr",
    "tz": "America/Toronto",
    "last": new Date().getTime(),
    "is_completed": false,
    "hide_completed_warframes": false
}

export const QpStoreUser = defineStore("storeUser", {
    state: () => { return QpInitStore("user", initState) as TypeUserStore },
    actions: {
        updateRat (payload: string|null) {
            this.$patch((state) => {
                state.rat = payload
            })
        },
        updateLang (payload: string) {
            this.$patch((state) => {
                state.lang = payload
                document.documentElement.setAttribute("lang", payload)
                i18n.global.locale.value = payload
            })
        },
        updateTimezone (payload: string) {
            this.$patch((state) => {
                state.tz = payload
            })
        },
        updateLast () {
            this.$patch((state) => {
                state.last = new Date().getTime()
            })
        },
        updateUser (payload: any) {
            this.$patch((state) => {
                state.id = payload.id
                state.username = payload.username
                state.email = payload.email
                state.name = payload.name
                state.slug = payload.slug
                state.is_completed = payload.is_completed
                state.hide_completed_warframes = payload.hide_completed_warframes
            })
            this.updateLang(payload.lang)
            this.updateTimezone(payload.timezone)
            this.updateLast()
        },
        cleanUser () {
            Object.assign(this, initState)
            this.doUpdateUser()
        },
        async doUpdateHideCompletedWarframes (payload: boolean) {
            if (this.rat) {
                let data = new FormData()
                data.append("hide_completed_warframes", payload.toString())
                // ===---
                let f = await fetch(`${API}/me/`, {
                    method: "PATCH",
                    body: data,
                    headers: HEADERS(this.rat, this.lang)
                })
                if (f?.status === 200) {
                    let r = await f.json()
                    this.updateUser(r)
                    return r
                } else if (f?.status === 401) {
                    this.cleanUser()
                }
            }
        },
        async doUpdateUser () {
            if (this.rat) {
                let f = await fetch(`${API}/me/`, {
                    method: "GET",
                    headers: HEADERS(this.rat, this.lang)
                })
                if (f?.status === 200) {
                    let r = await f.json()
                    this.updateUser(r)
                    return r
                } else if (f?.status === 401) {
                    this.cleanUser()
                }
            }
        }
    }
})
