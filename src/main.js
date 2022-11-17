import { createApp } from "vue";
import "v-calendar/dist/style.css";

``;
import "./style.css";
import App from "./App.vue";
import VCalendar from "v-calendar";
import router from "./router/index.js";
import { SetupCalendar } from "v-calendar";

createApp(App).use(SetupCalendar, {}).use(router).mount("#app");
