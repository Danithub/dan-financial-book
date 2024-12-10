<script setup lang="ts">
import { ref } from "vue"
import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"

/*************
 * Variables *
 *************/
const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  weekends: true,
  events: [{ title: "Meeting", start: new Date() }],
})
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
