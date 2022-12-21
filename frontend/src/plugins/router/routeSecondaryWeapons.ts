export const routeSecondaryWeapons = [
  {
    path: "/secondary-weapons",
    component: () => import("@/views/SecondaryWeaponsView.vue"),
    meta: {
      title: "SecondaryWeapons"
    },
    children: [
        {
            path: "",
            name: "SecondaryWeapons",
            component: () => import("@/views/secondaryweapons/SecondaryWeaponsList.vue")
        },
        {
            path: "/secondary-weapons/:pk-:slug",
            name: "SecondaryWeaponsDetail",
            component: () => import("@/views/secondaryweapons/SecondaryWeaponsDetail.vue")
        }
    ]
  }
]