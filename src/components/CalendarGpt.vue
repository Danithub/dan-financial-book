<script setup lang="ts">
import { ref, onMounted } from "vue"
import Day from "@/components/calendar-gpt/Day.vue"

/*************
 * Interface *
 ************/
// 예제 데이터: 공휴일과 가계부 정보
interface Holiday {
  date: Number
  label: String
}
interface Income {
  date: Number
  amount: Number
}
interface Expense {
  date: Number
  amount: Number
}
interface Transfer {
  date: Number
  amount: Number
}

/*************
 * Variables *
 ************/
// 요일 정의
const weekdays = ["일", "월", "화", "수", "목", "금", "토"]

// 12월의 날짜 데이터 생성
const daysInMonth = 31
const firstDayOfMonth = new Date(2024, 11, 1).getDay() // 2024년 12월 1일의 요일 (0: 일요일)
const firstDayOffset = firstDayOfMonth // 빈 칸 갯수

const holidays = ref<Holiday[]>()
const incomeData = ref<Income[]>()
const expenseData = ref<Expense[]>()
const transferData = ref<Transfer[]>()
const days = ref()

/*************
 * LifeCycle *
 ************/
onMounted(() => {
  holidays.value = []
  incomeData.value = []
  expenseData.value = []
  transferData.value = []

  holidays.value.push({ date: 25, label: "크리스마스" })
  incomeData.value.push(
    { date: 5, amount: 40000 },
    { date: 15, amount: 50000 },
    { date: 31, amount: 60000 }
  )
  expenseData.value.push(
    { date: 10, amount: 20000 },
    { date: 20, amount: 15000 },
    { date: 25, amount: 30000 }
  )
  transferData.value.push(
    { date: 8, amount: 1000 },
    { date: 18, amount: 2000 },
    { date: 28, amount: 500 }
  )

  days.value = displayEventsOnDate(
    holidays.value,
    incomeData.value,
    expenseData.value,
    transferData.value
  )
})

/*************
 * Functions *
 ************/
// 날짜 정보 구성
const displayEventsOnDate = (
  _holidays: Holiday[],
  _incomes: Income[],
  _expenses: Expense[],
  _transfers: Transfer[]
) => {
  return Array.from({ length: daysInMonth }, (_, index) => {
    const date = index + 1
    return {
      date: date.toString(),
      isHoliday: _holidays.find((x: Holiday) => x.date == date) !== undefined,
      holidayLabel: _holidays.find((x: Holiday) => x.date == date)?.label || "",
      income: _incomes.find((x: Income) => x.date == date)?.amount || 0,
      expense: _expenses.find((x: Expense) => x.date == date)?.amount || 0,
      transfer: _transfers.find((x: Transfer) => x.date == date)?.amount || 0,
    }
  })
}
</script>

<template>
  <div class="calendar">
    <!-- 달력 헤더 -->
    <div class="calendar-header">
      <span class="month-label">2024년 12월</span>
    </div>

    <!-- 요일 표시 -->
    <div class="calendar-weekdays">
      <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
    </div>

    <!-- 날짜 표시 -->
    <div class="calendar-days">
      <!-- 앞부분 빈 칸 -->
      <div
        v-for="n in firstDayOffset"
        :key="'empty-' + n"
        class="empty-day"
      ></div>

      <!-- Day.vue를 사용해 날짜 표시 -->
      <Day
        v-for="day in days"
        :key="'day-' + day.date"
        :day="day.date"
        :isHoliday="day.isHoliday"
        :holidayLabel="day.holidayLabel"
        :income="day.income"
        :expense="day.expense"
        :transfer="day.transfer"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: auto;
}

.calendar-header {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.empty-day {
  width: 100%;
  height: 100px;
}

.weekday {
  text-align: center;
  padding: 5px 0;
  background-color: #f7f7f7;
  border-bottom: 2px solid #ccc;
}

@media (max-width: 600px) {
  .calendar-days {
    gap: 5px;
  }
}
</style>
