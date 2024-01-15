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
            v-for="restaurant in searchResults"
            :key="restaurant.restId"
            class="list-group-item list-group-item-action py-3 lh-tight"
          >
            <div class="col-10 mb-1 small">
              <div class="sidebar-item">
                <div class="sidebar-content">
                  <div
                    class="d-flex w-100 align-items-center justify-content-between"
                  >
                    <strong class="mb-1">{{ restaurant.restName }}</strong>
                  </div>
                  <p>{{ restaurant.restCategory }}</p>
                  <p>{{ restaurant.restKeyword }}</p>
                  <p>위치: {{ restaurant.restLocationName }}</p>
                </div>
                <div class="sidebar-image">
                  <img
                    src="../../assets/images/food2.png"
                    alt="레스토랑 이미지"
                  />
                </div>
              </div>
            </div>
          </a>
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
// import { apiService } from "../../js/apiService.js";
/* eslint-disable no-redeclare */
/* global kakao */

export default {
  name: "MapPage",
  computed: {
    ...mapState(["searchResults"]),
  },
  // watch: {
  //   searchResults(newResults) {
  //     this.clearMarkers();
  //     newResults.forEach((place) => {
  //       this.displayMarker(place);
  //     });
  //   },
  // },
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
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      // infowindow: new kakao.maps.InfoWindow({ zIndex: 1 }),
      infowindow: null,
      result: {},
    };
  },
  created() {
    const searchQuery = this.$route.query.search;
    this.fetchSearchResults(searchQuery);
  },
  mounted() {
    this.initMap();
    this.getUserLocation();
  },
  methods: {
    ...mapActions(["fetchSearchResults"]),
    goToStoreDetail(restId) {
      this.$router.push({ name: "StoreDetail", params: { restId } });
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.initMap(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              // 사용자가 위치 정보 접근을 거부한 경우
              this.showLocationAccessDeniedAlert();
            }
            console.error("위치 정보 오류: ", error.message);
            this.initMap(); // 기본 위치로 초기화
          }
        );
      } else {
        console.error("이 브라우저는 위치 정보를 지원하지 않습니다.");
        this.initMap(); // 기본 위치로 초기화
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
      // 검색 결과를 기반으로 마커 생성
      this.searchResults.forEach((place) => {
        this.displayMarker(place);
      });
    },
    displayMarker(restaurant) {
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(
          restaurant.restLocationY,
          restaurant.restLocationX
        ),
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

      // kakao.maps.event.addListener(marker, "click", () => {
      //   this.infowindow.setContent(
      //     '<div style="padding:5px;">' + restaurant.restName + "</div>"
      //   );
      //   // this.infowindow.open(this.map, marker);
      // });

      this.markers.push(marker);
    },
    clearMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
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
</style>
  