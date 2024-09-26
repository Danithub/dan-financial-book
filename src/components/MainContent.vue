<template>
  <div class="main-content">
    <div class="summary">
      <div class="balance">현재 잔액: ₩1,200,000</div>
      <button class="add-transaction">+ 추가</button>
    </div>

    <div class="transaction-lists">
      <TransactionTable title="지출" />
      <TransactionTable title="수입" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import TransactionTable from "./TransactionTable.vue"

export default defineComponent({
  components: {
    TransactionTable,
  },
})
</script>

<style scoped>
.main-content {
  padding: 20px;
  flex: 1;
  background-color: #f9f9f9;
}

.summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.balance {
  font-size: 20px;
}

.add-transaction {
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.transaction-lists {
  display: flex;
  justify-content: space-between;
}
</style>
