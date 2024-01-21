<template>
  <div id="service">
    <ul class="nav">
      <li class="nav-item">
        <router-link to="/notice" class="nav-link">공지사항</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/service" class="nav-link">서비스소개</router-link>
      </li>
    </ul>
    <div class="description">
      <div class="image-container">
        <img src="../assets/images/동남.png" class="service-image" />
        <div class="centered-text">
          <p>아시아 현지인 식당들을 위한</p>
          <p>간편한 예약, 결제서비스</p>
          <div class="join-button-container">
            <button class="join-button" @click="goToSelectJoin">입점하기</button>
          </div>
        </div>
      </div>

      <div class="service-first-content">
        <p>
          매장에 맞는 <br />
          맞춤 서비스를 제공해요
        </p>
      </div>
      <div class="service-content">
        <p>
          <span class="highlight-orange large-text">아맛무</span> 서비스는
          '<span class="highlight-red large-text">아는 맛이 맛있다</span>'라는
          뜻으로 진짜 맛집, 숨은 맛집을 알려드립니다.
        </p>
        <p>
          '<span class="highlight-red large-text">미식</span>'이란 공통 주제로
          모인 사람들의 네트워크를 결합하여, 공신력 있고, 특별한 맛집 정보를
          제공합니다.
        </p>

        <p>
          당신이 기대하는 가장 정확하고 신뢰하는 맛집을 지금 아맛무에서
          확인하세요.
        </p>
        <p>
          아맛무는 이용자분들이 편리하게 맛집을 찾을 수 있는 다양한 수단을
          제공해드리고 있습니다.
        </p>
      </div>
      <div class="card-container">
        <div class="card" style="width: 40rem">
          <img src="../assets/images/맛집.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <p>
              맛집, 지역, 음식 검색은 기본! <br />방문에 필요한 키워드로
              검색해보세요!
            </p>
          </div>
        </div>

        <div class="card" style="width: 40rem">
          <img
            src="../assets/images/요리짤.png"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <p>
              뭐 먹을지 고민하지 마세요! <br />내 주변의 가볼만한 맛집들을
              아맛무가 알려드려요!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicePage",
  methods: {
   
    goToSelectJoin() {
      this.$router.push({ name: 'SelectJoin' }); 
    }
  }
};
</script>

<style scoped>
.large-text {
  font-size: 24px; /* 텍스트 크기 조정 */
  /* 필요에 따라 다른 스타일 속성 추가 */
}

.highlight-orange {
  color: orange; /* 주황색 적용 */
}

.highlight-red {
  color: red; /* 빨강색 적용 */
}

.card-img-top {
  width: 100%; /* 이미지가 카드의 너비에 맞춰짐 */
  height: 60%; /* 이미지의 높이를 카드 높이의 60%로 설정 */
  object-fit: cover; /* 이미지가 잘려도 비율을 유지 */
}

.card-container {
  display: flex; /* 카드를 가로로 배열 */
  justify-content: center; /* 카드 사이의 간격을 균등하게 분배 */
  margin-top: 20px; /* 텍스트와의 간격 조정 */
}
.card {
  width: 300px; /* 카드의 너비 조정 */
  height: 500px; /* 카드의 높이 조정 */
  /* margin: 10px; */
  border: none;
  box-shadow: none;
}

.card-body {
  margin-top: 20px;
  padding: 2px; /* 카드 내부 여백 조정 */
  /* 필요에 따라 다른 스타일 속성 추가 */
}
.card-body p {
  font-size: 25px;
  text-align: center;
}
.join-button-container {
  margin-top: 100px; /* 텍스트와 버튼 사이의 여백 추가 */
  text-align: center; /* 버튼 가운데 정렬 */
}

.join-button {
  width: 160px;
  display: inline-block; /* 버튼을 인라인 블록으로 변경 */
  padding: 10px 20px;
  background-color: #ff4742;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
.join-button{
  font-size: 20px;
}
.service-first-content {
  margin-top: 80px;
  text-align: center;
}
.service-first-content p {
  font-size: 40px;
}
.service-content {
  text-align: center;
  margin-top: 40px;
}
.service-content p {
  font-size: 20px;
}

.image-container {
  position: relative;
  text-align: center;
  color: white;
}

.service-image {
  width: 100%;
  height: 750px;
  border-radius: 8px;
  display: block;
}

.image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* 어두운 오버레이 */
  border-radius: 8px;
}

.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: white;
  text-align: center; /* 텍스트 가운데 정렬 */
}
.centered-text p {
  font-size: 70px;
}

.join-button:hover {
  background-color: #ff6678; /* 호버 시 버튼 색상 변경 */
}
.description {
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.8; /* 가독성 향상을 위해 줄 간격 조정 */
  color: #333; /* 글꼴 색상 변경 */
}

.nav {
  height: 45px;
 background: #a8a0b0;  
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  z-index: 1000;

}

.nav-item {
  display: flex;
  align-items: center;
}

a.nav-link {
  color: #fff; /* 네비게이션 링크 색상 변경 */
  font-family: "BMHANNAPro";
  padding: 10px 15px; /* 여백 추가 */
}

.service-bm {
  height: 300px;
}
</style>
