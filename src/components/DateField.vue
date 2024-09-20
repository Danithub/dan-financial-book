<script setup lang="ts">
import { ref, onMounted } from "vue"
import DatePicker from "@/components/DatePicker.vue"

/*************
 * Variables *
 ************/
const date = ref("")
const picker = ref()

/*************
 * Functions *
 ************/
const clickCalendarIcon = () => {
  picker.value.openPopup()
}

const updateSelectedDate = (newDate: string) => {
  console.log("newDate", newDate)

  date.value = newDate
}

/*************
 * Lifecycle *
 ************/
onMounted(() => {
  date.value = new Date().toLocaleDateString()
})
</script>

<template>
  <div>
    <q-field
      color="grey-3"
      label-color="orange"
      outlined
      label="Date"
      stack-label
    >
      <template v-slot:append>
        <q-icon name="event" color="orange" @click="clickCalendarIcon" />
        <DatePicker
          ref="picker"
          :init-date="date"
          @date-selected="updateSelectedDate"
        />
      </template>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ date }}
        </div>
      </template>
    </q-field>
  </div>
</template>

<style scoped></style>
