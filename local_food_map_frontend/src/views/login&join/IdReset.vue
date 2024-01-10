<template>
  <div class="IdReset-form">
    <form @submit.prevent="submitForm">
      <div class="logo">
        <img src="../../assets/images/아맛무 로고.png" />
      </div>
      <div class="user-type-buttons">
        <button
          type="button"
          class="user-type-btn"
          :class="{ active: IdResetType === 'user' }"
          @click="setIdResetType('user')"
        >
          회원
        </button>
        <button
          type="button"
          class="user-type-btn"
          :class="{ active: IdResetType === 'business' }"
          @click="setIdResetType('business')"
        >
          사업자
        </button>
      </div>
      <div class="Idreset-text">
        <p>본인확인을 위해 전화번호를 입력해주세요.</p>
      </div>
      <div class="form-container">
        <div class="form-group-call">
          <input
            type="email"
            v-model="IdResetData.email"
            placeholder="전화번호 입력"
          />
          <span class="input-icon"><i class="fa fa-phone"></i></span>
        </div>
        <div class="form-group-key">
          <input
            type="password"
            v-model="IdResetData.password"
            placeholder="인증번호 입력"
          />
          <span class="input-icon"><i class="fa fa-key"></i></span>
        </div>
      </div>
      <button class="IdReset-btn">인증번호 전송</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "IdResetPage",
  data() {
    return {
      IdResetData: {
        email: "",
        password: "",
      },
      IdResetType: "user",
    };
  },
};
</script>

<style>
.logo {
  text-align: center;
  padding: 0 0 15px;
}

.logo img {
  width: 200px;
}

.IdReset-form {
  background: #fff;
  width: 600px;
  height: 600px;
  border-radius: 6px;
  margin: 0 auto;
  display: table;
  padding: 15px 30px 30px;
  box-sizing: border-box;
  border: 2px solid #fce205;
}

.user-type-buttons {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.user-type-btn {
  background-color: transparent;
  border: 2px solid #fce205;
  color: #9b9b9b;
  padding: 5px 10px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, color 0.3s;
  width: 100px;
  margin: 0 5px;
}

.user-type-btn:not(.active):hover {
  background-color: #fce205;
  color: rgb(0, 0, 0);
  letter-spacing: 1px;
}

.user-type-btn.active {
  background-color: #fce205;
  color: rgb(0, 0, 0);
  transform: scale(1.08);
}

.IdReset-form h1 {
  font-size: 36px;
  text-align: center;
  color: #ffae00;
  margin-bottom: 30px;
  font-weight: normal;
}

.form-group-call {
  bottom: -20px;
  float: left;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}
.form-group-key {
  bottom: -20px;
  float: left;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}

.Idreset-text {
  margin-top: 50px; /* 텍스트를 20px 아래로 이동 */
  text-align: center;
}

.IdReset-form input {
  width: 100%;
  padding: 5px 5px 5px 50px; /* 왼쪽 패딩 증가 */
  height: 56px;
  border-radius: 74px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 15px;
}

.IdReset-form .input-icon {
  font-size: 15px;
  position: absolute;
  left: 25px; /* 왼쪽에 위치 */
  top: 55%; /* 중앙 정렬 */
  transform: translateY(-50%); /* 세로 중앙 정렬 */
  color: #000000;
}

.IdReset-form .form-group .input-icon {
  font-size: 15px;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  height: 100%;
  padding-left: 35px;
  color: #000000;
}

.IdReset-form .IdReset-btn {
  background: #fff;
  border-color: hsl(40, 91%, 86%);
  color: #5e5e5e;
  text-align: center;
  margin-top: 20px;
  font-size: 15px;
  border: 3px solid #fce205;
  border-radius: 14px;
  width: 24%;
  height: 40px;
  cursor: pointer;
  float: right;
}

.IdReset-form .IdReset-btn:hover {
  background-color: #fce205;
  color: #000000;
  letter-spacing: 2px;
  transform: scale(1.2);
}

.IdReset-form .IdReset-btn:active {
  transform: scale(1.5);
}
/* .form-container {
  margin-top: 50px;
} */
@media screen and (max-width: 767px) {
  .IdReset-form {
    width: 90%;
    padding: 15px 15px 30px;
  }
}
</style>