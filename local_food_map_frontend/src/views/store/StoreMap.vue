<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
        style="width: 380px"
      >
        <a
          href="/"
          class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
        >
          <svg class="bi me-2" width="30" height="24">
            <use xlink:href="#bootstrap" />
          </svg>
          <span class="fs-5 fw-semibold">List group</span>
        </a>
        <div class="list-group list-group-flush border-bottom scrollarea">
          <div class="sidebar-search-result" v-if="searchResults.length === 0">
            검색 결과가 없습니다.
          </div>

          <a
            v-for="restaurant in paginatedSearchResults"
            :key="restaurant.restId"
            class="list-group-item list-group-item-action py-3 lh-tight"
            @click="goToStoreDetail(restaurant.restId)"
          >
            <div class="col-10 mb-1 small">
              <div class="sidebar-item">
                <div class="sidebar-content">
                  <div
                    class="d-flex w-100 align-items-center justify-content-between"
                  >
                    <h4>{{ restaurant.restName }}</h4>
                  </div>
                  <div class="store-cate">
                    <p>{{ restaurant.restCategory }}</p>
                  </div>
                  <div class="store-loca">
                    <p>위치: {{ restaurant.restLocationName }}</p>
                  </div>
                  <div class="store-hash">
                    <p>{{ restaurant.restKeyword }}</p>
                  </div>
                </div>
                <div class="sidebar-image">
                  <img
                    :src="restaurant.restImg"
                    class="card-img-top"
                    alt="가게 이미지"
                  />
                </div>
              </div>
            </div>
          </a>
          <!-- 페이지네이션 버튼 -->
          <div class="pagination-buttons">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
            >
              &lt;
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              :class="{ selected: currentPage === page }"
            >
              {{ page }}
            </button>
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
            >
              &gt;
            </button>
          </div>

          <b-modal id="location-access-denied-modal" title="위치 정보 접근">
            위치 정보 접근이 거부되었습니다. 지도 기능을 완전히 활용하려면 위치
            정보 접근을 허용해주세요.
          </b-modal>
        </div>
      </div>

      <div id="map" class="col"></div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { apiService } from "../../js/apiService.js";
/* eslint-disable no-redeclare */
/* global kakao */

export default {
  name: "MapPage",

  watch: {
    searchResults(newResults) {
      this.clearMarkers();
      if (newResults.length > 0) {
        const firstResult = newResults[0];
        this.map.setCenter(
          new kakao.maps.LatLng(
            firstResult.restLocationY,
            firstResult.restLocationX
          )
        );
      }
      newResults.forEach((place) => {
        this.displayMarker(place);
      });
      this.$store.commit("toggleSearchMessage", false); // 검색 결과가 있을 때 메시지 숨기기
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      // infowindow: new kakao.maps.InfoWindow({ zIndex: 1 }),
      infowindow: null,
      result: {},
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    ...mapState(["searchResults"]),
    totalPages() {
      return Math.ceil(this.searchResults.length / this.itemsPerPage);
    },

    paginatedSearchResults() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.searchResults.slice(start, end);
    },
  },
  created() {
    // const searchQuery = this.$route.query.search;
    // this.fetchSearchResults(searchQuery);
    this.displaySearchResults();
    // 컴포넌트가 생성될 때 초기 데이터 로드
    this.fetchPageData(this.currentPage);
  },
  mounted() {
    this.initMap();
    this.getUserLocation();
  },
  methods: {
    ...mapActions(["fetchSearchResults"]),

    displaySearchResults() {
      this.clearMarkers();
      this.searchResults.forEach((place) => {
        this.displayMarker(place);
      });
    },

    goToStoreDetail(restId) {
      this.$router.push({ name: "StoreDetail", params: { restId } });
    },
    
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            this.initMap(position.coords.latitude, position.coords.longitude);
            this.searchPlaces(lat, lng);

            // "내 위치 주변 식당" 텍스트를 나타냅니다.
            this.$store.commit("setSearchMessage", "내 위치 주변 식당");
            this.$store.commit("toggleSearchMessage", true);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              // 사용자가 위치 정보 접근을 거부한 경우
              this.showLocationAccessDeniedAlert();
            }
            console.error("위치 정보 오류: ", error.message);
            this.initMap();

            // "내 위치 주변 식당" 텍스트를 나타냅니다.
            this.$store.commit("setSearchMessage", "내 위치 주변 식당");
            this.$store.commit("toggleSearchMessage", true);
          }
        );
      } else {
        console.error("이 브라우저는 위치 정보를 지원하지 않습니다.");
        this.initMap();

        // "내 위치 주변 식당" 텍스트를 나타냅니다.
        this.$store.commit("setSearchMessage", "내 위치 주변 식당");
        this.$store.commit("toggleSearchMessage", true);
      }
    },

    showLocationAccessDeniedAlert() {
      // alert(
      //   "위치 정보 접근이 거부되었습니다. 지도 기능을 완전히 활용하려면 위치 정보 접근을 허용해주세요."
      // );
      this.$bvModal.show("location-access-denied-modal");
    },

    ...mapActions(["searchPlaces"]),
    initMap(lat = 33.450701, lng = 126.570667) {
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 3,
        };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
      this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // infowindow 생성

      // 마커 이미지 경로 설정
      var MarkimageSrc = require("../../assets/images/로고마크표시.png");

      // 마커 이미지 사이즈 및 옵션 설정
      var MarkimageSize = new kakao.maps.Size(50, 53);
      var MarkimageOption = { offset: new kakao.maps.Point(27, 69) };

      // 마커 이미지 생성
      var markerImage = new kakao.maps.MarkerImage(
        MarkimageSrc,
        MarkimageSize,
        MarkimageOption
      );

      // 이미지 로드 완료 후 마커 생성
      var image = new Image();
      image.onload = () => {
        this.searchResults.forEach((place) => {
          this.displayMarker(place, markerImage);
        });
      };
      image.onerror = () => {
        console.error("마커 이미지 로드 실패");
      };
      image.src = MarkimageSrc;
    },

    displayMarker(restaurant, markerImage) {
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(
          restaurant.restLocationY,
          restaurant.restLocationX
        ),
        image: markerImage,
      });

      var infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${restaurant.restName}</div>`,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        this.goToStoreDetail(restaurant.restId);
      });

      var infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${restaurant.restName}</div>`,
      });

      kakao.maps.event.addListener(marker, "mouseover", () => {
        infowindow.open(this.map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });

      this.markers.push(marker);
    },
    clearMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },

    async fetchPageData(page) {
      try {
        const response = await apiService.getRestaurantsByPage(page);

        // 페이지에 해당하는 식당 데이터를 처리
        this.restaurants = response.data.restaurants;

        // 마지막 페이지 번호 업데이트 (서버에서 제공하는 경우)
        this.lastPage = Math.ceil(response.data.totalItems / this.itemsPerPage); // 'totalItems'는 예시, 실제 필드명에 맞게 조정
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
        // 오류 처리 로직
      }
    },

    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    prevPage() {
      if (this.startPage === 1) return;
      this.startPage -= 10;
      this.changePage(this.startPage);
    },
    nextPage() {
      if (this.startPage + 10 > this.lastPage) return;
      this.startPage += 10;
      this.changePage(this.startPage);
    },
  },
};
</script>


  
<style >
#map {
  /* 지도의 크기 설정 */
  width: 100%;
  flex-grow: 1; /* 남은 공간을 채움 */
  height: 100vh;
}
.list-group {
  height: 100vh; /* 뷰포트 높이에 맞춤 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 허용 */
}
.col-10 {
  flex: 0 0 83.333333%;
  max-width: 100%;
}
.sidebar-search-result {
  margin-top: 30px;
  padding: 20px;
}
.sidebar-content p {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 0.9em;
}

.sidebar {
  width: 250px; /* 사이드바 너비 */
}

.sidebar-item {
  display: flex;
}

.sidebar-content {
  flex: 1; /* 내용을 왼쪽에 배치 */
  padding: 1px; /* 여백 설정 */
  padding-top: 14px;
}

.sidebar-image {
  flex: 1; /* 이미지를 오른쪽에 배치 */
  padding: 1px; /* 여백 설정 */
}

.sidebar-image img {
  max-width: 100%; /* 이미지 너비 조정 */
  height: 150px;
}
.active {
  color: red;
}

.pagination-buttons button {
  border: none;
  background: none;
  cursor: pointer;
  color: black;
}

.pagination-buttons button:hover {
  color: rgb(255, 89, 0);
}

.pagination-buttons button.selected,
.pagination-buttons button:disabled {
  color: rgb(255, 89, 0);
}

.store-hash {
  color: rgb(255, 181, 70);
}

.store-cate,
.store-loca,
.store-hash {
  font-size: 14px;
}
</style>
  