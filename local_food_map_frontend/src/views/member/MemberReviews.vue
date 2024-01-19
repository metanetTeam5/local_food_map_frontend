<template>
  <div>
    <div class="container-fluid mypage-container">
      <div class="row">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li class="nav-item">
                <router-link class="nav-link align-middle px-0" to="/mypage">
                  <div class="ms-1 d-none d-sm-inline menu-span">
                    개인정보수정
                  </div>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link align-middle px-0" to="/mypage/reservations">
                  <div class="ms-1 d-none d-sm-inline menu-span">예약 내역</div>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link align-middle px-0" to="/mypage/reviews">
                  <div class="ms-1 d-none d-sm-inline menu-span selected-menu">
                    리뷰 관리
                  </div>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link align-middle px-0" to="/mypage/favorites">
                  <div class="ms-1 d-none d-sm-inline menu-span">나의 찜</div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col py-3">
        <div v-if="isLoading"></div>
        <!-- <div v-if="isLoading" class="alert alert-info" role="alert">로딩중</div> -->

        <div v-else>
          <div>
            <table class="table2">
              <h2 class="mb-4">나의 리뷰 관리</h2>
              <tbody>
                <tr v-for="(rev, index) in paginatedReviews" :key="index">
                  <td>
                    <div class="d-flex align-items-start review-context">
                      <div class="mr-3">
                        <img
                          v-if="rev.revwImg"
                          class="rounded profileImg"
                          :src="rev.revwImg"
                          alt="식당 이미지"
                        />
                        <img
                          v-else
                          class="rounded profileImg"
                          src="../../assets/images/아맛무 로고.png"
                          alt="기본 리뷰 이미지"
                        />
                      </div>
                      <div id="review">
                        <p><strong>식당 이름:</strong> {{ rev.restName }}</p>
                        <p><strong>별점:</strong> {{ rev.revwStarRate }}</p>
                        <p><strong>리뷰 내용:</strong> {{ rev.revwContent }}</p>
                        <p>
                          <strong>작성 날짜:</strong> {{ rev.revwCreateDate }}
                        </p>
                      </div>
                      <button @click="showModal(rev)" class="btn btn-danger mt-3">
                        수정
                      </button>
                      <button @click="deleteReview(rev.revwId)" class="btn btn-danger mt-3">
                        삭제
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination justify-content-center">
                <button @click="fetchPrevPage" :disabled="currentPage === 1" class="btn btn-primary">
                  이전
                </button>
                <span class="mx-3">페이지 {{ currentPage }} / {{ totalPages }}</span>
                <button @click="fetchNextPage" :disabled="currentPage === totalPages" class="btn btn-primary">
                  다음
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="isModalVisible" title="리뷰 수정하기" hide-footer size="lg" @hide="resetModal">
      <div v-if="selectedReview">
        <form @submit.prevent="editReview(selectedReview.revwId)">
          <div class="form-group">
            <label for="reviewContent">리뷰 내용</label>
            <textarea id="reviewContent" class="form-control" v-model="selectedReview.revwContent" required></textarea>
          </div>
          <div class="form-group">
            <label for="reviewRating">별점</label>
            <select id="reviewRating" class="form-control" v-model="selectedReview.revwStarRate" required>
              <option value="1">1 별</option>
              <option value="1">1.5 별</option>
              <option value="2">2 별</option>
              <option value="2">2.5 별</option>
              <option value="3">3 별</option>
              <option value="3">3.5 별</option>
              <option value="4">4 별</option>
              <option value="4">4.5 별</option>
              <option value="4">5 별</option>
            </select>
          </div>
          <div class="form-group">
            <label for="fileUpload">파일 업로드</label>
            <input type="file" id="fileUpload" @change="handleFileUpload">
          </div>
          <button @click="editReview(selectedReview.revwId)" class="btn btn-primary">OK</button>
        </form>
      </div>
    </b-modal>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MemberReviews",
  data() {
    return {
      file: null,
      isModalVisible: false,
      selectedReview: null,
      isLoading: true,
      reviewList: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    // Calculate the paginated reviews based on the currentPage
    paginatedReviews() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.reviewList.slice(start, end);
    },
    // Calculate the total number of pages
    totalPages() {
      return Math.ceil(this.reviewList.length / this.pageSize);
    },
  },

  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    resetModal() {
      this.selectedReview = null;
    },
    showModal(rev) {
      this.selectedReview = rev;
      this.isModalVisible = true;
    },
    async getReviews() {
      let token = sessionStorage.getItem("token");
      if (token !== null) {
        let response;
        try {
          response = await axios.get(
            process.env.VUE_APP_API_ENDPOINT + "/review/myreviews",
            {
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            }
          );
          console.log(response.data);
          this.reviewList = response.data;

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
    async deleteReview(revwId) {
      let token = sessionStorage.getItem("token");
      let response;
      try {
        response = await axios.delete(
          process.env.VUE_APP_API_ENDPOINT + "/review/delete/" + revwId,
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
        alert("찜 삭제 실패");
      }
    },
    async editReview(revwId) {
      let token = sessionStorage.getItem("token");
      let response;

      // const updatedReviewData = {
      //   revwContent: this.selectedReview.revwContent,
      //   revwStarRate: this.selectedReview.revwStarRate
      // }

      let formData = new FormData();
      // formData.append('revwContent', this.selectedReview.revwContent);
      // formData.append('revwStarRate', this.selectedReview.revwStarRate);

      // 파일이 있으면 FormData에 추가
      // if (this.file) {
      //   formData.append('file', this.file);
      // }
      let reviewDto = JSON.stringify({
        revwContent: this.selectedReview.revwContent,
        revwStarRate: this.selectedReview.revwStarRate
      });
      formData.append('review', new Blob([reviewDto], { type: "application/json" }));
      if (this.file) {
        formData.append('file', this.file);
      }

      try {
        response = await axios.put(
          process.env.VUE_APP_API_ENDPOINT + "/review/update/" + revwId,
          formData,
          {
            headers: {
              "X-AUTH-TOKEN": token.toString(),
              "Content-Type": "multipart/form-data"
            },
          }
        );
        console.log(response.data);

        this.$router.go(0);
      } catch (error) {
        console.error(error);
        alert("리뷰 수정 실패");
      }

    },
    // Fetch reviews based on the current page
    fetchReviews() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;

      // Fetch reviews for the current page range
      const reviewsForPage = this.reviewList.slice(start, end);
      this.isLoading = false;
      this.paginatedReviews = reviewsForPage;
    },

    // Fetch the previous page of reviews
    fetchPrevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchReviews();
      }
    },

    // Fetch the next page of reviews
    fetchNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchReviews();
      }
    },
  },
  mounted() {
    this.getReviews();
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
  margin-top: 100px;
  /* 헤더의 높이에 따라 조절 */
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
  display: block; /*span 으로 감싸서 크기영역을 블록요소로 만들어저야한다*/
  position: relative;
  /* border: 1px solid #000; */
}

.placehold-text:before {
  content: "@naver.com";
  position: absolute;
  /*before은 inline 요소이기 때문에 span으로 감싸줌 */
  right: 20px;
  top: 13px;
  pointer-events: none;
  /*자체가 가지고 있는 pointer event 를 없애준다 */
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

.table2 {
  width: 80%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}

.table2 th,
.table2 td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  width: 80%;
}

.table2 thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table2 tbody+tbody {
  border-top: 2px solid #dee2e6;
}

.table2 .table {
  background-color: #fff;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
}

.table-borderless th,
.table-borderless td,
.table-borderless thead th,
.table-borderless tbody+tbody {
  border: 0;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table-hover tbody tr:hover {
  color: #212529;
  background-color: rgba(0, 0, 0, 0.075);
}

.table-primary,
.table-primary>th,
.table-primary>td {
  background-color: #b8daff;
}

.table-primary th,
.table-primary td,
.table-primary thead th,
.table-primary tbody+tbody {
  border-color: #7abaff;
}

.table-hover .table-primary:hover {
  background-color: #9fcdff;
}

.table-hover .table-primary:hover>td,
.table-hover .table-primary:hover>th {
  background-color: #9fcdff;
}

.table-secondary,
.table-secondary>th,
.table-secondary>td {
  background-color: #d6d8db;
}

.table-secondary th,
.table-secondary td,
.table-secondary thead th,
.table-secondary tbody+tbody {
  border-color: #b3b7bb;
}

.table-hover .table-secondary:hover {
  background-color: #c8cbcf;
}

.table-hover .table-secondary:hover>td,
.table-hover .table-secondary:hover>th {
  background-color: #c8cbcf;
}

.table-success,
.table-success>th,
.table-success>td {
  background-color: #c3e6cb;
}

.table-success th,
.table-success td,
.table-success thead th,
.table-success tbody+tbody {
  border-color: #8fd19e;
}

.table-hover .table-success:hover {
  background-color: #b1dfbb;
}

.table-hover .table-success:hover>td,
.table-hover .table-success:hover>th {
  background-color: #b1dfbb;
}

.table-info,
.table-info>th,
.table-info>td {
  background-color: #bee5eb;
}

.table-info th,
.table-info td,
.table-info thead th,
.table-info tbody+tbody {
  border-color: #86cfda;
}

.table-hover .table-info:hover {
  background-color: #abdde5;
}

.table-hover .table-info:hover>td,
.table-hover .table-info:hover>th {
  background-color: #abdde5;
}

.table-warning,
.table-warning>th,
.table-warning>td {
  background-color: #ffeeba;
}

.table-warning th,
.table-warning td,
.table-warning thead th,
.table-warning tbody+tbody {
  border-color: #ffdf7e;
}

.table-hover .table-warning:hover {
  background-color: #ffe8a1;
}

.table-hover .table-warning:hover>td,
.table-hover .table-warning:hover>th {
  background-color: #ffe8a1;
}

.table-danger,
.table-danger>th,
.table-danger>td {
  background-color: #f5c6cb;
}

.table-danger th,
.table-danger td,
.table-danger thead th,
.table-danger tbody+tbody {
  border-color: #ed969e;
}

.table-hover .table-danger:hover {
  background-color: #f1b0b7;
}

.table-hover .table-danger:hover>td,
.table-hover .table-danger:hover>th {
  background-color: #f1b0b7;
}

.table-light,
.table-light>th,
.table-light>td {
  background-color: #fdfdfe;
}

.table-light th,
.table-light td,
.table-light thead th,
.table-light tbody+tbody {
  border-color: #fbfcfc;
}

.table-hover .table-light:hover {
  background-color: #ececf6;
}

.table-hover .table-light:hover>td,
.table-hover .table-light:hover>th {
  background-color: #ececf6;
}

.table-dark,
.table-dark>th,
.table-dark>td {
  background-color: #c6c8ca;
}

.table-dark th,
.table-dark td,
.table-dark thead th,
.table-dark tbody+tbody {
  border-color: #95999c;
}

.table-hover .table-dark:hover {
  background-color: #b9bbbe;
}

.table-hover .table-dark:hover>td,
.table-hover .table-dark:hover>th {
  background-color: #b9bbbe;
}

.table-active,
.table-active>th,
.table-active>td {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-hover .table-active:hover {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-hover .table-active:hover>td,
.table-hover .table-active:hover>th {
  background-color: rgba(0, 0, 0, 0.075);
}

.table2 .thead-dark th {
  color: #fff;
  background-color: #212529;
  border-color: #32383e;
}

.table2 .thead-light th {
  color: #495057;
  background-color: #e9ecef;
  border-color: #dee2e6;
}
/* .mr-3 {
  width: 30%;
  height: 50% !important;
} */

#review {
  margin-left: 10%;
  margin-top: 2%;
  font-size: 30px;
}

.profileImg {
  width: 200px;
  height: 200px !important;
}

.btn-primary {
  background-color: #fac24d !important;
  border-color: #fac24d !important;
}

/* 모달 본문에 추가 패딩을 적용하여 높이를 늘립니다 */
.modal-body {
  padding-top: 2rem;
  /* 상단 패딩 */
  padding-bottom: 2rem;
  /* 하단 패딩 */
}

/* 필요한 경우 모달 컨테이너의 최소 높이를 지정합니다 */
.modal-content {
  min-height: 500px;
  /* 모달의 최소 높이 설정 */
}
</style>
