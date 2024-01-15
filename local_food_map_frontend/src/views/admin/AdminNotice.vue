<template>
    <div>
      <AdminSidebar />
      <div class="content">
        <b-form-input
            v-model="searchQuery"
            type="search"
            placeholder="검색..."
            class="mb-3"
        ></b-form-input>
    
        <b-table
            striped
            hover
            :items="notices"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="searchQuery"
            @row-clicked="navigateToDetail"
        >
            <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
            </template>
        </b-table>
    
        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            class="my-0"
        ></b-pagination>
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
      }
    },
    filters: {
    formatDate(value) {
      if (value) {
        return value.split('T')[0]; // ISO 문자열에서 날짜 부분만 추출
      }
    }
  }
  };
  </script>
  
  <style scoped>
  .content {
    margin-left: 250px; /* 사이드바의 너비에 맞게 조정 */
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
  </style>