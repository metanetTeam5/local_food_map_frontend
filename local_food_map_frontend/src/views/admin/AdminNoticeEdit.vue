<template>
    <div class="notice-edit-container">
      <h1>공지사항 수정</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="notiTitle">제목</label>
          <input type="text" id="notiTitle" v-model="notice.notiTitle" required>
        </div>
        <div class="form-group">
          <label for="notiContent">내용</label>
          <textarea id="notiContent" v-model="notice.notiContent" required></textarea>
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        notice: {
          notiTitle: '',
          notiContent: '',
        }
      };
    },
    created() {
      this.fetchNotice();
    },
    methods: {
      async fetchNotice() {
        try {
        //   const response = await this.$axios.get(`API_ENDPOINT/notice/${this.$route.params.id}`);
          const response = await axios.get(`http://localhost:8088/notice/${this.$route.params.id}`);
          this.notice = response.data;
        } catch (error) {
          console.error('Error fetching notice:', error);
        }
      },
      async submitForm() {
        try {
          await axios.put(`http://localhost:8088/admin/notice/${this.$route.params.id}`, this.notice);
          alert('공지사항이 수정되었습니다.');
          this.$router.push({ name: 'AdminNoticeDetail', params: { id: this.$route.params.id } });
        } catch (error) {
          console.error('Error updating notice:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .notice-edit-container {
    /* 스타일링 */
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-group label {
    display: block;
  }
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  