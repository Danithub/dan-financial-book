<script lang="ts" setup>
import { ref, computed } from "vue"

// Props 정의
defineProps({
  day: {
    type: String,
    required: true,
  },
  isHoliday: {
    type: Boolean,
    default: false,
  },
  holidayLabel: {
    type: String,
    default: "",
  },
  income: {
    type: Number,
    default: 0,
  },
  expense: {
    type: Number,
    default: 0,
  },
  transfer: {
    type: Number,
    default: 0,
  },
})

// 포맷팅 함수
const formatAmount = (amount: number, prefix: string) => {
  const formatted = amount.toLocaleString("ko-KR")
  return amount === 0 ? "0원" : `${prefix}${formatted}원`
}
</script>

<template>
  <div class="day-box">
    <div class="day-header">
      <span class="date">{{ day }}</span>
      <span v-if="isHoliday" class="holiday-label">{{ holidayLabel }}</span>
    </div>
    <div class="day-footer">
      <div class="transaction">
        <div class="income">{{ formatAmount(income, "+") }}</div>
        <div class="expense">{{ formatAmount(expense, "-") }}</div>
        <div class="transfer">{{ formatAmount(transfer, "+") }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.day-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
  /* width: 140px;
  height: 120px; */
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: #fff;
}

.day-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 12px;
}

.date {
  font-size: 14px;
  font-weight: bold;
}

.holiday-label {
  font-size: 9px;
  color: red;
  border: 1px solid pink;
  border-radius: 12px;
  padding: 2px 6px;
  background-color: #ffe6e6;
  margin-left: 10px;
}

.day-footer {
  margin-top: auto;
  font-size: 12px;
  color: #666;
}

.transaction {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.transaction div {
  margin: 2px 0;
}

.income {
  color: green;
}

.expense {
  color: red;
}

.transfer {
  color: blue;
}
</style>
