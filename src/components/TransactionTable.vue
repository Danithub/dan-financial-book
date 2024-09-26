<template>
  <div class="transaction-table">
    <h2>{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th>날짜</th>
          <th>금액</th>
          <th>카테고리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.category }}</td>
        </tr>
        <tr v-if="isAddingNewRow">
          <td><input v-model="newTransaction.date" type="date" /></td>
          <td>
            <input
              v-model="newTransaction.amount"
              type="number"
              placeholder="금액"
            />
          </td>
          <td>
            <input
              v-model="newTransaction.category"
              type="text"
              placeholder="카테고리"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <button v-if="!isAddingNewRow" @click="startAdding" class="add-btn">
      + 추가
    </button>
    <button v-else @click="saveTransaction" class="save-btn">저장</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

interface Transaction {
  id: number
  date: string
  amount: number
  category: string
}

const props = defineProps<{ title: string }>()

// 거래 목록 상태
const transactions = ref<Transaction[]>([
  { id: 1, date: "2024-09-25", amount: 15000, category: "식비" },
  { id: 2, date: "2024-09-24", amount: 45000, category: "교통비" },
  { id: 3, date: "2024-09-23", amount: 10000, category: "기타" },
])

// 새로운 행 추가 상태
const isAddingNewRow = ref(false)

// 새로운 거래 입력값을 위한 ref
const newTransaction = ref<Transaction>({
  id: 0,
  date: "",
  amount: 0,
  category: "",
})

// 새로운 행 추가 시작
const startAdding = () => {
  isAddingNewRow.value = true
  newTransaction.value = { id: 0, date: "", amount: 0, category: "" }
}

// 새로운 거래 저장
const saveTransaction = () => {
  if (
    newTransaction.value.date &&
    newTransaction.value.amount &&
    newTransaction.value.category
  ) {
    transactions.value.push({
      id: transactions.value.length + 1,
      date: newTransaction.value.date,
      amount: newTransaction.value.amount,
      category: newTransaction.value.category,
    })
    isAddingNewRow.value = false // 추가 완료 후 다시 + 버튼으로 돌아감
  } else {
    alert("모든 항목을 입력해주세요.")
  }
}
</script>

<style scoped>
.transaction-table {
  background-color: white;
  padding: 20px;
  width: 48%;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #ffcc00;
}

tbody tr:nth-child(even) {
  background-color: #f1f1f1;
}

.add-btn,
.save-btn {
  margin-top: 10px;
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}
</style>
