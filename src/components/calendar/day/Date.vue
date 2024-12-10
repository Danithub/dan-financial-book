<script setup lang="ts">
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
  <div>{{ props.date }}</div>
</template>

<style scoped></style>
