<template>
  <nav class="sidebar">
    <ul>
      <li><button>🏠 홈</button></li>
      <li><button>📄 거래 내역</button></li>
      <li><button>📊 통계</button></li>
      <li><button>⚙️ 설정</button></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({})
</script>

<style scoped>
.sidebar {
  background-color: #fff9db;
  padding: 20px;
  width: 200px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

button {
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
