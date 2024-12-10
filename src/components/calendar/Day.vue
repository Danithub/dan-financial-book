<script setup lang="ts">
import Date from "@/components/calendar/day/Date.vue"

/*************
 * Lifecycle *
 ************/
const props = defineProps({
  date: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <!-- 날짜 -->
  <Date :date="props.date" />
  <!-- 수입 -->
  <!-- 지출 -->
  <!-- 이체 -->
</template>

<style scoped>
div {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}
</style>
