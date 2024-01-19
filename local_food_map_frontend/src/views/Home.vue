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
        <!-- <div class="main-header">
        <div class="main-header-image">
          <img src="../assets/images/로고마크.png" alt="이미지 설명" />
        </div>
        <div class="main-headertext">
          <p>
            당신을 위한 <br />
            현지인 식당 맛집
          </p>
        </div> -->
        <div class="button-container">
          <router-link to="/map" class="round-button"
            >지도에서 검색</router-link
          >
          <div class="round-button" @click="requestLocationAccess">
            <template v-if="locationLoading">위치 가져오는 중...</template>
            <template v-else>현 위치로 설정</template>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container2" type="submit">
      <button class="round-button2" @click="searchPlaces('한식')">
        한식
        <img src="../assets/images/koreanfood.jpg" alt="한식" />
      </button>
      <button class="round-button2" @click="searchPlaces('중식')">
        중식 <img src="../assets/images/chinesefood.png" alt="중식" />
      </button>
      <button class="round-button2" @click="searchPlaces('일식')">
        일식
        <img src="../assets/images/japanesefood.png" alt="일식" />
      </button>
      <button class="round-button2" @click="searchPlaces('동남아')">
        동남아
        <img src="../assets/images/southAsianfood.png" alt="동남아" />
      </button>
    </div>

    <div class="button-container3">
      <button class="round-button2" @click="searchPlaces('맛집')">
        맛집
        <img src="../assets/images/goodtaste.png" alt="맛집" />
      </button>
      <button class="round-button2" @click="searchPlaces('가성비')">
        가성비
        <img src="../assets/images/costgood.png" alt="가성비" />
      </button>
      <button class="round-button2" @click="searchPlaces('데이트')">
        데이트
        <img src="../assets/images/date.png" alt="데이트" />
      </button>
      <button class="round-button2" @click="searchPlaces('모임')">
        모임
        <img src="../assets/images/group.png" alt="Button 8" />
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "HomePage",
  data() {
    return {
      menulists: [

        { menutext: "공지사항", link: "/notice" },
        { menutext: "서비스 소개", link: "/introduce" },
      ],
      locationLoading: false,
      keyword: "",
    };
  },
  methods: {
    ...mapActions(["fetchSearchResults", "filterByCategory"]),
    goToStoreDetail(restId) {
      this.$router.push({ name: "StoreDetailPage", params: { restId } });
    },

    goToPage(target) {
      if (this.$router.currentRoute.path !== target) {
        this.$router.push(target);
      }
    },

    async requestLocationAccess() {
      this.locationLoading = true;

      try {
        if ("geolocation" in navigator) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log("현재 위치의 위도:", lat);
          console.log("현재 위치의 경도:", lng);
          alert("위치 정보를 성공적으로 가져왔습니다.");
        } else {
          alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
        }
      } catch (error) {
        if (error.code === error.PERMISSION_DENIED) {
          alert("위치 정보 엑세스를 허용해주세요. 설정에서 활성화해주세요.");
        } else {
          alert("위치 정보를 가져오지 못했습니다. 다시 시도해주세요.");
        }
      } finally {
        this.locationLoading = false;
      }
    },
    async searchPlaces(keyword) {
      console.log("Keyword:", keyword);
      if (keyword === "") {
        console.warn("검색어를 입력해주세요.");
        return;
      }
      try {
        await this.$store.dispatch("fetchSearchResults", keyword);
        console.log("검색 성공, MapPage로 이동");

        if (this.$router.currentRoute.name !== "MapPage") {
          this.$router.push({ name: "MapPage" });
        }
      } catch (error) {
        console.error("검색 중 오류 발생: ", error);
      }
    },
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

<style scoped>
* {

  box-sizing: border-box; 
  overflow-x: hidden;

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
.main-header-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-header-image img {
  height: 100%; /* 이미지 높이 조절 */
  max-height: 200px; /* 최대 높이 설정 */
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
  font-size: 25px;
}
.button-container2 {
  font-size: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 90%;
  max-width: 800px;
  margin-top: 300px;

}
.button-container3 {
  font-size: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 90%;
  max-width: 800px;
  margin-top: 50px;
}

.round-button2 {
  padding: 15px;
  border: none;
  background-color: transparent;
  text-align: center;
  text-decoration: none;
  width: 200px;
  height: 220px;
  overflow: hidden;
  border-radius: 10px;
}
/* 첫 번째 .round-button2는 왼쪽에 마진 추가하지 않음 */
.round-button2:first-child {
  margin-left: 0;
}

/* 마지막 .round-button2는 오른쪽에 마진 추가하지 않음 */
.round-button2:last-child {
  margin-right: 0;
}

.round-button2 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.round-button2:hover {
  background-color: #e7dfd0;
}
img {
  border-radius: 10%;
}
</style>

