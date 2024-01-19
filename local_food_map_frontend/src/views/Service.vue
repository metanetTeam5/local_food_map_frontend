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
      <img src="../assets/images/아맛무 로고.png" />
      <p>
        아맛무 서비스는 '아는 맛이 맛있다'라는 뜻으로 진짜 맛집, 숨은 맛집을
        알려드립니다.
      </p>
      <p>
        '미식'이란 공통 주제로 모인 사람들의 네트워크를 결합하여, 공신력 있고,
        특별한 맛집 정보를 제공합니다. 당신이 기대하는 가장 정확하고 신뢰하는
        맛집을 지금 아맛무에서 확인하세요.
      </p>
      <p>
        아맛무는 이용자분들이 편리하게 맛집을 찾을 수 있는 다양한 수단을
        제공해드리고 있습니다.
      </p>
      <p>
        1. 맛집, 지역, 음식 검색은 기본! 방문에 필요한 키워드로 검색해보세요.
        빅데이터 분석을 통해 키워드에 맞는 맛집을 추천해드립니다.
      </p>
      <p>
        2. 내주변 맛집 낯선 지역에 가서 뭐 먹을지 고민하지 마세요. 내 주변의
        가볼만한 맛집들을 아맛무가 알려드려요.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicePage",
};
</script>

<style scoped>
.description {
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
}
.nav {
  height: 45px;
  background: #e8dfce;
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
  color: black;
  text-decoration: none;
  background-color: transparent;
  font-family: "BMHANNAPro";
}
</style>
