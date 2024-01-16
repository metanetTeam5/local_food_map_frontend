<template>
    <div class="reviews-container">
      <div class="review-card" v-for="review in reviews" :key="review.revwId">
        <div class="review-header">
          <img class="avatar" :src="review.revwImg" alt="Reviewer's avatar">
          <div>
            <div class="review-author">{{ review.membNickname }}</div>
            <div class="review-rating">
              <!-- 별점을 표시하는 로직을 추가해야 합니다. 여기서는 예시로 별을 표시합니다. -->
              <i class="fa fa-star" v-for="n in Math.round(review.revwStarRate)" :key="n"></i>
            </div>
            <div class="review-date">{{ new Date(review.revwCreateDate).toLocaleDateString() }}</div>
          </div>
        </div>
        <div class="review-content">{{ review.revwContent }}</div>
        <!-- 리뷰 이미지가 있다면 표시합니다. -->
        <img v-if="review.revwImg" class="review-image" :src="review.revwImg" alt="Review Image">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reviews: [] // 이 배열은 API 호출로 채워질 것입니다.
    };
  },
  mounted() {
    this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      // 라우터의 params에서 ID를 가져와서 API를 호출합니다.
    //   const id = this.$route.params.id;
      try {
    // const response = await axios.get(``);/api/review/${id}
	const response = await axios.get(`http://localhost:8088/review/restaurant/${this.$route.params.id}`);
  await axios.post(`http://localhost:8088/admin/notice`, this.notice)
    this.reviews = response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}
}
};
</script>

<style scoped>
.reviews-container {
  /* 컨테이너 스타일 */
}

.review-card {
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fff;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
}

.review-author {
  font-weight: bold;
}

.review-rating .fa {
  color: gold;
}

.review-date {
  font-size: 0.85em;
  color: #757575;
}

.review-content {
  margin-bottom: 8px;
}

.review-image {
  max-width: 100%;
  border-radius: 4px;
}
</style>
