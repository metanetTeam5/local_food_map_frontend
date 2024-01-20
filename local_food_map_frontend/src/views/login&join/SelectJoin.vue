<template>
  
  <div class="container">
   
    <!-- <router-link class="nav-link" to="/join"> -->
      <div class="regular">
      <div class="img-container">
        <img src="../../assets/images/user아이콘.png" alt="일반 회원" />
      </div>
        <div class="user-text">
          <p>개인회원</p>
          </div>
       
        <button class="join-button" @click="goToRegularJoin">가입하기</button>
      </div>
    <!-- </router-link> -->
    <div class="spacer"></div>
    <!-- <router-link class="nav-link" to="/bman/join"> -->
      <div class="business">
        <div class="img-container">
        <img src="../../assets/images/회사아이콘.png" alt="사업자" />
        </div>
       <div class="business-text">
        <p>사업자 회원</p>
       </div>
     
        <button class="join-button" @click="goToBusinessJoin">가입하기</button>
      </div>
    <!-- </router-link> -->
  </div>
</template>



<style>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap:20px;

  
}

.img-container{
  height: 100px;
}
.regular{
  width: 300px;
  height: 300px;
}

.business{
  width: 300px;
  height: 300px;
}

.regular, .business {
  position: relative;
  width: 300px; 
  height: 300px; 
  border: 2px solid #cccccc; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.regular img {
  width: 80px; /* 이미지 크기 조정 */
  height: auto;
  margin-bottom: 70px; /* 이미지 아래 여백 */
}
.business img {
  width: 90px; /* 이미지 크기 조정 */
  height: auto;
  margin-bottom: 80px; /* 이미지 아래 여백 */
}
.user-text, .business-text{
  margin-bottom: 15px;
  height: 60px;
}

.user-text p, .business-text p {
  font-size: 18px; /* 텍스트 크기 조정 */
  margin-bottom: 15px; /* 텍스트 아래 여백 */
}
.join-button {
  
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%); /* 가운데 정렬 */
  padding: 10px 20px; /* 버튼 패딩 */
  background-color: #fed273; /* 버튼 배경색 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 클릭 가능한 손가락 모양 */
  text-align: center;
  margin-bottom: 20px;
}



.join-button:hover {
  background-color: #fcb040; /* 버튼 호버 시 배경색 변경 */
}

.spacer {
  width: 0;
}

.nav-link {
  width: 100%; /* 네비게이션 링크 전체 너비 */
  text-align: center;
}


</style>

<script>
export default {
  name: 'SelectJoin',
  methods: {
  goToRegularJoin() {
    console.log("Regular join method called");
    this.$router.push('/join');
  },
  goToBusinessJoin() {
    console.log("Business join method called");
    this.$router.push('/bman/join');
  }
}

};
</script>
