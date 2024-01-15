<template>
  <div id="home">
  <div class="main-header-nav">
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link" href="#">공지사항</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">서비스소개</a>
      </li>
    </ul>

    <div class="main-header">
      <div class="main-headertext">
        <p>
          당신을 위한 <br />
          현지인 식당 맛집
        </p>
      </div>
      <div class="button-container">
        <router-link to="/map" class="round-button">지도에서 검색</router-link>
        <button class="round-button">현 위치로 설정</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
* {
  box-sizing: border-box; 
  overflow-x: hidden
}
#home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  justify-content: center; 
  align-items: center; 
}

.main-header-nav {
  position: fixed; 
  top: 70px;
  left: 0; 
  width: 100%; 
  z-index: 1000;
  background: #FCE7BC;
  font-family: 'BMHANNAPro';
}

a {
    color: black;
    text-decoration: none;
    background-color: transparent;
    font-family: 'BMHANNAPro';
}

.nav {
  height: 45px;
  background: #E8DFCE;
}
.nav-item {
  display: flex;
  align-items: center;
}
.main-header {
  /* position: fixed; */
  width: 100%; 
  height: 200px; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  font-family: 'BMHANNAPro';
}

.button-container {
  display: flex; 
  justify-content: space-around; 
  width: 420px; 
  margin-top: 15px;
}

.round-button {
  padding: 10px 40px; 
  border: none;
  border-radius: 20px;
  background-color: #555;
  color: #fff;
  cursor: pointer;
  font-family: 'BMHANNAPro';
}

.round-button:hover {
  background-color: #333; 
}

.main-headertext {
  color: #333;
  font-size: 24px;
}

.main-headertext p {
  text-align: center;
  margin: 0;
}

.swiper-area {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  position: relative; 
  top: 100px; 
  background: #ffffff;
  width: 90%;
  font-family: 'BMHANNAPro';
}

.swiper-container {
  width: 90vw; 
  height: 30vh; 
  margin: auto; 
}

.swiper-slide {
  width: 25vw;
  height: 30vh; 
}

.swiper-slide img {
  /* width: 100%;  */
  height: auto; 
  display: block;
  /* object-fit: contain;  */
}


.swiper-button-prev,
.swiper-button-next {
  position: absolute; /* 절대 위치 설정 */
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-50%); /* 정확한 중앙 정렬 */
}

.swiper-button-next {
  right: 0; /* 오른쪽 끝에 위치 */
}

.swiper-button-prev {
  left: 0; /* 왼쪽 끝에 위치 */
}

@media (min-width: 1200px) {
  .swiper-container {
    width: 1400px;
  }
}
</style>