<template>
  <header class="header">
    <div class="logo">가계부</div>
    <div class="user-actions">
      <button class="settings">⚙️</button>
      <img class="profile-pic" src="/profile.jpg" alt="Profile" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({})
</script>

<style scoped>
.header {
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.user-actions {
  display: flex;
  align-items: center;
}

.settings {
  background: none;
  border: none;
  font-size: 20px;
  margin-right: 10px;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
