<script setup lang="ts">
import { ref, onMounted } from "vue"
import Day from "@/components/calendar-gpt/Day.vue"
import CalendarUtils from "@/utils/CalendarUtils"

/*************
 * Interface *
 ************/
// 일별 디스플레이 정보
interface DateToDisplay {
  year: number
  month: number
  day: number
  event: Event
  txnInfo: TxnInfo
  isCurrentMonth: boolean
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

interface DateFormat {
  year: number
  month: number
  day: number
}

/*************
 * Variables *
 ************/
// 요일 정의
const weekdays = ["일", "월", "화", "수", "목", "금", "토"]

const displayElements = ref<DateToDisplay[]>([])

const today = ref<DateFormat>({ year: 0, month: 0, day: 0 })

/*************
 * LifeCycle *
 ************/
onMounted(() => {
  today.value = CalendarUtils.toInstance(new Date())

  displayElements.value = getTotalCalendarInfoToDisplay(today.value)
})

/*************
 * Functions *
 ************/
// 7*5 구조로 디스플레이될 날짜를 계산한다.
const getTotalCalendarInfoToDisplay = (_today: DateFormat) => {
  // 1. 월별 정보를 가져온다.
  let lastMonth: Month = CalendarUtils.getMonthInfo(
    _today.year,
    _today.month - 1
  )
  let thisMonth: Month = CalendarUtils.getMonthInfo(_today.year, _today.month)
  let nextMonth: Month = CalendarUtils.getMonthInfo(
    _today.year,
    _today.month + 1
  )

  // TODO 이번달 기준이 아니라 지난 달 1일과 다음 달 말일이 일/토가 아니었을 때를 구하면 되잖아?
  // TODO 조회 기준(시작일~종료일)을 파라미터로 보내서 전체 내역을 한번에 조회하도록 쿼리 작성

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
        isCurrentMonth: false,
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
      isCurrentMonth: true,
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
        isCurrentMonth: false,
      })
    }
  }

  return elements
}

// 월 이동 함수
const goToPreviousMonth = () => {
  let { year, month } = CalendarUtils.getMonthInfo(
    today.value?.year,
    today.value?.month - 1
  )
  today.value.year = year
  today.value.month = month
  displayElements.value = getTotalCalendarInfoToDisplay(today.value)
}

const goToNextMonth = () => {
  let { year, month } = CalendarUtils.getMonthInfo(
    today.value?.year,
    today.value?.month + 1
  )
  today.value.year = year
  today.value.month = month
  displayElements.value = getTotalCalendarInfoToDisplay(today.value)
}
</script>

<template>
  <div class="calendar">
    <!-- 달력 헤더 -->
    <div class="calendar-header">
      <button @click="goToPreviousMonth" class="nav-button">&lt;</button>
      <span class="month-label">{{ today?.year }}년 {{ today?.month }}월</span>
      <button @click="goToNextMonth" class="nav-button">&gt;</button>
    </div>

    <!-- 요일 표시 -->
    <div class="calendar-weekdays">
      <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
    </div>

    <!-- 날짜 표시 -->
    <div class="calendar-days">
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
        :isCurrentMonth="element.isCurrentMonth"
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.nav-button {
  background-color: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-button:hover {
  background-color: #e0e0e0;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.empty-day {
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
