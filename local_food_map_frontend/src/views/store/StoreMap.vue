<template>
  <div class="container-fluid">
    <div class="row">
      <!-- 사이드바 영역 -->
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
          <!-- 각 list-group-item 요소들 -->
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
          >
            <div class="col-10 mb-1 small">
              <div class="sidebar-item">
                <div class="sidebar-content">
                  <div
                    class="d-flex w-100 align-items-center justify-content-between"
                  >
                    <strong class="mb-1">돈천동돈까스</strong>
                  </div>
                  <p>#돈까스</p>
                  <p>129m</p>
                  <p>⭐4.1 리뷰(33개) ❤️ 300</p>
                  <p>"일본식 돈까스"</p>
                </div>
                <div class="sidebar-image">
                  <img
                    src="../../assets/images/food2.png"
                    alt="돈천동돈까스 이미지"
                  />
                </div>
              </div>
            </div>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>

          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
            aria-current="true"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
            aria-current="true"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
            aria-current="true"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-3 lh-tight"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">List group item heading</strong>
            </div>
            <div class="col-10 mb-1 small">
              Some placeholder content in a paragraph below the heading and
              date.
            </div>
          </a>
        </div>
      </div>

      <div id="map" class="col"></div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
/* eslint-disable no-redeclare */
/* global kakao */


export default {
  name: "MapPage",
  computed: {
    ...mapState(['searchResults']),
  },
  watch: {
    searchResults(newResults) {
      this.clearMarkers();
      newResults.forEach(place => {
        this.displayMarker(place);
      });
    },
  },
  data() {
    return {
      map: null,  
      markers: [],  
      infowindow: new kakao.maps.InfoWindow({ zIndex: 1 }), 
    };
  },
  mounted() {
    this.initMap();
    this.getUserLocation();
 
  },
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.initMap(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error('위치 정보 오류: ', error.message);
            this.initMap(); // 기본 위치로 초기화
          }
        );
      } else {
        console.error("이 브라우저는 위치 정보를 지원하지 않습니다.");
        this.initMap(); // 기본 위치로 초기화
      }
    },
    ...mapActions(['searchPlaces']), 
    initMap(lat = 33.450701, lng = 126.570667) {
      var mapContainer = document.getElementById('map'),
          mapOption = {
              center: new kakao.maps.LatLng(lat, lng),
              level: 3
          };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
    },
    displayMarker(place) {
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        this.infowindow.setContent('<div style="padding:5px;">' + place.place_name + '</div>');
        this.infowindow.open(this.map, marker);
      });

      this.markers.push(marker);
    },
    clearMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    
  }

};
</script>


  
  <style scoped>
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
  