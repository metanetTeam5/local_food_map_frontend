<template>
    <div>
		<b-container fluid class="pt-5 mb-4">
      <b-row>
        <b-col>
          <h1>공지사항</h1>
        </b-col>
      </b-row>
    </b-container>
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
  </template>
  
  <script>
  import axios from 'axios';
  
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
        this.$router.push({ name: 'NoticeDetail', params: {id: item.notiId}});
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
  


<!-- -------------------------- -->

<!-- <template>
    <div>
      <b-container fluid class="mb-4">
        <b-row>
          <b-col>
            <h1>공지사항</h1>
          </b-col>
        </b-row>
      </b-container>
      
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
  </template>
  
  <script>
  import axios from 'axios';
  
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
          { key: 'notiCreateDate', label: '작성일자' },
          { key: 'notiViews', label: '조회수' },
        ],
      };
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
        this.$router.push({ name: 'NoticeDetail', params: {id: item.notiId}});
      }
    }
  };
  </script>
  
  <style scoped>
  .mb-3 {
    margin-bottom: 1rem;
  }
  .mb-4 {
    margin-bottom: 1.5rem;
  }
  </style>
   -->



<!-- <template>
    <div>
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
        :filter="searchQuery"
        @row-clicked="navigateToDetail"
      >
        <template v-slot:cell(index)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchQuery: '',
        notices: [],
        fields: [
          { key: 'index', label: '글 번호' },
          { key: 'notiTitle', label: '제목' },
          { key: 'notiCreateDate', label: '작성일자' },
          { key: 'notiViews', label: '조회수' },
        ],
      };
    },
    mounted() {
      this.fetchNotices();
    },
    methods: {
      async fetchNotices() {
        try {
          const response = await axios.get('http://localhost:8088/notice');
          this.notices = response.data;
        } catch (error) {
          console.error('Error fetching notices:', error);
        }
      },
      navigateToDetail(item) {
        this.$router.push({ name: 'NoticeDetail', params: {id: item.notiId}});
      }
    }
  };
  </script>
  
  <style scoped>
  .mb-3 {
    margin-bottom: 1rem;
  }
  /* 필요한 스타일 추가 */
  </style>
  
 -->





  <!-- -------------------------- -->

<!-- <template>
    <div>
      <b-table striped hover :items="notices" :fields="fields" @row-clicked="navigateToDetail">
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        notices: [],
        fields: [
            { key: 'index', label: '글 번호' },
            // { key: 'notiId', label: 'ID' },
            { key: 'notiTitle', label: '제목' },
            // { key: 'notiContent', label: 'Content' },
            { key: 'notiCreateDate', label: '작성일자' },
            // { key: 'notiUpdateDate', label: 'Updated Date' },
            { key: 'notiViews', label: '조회수' },
          // 필요한 필드 추가
        ]
      };
    },
    mounted() {
      this.fetchNotices();
    },
    methods: {
      async fetchNotices() {
        try {
          // 백엔드에서 데이터를 가져오는 API 엔드포인트에 대한 요청
          const response = await axios.get('http://localhost:8088/notice'); // API 주소에 맞게 변경
          this.notices = response.data;
        } catch (error) {
          console.error('Error fetching notices:', error);
        }
      },
      navigateToDetail(item) {
        this.$router.push({ name: 'NoticeDetail', params: {id: item.notiId}});
      }
    }
  };
  </script>
  
  <style scoped>
  /* 필요한 스타일 추가 */
  </style>
   -->