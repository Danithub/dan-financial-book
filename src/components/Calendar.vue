<script setup lang="ts">
import { ref } from "vue"
import Day from "@/components/calendar/Day.vue"

// TODO
// 1. 현재 월을 받아온다.
// 2. 현재 월의 일자를 계산한다.
// 3. 7*5 격자에서 보여야 하는 일자를 계산한다.
// 4. 격자에 맞게 디스플레이

/*************
 * Variables *
 ************/
const dayOfWeek = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
</script>

<template>
  <Day v-for="(dow, index) in dayOfWeek" :key="index" :date="index" />
</template>

<style scoped></style>
