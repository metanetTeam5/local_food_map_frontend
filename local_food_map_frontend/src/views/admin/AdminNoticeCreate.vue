<template>
    <div class="notice-create-container">
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
        <button type="submit">작성완료</button>
      </form>
    </div>
  </template>




<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col lg="8">
        <b-card title="공지사항 작성하기" class="mt-3">
          <b-form @submit.prevent="submitForm">
            <b-form-group label="제목" label-for="notiTitle">
              <b-form-input
                id="notiTitle"
                type="text"
                v-model="notice.notiTitle"
                required
              />
            </b-form-group>

            <b-form-group label="내용" label-for="notiContent">
              <b-form-textarea
                id="notiContent"
                v-model="notice.notiContent"
                required
              />
            </b-form-group>

            <b-button type="submit" variant="primary">작성완료</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
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
    //   this.fetchNotice();
    },
    methods: {
    //   async fetchNotice() {
    //     try {
    //     //   const response = await this.$axios.get(`API_ENDPOINT/notice/${this.$route.params.id}`);
    //       const response = await axios.get(`http://localhost:8088/notice/${this.$route.params.id}`);
    //       this.notice = response.data;
    //     } catch (error) {
    //       console.error('Error fetching notice:', error);
    //     }
    //   },
      async submitForm() {
        try {
          let token = sessionStorage.getItem("token");
          
          await axios.post(`http://localhost:8088/admin/notice`, this.notice,
            {
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            });
          alert('공지사항이 생성되었습니다.');
          this.$router.push({ name: 'AdminNotice' });
        } catch (error) {
          console.error('Error updating notice:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .notice-create-container {
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
  