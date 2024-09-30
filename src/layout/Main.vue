<script setup lang="ts"></script>

<template>
  <h2>Main Layout</h2>
  <div class="button-container">
    <q-btn class="glossy" color="teal" label="Add" :to="{ name: 'Add' }" />
    <q-btn class="glossy" color="teal" label="List" :to="{ name: 'List' }" />
  </div>
  <router-view />
</template>

<style scoped>
.button-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
</style>
