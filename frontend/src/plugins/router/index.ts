import type { RouteRecordRaw } from "vue-router";
import type { TypeRouteMeta } from "./types";
import { createRouter, createWebHistory } from "vue-router";
import { storeApp, storeUser } from "../store";
import i18n from "../i18n";

import { routeAuth } from "./routeAuth";
import { routeWarframes } from "./routeWarframes";

const { t } = i18n.global;

const APPNAME = "Warframe Void Companion"
const APPDESC = "ManageyourWarframerelicsandmore"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: "/u/:slug",
    name: "User",
    component: () => import("@/views/UserView.vue")
  },
  ...routeAuth,
  ...routeWarframes,
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: {
      title: "Profile"
    }
  },
  /* ===--- FALLBACK ---=== */
  {
    path: "/:catchAll(.*)",
    name: "Error",
    component: () => import("@/views/ErrorView.vue"),
    meta: {
      title: "Error"
    }
  }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes as RouteRecordRaw[]
})

const setMeta = (meta: TypeRouteMeta) => {
  if (meta.title) {
    document.title = `${t(meta.title)} - ${APPNAME}`
  } else  {
    document.title = APPNAME
  }
  if (meta.desc) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.desc)
  } else {
    document.querySelector('meta[name="description"]')?.setAttribute("content", t(APPDESC))
  }
}

router.beforeEach((to, from, next) => {
    const useStoreApp = storeApp()
    const { updateIsLoading } = useStoreApp
    const useStoreUser = storeUser()
    const { updateUser } = useStoreUser
    updateIsLoading(true)
    updateUser()
    next()
})

router.afterEach((to, from, next) => {
    const useStoreApp = storeApp()
    const { updateIsLoading } = useStoreApp
    setMeta(to.meta)
    updateIsLoading(false)
})

export default router
