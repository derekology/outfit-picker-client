<template>
  <div>
    <div id="wrapper">
      <Navigation />
      <router-view />
    </div>
    <Copyright />
  </div>
</template>

<script>
import Navigation from "@/components/nav-menu.vue";
import Copyright from "@/components/site-footer.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Copyright,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,200;0,500;0,700;1,200;1,500;1,700&display=swap");

body {
  margin: 0;
}

#wrapper {
  min-height: calc(100vh - 75px);
  position: relative;
  margin-bottom: 40px;
}

#app {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main {
  padding-bottom: 40px;
  padding: 10px;
}

a {
  color: #dd3333;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  background-color: #222222;
  border: 0;
  color: #ffffff;
  text-transform: uppercase;
  padding: 15px;
  font-size: 16px;
  letter-spacing: 1px;
}

button:hover {
  background-color: #dd3333;
  transition-duration: 0.2s;
}

.x-overflow {
  overflow-x: auto;
}

.fakeLink {
  cursor: pointer;
}

.icon-btn {
  filter: saturate(0.6) brightness(0.8);
}

.icon-btn:hover {
  filter: saturate(1) brightness(1);
  transition-duration: 0.1s;
}
</style>
