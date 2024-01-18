<template>
  <div>
    <AdminSidebar />
    <div class="content">
      <div>
        <h1>공지사항 관리</h1>
        <br />
        <br />
      </div>
      <div class="content-area">
        <div class="search-area mb-4">
          <b-form-input v-model="searchQuery" type="search" placeholder="검색..." class="search-input">
          </b-form-input>
        </div>
        <b-table striped hover :items="notices" :fields="fields" :per-page="perPage" :current-page="currentPage"
          :filter="searchQuery" @row-clicked="navigateToDetail" class="notices-table">
          <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
          </template>
        </b-table>
        <div class="pagination-wrapper d-flex justify-content-between align-items-center my-3">
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"
            class="pagination">
          </b-pagination>
          <!-- <b-button variant="primary" @click="createNewNotice">글쓰기</b-button> -->
          <b-button variant="primary" @click="showModal">글쓰기</b-button>
        </div>
      </div>
    </div>
    <b-modal id="new-notice-modal" ref="newNoticeModal" title="공지사항 작성하기" ok-title="작성완료" @ok="submitForm"
      :ok-disabled="!isFormValid">
      <b-form @submit.stop.prevent="submitForm">
        <b-form-group label="제목" label-for="notiTitle">
          <b-form-input id="notiTitle" v-model="notice.notiTitle" required @input="validateForm" />
        </b-form-group>

        <b-form-group label="내용" label-for="notiContent">
          <b-form-textarea id="notiContent" v-model="notice.notiContent" required @input="validateForm" />
        </b-form-group>
        <!-- <b-button type="submit" variant="primary">작성완료</b-button> -->
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import AdminSidebar from './AdminSidebar.vue';

export default {
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      perPage: 5,
      rows: 0, // 총 데이터 수
      notices: [],
      fields: [
        { key: 'index', label: '글 번호' },
        { key: 'notiTitle', label: '제목' },
        {
          key: 'notiCreateDate',
          label: '작성일자',
          formatter: (value) => {
            return this.$options.filters.formatDate(value);
          }
        },
        { key: 'notiViews', label: '조회수' },
      ],
      notice: {
        notiTitle: '',
        notiContent: '',
      },
      isFormValid: false,
    };
  },
  components: {
    AdminSidebar
  },
  mounted() {
    this.fetchNotices();
  },
  methods: {
    async fetchNotices() {
      try {
        const response = await axios.get('http://localhost:8088/notice');
        this.rows = response.data.length; // 총 데이터 수 업데이트
        this.notices = response.data;
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    },
    navigateToDetail(item) {
      this.$router.push({ name: 'AdminNoticeDetail', params: { id: item.notiId } });
    },
    createNewNotice() {
      this.$router.push({ name: 'AdminNoticeCreate' }); // Replace with your actual route
    },
    showModal() {
      this.$refs.newNoticeModal.show();
    },
    hideModal() {
      this.$refs.newNoticeModal.hide();
    },
    validateForm() {
      this.isFormValid = this.notice.notiTitle && this.notice.notiContent;
    },
    async submitForm() {
      if (!this.isFormValid) return;
      // ... AJAX 요청과 성공/실패 처리 로직 ...
      try {
        let token = sessionStorage.getItem("token");
        await axios.post(`http://localhost:8088/admin/notice`, this.notice, {
          headers: {
            "X-AUTH-TOKEN": token.toString(),
          },
        });
        this.hideModal();
        alert('공지사항이 생성되었습니다.');
        // this.$router.push({ name: 'AdminNotice' });
        this.fetchNotices();
      } catch (error) {
        console.error('Error creating notice:', error);
      }
    },
  },
  filters: {
    formatDate(value) {
      if (value) {
        return value.split('T')[0]; // ISO 문자열에서 날짜 부분만 추출
      }
    },
  }
};
</script>

<style scoped>
.content {
  margin-left: 250px;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem;
}

.content-area {
  padding: 2rem;
  /* 상단 여백과 같이 패딩 값 조정 */
  background-color: #ffffff;
  border-radius: .25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin: 1rem 0;
  /* 상단 및 하단 마진 추가 */
}

.search-area {
  max-width: 400px;
  margin-bottom: 1.5rem;
  /* 검색 영역 아래 마진 추가 */
}

.search-input {
  padding: .75rem;
  border-radius: .25rem;
  border: 1px solid #ced4da;
}

.notices-table {
  margin-top: 1rem;
  margin-bottom: 1rem;
  /* 테이블 상단 및 하단 마진 추가 */
}

.pagination-wrapper {
  align-items: center;
  padding: 1rem 0;
  /* 페이지네이션 위 아래 패딩 추가 */
}

.pagination {
  margin-bottom: 0;
}

@media (max-width: 767px) {
  .content {
    margin-left: 0;
    padding: 1rem;
  }

  .content-area,
  .search-area {
    padding: 1rem;
  }

  .notices-table {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .pagination-wrapper {
    padding: 0.5rem 0;
  }
}

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



<!-- <template>
    <div>
      <AdminSidebar />
        <div class="content">
          <div class="content-area">
            <b-form-input
              v-model="searchQuery"
              type="search"
              placeholder="검색..."
              class="mb-3">
            </b-form-input>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <b-table
              striped
              hover
              :items="notices"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              :filter="searchQuery"
              @row-clicked="navigateToDetail">
              <template v-slot:cell(index)="data">
                {{ data.index + 1 }}
              </template>
            </b-table>
            <div class="d-flex justify-content-between align-items-center my-3">
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
                class="my-0">
              </b-pagination>
              <b-button variant="primary" @click="createNewNotice">글쓰기</b-button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AdminSidebar from './AdminSidebar.vue';
  
  export default {
    data() {
      return {
        searchQuery: '',
        currentPage: 1,
        perPage: 5,
        rows: 0, // 총 데이터 수
        notices: [],
        fields: [
          { key: 'index', label: '글 번호' },
          { key: 'notiTitle', label: '제목' },
          {
                key: 'notiCreateDate',
                label: '작성일자',
                formatter: (value) => {
                    return this.$options.filters.formatDate(value);
                }
            },
          { key: 'notiViews', label: '조회수' },
        ],
      };
    },
    components: {
        AdminSidebar
    },
    mounted() {
      this.fetchNotices();
    },
    methods: {
      async fetchNotices() {
        try {
          const response = await axios.get('http://localhost:8088/notice');
          this.rows = response.data.length; // 총 데이터 수 업데이트
          this.notices = response.data;
        } catch (error) {
          console.error('Error fetching notices:', error);
        }
      },
      navigateToDetail(item) {
        this.$router.push({ name: 'AdminNoticeDetail', params: {id: item.notiId}});
      },
      createNewNotice() {
      this.$router.push({ name: 'AdminNoticeCreate' }); // Replace with your actual route
    }
    },
    filters: {
    formatDate(value) {
      if (value) {
        return value.split('T')[0]; // ISO 문자열에서 날짜 부분만 추출
      }
    },
  }
  };
  </script>
  
  <style scoped>
  .content {
    margin-left: 250px; /* 사이드바의 너비에 맞게 조정 */
  }

  .content-area {
    padding-top: 150px; /* 상단 여백 설정 */
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }

  .mb-3 {
    margin-bottom: 1rem;
  }
  .pt-5 {
  padding-top: 70px; /* 헤더의 높이에 맞게 조정하세요 */
}
.mb-4 {
  margin-bottom: 1.5rem;
}
  </style> -->