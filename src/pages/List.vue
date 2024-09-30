<script setup lang="ts">
import { ref, onMounted } from "vue"

/*************
 * Variables *
 *************/
interface Transaction {
  id: number
  type: string
  date: string
  amount: number
  content: string
  category: string
  memo: string
}
const history = ref([] as Transaction[])

/*************
 * Lifecycle *
 *************/
onMounted(async () => {
  let today = new Date().toISOString().substring(0, 10)

  await findTransactionList(today)
})

/***********
 * Methods *
 ***********/
const findTransactionList = async (date: String) => {
  const response = await fetch(`http://localhost:18080/find?date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  console.log(response)

  const data = await response.json()
  console.log(data)

  history.value = data.body as Transaction[]
  console.log(history)
}
</script>

<template>
  <h3>목록</h3>
  <div class="q-pa-md">
    <q-table title="거래내역" :rows="history" row-key="id" />
  </div>
</template>

<style scoped></style>
