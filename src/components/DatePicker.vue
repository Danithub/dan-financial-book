<script setup lang="ts">
import { ref } from "vue"

/*************
 * Variables *
 ************/
const isOpen = ref(false)
const date = ref("")

/*************
 * Functions *
 ************/
const openPopup = () => {
  isOpen.value = !isOpen.value

  date.value = props.initDate
}

const selectDate = (newDate: string) => {
  emit("dateSelected", newDate)
  date.value = newDate
  //isOpen.value = false
}

/*************
 * Lifecycle *
 ************/
const props = defineProps({
  initDate: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
})
const emit = defineEmits(["dateSelected"])
defineExpose({ openPopup })
</script>

<template>
  <q-dialog v-model="isOpen">
    <q-field
      filled
      :hint="`Calendar with value ${date}`"
      label="Pick a date"
      stack-label
    >
      <template v-slot:control>
        <q-date
          class="q-mt-sm full-width"
          minimal
          :model-value="date"
          @update:model-value="selectDate"
        />
      </template>
    </q-field>
  </q-dialog>
</template>

<style scoped></style>
