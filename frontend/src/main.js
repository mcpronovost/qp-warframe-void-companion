import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./plugins/i18n";
import router from "./plugins/router";
import store from "./plugins/store";
import ElementPlus from "element-plus";
import fr from "element-plus/es/locale/lang/fr";
import "element-plus/dist/index.css";
import "@mdi/font/css/materialdesignicons.min.css";
import "@/assets/css/fonts.css";
import "@/assets/css/element.css";
import "@/assets/css/default.css";

import QpPage from "@/components/BasePage.vue";
import QpHeader from "@/components/BaseHeader.vue";
import QpLoading from "@/components/BaseLoading.vue";
import QpNotFound from "@/components/BaseResultNotFound.vue";
import QpUnderConstruction from "@/components/BaseResultUnderConstruction.vue";

const app = createApp(App);

app.component("QpPage", QpPage);
app.component("QpHeader", QpHeader);
app.component("QpLoading", QpLoading);
app.component("QpNotfound", QpNotFound);
app.component("QpUnderconstruction", QpUnderConstruction);

app.use(i18n);
app.use(router);
app.use(store);
app.use(ElementPlus, {
  locale: fr,
});

app.mount("#app");
