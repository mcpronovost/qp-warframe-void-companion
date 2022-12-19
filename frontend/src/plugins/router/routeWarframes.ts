export const routeWarframes = [
  {
    path: "/warframes",
    component: () => import("@/views/WarframesView.vue"),
    meta: {
      title: "Warframes"
    },
    children: [
        {
            path: "",
            name: "Warframes",
            component: () => import("@/views/warframes/WarframesList.vue")
        },
        {
            path: "/warframes/:pk-:slug",
            name: "WarframesDetail",
            component: () => import("@/views/warframes/WarframesDetail.vue")
        }
    ]
  }
]