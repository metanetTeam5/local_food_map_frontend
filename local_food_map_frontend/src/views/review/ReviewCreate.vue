<template>
    <div>
      <!-- 예약 내역을 나열하는 부분 -->
      <!-- <div v-for="reservation in reservations" :key="reservation.id">
        <div>{{ reservation.details }}</div>
        <button @click="showReviewForm(reservation.id, reservation.restId)">리뷰 작성</button>
      </div>
   -->
      <!-- 리뷰 작성 폼 -->
      <div v-if="isReviewFormVisible">
        <form @submit.prevent="submitReview">
          <input type="number" step="0.1" v-model="review.revwStarRate" placeholder="별점 (0.0 ~ 5.0)" />
          <textarea v-model="review.revwContent" placeholder="리뷰 내용"></textarea>
          <input type="file" @change="handleFileUpload" />
          <button type="submit">리뷰 제출</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
	import axios from 'axios';

  export default {
    data() {
      return {
        // isReviewFormVisible: false,
		isReviewFormVisible: true,
        review: {
          revwStarRate: 0,
          revwContent: '',
          restId: 3
        //   restId: null
        },
        selectedFile: null,
        selectedReservationId: null
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
        formData.append('review', new Blob([JSON.stringify(this.review)], { type: 'application/json' }));
        formData.append('file', this.selectedFile);
  
        try {
			let token = sessionStorage.getItem("token");
		// const response = await axios.post(`http://localhost:8088/reviewimage/reservation/${this.selectedReservationId}`, formData);
		const response = await axios.post(`http://localhost:8088/reviewimage/reservation/3`, formData,
		{
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            });
          console.log(response.data);
          // 리뷰 제출 후 처리 로직
  this.isReviewFormVisible = false; // 폼 숨기기
// 추가적인 성공 메시지나 상태 업데이트를 할 수 있습니다.
} catch (error) {
console.error("리뷰 제출에 실패했습니다.", error);
// 에러 처리 로직을 추가할 수 있습니다.
}
}
}
};
</script>