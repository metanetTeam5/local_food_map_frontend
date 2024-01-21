<template>
  <b-container>
    <b-row class="justify-content-md-center" v-if="isReviewFormVisible">
      <b-col lg="8">
        <b-card title="리뷰 작성하기" class="mt-3">
          <b-form @submit.prevent="submitReview">
            <b-form-group label="별점">
              <star-rating :rating="review.revwStarRate" :read-only="false">
                @rating-selected="onRatingSelected" ></star-rating
              >
            </b-form-group>

            <b-form-group label="리뷰 내용" label-for="input-content">
              <b-form-textarea
                id="input-content"
                v-model="review.revwContent"
                rows="4"
                required
              />
            </b-form-group>

            <b-form-group>
              <b-form-file
                v-model="file"
                :state="Boolean(file)"
                placeholder="이미지를 업로드하세요"
                drop-placeholder="파일을 여기에 끌어다 놓으세요"
                accept="image/*"
                @change="handleFileUpload"
              />
            </b-form-group>

            <b-button type="submit" variant="primary">제출하기</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";

export default {
  components: {
    "star-rating": StarRating,
  },
  props: ["resvId", "restId"],
  data() {
    return {
      review: {
        revwStarRate: 1,
        revwContent: "",
        restId: this.$route.params.restId,
      },
      selectedFile: null,
      // selectedReservationId: this.resvId,
      selectedReservationId: this.$route.params.resvId,
      // isReviewFormVisible: false,
      isReviewFormVisible: true,
    };
  },
  methods: {
    showReviewForm(reservationId, restId) {
      this.isReviewFormVisible = true;
      this.review.restId = restId; // 이전 페이지 또는 컴포넌트로부터 받아온 restId
      this.selectedReservationId = reservationId;
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async submitReview() {
      const formData = new FormData();
      formData.append(
        "review",
        new Blob([JSON.stringify(this.review)], { type: "application/json" })
      );
      formData.append("file", this.selectedFile);
      console.log(this.review);

      try {
        let token = sessionStorage.getItem("token");
        // const response = await axios.post(`http://localhost:8088/reviewimage/reservation/${this.selectedReservationId}`, formData);
        const response = await axios.post(
          `http://localhost:8088/reviewimage/reservation/${this.selectedReservationId}`,
          formData,
          {
            headers: {
              "X-AUTH-TOKEN": token.toString(),
            },
          }
        );
        console.log(response.data);
        // 리뷰 제출 후 처리 로직
        this.isReviewFormVisible = false; // 폼 숨기기
        this.$router.push({ name: "MemberReservations" });
        this.$router.go(0);
        // 추가적인 성공 메시지나 상태 업데이트를 할 수 있습니다.
      } catch (error) {
        console.error("리뷰 제출에 실패했습니다.", error);
        // 에러 처리 로직을 추가할 수 있습니다.
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 767.98px) {
  .bg-variant-primary {
    background-color: #007bff !important; /* 이 부분은 원하는 색상으로 변경하세요. */
  }
}
</style>
