<script setup lang="ts">
import { ref, onMounted } from "vue"
import Day from "@/components/calendar-gpt/Day.vue"
import CalendarUtils from "@/utils/CalendarUtils"
import DateUtils from "@/utils/DateUtils"

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

// 일별 디스플레이 정보(거래내역, 공휴일) 조회 데이터
interface DayWithEvent {
  date: string
  holiYn: boolean
  holiName: string
  income: number
  expense: number
  transfer: number
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

const monthlyEvnets = ref<DayWithEvent[]>([])

/*************
 * LifeCycle *
 ************/
onMounted(async () => {
  today.value = CalendarUtils.toInstance(new Date())

  displayElements.value = await getTotalCalendarInfoToDisplay(today.value)
})

/*************
 * Functions *
 ************/
// 7*5 구조로 디스플레이될 날짜를 계산한다.
const getTotalCalendarInfoToDisplay = async (_today: DateFormat) => {
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

  await getCalendarInfo(lastMonth, nextMonth)

  // TODO 이번달 기준이 아니라 지난 달 1일과 다음 달 말일이 일/토가 아니었을 때를 구하면 되잖아?
  // TODO 조회 기준(시작일~종료일)을 파라미터로 보내서 전체 내역을 한번에 조회하도록 쿼리 작성

  // 초기화
  let elements: DateToDisplay[] = []

  // 2. 이번 달 1일이 일요일이 아닌 경우 지난 달 정보를 가져온다.
  if (thisMonth.firstDow != 0) {
    // 일 월 화 수
    // 29 30 31 1
    // -2  -1  0
    for (let index = 0; index < thisMonth.firstDow; index++) {
      let current = DateUtils.toString2(
        lastMonth.year,
        lastMonth.month,
        lastMonth.lastDay - (thisMonth.firstDow - (index + 1))
      )

      let element: DateToDisplay = {
        year: 0,
        month: 0,
        day: 0,
        event: {
          exist: false,
          label: "",
        },
        txnInfo: {
          income: 0,
          expense: 0,
          transfer: 0,
        },
        isCurrentMonth: false,
      }

      // 날짜
      element.year = lastMonth.year
      element.month = lastMonth.month
      element.day = lastMonth.lastDay - (thisMonth.firstDow - (index + 1))

      // 공휴일, 거래금액
      let event = monthlyEvnets.value.find((x) => x.date == current)
      if (event) {
        element.event.exist = event.holiYn
        element.event.label = event.holiName
        element.txnInfo.income = event.income
        element.txnInfo.expense = event.expense
        element.txnInfo.transfer = event.transfer
      } else {
        element.event.exist = false
        element.event.label = ""
        element.txnInfo.income = 0
        element.txnInfo.expense = 0
        element.txnInfo.transfer = 0
      }

      elements.push(element)
    }
  }

  // 3. 이번달 정보를 가져온다.
  for (let index = 0; index < thisMonth.lastDay; index++) {
    let current = DateUtils.toString2(
      thisMonth.year,
      thisMonth.month,
      index + 1
    )
    let element: DateToDisplay = {
      year: 0,
      month: 0,
      day: 0,
      event: {
        exist: false,
        label: "",
      },
      txnInfo: {
        income: 0,
        expense: 0,
        transfer: 0,
      },
      isCurrentMonth: false,
    }

    // 날짜
    element.year = thisMonth.year
    element.month = thisMonth.month
    element.day = index + 1
    element.isCurrentMonth = true

    // 공휴일, 거래금액
    let event = monthlyEvnets.value.find((x) => x.date == current)
    if (event) {
      element.event.exist = event.holiYn
      element.event.label = event.holiName
      element.txnInfo.income = event.income
      element.txnInfo.expense = event.expense
      element.txnInfo.transfer = event.transfer
    } else {
      element.event.exist = false
      element.event.label = ""
      element.txnInfo.income = 0
      element.txnInfo.expense = 0
      element.txnInfo.transfer = 0
    }

    console.log("element", element)
    elements.push(element)
  }

  // 4. 이번달 말일이 토요일이 아닌 경우 다음 달 정보를 가져온다.
  if (thisMonth.lastDow != 6) {
    // 목 금 토
    // 31 1  2
    // 4  5  6
    for (let index = 0; index < 6 - thisMonth.lastDow; index++) {
      let current = DateUtils.toString2(
        nextMonth.year,
        nextMonth.month,
        index + 1
      )

      let element: DateToDisplay = {
        year: 0,
        month: 0,
        day: 0,
        event: {
          exist: false,
          label: "",
        },
        txnInfo: {
          income: 0,
          expense: 0,
          transfer: 0,
        },
        isCurrentMonth: false,
      }

      // 날짜
      element.year = nextMonth.year
      element.month = nextMonth.month
      element.day = index + 1

      // 공휴일, 거래금액
      let event = monthlyEvnets.value.find((x) => x.date == current)
      console.log("event", event)
      if (event) {
        element.event.exist = event.holiYn
        element.event.label = event.holiName
        element.txnInfo.income = event.income
        element.txnInfo.expense = event.expense
        element.txnInfo.transfer = event.transfer
      } else {
        element.event.exist = false
        element.event.label = ""
        element.txnInfo.income = 0
        element.txnInfo.expense = 0
        element.txnInfo.transfer = 0
      }

      elements.push(element)
    }
  }

  return elements
}

const getCalendarInfo = async (_lastMonth: Month, _nextMonth: Month) => {
  let param = {
    stdt: DateUtils.toString2(
      _lastMonth.year,
      _lastMonth.month,
      _lastMonth.firstDay,
      ""
    ),
    eddt: DateUtils.toString2(
      _nextMonth.year,
      _nextMonth.month,
      _nextMonth.lastDay,
      ""
    ),
  }

  let response = await fetch("http://localhost:18080/cal/find", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param), // JSON 형식으로 데이터 변환
  })

  console.log(response)

  let data = await response.json()
  console.log(data)

  monthlyEvnets.value = data.body as DayWithEvent[]
  console.log("monthlyEvnets", monthlyEvnets.value)
}

// 월 이동 함수
const goToPreviousMonth = async () => {
  let { year, month } = CalendarUtils.getMonthInfo(
    today.value?.year,
    today.value?.month - 1
  )
  today.value.year = year
  today.value.month = month
  displayElements.value = await getTotalCalendarInfoToDisplay(today.value)
}

const goToNextMonth = async () => {
  let { year, month } = CalendarUtils.getMonthInfo(
    today.value?.year,
    today.value?.month + 1
  )
  today.value.year = year
  today.value.month = month
  displayElements.value = await getTotalCalendarInfoToDisplay(today.value)
}
</script>

<template>
  <div class="calendar">
    <!-- 달력 헤더 -->
    <div class="calendar-header">
      <button @click="goToPreviousMonth" class="nav-button">
        <img src="@/assets/left-arrow.svg" alt="Previous Month" />
      </button>
      <span class="month-label">{{ today?.year }}년 {{ today?.month }}월</span>
      <button @click="goToNextMonth" class="nav-button">
        <img src="@/assets/right-arrow.svg" alt="Next Month" />
      </button>
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
  background-color: transparent;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.nav-button img {
  width: 36px;
  height: 36px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.2s ease;
}

.nav-button:hover img {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
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
