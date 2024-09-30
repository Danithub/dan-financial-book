<template>
  <div id="app">
    <Header />
    <div class="container">
      <Sidebar />
      <MainContent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Header from "./components/Header.vue"
import Sidebar from "./components/Sidebar.vue"
import MainContent from "./components/MainContent.vue"

export default defineComponent({
  components: {
    Header,
    Sidebar,
    MainContent,
  },
})
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.container {
  display: flex;
  flex: 1;
}
</style>
