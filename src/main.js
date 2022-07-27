import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import apolloProvider from "@/constants/apollo.js";
import titleMixin from "@/mixins/titleMixin.js";
import authListener from "@/mixins/loginMixin.js";
import firebaseConfig from "./constants/firebase.js";
import { initializeApp } from "firebase/app";
import loginStore from "@/store/index.js";

initializeApp(firebaseConfig);

createApp({
  extends: App,
  mixins: [titleMixin, authListener],
})
  .use(router)
  .use(apolloProvider)
  .use(loginStore)
  .mount("#app");
