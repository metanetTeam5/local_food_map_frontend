<!-- 
import { useRouter } from 'vue-router/types/composables';
<template>
    <div v-if="notice">
        <AdminSidebar />
        <div class="board-container">
            <h1 class="board-title">{{ notice.notiTitle }}</h1>
            <div class="board-meta">
                <span class="board-date">{{ notice.notiCreateDate | formatDate }}</span>
                <span class="board-author">작성자: {{ notice.membNickname }}</span>
            </div>
            <div class="board-buttons">
                <button @click="editNotice" class="board-button">수정</button>
                <button @click="deleteNotice" class="board-button">삭제</button>
            </div>
            <hr class="board-divider" />
            
            <div class="board-content">{{ notice.notiContent }}</div>
        </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import AdminSidebar from './AdminSidebar.vue';
  
  export default {
    data() {
      return {
        notice: null,
        // 예제를 위한 가상의 작성자 데이터 추가
        author: '작성자'
      };
    },
    components: {
        AdminSidebar
    },
    mounted() {
      this.fetchNoticeDetail();
    },
    methods: {
      async fetchNoticeDetail() {
        try {
          const response = await axios.get(`http://localhost:8088/notice/${this.$route.params.id}`);
          console.log(response.data);
          this.notice = response.data;
        } catch (error) {
          console.error('Error fetching notice detail:', error);
        }
      },
      editNotice() {
        this.$router.push({ name: 'AdminNoticeEdit', params: { id: this.notice.notiId } });
      },
      async deleteNotice() {
        const confirmDelete = confirm('정말로 삭제하시겠습니까?');
        if (!confirmDelete) {
          return;
        }
        try {
          await axios.delete(`http://localhost:8088/admin/notice/${this.notice.notiId}`);
          alert('공지사항이 삭제되었습니다.');
          this.$router.push({ name: 'AdminNotice' });
        } catch (error) {
          console.error('Error deleting notice:', error);
        }
        
      },
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
    max-width: 600px;
    margin: 0 auto;
    padding: 50px 20px 20px;
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

  .board-buttons {
    display: flex;
    justify-content: flex-end; /* 우측 정렬 */
    margin-bottom: 20px;
  }
.board-button {
    margin: 10px;
    padding: 5px 5px;
    border: none;
    border-radius: 4px;
    background-color: hsl(0, 0%, 64%);
    color: black;
    cursor: pointer;
}

.board-button:hover {
    background-color: #0056b3;
}
</style>

   -->

<template>
  <div v-if="notice">
    <AdminSidebar />
    <div class="board-container">
      <h1 class="board-title">{{ notice.notiTitle }}</h1>
      <div class="board-meta">
        <span class="board-date">{{ notice.notiCreateDate | formatDate }}</span>
        <span class="board-author">작성자: {{ notice.membNickname }}</span>
      </div>
      <div class="board-buttons">
        <button @click="showEditModal" class="board-button">수정</button>
        <button @click="deleteNotice" class="board-button">삭제</button>
      </div>
      <hr class="board-divider" />
      <div class="board-content">{{ notice.notiContent }}</div>
    </div>

    <b-modal id="edit-notice-modal" ref="editNoticeModal" title="공지사항 수정" ok-title="수정 완료" @ok="submitEditForm">
      <b-form @submit.stop.prevent="submitEditForm">
        <b-form-group label="제목" label-for="edit-notiTitle">
          <b-form-input id="edit-notiTitle" v-model="editNoticeData.notiTitle" required />
        </b-form-group>
        <b-form-group label="내용" label-for="edit-notiContent">
          <b-form-textarea id="edit-notiContent" v-model="editNoticeData.notiContent" rows="3" required />
        </b-form-group>
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
      notice: null,
      editNoticeData: {
        notiTitle: '',
        notiContent: '',
      },
    };
  },
  components: {
    AdminSidebar
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
    },
    async deleteNotice() {
      const confirmDelete = confirm('정말로 삭제하시겠습니까?');
      if (!confirmDelete) {
        return;
      }
      try {
        await axios.delete(`http://localhost:8088/admin/notice/${this.notice.notiId}`);
        alert('공지사항이 삭제되었습니다.');
        this.$router.push({ name: 'AdminNotice' });
      } catch (error) {
        console.error('Error deleting notice:', error);
      }
    },
    showEditModal() {
      this.editNoticeData = { ...this.notice }; // Clone current notice data to the form
      this.$refs.editNoticeModal.show();
    },
    // async submitEditForm() {
    //   try {
    //     await axios.put(`http://localhost:8088/admin/notice/${this.$route.params.id}`, this.notice);
    //     alert('공지사항이 수정되었습니다.');
    //     this.$router.push({ name: 'AdminNoticeDetail', params: { id: this.$route.params.id } });
    //   } catch (error) {
    //     console.error('Error updating notice:', error);
    //   }
    //   this.fetchNoticeDetail();
    //   // this.$refs.editNoticeModal.hide();
    // },
    async submitEditForm() {
      try {
        console.log(this.editNoticeData);
        await axios.put(`http://localhost:8088/admin/notice/${this.notice.notiId}`, this.editNoticeData);
        alert('공지사항이 수정되었습니다.');
        this.fetchNoticeDetail(); // Refresh the details
        this.$refs.editNoticeModal.hide();
      } catch (error) {
        if (error.name !== 'NavigationDuplicated') {
          // Only log the error if it's not a NavigationDuplicated error
          console.error('Error updating notice:', error);
        }
      }
    },

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
  max-width: 600px;
  margin: 0 auto;
  padding: 50px 20px 20px;
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
  white-space: pre-wrap;
  /* 이렇게 하면 줄바꿈과 공백이 유지됩니다 */
  line-height: 1.6;
  font-size: 16px;
  color: #333;
}

.board-buttons {
  display: flex;
  justify-content: flex-end;
  /* 우측 정렬 */
  margin-bottom: 20px;
}

.board-button {
  margin: 10px;
  padding: 5px 5px;
  border: none;
  border-radius: 4px;
  background-color: hsl(0, 0%, 64%);
  color: black;
  cursor: pointer;
}

.board-button:hover {
  background-color: #0056b3;
}
</style>