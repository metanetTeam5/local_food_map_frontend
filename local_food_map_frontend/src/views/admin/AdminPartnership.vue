<template>
	<div>
		<AdminSidebar />
		<div class="content">
			<div>
        <h1>제휴 요청 관리</h1>
        <br />
        <br />
      </div>
			<div class="content-area">
				<!-- <b-form-input v-model="searchQuery" type="search" placeholder="검색.." class="mb-3">
				</b-form-input> -->
				<div class="search-area mb-4">
					<b-form-input v-model="searchQuery" type="search" placeholder="검색..." class="search-input">
					</b-form-input>
				</div>
				<div class="table-responsive">
					<b-table striped hover :items="businessmans" :fields="fields" @row-clicked="showModal"
						:per-page="perPage" :current-page="currentPage" :filter="searchQuery">
						<!-- :filter="searchQuery" @row-clicked="navigateToDetail" -->
						<template v-slot:cell(index)="data">
							{{ data.index + 1 }}
						</template>
						<template v-slot:cell(actions)="row">
							<b-button variant="danger" @click="acceptPartnership(row.item.businessmanId)">제휴</b-button>
						</template>
					</b-table>

					<b-modal v-model="isModalVisible" title="상세 정보" size="lg" hide-footer>
						<div v-if="selectedBusinessman" class="modal-content">
							<table class="table table-bordered">
      <tbody>
        <tr>
          <th>사업자 번호</th>
          <td>{{ selectedBusinessman.businessmanId }}</td>
          <th>회원 번호</th>
          <td>{{ selectedBusinessman.memberId }}</td>
        </tr>
        <tr>
          <th>가게 번호</th>
          <td>{{ selectedBusinessman.restaurantId }}</td>
          <th>회사 이름</th>
          <td>{{ selectedBusinessman.companyName }}</td>
        </tr>
        <tr>
          <th>면허 번호</th>
          <td>{{ selectedBusinessman.licenseNumber }}</td>
          <th>생성 일자</th>
          <td>{{ selectedBusinessman.createDate }}</td>
        </tr>
        <tr>
          <th>승인 일자</th>
          <td>{{ selectedBusinessman.grantDate }}</td>
          <th>계좌</th>
          <td>{{ selectedBusinessman.account }}</td>
        </tr>
        <tr>
          <th>제휴 상태</th>
          <td>{{ selectedBusinessman.status }}</td>
        </tr>
        <!-- 이미지 표시 -->
        <tr v-if="selectedBusinessman.registration">
          <th>사업자  등록증</th>
          <td colspan="3">
            <img :src="selectedBusinessman.registration" class="document-image" alt="사업자 등록증">
          </td>
        </tr>
        <tr v-if="selectedBusinessman.report">
          <th>보고서</th>
          <td colspan="3">
            <img :src="selectedBusinessman.report" class="document-image" alt="보고서">
          </td>
        </tr>
        <tr v-if="selectedBusinessman.bankbook">
          <th>통장 사본</th>
          <td colspan="3">
            <img :src="selectedBusinessman.bankbook" class="document-image" alt="통장 사본">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal-footer">
    <b-button variant="primary" @click="handleOk">OK</b-button>
						</div>
					</b-modal>

					<div class="d-flex justify-content-between align-items-center my-3">
						<b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"
							class="my-0">
						</b-pagination>
						<!-- <b-button variant="primary" @click="createNewNotice">글쓰기</b-button> -->
					</div>
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
			isModalVisible: false, // 모달의 표시 상태
			selectedBusinessman: null, // 선택된 행의 데이터
			searchQuery: '',
			currentPage: 1,
			perPage: 5,
			rows: 0, // 총 데이터 수
			businessmans: [],	//notices: [],
			fields: [
				{ key: 'index', label: '번호' },

				{ key: 'businessmanId', label: '사업자 번호' },
				{ key: 'memberId', label: '회원 번호' },
				{ key: 'restaurantId', label: '가게 번호' },	//{ key: 'notiTitle', label: '제목' },
				{ key: 'companyName', label: '회사 이름' },
				{ key: 'actions', label: '제휴 승인' }
				// { key: 'licenseNumber', label: '면허 번호' },
				// { key: 'registration', label: 'registration' },
				// { key: 'report', label: 'report' },
				// { key: 'bankbook', label: 'bankbook' },
				// { key: 'createDate', label: '생성일자' },
				// { key: 'grantDate', label: '승인일자' },
				// { key: 'account', label: '계좌' },
				// { key: 'status', label: '상태' },
				// {
				// 	key: 'reviewCreateDate',
				// 	label: '작성일자',
				// 	formatter: (value) => {
				// 		return this.$options.filters.formatDate(value);
				// 	}
				// },
				// { key: 'notiViews', label: '조회수' },
			],
		};
	},
	components: {
		AdminSidebar
	},
	mounted() {
		this.fetchBman();
	},
	methods: {
		handleOk() {
			this.isModalVisible = false;
		},
		showModal(item) {
			this.selectedBusinessman = item;
			this.isModalVisible = true;
		},
		async fetchBman() {
			try {
				const response = await axios.get('http://localhost:8088/bm/admin/request/list');
				this.rows = response.data.length; // 총 데이터 수 업데이트
				this.businessmans = response.data;		// this.notices = response.data;
				// console.log(this.businessmans);
			} catch (error) {
				console.error('Error fetching bmans:', error);
			}
		},
		async acceptPartnership(businessmanId) {
			try {
				await axios.get(`http://localhost:8088/bm/admin/accept/${businessmanId}`);
				// 삭제 후 목록 갱신
				this.fetchBman();
			} catch (error) {
				console.error('Error accept partnership-request', error);
			}
		}

		// navigateToDetail(item) {
		// 	this.$router.push({ name: 'AdminNoticeDetail', params: { id: item.notiId } });
		// },

		// createNewNotice() {
		// 	this.$router.push({ name: 'AdminNoticeCreate' }); // Replace with your actual route
		// }
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

.modal-content {
  /* 모달 콘텐츠에 대한 스타일링 */
  font-size: 1rem; /* 글씨 크기 */
  line-height: 1.5; /* 줄 간격 */
  color: #333; /* 글씨 색상 */
}

.modal-content p {
  margin-bottom: 0.5rem; /* 단락 사이의 마진 */
}

.modal-header {
  background-color: #f8f9fa; /* 모달 헤더 배경색 */
  border-bottom: 1px solid #e9ecef; /* 헤더 하단 테두리 */
}

.modal-footer {
  background-color: #f8f9fa; /* 모달 푸터 배경색 */
  border-top: 1px solid #e9ecef; /* 푸터 상단 테두리 */
}

.modal-footer .btn {
  margin-right: 0.5rem; /* 버튼 사이의 마진 */
}

/* 이미지를 보여줄 컨테이너 스타일 */
.document-image {
  max-width: 100%; /* 이미지 최대 너비 */
  height: auto; /* 이미지 높이 자동 조정 */
  margin-bottom: 1rem; /* 이미지 아래 마진 */
}

/* 모달 내용의 전체적인 패딩 조정 */
.b-modal-body {
  padding: 1rem;
}

/* 모달의 너비를 좀 더 커지게 조정하려면 .modal-dialog 클래스에 스타일을 추가합니다 */
.modal-dialog {
  max-width: 800px; /* 원하는 너비로 설정 */
}

.modal-footer {
  display: flex;
  justify-content: flex-end; /* Aligns the button to the right */
  padding: 1rem; /* Adds padding inside the footer */
  border-top: none;
}
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



<!-- 
<style scoped>
.content {
	margin-left: 250px;
	/* 사이드바의 너비에 맞게 조정 */
}

.content-area {
	padding-top: 150px;
	/* 상단 여백 설정 */
	max-width: 800px;
	margin: 0 auto;
	width: 100%;
}

.table-responsive {
	overflow-x: auto;
	/* 가로 스크롤 추가 */
}

.modal-content p {
	font-size: 1.2em;
	/* 글씨 크기를 1.2em으로 설정 */
}

.mb-3 {
	margin-bottom: 1rem;
}

.pt-5 {
	padding-top: 70px;
	/* 헤더의 높이에 맞게 조정하세요 */
}

.mb-4 {
	margin-bottom: 1.5rem;
}
</style> -->