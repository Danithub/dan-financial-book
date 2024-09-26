<template>
  <div class="transaction-history">
    <header class="header">
      <span class="back-icon">&lt;</span>
      <h1>거래내역</h1>
    </header>

    <div class="account-info">
      <p>05.02 신한카드에서 318,751원을 출금했습니다.</p>
      <h2>신한 계좌</h2>
      <p>신한 110210620615</p>
      <h3>{{ formatAmount(balance) }}원</h3>
      <p>마지막 업데이트: 2018.05.04 09:49</p>
    </div>

    <div class="filter-options">
      <button>전체</button>
      <button>입금</button>
      <button>출금</button>
      <button>체크카드</button>
    </div>

    <div class="transactions">
      <div
        class="transaction"
        v-for="transaction in transactions"
        :key="transaction.id"
      >
        <div class="transaction-detail">
          <p>{{ transaction.description }}</p>
          <p>{{ transaction.date }} | {{ transaction.type }}</p>
        </div>
        <div class="transaction-amount">
          <p :class="transaction.amount > 0 ? 'income' : 'expense'">
            {{ transaction.amount > 0 ? "+" : "-"
            }}{{ formatAmount(transaction.amount) }}
          </p>
          <p>{{ formatAmount(transaction.balance) }}원</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const balance = ref(800241)
const transactions = ref([
  {
    id: 1,
    description: "계좌통합이전",
    date: "18.05.04 09:49",
    type: "타행PC",
    amount: 19015,
    balance: 800241,
  },
  {
    id: 2,
    description: "계좌통합이전",
    date: "18.05.04 09:41",
    type: "타행PC",
    amount: 70,
    balance: 781226,
  },
  {
    id: 3,
    description: "네이버페이",
    date: "18.05.04 00:05",
    type: "신한체",
    amount: -71265,
    balance: 781156,
  },
  {
    id: 4,
    description: "iHerb",
    date: "18.05.03 18:03",
    type: "카드결",
    amount: -53150,
    balance: 852421,
  },
])

const formatAmount = (value: number): string => {
  return new Intl.NumberFormat("ko-KR").format(value)
}
</script>

<style scoped>
.transaction-history {
  font-family: "Arial", sans-serif;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3b5998;
  color: white;
  padding: 20px;
  border-radius: 10px 10px 0 0;
}

.header .back-icon {
  font-size: 24px;
  cursor: pointer;
}

.account-info {
  background-color: white;
  padding: 40px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.account-info h2 {
  margin: 10px 0;
  font-weight: bold;
  font-size: 24px;
}

.account-info h3 {
  font-size: 32px;
  color: #000;
  margin: 20px 0;
}

.filter-options {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
}

.filter-options button {
  padding: 15px 30px;
  background-color: #3b5998;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.filter-options button:hover {
  background-color: #2d4373;
}

.transactions {
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}

.transaction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.transaction:last-child {
  border-bottom: none;
}

.transaction-detail p {
  margin: 0;
  font-size: 18px;
}

.transaction-amount {
  text-align: right;
}

.transaction-amount p {
  margin: 5px 0;
}

.transaction .income {
  color: blue;
}

.transaction .expense {
  color: red;
}

@media screen and (min-width: 768px) {
  .filter-options {
    justify-content: space-between;
    padding: 0 10%;
  }

  .filter-options button {
    font-size: 16px;
    padding: 10px 20px;
  }

  .transaction-detail p {
    font-size: 20px;
  }

  .transaction-amount p {
    font-size: 20px;
  }
}
</style>
