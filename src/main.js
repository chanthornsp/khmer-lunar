import { createApp } from 'vue'
import 'v-calendar/dist/style.css'; ``
import './style.css'
import App from './App.vue'
import VCalendar from 'v-calendar';
import { SetupCalendar } from 'v-calendar';
createApp(App)
    .use(SetupCalendar, {})
    .mount('#app')
