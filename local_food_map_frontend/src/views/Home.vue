<template>
  <div id="home">
    <div class="main-header-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/notice" class="nav-link">공지사항</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/service" class="nav-link">서비스소개</router-link>
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
          <router-link to="/map" class="round-button"
            >지도에서 검색</router-link
          >
          <button class="round-button2" @click="requestLocationAccess">
            현 위치로 설정
          </button>
        </div>
      </div>
    </div>
    <div class="search-message" v-if="showSearchMessage">
      {{ searchMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      menulists: [
        { menutext: "공지사항", link: "/notice" },
        { menutext: "서비스 소개", link: "/introduce" },
      ],
      showSearchMessage: false,
      searchMessageText: "내 주변 식당",
    };
  },
  methods: {
    goToPage(target) {
      if (target === "/store-map") {
      // 검색 버튼을 눌렀을 때 "내 주변 식당"으로 메시지 설정
      this.$store.commit("setSearchMessage", "내 주변 식당");
    }
      if (this.$router.currentRoute.path !== target) {
        this.$router.push(target);
      }
    },
    toggleSearchMessage(show) {
      this.showSearchMessage = show;
    },
    setSearchMessage(message) {
      this.searchMessageText = message;
    },
   
      requestLocationAccess() {
      if ("geolocation" in navigator) {
        // Geolocation API를 지원하는 경우
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // 위치 정보를 성공적으로 가져왔을 때의 처리
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // lat와 lng를 사용하여 원하는 작업을 수행할 수 있습니다.
            console.log("현재 위치의 위도:", lat);
            console.log("현재 위치의 경도:", lng);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              // 사용자가 위치 정보 엑세스를 거부한 경우
              alert("위치 정보 엑세스를 허용해주세요. 설정에서 활성화해주세요.");
            } else {
              // 위치 정보를 가져오는 데 실패한 경우
              alert("위치 정보를 가져오지 못했습니다. 다시 시도해주세요.");
            }
          }
        );
      } else {
        // Geolocation API를 지원하지 않는 경우
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
      }
      }
  },
  computed: {
    searchMessageVisible() {
      return this.$store.state.searchResults.length === 0;
    },
    searchMessage() {
      return this.$store.state.searchResults.length === 0
        ? "검색 결과가 없습니다."
        : this.searchMessageText;
    },
  },
};



</script>

<style>
* {
  box-sizing: border-box;
  overflow-x: hidden;
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
  background: #fce7bc;
}

a {
  color: black;
  text-decoration: none;
  background-color: transparent;
  font-family: "BMHANNAPro";
}

.nav {
  height: 45px;
  background: #e8dfce;
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
  font-family: "BMHANNAPro";
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
  font-family: "BMHANNAPro";
}
.round-button2{
 
  border: none;
  border-radius: 20px;
  background-color: #555;
  color: #fff;
  cursor: pointer;
  font-family: "BMHANNAPro";
}

.round-button,.round-button2:hover {
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
  font-family: "BMHANNAPro";
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


<!-- <template>
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
</style> -->
