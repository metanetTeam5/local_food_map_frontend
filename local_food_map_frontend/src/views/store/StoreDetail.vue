<template>
  <div class="store-container">
    <div class="card store-card">
      <img src="../../assets/images/food3.png" class="card-img-top" alt="..." />
      <!-- <img class="card-img-top" :src="review[0].revwImg" /> -->
      <div class="card-body">
        <h5 class="card-title store-title">{{ restaurant.restName }}</h5>
        <div class="store-category">
          <p>{{ restaurant.restStation }}</p>
          <p>{{ restaurant.restCategory }}</p>
        </div>
        <div class="store-score">
          <p>평균별점</p>
          <p class="text-left">
            <span class="text-muted"
              ><p>{{ restaurant.restMaxResv }}점</p></span
            >
            <span class="fa fa-star star-active ml-3"></span>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-inactive"></span>
          </p>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div class="button-container">
            <!-- 버튼들 -->
            <div class="button-container">
              <button id="show-modal" @click="showModal = true">
                모달버튼
              </button>
              <button id="show-favorite-modal" @click="showLikeModal = true">
                즐겨찾기 모달
              </button>
              <button id="show-reserve-modal" @click="showReserveModal = true">
                예약 모달
              </button>
              <button id="show-share-modal" @click="showShareModal = true">
                공유 모달
              </button>

              <Modal v-if="showModal" @close="showModal = false">
                <h3 slot="header">식당이름</h3>
              </Modal>
              <Like v-if="showLikeModal" @close="showLikeModal = false"></Like>
              <ShareModal
                v-if="showShareModal"
                @close="showShareModal = false"
              ></ShareModal>
              <ReserveModal
                v-if="showReserveModal"
                @close="showReserveModal = false"
              ></ReserveModal>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <p>{{ restaurant.restLocationName }}</p>
          <p>현재 위치에서 126m</p>
          <p>{{ restaurant.restPhoneNumber }}</p>
          <p>{{ restaurant.restKeyword }}</p>
        </li>
      </ul>
    </div>

    <div class="card store-card">
      <div class="card-body">
        <div class="card-title-store">
          <h5 class="card-title store-title">영업시간</h5>
          <div class="card-title-store-title2">
            <h5 class="card-title store-title">🕒영업 중</h5>
          </div>
        </div>
        <div class="store-category-date">
          <p>[오늘]</p>
          <p>오늘날짜(일)</p>
          <p>
            영업시간:{{ restaurant.restOpenTime }}-{{restaurant.restCloseTime}}
          </p>
          <div class="store-opentime">
            <!-- <p>{{ storeDetails.restOpentime }}</p> -->
          </div>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h5 class="card-title store-menu">메뉴정보</h5>
          <div class="card-store-menu">
            <!-- <p>{{ Menu.menuName }}</p>
            <p>{{ Menu.menuName }}</p>
            <p>{{ Menu.menuName }}</p> -->
          </div>
          <div class="card-store-menu-price">
            <p>원</p>
            <p>원</p>
            <p>원</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 세 번째 Store Card -->
    <div class="card store-card">
      <div class="card-body">
        <div id="map"></div>
      </div>
    </div>

    <!-- 네 번째 Store Card (방문자 평가) -->
    <div class="card store-card">
      <div class="card-body">
        <div class="card-title-store">
          <h5 class="card-title store-title">
            {{ review.length }}건의 방문자 평가
          </h5>
        </div>
        <div class="card-body">
          <div class="row d-flex">
            <div class="">
              <img class="profile-pic" :src="member.profileImg" />
            </div>
            <div class="d-flex flex-column">
              <h3>{{ member.nickname }}</h3>
              <div>
                <p class="text-left">
                  <span class="text-muted">{{ review[0].revwStarRate }}</span>
                  <span class="fa fa-star star-active ml-3"></span>
                  <span class="fa fa-star star-active"></span>
                  <span class="fa fa-star star-active"></span>
                  <span class="fa fa-star star-active"></span>
                  <span class="fa fa-star star-inactive"></span>
                </p>
              </div>
            </div>
            <div class="ml-auto">
              <p class="text-muted pt-5 pt-sm-3">
                {{ review[0].revwCreateDate }}
              </p>
            </div>
          </div>
          <div class="row text-left">
            <p class="content">{{ review[0].revwContent }}</p>
          </div>
          <div class="row text-left">
            <img class="pic" :src="review[0].revwImg" />
            <img class="pic" :src="review[0].revwImg" />
            <img class="pic" :src="review[0].revwImg" />
          </div>
        </div>
      </div>
    </div>

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
import Like from "./modal/LikeModal.vue";
import ShareModal from "./modal/ShareModal.vue";
import ReserveModal from "./modal/ReserveModal.vue";
import { apiService } from "../../js/apiService.js";

export default {
  name: "storeDetailPage",
  components: {
    Modal,
    Like,
    ShareModal,
    ReserveModal,
  },
  data() {
    return {
      storeName: "",
      totalScore: {},
      showModal: false,
      showFavoriteModal: false,
      showReserveModal: false,
      showShareModal: false,
      restaurant: {},
      review: {},
      member: {},
      // favorite:{},
      // menu:{},
    };
  },
  created() {
    const restId = this.$route.params.restId;
    const memberId = 111;
    // const reviewId = 111;
    //식당 정보 가져오기
    apiService
      .getRestaurantById(restId)
      .then((response) => {
        this.restaurant = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    // 리뷰 정보 가져오기
    apiService
      .getReviewById(restId)
      .then((response) => {
        this.review = response.data;
      })
      .catch((error) => {
        console.error("리뷰 정보를 불러오는데 실패했습니다:", error);
      });
      //멤버 정보 가져오기 
      apiService
      .getMemberById(memberId)
      .then((response) => {
        this.member = response.data;
      })
      .catch((error) => {
        console.error("멤버 정보를 불러오는데 실패했습니다:", error);
      });
  },
  async mounted() {
    this.loadExternalCSS(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    );
    this.initializeMap();
    // await this.fetchData();
  },
  methods: {
    openModal() {
      this.showModal = true;
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
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=8f2894d655e069f08b65d82fbde8b6f3&autoload=false";
      document.head.appendChild(script);
    },
    createMap() {
      kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              let container = document.getElementById("map");
              let options = {
                center: new kakao.maps.LatLng(
                  position.coords.latitude,
                  position.coords.longitude
                ),
                level: 3,
              };
              new kakao.maps.Map(container, options);
              // 추가적인 지도 기능 구현
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
  width: 100%; /* 카드가 부모 컨테이너의 전체 너비를 차지하도록 설정 */
  margin-bottom: 20px;
}

.card {
  height: 100%;
  width: 60%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.card-img-top {
  max-width: 100%;
  height: auto;
}

.card-title-store {
  display: flex;
  align-items: center;
}

.card-title-store-title2 {
  /* margin-left: right; */
  width: 50%;
}

.store-category,
.store-category-date {
  
  display: flex;
  align-items: center;
  margin-right: -10px;
}

.store-category p {
  margin-right: 10px;
}

.store-category-date p {
  margin-right: 10px;
}
.store-opentime {
  width: 80%;
}
.store-opentime p {
  text-align: right;
}

.store-category p:not(:last-child)::after {
  content: "|";
  margin-left: 10px;
  color: #333;
}

.store-score {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.store-score p {
  margin-right: 5px;
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

.button-container {
  margin-left: 25px;
  height: 50px;
  align-content: center;
}
.button-container button {
  margin-top: 8px;
  margin-right: 30px;
  padding: 5px 10px;
  background-color: #dadada;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 120px;
}

.button-container button i {
  margin-right: 8px;
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

.card {
  border-radius: 5px;
  background-color: #fff;
  padding-left: 60px;
  padding-right: 60px;
  margin-top: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
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

.profile-pic {
  width: 90px;
  height: 90px;
  border-radius: 100%;
  margin-right: 30px;
}

.pic {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.vote {
  cursor: pointer;
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
    