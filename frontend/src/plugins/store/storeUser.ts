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
        updateHideCompletedWarframes (payload: boolean) {
            this.$patch((state) => {
                state.hide_completed_warframes = payload
            })
        },
        cleanUser () {
            Object.assign(this, initState)
            this.updateUser()
        },
        async updateUser () {
            if (this.rat) {
                let f = await fetch(`${API}/me/`, {
                    method: "GET",
                    headers: HEADERS(this.rat, this.lang)
                })
                if (f?.status === 200) {
                    let r = await f.json()
                    this.$patch((state) => {
                        state.id = r.id
                        state.username = r.username
                        state.email = r.email
                        state.name = r.name
                        state.slug = r.slug
                        state.is_completed = r.is_completed
                        state.hide_completed_warframes = true
                    })
                    this.updateLang(r.lang)
                    this.updateTimezone(r.timezone)
                    this.updateLast()
                    return r
                } else if (f?.status === 401) {
                    this.cleanUser()
                }
            }
        }
    }
})
