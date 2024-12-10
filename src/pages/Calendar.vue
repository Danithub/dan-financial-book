<script setup lang="ts">
import { ref, watch } from "vue"
import Calendar from "@/components/Calendar.vue"
import CalendarGpt from "@/components/CalendarGpt.vue"

/*************
 * Variables *
 *************/
const tab = ref("weekly")

/*************
 *   Test    *
 *************/
watch(tab, (newVal, oldVal) => {
  console.log(`old: ${oldVal}, new: ${newVal}`)
})
</script>

<template>
  <q-tabs v-model="tab" class="bg-primary text-white shadow-2">
    <q-tab name="monthly" label="월간" />
    <q-tab name="weekly" label="주간" />
    <q-tab name="daily" label="일간" />
  </q-tabs>

  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="monthly">
      <CalendarGpt />
      <Calendar />
    </q-tab-panel>

    <q-tab-panel name="weekly">
      <div class="text-h6">Alarms</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="daily">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>
  </q-tab-panels>
</template>

<style scoped></style>
