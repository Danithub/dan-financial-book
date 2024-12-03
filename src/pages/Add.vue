<script setup lang="ts">
import { ref, onMounted } from "vue"

// 거래방식을 선택할 수 있는 셀렉트 박스의 옵션
const tradeTypeOptions = ref([
  { label: "지출", value: "0" },
  { label: "수입", value: "1" },
])

/*************
 * Variables *
 *************/
interface Transaction {
  type: string
  category: string
  amount: number
  date: string
  content: string
}
const saveParam = ref({} as Transaction)
// 거래방식
const tradeType = ref("수입")
// 카테고리
const tradeCategory = ref("")
// 거래금액
const tradeAmount = ref(100)
// 거래일자
const tradeDate = ref("")
// 거래내용
const tradeDescription = ref("")

/*************
 * Lifecycle *
 *************/
onMounted(() => {
  tradeDate.value = new Date().toISOString().substring(0, 10).replace(/-/g, "/")
})

/***********
 * Methods *
 ***********/
// 거래내역 저장
const saveTrade = () => {
  // 필수 입력 사항 체크
  if (!tradeType.value || !tradeAmount.value || !tradeDate.value) {
    alert("거래방식, 거래금액, 날짜는 필수 입력 사항입니다.")
    return
  }

  // 거래금액이 숫자인지 체크
  if (isNaN(tradeAmount.value)) {
    alert("거래금액은 숫자로 입력해주세요.")
    return
  }

  saveParam.value = {
    type: tradeType.value,
    category: tradeCategory.value,
    amount: tradeAmount.value,
    date: tradeDate.value,
    content: tradeDescription.value,
  }
  saveTransaction(saveParam.value).then(() => {
    // 변수 초기화
    tradeType.value = "수입"
    tradeCategory.value = ""
    tradeAmount.value = 0
    tradeDate.value = new Date()
      .toISOString()
      .substring(0, 10)
      .replace(/-/g, "/")
    tradeDescription.value = ""
  })
}

// 저장 API 호출
const saveTransaction = async (param: Transaction) => {
  // 저장 API 호출
  const response = await fetch(
    `http://15.165.86.111:18080/add?type=${param.type}&category=${param.category}&amount=${param.amount}&date=${param.date}&content=${param.content}`,
    {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  // 저장 성공 여부 체크
  if (response.ok) {
    alert("저장되었습니다.")
  } else {
    alert("저장에 실패했습니다.")
  }
}
</script>

<template>
  <h3>추가</h3>
  <!-- 거래방식을 선택할 수 있는 셀렉트 박스 -->
  <q-select
    v-model="tradeType"
    :options="tradeTypeOptions"
    label="거래방식"
    outlined
  ></q-select>

  <!-- 카테고리를 입력할 수 있는 인풋 박스 -->
  <q-input v-model="tradeCategory" label="카테고리" outlined></q-input>

  <!-- 거래금액을 입력할 수 있는 인풋 박스 -->
  <q-input v-model="tradeAmount" label="거래금액" outlined></q-input>

  <!-- 거래일자를 선택할 수 있는 캘린더 -->
  <q-date v-model="tradeDate" label="거래일자" outlined></q-date>

  <!-- 거래내용을 입력할 수 있는 인풋 박스 -->
  <q-input v-model="tradeDescription" label="거래내용" outlined></q-input>

  <!-- 저장 버튼 -->
  <q-btn
    @click="saveTrade"
    label="저장"
    color="primary"
    class="full-width"
  ></q-btn>
</template>

<style scoped></style>
