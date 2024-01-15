<template>
    <div class="board-container">
      <h1 class="board-title">{{ notice.notiTitle }}</h1>
      <div class="board-meta">
        <span class="board-date">{{ notice.notiCreateDate | formatDate }}</span>
        <span class="board-author">{{ notice.membNickname }}</span> <!-- 작성자 정보가 있다고 가정했습니다 -->
      </div>
      <hr class="board-divider" />
      <div class="board-content">{{ notice.notiContent }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        notice: null,
        // 예제를 위한 가상의 작성자 데이터 추가
        author: '작성자'
      };
    },
    mounted() {
      this.fetchNoticeDetail();
    },
    methods: {
      async fetchNoticeDetail() {
        try {
          const response = await axios.get(`http://localhost:8088/notice/${this.$route.params.id}`);
          this.notice = response.data;
        } catch (error) {
          console.error('Error fetching notice detail:', error);
        }
      }
    },
    filters: {
      formatDate(value) {
        if (value) {
          return new Date(value).toLocaleDateString('ko-KR');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .board-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .board-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .board-meta {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }
  
  .board-date {
    color: #333;
  }
  
  .board-author {
    color: #333;
  }
  
  .board-content {
    white-space: pre-wrap; /* 이렇게 하면 줄바꿈과 공백이 유지됩니다 */
    line-height: 1.6;
    font-size: 16px;
    color: #333;
  }
  </style>
  

<!-- <template>
    <div>
      <h1>{{ notice.notiTitle }}</h1>
      <p>{{ notice.notiContent }}</p>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        notice: null,
      };
    },
    mounted() {
      // 해당 공지사항의 상세 정보를 가져오는 메소드 호출
      this.fetchNoticeDetail();
    },
    methods: {
      async fetchNoticeDetail() {
        try {
          // 백엔드에서 해당 공지사항의 상세 정보를 가져오는 API 엔드포인트에 대한 요청
          const response = await axios.get(`http://localhost:8088/notice/${this.$route.params.id}`);
          this.notice = response.data;
        } catch (error) {
          console.error('Error fetching notice detail:', error);
        }
      }
    },
  };
  </script>
  
  <style scoped>
  /* 필요한 스타일 추가 */
  </style>
   -->