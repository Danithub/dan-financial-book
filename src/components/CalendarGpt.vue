<script setup lang="ts">
import { ref, onMounted } from "vue"
import Day from "@/components/calendar-gpt/Day.vue"
import CalendarUtils from "@/utils/CalendarUtils"

/*************
 * Interface *
 ************/
// 예제 데이터: 공휴일과 가계부 정보
interface Holiday {
  date: number
  label: String
}
interface Income {
  date: number
  amount: number
}
interface Expense {
  date: number
  amount: number
}
interface Transfer {
  date: number
  amount: number
}

// 일별 디스플레이 정보
interface DateToDisplay {
  year: number
  month: number
  day: number
  event: Event
  txnInfo: TxnInfo
}
// 공휴일 여부 및 정보
interface Event {
  exist: boolean
  label: string
}
// 일별 거래 총액
interface TxnInfo {
  income: number
  expense: number
  transfer: number
}

// 월단위 정보
interface Month {
  year: number
  month: number
  firstDay: number
  firstDow: number
  lastDay: number
  lastDow: number
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

const holidays = ref<Holiday[]>([])
const incomeData = ref<Income[]>([])
const expenseData = ref<Expense[]>([])
const transferData = ref<Transfer[]>([])
const days = ref()

const displayElements = ref<DateToDisplay[]>([])

/*************
 * LifeCycle *
 ************/
onMounted(() => {
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

  displayElements.value = getTotalCalendarInfoToDisplay(2024, 10)
})

/*************
 * Functions *
 ************/
// 7*5 구조로 디스플레이될 날짜를 계산한다.
const getTotalCalendarInfoToDisplay = (
  _thisYear: number,
  _thisMonth: number
) => {
  // 1. 월별 정보를 가져온다.
  let lastMonth: Month = CalendarUtils.getMonthInfo(_thisYear, _thisMonth - 1)
  let thisMonth: Month = CalendarUtils.getMonthInfo(_thisYear, _thisMonth)
  let nextMonth: Month = CalendarUtils.getMonthInfo(_thisYear, _thisMonth + 1)

  // TODO 이번달 기준이 아니라 지난 달 1일과 다음 달 말일이 일/토가 아니었을 때를 구하면 되잖아?

  let elements: DateToDisplay[] = []

  // 2. 이번 달 1일이 일요일이 아닌 경우 지난 달 정보를 가져온다.
  if (thisMonth.firstDow != 0) {
    // 일 월 화 수
    // 29 30 31 1
    // -2  -1  0
    for (let index = 0; index < thisMonth.firstDow; index++) {
      elements.push({
        year: lastMonth.year,
        month: lastMonth.month,
        day: lastMonth.lastDay - (thisMonth.firstDow - (index + 1)),
        event: {
          exist: true,
          label: "Hi",
        },
        txnInfo: {
          income: 200,
          expense: 1200,
          transfer: 30200,
        },
      })
    }
  }

  // 3. 이번달 정보를 가져온다.
  for (let index = 0; index < thisMonth.lastDay; index++) {
    elements.push({
      year: thisMonth.year,
      month: thisMonth.month,
      day: index + 1,
      event: {
        exist: false,
        label: "",
      },
      txnInfo: {
        income: 20200,
        expense: 1600,
        transfer: 900,
      },
    })
  }

  // 4. 이번달 말일이 토요일이 아닌 경우 다음 달 정보를 가져온다.
  if (thisMonth.lastDow != 6) {
    // 목 금 토
    // 31 1  2
    // 4  5  6
    for (let index = 0; index < 6 - thisMonth.lastDow; index++) {
      elements.push({
        year: nextMonth.year,
        month: nextMonth.month,
        day: 1 + index,
        event: {
          exist: true,
          label: "설날 연휴",
        },
        txnInfo: {
          income: 700,
          expense: 81600,
          transfer: 900,
        },
      })
    }
  }

  return elements
}

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
        v-for="element in displayElements"
        :key="`day-${element.month}-${element.day}`"
        :day="element.day.toString()"
        :isHoliday="element.event.exist"
        :holidayLabel="element.event.label"
        :income="element.txnInfo.income"
        :expense="element.txnInfo.expense"
        :transfer="element.txnInfo.transfer"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  width: 100%;
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
