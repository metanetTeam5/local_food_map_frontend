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
        <!-- <div v-if="isLoading">로딩중</div> -->
        <div v-if="isLoading"></div>
        <div v-else>
          <div>
            <table class="table2">
              <h2 class="mb-4">나의 예약 내역</h2>
              <tr v-for="(resv, index) in reservationList" :key="index">
                <td>
                  <div class="d-flex align-items-start review-context">
                    <div class="mr-3">
                      <img
                        v-if="resv.restImg"
                        class="rounded profileImg"
                        :src="resv.restImg"
                        alt="식당 이미지"
                      />
                      <img
                        v-else
                        class="rounded profileImg"
                        src="../../assets/images/아맛무 로고.png"
                        alt="기본 식당 이미지"
                      />
                    </div>
                    <div id="reservation">
                      식당 이름 : {{ resv.restName }} <br />
                      예약 날짜 : {{ resv.resvDate }} <br />
                      예약 시간 : {{ resv.resvHour }} <br />
                      인원 수 : {{ resv.resvHeadCount }}명 <br />
                      예약 한 날짜 : {{ resv.resvCreateDate }} <br />
                      예약금 :
                      {{ resv.resvPayAmount.toLocaleString() }} 원<br />
                      요청사항 : {{ resv.resvRequirement }} <br />
                      <span v-if="resv.resvStatus === 'C'" style="color: blue"
                        >예약 상태 : 방문 완료
                        <button
                          v-if="resv.reviewCreated"
                          @click="modalOpen(resv.revwId, resv.restName)"
                        >
                          리뷰 보기
                        </button>
                        <button v-else @click="registerReview(resv)">
                          리뷰 작성하기
                        </button>
                      </span>
                      <span
                        v-else-if="resv.resvStatus === 'O'"
                        style="color: green"
                        >예약 상태 : 예약 완료
                        <br />
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Reservation Buttons"
                        >
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click="modalReservationOpen(resv.resvId)"
                          >
                            예약 수정
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="cancelReservation(resv.resvId)"
                          >
                            예약 취소
                          </button>
                        </div>
                      </span>
                      <span
                        v-else-if="resv.resvStatus === 'X'"
                        style="color: red"
                        >예약 상태 : 예약 취소</span
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="modalCheck" class="modal-wrap">
        <div class="modal-container">
          <!-- 모달창 content -->
          <img
            v-if="selectedReview.revwImg"
            class="profile"
            :src="selectedReview.revwImg"
            alt="식당 이미지"
          />
          <img
            v-else
            class="profile"
            src="../../assets/images/아맛무 로고.png"
            alt="기본 식당 이미지"
          />
          식당 이름 : {{ selectedReview.restName }} <br />
          별점 : {{ selectedReview.revwStarRate }} <br />
          리뷰 내용 : {{ selectedReview.revwContent }} <br />
          작성 날짜 : {{ selectedReview.revwCreateDate }}

          <div class="modal-btn">
            <button @click="modalClose">닫기</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="modalReservationCheck" class="modal-wrap">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- 모달창 content -->
          <form @submit.prevent="submitReservation" class="p-4">
            <h5 class="mb-4">예약 정보 입력</h5>
            <div class="form-group">
              <label for="headcount"
                >인원 수: {{ reservation.headcount }}명
              </label>
            </div>

            <div class="form-group">
              <label for="resvDate">날짜:</label>
              <input
                type="date"
                class="form-control"
                id="resvDate"
                v-model="reservation.resvDate"
                :min="minDate"
                required
                @change="resetReservationHour"
              />
            </div>

            <div class="form-group">
              <label for="resvHour">시간:</label>
              <div class="time-buttons">
                <button
                  v-for="hour in availableHours"
                  :key="hour"
                  @click="setReservationHour(hour)"
                  :disabled="isPastTime(hour) || !reservation.resvDate"
                  :class="{
                    'btn-primary': reservation.resvHour === hour,
                    selected: selectedHour === hour,
                  }"
                >
                  {{ hour }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="additionalRequirements">추가 요구사항:</label>
              <textarea
                class="form-control"
                id="additionalRequirements"
                v-model="reservation.additionalRequirements"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label>1인당 보증금: 10,000원</label>
              <p>{{ deposit }}</p>
            </div>

            <div class="modal-btn text-right">
              <button
                type="button"
                class="btn btn-secondary"
                @click="modalReservationClose"
              >
                닫기
              </button>

              <button
                type="submit"
                class="btn btn-primary"
                :disabled="!reservation.resvHour"
                @click="updateReservation(reservation.resvId)"
              >
                <div id="pay">수정하기</div>
              </button>
            </div>
          </form>
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
      selectedReview: null,
      modalCheck: false,
      modalReservationCheck: false,
      reservation: {
        headcount: 0,
        resvDate: null,
        resvHour: null,
        additionalRequirements: "",
        resvId: null,
      },
      selectedHour: null,
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
    async registerReview(resv) {
      console.log(resv);
      //     this.$router.push({
      //     name: 'ReviewCreate',
      //     params: { resvId: resv.resvId, restId: resv.restId }
      //   })

      this.$router.push("/review-create/" + resv.resvId + "/" + resv.restId);
    },
    async modalOpen(revwId, restName) {
      let response = await axios.get(
        process.env.VUE_APP_API_ENDPOINT + "/review/search/" + revwId
      );

      console.log(response.data);

      this.selectedReview = response.data;
      this.selectedReview.restName = restName;

      this.modalCheck = !this.modalCheck;
    },
    modalClose() {
      this.modalCheck = !this.modalCheck;
      this.selectedReview = null;
    },
    async updateReservation(resvId) {
      let token = sessionStorage.getItem("token");
      if (token !== null) {
        let response;
        try {
          response = await axios.put(
            process.env.VUE_APP_API_ENDPOINT +
              "/member/reservation/update/" +
              resvId,
            {
              resvDate: this.reservation.resvDate,
              resvHour: this.reservation.resvHour,
              resvRequirement: this.reservation.additionalRequirements,
            },
            {
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            }
          );

          console.log(response.data);

          this.$router.go(0);
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("로그인 후 이용 가능합니다.");
        this.$router.push({ name: "HomePage" });
        this.$router.go(0);
      }
    },
    async cancelReservation(resvId) {
      let token = sessionStorage.getItem("token");
      if (token !== null) {
        let response;
        try {
          response = await axios.post(
            process.env.VUE_APP_API_ENDPOINT +
              "/member/reservation/cancel/" +
              resvId,
            null,
            {
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            }
          );

          console.log(response.data);

          this.$router.go(0);
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("로그인 후 이용 가능합니다.");
        this.$router.push({ name: "HomePage" });
        this.$router.go(0);
      }
    },
    async modalReservationOpen(resvId) {
      let response = await axios.get(
        process.env.VUE_APP_API_ENDPOINT + "/member/reservation/info/" + resvId
      );
      this.reservation.headcount = response.data.resvHeadCount;
      this.reservation.additionalRequirements = response.data.resvRequirement;
      this.reservation.resvId = resvId;

      this.modalReservationCheck = !this.modalReservationCheck;
    },
    submitReservation() {
      console.log("Reservation Submitted:", this.reservation);
    },
    setReservationHour(hour) {
      this.reservation.resvHour = hour;
      this.selectedHour = hour;
    },
    resetReservationHour() {
      this.reservation.resvHour = null;
      this.selectedHour = null;
    },
    isPastTime(hour) {
      if (this.isToday()) {
        const selectedTime = new Date(`${this.currentDate} ${hour}`);
        const currentTime = new Date();
        return selectedTime <= currentTime;
      }
      return false;
    },
    isToday() {
      return this.reservation.resvDate === this.currentDate;
    },
    modalReservationClose() {
      this.headcount = 0;
      this.modalReservationCheck = !this.modalReservationCheck;
    },
  },
  mounted() {
    this.review.restId = this.restId;
    this.selectedReservationId = this.resvId;
    this.getReservations();
  },
  computed: {
    currentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    currentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    minHeadcount() {
      return 1;
    },
    deposit() {
      const formattedDeposit = (
        this.reservation.headcount * 10000
      ).toLocaleString();
      return `결제예정금액: ${this.reservation.headcount}(명) X 10,000 = ${formattedDeposit}원`;
    },
    availableHours() {
      const startHour = this.isToday() ? new Date().getHours() + 1 : 9;
      const endHour = 19;
      const intervalMinutes = 30;

      const hours = [];
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
          const formattedHour = String(hour).padStart(2, "0");
          const formattedMinute = String(minute).padStart(2, "0");
          hours.push(`${formattedHour}:${formattedMinute}`);
        }
      }

      return hours;
    },
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
/* dimmed */
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
.profileImg {
  width: 220px;
  height: 220px !important;
}

.review-context {
  font-size: 15px;
}
#reservation {
  margin-left: 10%;
  margin-top: 2%;
  font-size: 15px;
}
</style>
