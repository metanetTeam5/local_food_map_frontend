<template>
  <div class="container-fluid mypage-container">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <div
          class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100"
        >
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li class="nav-item">
              <router-link class="nav-link align-middle px-0" to="/mypage">
                <div class="ms-1 d-none d-sm-inline menu-span">
                  개인정보수정
                </div></router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link align-middle px-0"
                to="/mypage/reservations"
              >
                <div class="ms-1 d-none d-sm-inline menu-span selected-menu">
                  예약 내역
                </div></router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link align-middle px-0"
                to="/mypage/reviews"
              >
                <div class="ms-1 d-none d-sm-inline menu-span">
                  리뷰 관리
                </div></router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link align-middle px-0"
                to="/mypage/favorites"
              >
                <div class="ms-1 d-none d-sm-inline menu-span">
                  나의 찜
                </div></router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col py-3">
        <h2>예약 내역</h2>
        <div v-if="isLoading">로딩중</div>
        <div v-else>
          <div>
            <table>
              <tr v-for="(resv, index) in reservationList" :key="index">
                <td>
                  <img
                    v-if="resv.restImg"
                    class="profile"
                    :src="resv.restImg"
                    alt="식당 이미지"
                  />
                  <img
                    v-else
                    class="profile"
                    src="../../assets/images/아맛무 로고.png"
                    alt="기본 식당 이미지"
                  />
                  식당 이름 : {{ resv.restName }} <br />
                  예약 날짜/시간 : {{ resv.resvDate }} {{ resv.resvHour }}
                  <br />
                  인원 수 : {{ resv.resvHeadCount }} <br />
                  예약 한 날짜 : {{ resv.resvCreateDate }} <br />
                  예약금 : {{ resv.resvPayAmount }} <br />
                  요청사항 : {{ resv.resvRequirement }} <br />
                  예약 상태 : {{ resv.resvStatus }}
                  <button
                    v-if="resv.reviewCreated"
                    @click="getReview(resv.revwId)"
                  >
                    리뷰 보러가기
                  </button>
                  <button v-else @click="registerReview(resv)">
                    리뷰 작성하기
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import router from '@/router/router';
import axios from "axios";

export default {
  props: ["resvId", "restId"],
  name: "MemberReservations",
  data() {
    return {
      review: {
        restId: this.restId,
      },
      isLoading: true,
      reservationList: [],
    };
  },
  methods: {
    async getReservations() {
      let token = sessionStorage.getItem("token");
      if (token !== null) {
        let response;
        try {
          response = await axios.get(
            process.env.VUE_APP_API_ENDPOINT + "/member/reservation/list",
            {
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            }
          );
          console.log(response.data);
          this.reservationList = response.data;

          this.isLoading = false;
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("로그인 후 이용 가능합니다.");
        this.$router.push({ name: "HomePage" });
        this.$router.go(0);
      }
    },
    async getReview() {},
    async registerReview(resv) {
      console.log(resv);
      this.$router.push("/review-create/" + resv.resvId + "/" + resv.restId);
    },
  },
  mounted() {
    this.review.restId = this.restId;
    this.selectedReservationId = this.resvId;
    this.getReservations();
  },
};
</script>

<style>
* {
  font-family: "BMHANNAPro";
}
.mypage-container {
  margin-top: 70px;
}
.menu-span {
  color: black;
}

.selected-menu {
  color: #ffae00;
}

.join-form {
  margin-top: 100px; /* 헤더의 높이에 따라 조절 */
}

.join-form h1 {
  font-size: 36px;
  text-align: center;
  color: #ffae00;
  margin-bottom: 30px;
  font-weight: normal;
}
div.container {
}

div.insert {
}

div.create {
  width: 800px;
  text-align: center;
  padding: 30px;
  margin: auto;
}

table {
  height: 300px;
  width: 900px;
  margin-right: auto;
  margin-left: auto;
}

td {
  border-bottom: 1px dotted black;
}

caption {
  text-align: left;
}

.col1 {
  background-color: white;
  border: solid 2px #fce205;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 0.8em;
}

.col2 {
  text-align: left;
  border: solid 2px #fce205;
  padding: 5px;
}

.but1 {
  height: 25px;
  width: 80px;
  background-color: #ffae00;
  color: white;
  border: 2px solid #ffae00;
  margin-left: 5px;
}

.but2 {
  height: 25px;
  width: 150px;
  background-color: #ffae00;
  color: white;
  border: 2px solid #ffae00;
  margin-left: 5px;
}

.but3 {
  height: 35px;
  width: 150px;
  background-color: #ffae00;
  color: white;
  border: 2px solid #ffae00;
  margin-left: 10px;
}

.but4 {
  height: 35px;
  width: 150px;
  background-color: #ffae00;
  color: white;
  border: 2px solid #ffae00;
  margin-right: 10px;
}

.but1:hover {
  background-color: #fed273;
  color: white;
  border: 2px solid #fed273;
}

.but2:hover {
  background-color: #fed273;
  color: white;
  border: 2px solid #fed273;
}

.but3:hover {
  background-color: #fed273;
  color: white;
  border: 2px solid #fed273;
}

.but4:hover {
  background-color: #fed273;
  color: white;
  border: 2px solid #fed273;
}

#checkAuthCodeBtn {
  margin-top: 10px;
}

p {
  font-size: 0.7em;
}

.g {
  font-size: 0.7em;
}

.c {
  font-size: 0.7em;
}

.a {
  font-size: 0.7em;
}

.num {
  color: red;
}

.field.tel-number div {
  display: flex;
}

.field.tel-number div input:nth-child(1) {
  flex: 2;
}

.field.tel-number div input:nth-child(2) {
  flex: 1;
}

.field.gender div {
  border: 1px solid #dadada;
  padding: 15px 5px;
  background-color: #fff;
}

.placehold-text {
  display: block; /*span 으로 감싸서 크기영역을 블록요소로 만들어ㅜ저야한다*/
  position: relative;
  /* border: 1px solid #000; */
}

.placehold-text:before {
  content: "@naver.com";
  position: absolute; /*before은 inline 요소이기 때문에 span으로 감싸줌 */
  right: 20px;
  top: 13px;
  pointer-events: none; /*자체가 가지고 있는 pointer event 를 없애준다 */
}

.userpw {
  /* background:url(./images/images2/icon-01.png) no-repeat center right 15px; */
  background-size: 20px;
  background-color: #fff;
}

.userpw-confirm {
  /* background:url(./images/images2/icon-02.png) no-repeat center right 15px; */
  background-size: 20px;
  background-color: #fff;
}

.member-footer {
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}

.member-footer div a:hover {
  text-decoration: underline;
  color: #2db400;
}

.member-footer div a:after {
  content: "|";
  font-size: 10px;
  color: #bbb;
  margin-right: 5px;
  margin-left: 7px;
  /*살짝 내려가 있기 때문에 위로 올려주기 위해 transform 사용하기*/
  display: inline-block;
  transform: translateY(-1px);
}

.member-footer div a:last-child:after {
  display: none;
}

@media (max-width: 768px) {
  .member {
    width: 100%;
  }
}

.color-red {
  color: red;
}
.profile {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.heart-button {
  float: right;
}
</style>
