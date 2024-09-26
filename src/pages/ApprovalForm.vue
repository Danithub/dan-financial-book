<template>
  <div class="container">
    <!-- 상단 네비게이션 -->
    <header class="header">
      <div class="nav">
        <button class="back-btn">&lt;</button>
        <h1>회비 대체 승인요청서</h1>
        <button class="menu-btn">&#x2630;</button>
      </div>
    </header>

    <!-- 회원 정보 카드 -->
    <section class="member-card">
      <div class="profile-pic">
        <img src="https://via.placeholder.com/100" alt="Profile Image" />
      </div>
      <div class="profile-details">
        <h3>김윤찬</h3>
        <p>P159071111 | 초등1</p>
        <button class="profile-btn">전체 프로필 보기</button>
      </div>
    </section>

    <!-- 신청 정보 카드 -->
    <section class="info-card">
      <h2>신청 정보</h2>
      <div class="info-details">
        <p><strong>구분:</strong> 회비대체</p>
        <p><strong>승인요청일:</strong> 2023.04.05</p>
        <p><strong>승인요청:</strong> 홍길동 [001000] 경기교육국/001센터</p>
      </div>

      <!-- 입금내역 카드 -->
      <div class="transaction-card">
        <h3>입금내역</h3>
        <ul>
          <li><strong>입금상병명:</strong> 홍길동 001000/경기교육국/001센터</li>
          <li><strong>입금계좌:</strong> 김윤찬/001000</li>
          <li><strong>입금일자:</strong> 2022.01.01</li>
          <li><strong>영수증 번호:</strong> 1234567800</li>
          <li><strong>적요:</strong> 경기체제</li>
          <li><strong>입금금액:</strong> 40,000원</li>
          <li><strong>할인금액:</strong> 8,000원</li>
          <li><strong>입금일자:</strong> 2022.01.01</li>
        </ul>
      </div>

      <!-- 대체내역 카드 -->
      <div class="transaction-card">
        <h3>대체내역</h3>
        <ul>
          <li><strong>대체일자:</strong> 2023.04.05</li>
          <li><strong>대체계좌:</strong> 박나연/001000</li>
          <li><strong>대체적요:</strong> 씨스코리아학 중등1/요일/옵션</li>
          <li><strong>대체요청:</strong> 김대길/경기교육국/001센터</li>
        </ul>
      </div>
    </section>

    <!-- 승인 버튼 -->
    <div class="action-buttons">
      <button class="reject-btn">승인 반려</button>
      <button class="approve-btn">승인 완료</button>
    </div>

    <!-- 하단 네비게이션 -->
    <footer class="bottom-nav">
      <button>홈</button>
      <button>공지</button>
      <button>서류</button>
      <button>결재하기</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Composition API를 사용하여 TypeScript 기반으로 작성
</script>

<style scoped>
/* Container */
.container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

/* Header */
.header {
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
}
.nav h1 {
  font-size: 22px;
  font-weight: bold;
}
.back-btn,
.menu-btn {
  font-size: 26px;
  background: none;
  border: none;
  cursor: pointer;
}

/* 회원 정보 카드 */
.member-card {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 30px;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.profile-pic img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.profile-details {
  margin-left: 30px;
}
.profile-details h3 {
  font-size: 22px;
  margin-bottom: 5px;
}
.profile-details p {
  font-size: 16px;
}
.profile-btn {
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

/* 신청 정보 및 거래 내역 카드 */
.info-card {
  background-color: #fff;
  padding: 30px;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.transaction-card {
  background-color: #f8f8f8;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
}
.transaction-card h3 {
  font-size: 18px;
  margin-bottom: 15px;
}
.transaction-card ul {
  list-style: none;
  padding: 0;
}
.transaction-card li {
  font-size: 16px;
  margin-bottom: 10px;
}

/* 버튼 스타일 */
.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.reject-btn {
  width: 48%;
  padding: 20px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #f5c6cb;
  color: #721c24;
}
.approve-btn {
  width: 48%;
  padding: 20px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #c3e6cb;
  color: #155724;
}

/* 하단 네비게이션 */
.bottom-nav {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px 0;
  margin-top: 30px;
  border-top: 2px solid #ddd;
}
.bottom-nav button {
  flex: 1;
  font-size: 18px;
  background: none;
  border: none;
  padding: 15px;
  cursor: pointer;
  color: #6c757d;
}

.bottom-nav button:hover {
  background-color: #f8f9fa;
}
</style>
