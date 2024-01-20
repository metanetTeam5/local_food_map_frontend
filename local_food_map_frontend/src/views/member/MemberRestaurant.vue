<template>
	<div>
		<br />
		<br />

		<h2>가게 등록</h2>
		<form @submit.prevent="submitForm">
			<!-- Form Fields -->
			<div class="form-group">
				<label for="restName">가게 이름 </label>
				<input v-model="form.restName" type="text" placeholder="가게 이름" />
			</div>
			<!-- ... 기타 필드들 ... -->
			<div class="form-group">
				<label for="restName"> 경도 </label>
				<input v-model="form.restLocationX" type="text" placeholder="경도" />
			</div>
			<div class="form-group">
				<label for="restName">위도 </label>
				<input v-model="form.restLocationY" type="text" placeholder="위도" />
			</div>
			<div class="form-group">
				<label for="restName">지역 </label>
				<input v-model="form.restLocationName" type="text" placeholder="지역" />
			</div>


			<div class="form-group">
				<label for="restKeyword">키워드 </label>
				<input type="text" id="restKeyword" v-model="keywordInput" placeholder="키워드" @keyup.enter="addKeyword" />
				<button type="button" @click="addKeyword">추가</button>
			</div>
			<div v-if="keywords.length > 0">
				<ul>
					<li v-for="(keyword, index) in keywords" :key="index">{{ keyword }}</li>
				</ul>
			</div>


			<div class="form-group">
				<label for="restName">전화번호 </label>
				<input v-model="form.restPhoneNumber" type="text" placeholder="전화번호" />
			</div>
			<div class="form-group">
				<label for="restName">개점 시간 </label>
				<input v-model="form.restOpenTime" type="text" placeholder="개점 시간" />
			</div>
			<div class="form-group">
				<label for="restName">폐점 시간 </label>
				<input v-model="form.restCloseTime" type="text" placeholder="폐점 시간" />
			</div>
			<div class="form-group">
				<label for="restName">가까운 역 </label>
				<input v-model="form.restStation" type="text" placeholder="가까운 역" />
			</div>

			<div class="form-group">
				<label for="restName">카테고리</label>
				<select id="restName" class="form-control" v-model="form.restCategory" required>
					<option disabled selected value="">...선택하세요</option>
					<option value="1">한식</option>
					<option value="1">일식</option>
					<option value="2">중식</option>
					<option value="2">태국</option>
					<option value="3">베트남</option>
					<option value="3">기타</option>
				</select>
			</div>
			<div class="form-group">
				<label for="restName">좌석 수 </label>
				<input v-model="form.restMaxResv" type="text" placeholder="좌석 수" />
			</div>
			<div class="form-group">
				<label for="restName">예약금 </label>
				<input v-model="form.restDeposit" type="text" placeholder="예약금" />
			</div>


			<!-- File Upload -->
			<!-- <input type="file" @change="onFileChange" /> -->
			<div class="form-group">
				<label for="fileUpload">파일 업로드</label>
				<input type="file" id="fileUpload" @change="onFileChange" ref="fileUpload" style="display: none;" />
				<button type="button" @click="triggerFileUpload">파일 선택</button>
			</div>
			<!-- Submit Button -->
			<button type="submit">등록</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			form: {
				restName: '',
				restLocationX: '',
				restLocationY: '',
				restLocationName: '',
				restKeyword: '',
				restPhoneNumber: '',
				restOpenTime: '',
				restCloseTime: '',
				restCreateDate: '',

				restStation: '',
				restCategory: '',
				restMaxResv: '',
				restDeposit: '',
			},
			file: null,
			keywordInput: '',
			keywords: [],
		};
	},
	methods: {
		addKeyword() {
			if (this.keywordInput.trim() !== '') {
				this.keywords.push(this.keywordInput.trim());
				this.keywordInput = '';
				this.updateFormKeywords();
			}
		},
		updateFormKeywords() {
			this.form.restKeyword = this.keywords.map(k => `#${k}`).join('');
		},
		triggerFileUpload() {
			this.$refs.fileUpload.click();
		},

		onFileChange(e) {
			this.file = e.target.files[0];
		},
		async submitForm() {
			const formData = new FormData();
			formData.append('restaurant', new Blob([JSON.stringify(this.form)], { type: 'application/json' }));
			if (this.file) {
				formData.append('file', this.file);
			}

			try {
				let token = sessionStorage.getItem("token");
				const response = await axios.post(`http://localhost:8088/restaurant/register`, formData, {
					headers: {
						"X-AUTH-TOKEN": token.toString(),
					},
				});

				alert("가게 등록이 완료되었습니다!");
				this.$router.push('/mypage');
				console.log(response.data);
			} catch (error) {
				console.error("가게등록 실패", error);
			}

			// Axios를 사용하여 서버에 폼 데이터 전송
			// this.$axios.post('localhost:8088/restaurant/register', formData, {
			// 	headers: {
			// 		'Content-Type': 'multipart/form-data',
			// 	},
			// })
		},
	},
};
</script>


<style scoped>
.form-control {
	text-align: right;
}

.form-control option {
	text-align: right;
	/* 우측 정렬 추가 */
}

.form-group {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

label {
	width: 100px;
	/* 레이블의 너비를 고정합니다 */
	margin-right: 10px;
	/* 레이블과 입력 필드 사이의 간격 */
	text-align: right;
	/* 레이블을 우측으로 정렬 */
}



div {
	background-color: #fff;
	/* 하얀색 배경 */
	max-width: 600px;
	margin: 20px auto;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	background-color: #ffffff;
	/* 회색 배경 */
}

h2 {
	color: #333;
	text-align: center;
	margin-bottom: 20px;
}

form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

input[type="text"],
input[type="file"] {
	flex-grow: 1;
	/* 입력 필드가 남은 공간을 채우도록 합니다 */
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
	font-size: 16px;
	background-color: #fff;
	/* 입력 필드 하얀색 배경 */
}

button {
	background-color: #ffeb99;
	/* 밝은 노랑색 버튼 */
	color: #333;
	padding: 10px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
	font-size: 16px;
	transition: background-color 0.3s;
}

button:hover {
	background-color: #ffd700;
}



@media (max-width: 768px) {
	div {
		width: 90%;
		max-width: none;
		/* 모바일 뷰에서는 최대 너비 제한을 없애고 */
	}
}

@media (min-width: 769px) {
	div {
		width: 100%;
		/* 데스크톱 뷰에서는 너비를 100%로 설정 */
		max-width: 800px;
		/* 또는 원하는 최대 너비 값으로 설정 */
	}
}
</style>



<!-- 
<style scoped>
div {
  background-color: #fffbe7; /* 연한 노랑색 배경 */
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input[type="text"], input[type="file"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  background-color: #ffeb99; /* 밝은 노랑색 버튼 */
  color: #333;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ffd700;
}

@media (max-width: 768px) {
  div {
    width: 90%;
  }
}
</style> -->