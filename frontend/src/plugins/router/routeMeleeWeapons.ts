export const routeMeleeWeapons = [
  {
    path: "/melee-weapons",
    component: () => import("@/views/MeleeWeaponsView.vue"),
    meta: {
      title: "MeleeWeapons"
    },
    children: [
        {
            path: "",
            name: "MeleeWeapons",
            component: () => import("@/views/meleeweapons/MeleeWeaponsList.vue")
        },
        {
            path: "/melee-weapons/:pk-:slug",
            name: "MeleeWeaponsDetail",
            component: () => import("@/views/meleeweapons/MeleeWeaponsDetail.vue")
        }
    ]
  }
]