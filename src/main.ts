import { createApp } from "vue"
import { Quasar } from "quasar"
import "./style.css"
import App from "./App.vue"
import { router } from "@/routes/index"

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css"

// Import Quasar css
import "quasar/src/css/index.sass"

const myApp = createApp(App)
myApp.use(router)
myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app")
