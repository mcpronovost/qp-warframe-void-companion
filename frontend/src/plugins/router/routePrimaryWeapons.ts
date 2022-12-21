export const routePrimaryWeapons = [
  {
    path: "/primary-weapons",
    component: () => import("@/views/PrimaryWeaponsView.vue"),
    meta: {
      title: "PrimaryWeapons"
    },
    children: [
        {
            path: "",
            name: "PrimaryWeapons",
            component: () => import("@/views/primaryweapons/PrimaryWeaponsList.vue")
        },
        {
            path: "/primary-weapons/:pk-:slug",
            name: "PrimaryWeaponsDetail",
            component: () => import("@/views/primaryweapons/PrimaryWeaponsDetail.vue")
        }
    ]
  }
]