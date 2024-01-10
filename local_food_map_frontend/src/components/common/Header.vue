<template>
  <header>
    <nav id="header" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/home"
          ><img src="../../assets/images/아맛무 로고.png" alt="Logo" style="height: 55px"
        /></a>
        <!-- <button
          class="navbar-toggler"
          type="button"
          @click="isCollapsed = !isCollapsed"
        >
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <div :class="{ 'navbar-collapse': true, collapse: isCollapsed }">
          <form
            class="form-inline my-2 my-lg-0 mx-auto"
            @submit.prevent="searchPlaces"
          >
            <div class="search-container position-relative">
              <input
                class="form-control mr-sm-2 search-input"
                type="search"
                placeholder="지역, 상호명 또는 메뉴로 검색"
                aria-label="Search"
                v-model="searchQuery"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0 search-button"
                type="submit"
              >
                <img src="../../assets/images/search.png" alt="Search" />
              </button>
            </div>
          </form>

          <!-- Header.vue -->
          <div class="navbar-nav ml-auto">
            <router-link class="nav-link" to="/login">로그인</router-link>
            <router-link class="nav-link" to="/join">회원가입</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
/* eslint-disable no-redeclare */
/* global kakao */ 

export default {
  name: "AppHeader",
  data() {
    return {
      map: null, // 지도 객체
      markers: [], // 마커 배열
      infowindow: new kakao.maps.InfoWindow({ zIndex: 1 }), // 인포윈도우
      isCollapsed: true,
      searchQuery: "",
    };
  },
  mounted() {
    this.loadKakaoMapScript();
  },
  methods: {
    loadKakaoMapScript() {
      if (!window.kakao || !window.kakao.maps) {
        const script = document.createElement("script");
        script.onload = () => {
          kakao.maps.load(() => {
            // 스크립트 로드 완료 후 초기화 코드
          });
        };
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8f2894d655e069f08b65d82fbde8b6f3";
        document.head.appendChild(script);
      }
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 지도에 표시되어 있는 기존 마커를 제거
        this.clearMarkers();

        // 검색된 장소에 대한 마커 생성
        for (var i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
        }
      } else {
        console.error("검색 결과가 없습니다.");
      }
    },

    // 마커를 지도에 표시하는 함수
    displayMarker(place) {
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭 이벤트 추가
      kakao.maps.event.addListener(marker, "click", () => {
        this.infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        this.infowindow.open(this.map, marker);
      });

      // 마커를 마커 배열에 추가 (나중에 제거하기 위함)
      this.markers.push(marker);
    },

    // 지도에 표시된 마커를 모두 제거하는 함수
    clearMarkers() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    searchPlaces() {
      this.$store.dispatch('searchPlaces', this.searchQuery);
    },
  },
};
</script>

<style scoped>
#header {
  position: fixed;
  height: 70px;
  width: 100%; /* 페이지 전체 너비를 차지하도록 설정 */
  z-index: 1000;
}

.navbar navbar-expand-lg navbar-light bg-light {
  position: fixed;
}

.search-container {
  margin-left: 180px;
  width: 800px;
  font-family: 'BMHANNAPro';
}

.search-input {
  width: 100%;
  outline: none;
  font-family: 'BMHANNAPro';
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  display: none;
}

.search-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  outline: none;
}

.search-button:hover,
.search-input:hover {
  border: none;
  font-family: 'BMHANNAPro';
}

.search-button:focus,
.search-input:focus {
  border: none;
  font-family: 'BMHANNAPro';
}

.btn {
  padding: 0.5rem 1rem; 
  font-size: 0.8rem; 
}

.search-button {
  width: 3.5rem; 
  height: 3rem; 
  font-family: 'BMHANNAPro';
}

.search-button img {
  width: 100%;
  height: auto; 
  font-family: 'BMHANNAPro';
}

.bg-light {
    background-color: #FEFEF8!important;
}

.navbar-nav .nav-link {
  margin-right: 20px;
  color: #000000;
  font-family: 'BMHANNAPro';
}
.navbar-nav .nav-link:focus {
  outline: none;
}

.navbar-nav .nav-link:hover {
  color: #000000;
}

.navbar-nav .nav-link:active {
  color: #000000;
}

@media (min-width: 576px) {
  .form-inline .form-control {
    width: 100% !important;
  }
}
</style>