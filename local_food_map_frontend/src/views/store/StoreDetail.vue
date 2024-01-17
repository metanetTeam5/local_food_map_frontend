<template>
  <div class="store-container">
    <div class="card store-card">
      <img :src="restaurant.restImg" class="card-img-top" alt="가게 이미지" />

      <!-- <img class="card-img-top" :src="review[0].revwImg" /> -->
      <div class="card-body">
        <h2 class="card-title store-title">{{ restaurant.restName }}</h2>
        <div class="store-category">
          <p>{{ restaurant.restStation }}</p>
          <p>{{ restaurant.restCategory }}</p>
        </div>
        <div class="store-score">
          <p>평균별점</p>
          <p class="text-left"></p>

          <p>{{ restaurant.restMaxResv }}점</p>
          <div class="store-star">
            <span class="fa fa-star star-active ml-3"></span>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-inactive"></span>
          </div>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div class="button-container">
            <!-- 버튼들 -->
            <!--하트버튼-->
            <button class="button button-like">
              <i class="fa fa-calendar-plus"></i>
              <span>예약</span>
            </button>
            <button class="button button-like" @click="copyToClipboard">
              <i class="fa fa-share"></i>
              <span>공유</span>
            </button>
            <button class="button button-like">
              <i class="fa fa-heart"></i>
              <span>Like</span>
            </button>
          </div>
        </li>
        <li class="list-group-item">
          <div class="store-info">
            <p>📍 {{ restaurant.restLocationName }}</p>
            <p>🗺️ 현재 위치에서 126m</p>
            <p>📞 {{ restaurant.restPhoneNumber }}</p>
            <p>{{ restaurant.restKeyword }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="card store-card">
      <div class="card-body">
        <div class="card-title-store">
          <div class="card-open">
            <h4 class="card-title store-title">영업시간</h4>
          </div>
        </div>
        <div class="store-category-date">
          <p>[오늘]</p>
          <p id="today-date">{{ todayDate }}</p>
          <p>
            영업시간:{{ restaurant.restOpenTime }}-{{
              restaurant.restCloseTime
            }}
          </p>
          <div class="store-opentime">
            <!-- <p>{{ storeDetails.restOpentime }}</p> -->
          </div>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h4 class="card-title store-menu">메뉴정보</h4>
          <div v-if="menu && menu.length">
            <div
              v-for="menuItem in menu"
              :key="menuItem.id"
              class="menu-item-container"
            >
              <p class="menu-name">{{ menuItem.menuName }}</p>
              <p class="menu-price">{{ menuItem.menuPrice }}원</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 세 번째 Store Card -->
    <div class="card store-card">
      <div class="card-body">
        <div id="map" style="width: 100%; height: 400px"></div>
      </div>
    </div>

    <!-- 네 번째 Store Card (방문자 평가) -->
    <!-- 
    <div
      class="card store-card"
      v-for="reviewItem in review"
      :key="reviewItem.revwId"
    > -->
    <div class="card store-card">
      <div class="card-body">
        <!-- 리뷰가 있는 경우 -->
        <div v-if="review && review.length > 0">
          <div class="card-title-store">
            <h5 class="card-title store-title">
              {{ review.length }}건의 방문자 평가
            </h5>
          </div>

          <!-- 개별 리뷰 항목 반복 -->
          <div
            v-for="reviewItem in review"
            :key="reviewItem.revwId"
            class="review-section"
          >
            <!-- 리뷰 프로필 및 정보 -->
            <div class="profile">
              <div class="profile-info">
                <img class="profile-pic" :src="reviewItem.membProfileImg" />
                <div class="profile-details">
                  <h3 class="mt-2 mb-0">{{ reviewItem.membNickname }}</h3>
                  <div class="review-info">
                    <span class="text-muted">{{
                      reviewItem.revwStarRate
                    }}</span>
                    <span class="fa fa-star star-active ml-3"></span>
                    <span class="fa fa-star star-active"></span>
                    <span class="fa fa-star star-active"></span>
                    <span class="fa fa-star star-active"></span>
                    <span class="fa fa-star star-inactive"></span>
                    <p class="profile-write">{{ reviewItem.revwCreateDate }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 리뷰 이미지 -->
            <div class="review--images">
              <!-- <img
              class="pic"
              v-for="(item, index) in review"
              :key="index"
              :src="item.revwImg"
              :class="{
                pic: index < 3,
                'special-pic': index === 3 && review.length > 4,
              }"
              @click="index === 3 && review.length > 4 ? openModal() : null"
            /> -->
              <img
                v-for="(img, index) in reviewItem.revwImgs"
                :key="index"
                :src="img"
                :class="{
                  pic: index < 4,
                  'special-pic': index === 3 && reviewItem.revwImgs.length > 4,
                }"
                @click="
                  index === 3 && reviewItem.revwImgs.length > 4
                    ? openModal()
                    : null
                "
              />
            </div>
          </div>
        </div>

        <!-- 리뷰가 없는 경우 -->
        <div v-else>
          <p>작성된 리뷰가 없습니다.</p>
        </div>
      </div>
    </div>

    <!-- 모달 창 -->
    <Modal v-if="showRivewModal" @close="showRivewModal = false">
      <div v-for="(item, index) in review" :key="index">
        <img :src="item.revwImg" class="modal-pic" />
      </div>
    </Modal>

    <!-- 페이지 하단 부분 -->
    <div class="container-fluid px-1 py-5 mx-auto">
      <div class="row justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-10 col-12 text-center mb-5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./modal/Modal.vue";
import { apiService } from "../../js/apiService.js";

export default {
  name: "storeDetailPage",
  components: {
    Modal,
  },
  data() {
    return {
      storeName: "",
      totalScore: {},
      showModal: false,
      showFavoriteModal: false,
      showReserveModal: false,
      showShareModal: false,
      restaurant: {
        restLocationName: "가게 위치 정보",
      },
      review: {},
      member: {},
      menu: {},
      todayDate: "",
      showRivewModal: false,
      isLiked: false,
    };
  },
  computed: {
    averageStarRate() {
      if (!this.review || this.review.length === 0) {
        return 0;
      }
      const total = this.review.reduce(
        (acc, item) => acc + item.revwStarRate,
        0
      );
      return total / this.review.length;
    },
  },

  created() {
    const restId = this.$route.params.restId;
    const memberId = this.$route.params.memberId;
    //식당 정보 가져오기
    apiService
      .getRestaurantById(restId)
      .then((response) => {
        this.restaurant = response.data;
        this.restLocationX = response.data.restLocationX; // 가게의 경도 정보
        this.restLocationY = response.data.restLocationY; // 가게의 위도 정보
      })
      .catch((error) => {
        console.error(error);
      });
    // 리뷰 정보 가져오기
    apiService
      .getReviewById(restId)
      .then((response) => {
        // this.review = response.data;
        this.review = this.processImageData(response.data);
      })
      .catch((error) => {
        console.error("리뷰 정보를 불러오는데 실패했습니다:", error);
      });
    //멤버 정보 가져오기
    apiService
      .getMemberById(memberId)
      .then((response) => {
        this.member = response.data;
        return this.$store.state.user.id;
      })
      .catch((error) => {
        console.error("멤버 정보를 불러오는데 실패했습니다:", error);
      });
    //메뉴 정보 가져오기
    apiService
      .getMenuById(restId)
      .then((response) => {
        console.log(response.data);
        this.menu = response.data;
      })
      .catch((error) => {
        console.error("메뉴 정보를 불러오는데 실패했습니다:", error);
      });
  },
  async mounted() {
    this.loadExternalCSS(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    );
    this.loadExternalCSS(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    );
    this.initializeMap();
    this.createMap();
    this.getTodayDate();
  },
  methods: {
    processImageData(reviewData) {
      return reviewData.map((item) => {
        // 이미지 URL이 쉼표로 구분되어 있다고 가정
        item.revwImgs = item.revwImg.split(","); // 문자열을 배열로 변환
        return item;
      });
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
    },
    copyToClipboard() {
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.value = this.restaurant.restLocationName;
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('주소가 복사 되었습니다!');
    },
    getTodayDate() {
      var today = new Date();
      var month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줌
      var day = today.getDate();

      // 날짜를 원하는 형식으로 조합
      var formattedDate = month + "/" + day + "일";

      this.todayDate = formattedDate; // 데이터 속성에 오늘의 날짜 저장
    },

    openModal() {
      this.showModal = true;
      this.showRivewModal = true;
    },
    closeModals() {
      this.showModal = false;
      this.showReserveModal = false;
      this.showShareModal = false;
      this.showFavoriteModal = false;
    },

    loadExternalCSS(url) {
      const link = document.createElement("link");
      link.href = url;
      link.rel = "stylesheet";
      link.type = "text/css";
      document.head.appendChild(link);
    },
    initializeMap() {
      const script = document.createElement("script");
      script.onload = () => this.createMap();
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4ee6fa1017dfbe37aa5850be2d9c3350&autoload=false";
      document.head.appendChild(script);
    },
    createMap() {
      kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            () => {
              // 'map' 변수를 여기에서 정의합니다.
              const mapContainer = document.getElementById("map");
              const options = {
                center: new kakao.maps.LatLng(
                  this.restLocationY,
                  this.restLocationX
                ),
                level: 3,
              };
              const map = new kakao.maps.Map(mapContainer, options);

              // 가게의 위치를 동적으로 설정합니다.
              const restLocationX = 127.007798; // 가게의 경도 정보
              const restLocationY = 37.575863; // 가게의 위도 정보

              // 마커 이미지 경로 설정
              var MarkimageSrc = require("../../assets/images/로고마크표시.png");

              // 마커 이미지 사이즈 및 옵션 설정
              var MarkimageSize = new kakao.maps.Size(50, 53);
              var MarkimageOption = { offset: new kakao.maps.Point(27, 69) };

              const markerImage = new kakao.maps.MarkerImage(
                MarkimageSrc,
                MarkimageSize,
                MarkimageOption
              );

              // 마커 생성 및 지도에 추가
              const markerPosition = new kakao.maps.LatLng(
                restLocationY,
                restLocationX
              );
              const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
              });
              marker.setMap(map);

              // 지도의 중심을 마커의 위치로 설정합니다.
              map.setCenter(markerPosition);
            },
            (error) => {
              console.error("Geolocation failed: " + error.message);
            }
          );
        } else {
          console.error("Your browser doesn't support geolocation.");
        }
      });
    },
  },
};
</script>

<style>
* {
  font-family: "BMHANNAPro";
}

.list-group-item p {
  margin-top: 8px;
  margin-bottom: 0;
}
.store-container {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.store-card {
  width: 100%;
  margin-bottom: 20px;
}

.card {
  /* height: 100%; */
  min-height: 200px;
  width: 60%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #c80000;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card {
  border-radius: 5px;
  background-color: #b30000;
  padding-left: 60px;
  padding-right: 60px;
  margin-top: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.card-img-top {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.card-title p {
  text-size: 20px;
}

.card-title-store {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.store-category {
  display: flex;
  align-items: center;
  margin-right: -30px;
}

.store-category-date {
  display: flex;
  align-items: center;
  margin-right: -30px;
}

.store-category p {
  margin-right: 10px;
  font-size: 16px;
  color: #979a9b;
}

.store-category-date p {
  margin-right: 10px;
  font-size: 17px;
}
.store-opentime {
  /* width: 10%; */
  flex-grow: 1; /* 남은 공간을 모두 차지 */
  text-align: right; /* 오른쪽 정렬 */
}

.store-category p:not(:last-child)::after {
  content: "|";
  margin-left: 10px;
  color: #333;
}

.store-star {
  margin-bottom: 13px;
}
.store-score {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.store-score p {
  margin-right: 5px;
  font-size: 15px;
}
.store-score-star p {
  margin-right: 1px;
}
.store-score i {
  margin-left: 10px;
}

.card-store-menu {
  width: 700px;
  display: inline-block;
}
.card-store-menu-price {
  display: inline-block;
  width: 80px;
  flex-direction: column;
  align-items: flex-end;
}
.card-store-menu-price p {
  text-align: right;
}

.card-store-menu p {
  overflow-wrap: break-word;
  white-space: pre;
  position: relative;
}

.card-store-menu p::after {
  content: " ------------------------------------------------------------";
  margin-top: 1em;
}

.modal-button-container {
  margin-left: 25px;
  height: 50px;
  align-content: center;
}
.modal-button-container button {
  margin-top: 8px;
  margin-right: 30px;
  padding: 5px 10px;
  background-color: none;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 120px;
}
.button-container button {
  margin-right: 25px;
}
.button-container button i {
  margin-right: 10px;
}

.map {
  width: 100%;
  height: 350px;
}
.stroe-review {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  padding: 10px 0; /* 리뷰 항목 위아래 패딩 */
}

.rating-box {
  width: 130px;
  height: 130px;
  margin-right: auto;
  margin-left: auto;
  background-color: #fbc02d;
  color: #fff;
}

.rating-label {
  font-weight: bold;
}

.rating-bar {
  width: 300px;
  padding: 8px;
  border-radius: 5px;
}

.bar-container {
  width: 100%;
  background-color: #f1f1f1;
  text-align: center;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 5px;
}

.bar-5 {
  width: 70%;
  height: 13px;
  background-color: #fbc02d;
  border-radius: 20px;
}

.bar-4 {
  width: 30%;
  height: 13px;
  background-color: #fbc02d;
  border-radius: 20px;
}

.bar-3 {
  width: 20%;
  height: 13px;
  background-color: #fbc02d;
  border-radius: 20px;
}

.bar-2 {
  width: 10%;
  height: 13px;
  background-color: #fbc02d;
  border-radius: 20px;
}

.bar-1 {
  width: 0%;
  height: 13px;
  background-color: #fbc02d;
  border-radius: 20px;
}

td {
  padding-bottom: 10px;
}

.star-active {
  color: #fbc02d;
  margin-top: 10px;
  margin-bottom: 10px;
}

.star-active:hover {
  color: #f9a825;
  cursor: pointer;
}

.star-inactive {
  color: #cfd8dc;
  margin-top: 10px;
  margin-bottom: 10px;
}

.blue-text {
  color: #0091ea;
}

.content {
  font-size: 18px;
}
.profile-write {
  margin-left: 17px;
  margin-top: 13px; /* 작성 날짜의 텍스트를 아래로 내리는 간격을 조정할 수 있습니다. */
  color: #858585;
}

.profile {
  display: flex;
  align-items: center;
}

.profile-info {
  display: flex;
  align-items: flex-start;
}

.profile-pic {
  height: 100px;
  margin-right: 10px;
  border-radius: 100%;
}

.profile-details {
  display: flex;
  flex-direction: column;
}

.review-info {
  display: flex;
  align-items: center;
  width: 200px;
}

.review-info span.text-muted {
  margin-right: 5px;
}

.vote {
  cursor: pointer;
}
.menu-item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.menu-name,
.menu-price {
  margin: 0;
  font-size: 17px;
}

.list-group-flush {
  height: 100%;
}

.store-info p {
  font-size: 15px;
}

.card-open {
  display: flex;
}

.pic {
  width: 170px;
  height: 180px;
  margin-right: 10px;
  object-fit: cover;
}

.special-pic {
  position: relative;
  filter: brightness(50%); /* 이미지를 어둡게 처리 */
}

.special-pic::after {
  content: "+"; /* 추가 텍스트 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  /* 필요한 추가 스타일 */
}

.modal-pic {
  /* 모달 내 이미지 스타일 */
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.review--images {
  width: 100%;
  margin-top: 40px;
}
/*하트버튼*/

.button-like {
  border: 2px solid #8a8a8a;
  background-color: transparent;
  text-decoration: none;
  padding: 1px;
  position: relative;
  vertical-align: middle;
  text-align: center;
  display: inline-block;
  border-radius: 3rem;
  color: #8a8a8a;
  transition: all ease 0.4s;
  width: 80px; /* 버튼의 가로 크기 */
  height: 30px; /* 버튼의 세로 크기 */
}

.button-like span {
  margin-left: 0.5rem;
}

.button-like .fa,
.button-like span {
  transition: all ease 0.4s;
  font-size: 0.9rem;
}

.button-like:focus {
  background-color: transparent;
}

.button-like:focus .fa,
.button-like:focus span {
  color: #8a8a8a;
}

.button-like:hover {
  border-color: #ff2b8a;
  background-color: transparent;
}

.button-like:hover .fa,
.button-like:hover span {
  color: #ff2b8a;
}

.liked {
  background-color: #ff2b8a;
  border-color: #ff2b8a;
}

.liked .fa,
.liked span {
  color: #fefefe;
}

.liked:focus {
  background-color: #cc4b37;
}

.liked:focus .fa,
.liked:focus span {
  color: #fefefe;
}

.liked:hover {
  background-color: #cc4b37;
  border-color: #cc4b37;
}

.liked:hover .fa,
.liked:hover span {
  color: #fefefe;
}

@media (max-width: 768px) {
  .card {
    /* 모바일 화면에서 적용될 스타일 */
    min-height: 150px; /* 모바일 화면에서 최소 높이 조정 */
  }
  /* 필요한 경우 다른 요소들에 대한 스타일 조정 */
}

@media (max-width: 768px) {
  .store-card {
    max-width: 100%; /* 모바일 화면에서 카드 너비 조정 */
  }
  .store-category p,
  .store-score p {
    font-size: smaller; /* 모바일 화면에서 텍스트 크기 조정 */
  }
  /* 필요한 경우 다른 요소들에 대한 스타일 조정 */
}
</style>
    