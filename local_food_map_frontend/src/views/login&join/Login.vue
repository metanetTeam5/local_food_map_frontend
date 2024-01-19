<template>
  <div class="login-form">
    <form @submit.prevent="submitForm">
      <h1>로그인</h1>
      <div class="user-type-buttons">
        <button
          type="button"
          class="user-type-btn"
          :class="{ active: loginType === 'user' }"
          @click="setLoginType('user')"
        >
          회원
        </button>
        <button
          type="button"
          class="user-type-btn"
          :class="{ active: loginType === 'business' }"
          @click="setLoginType('business')"
        >
          사업자
        </button>
      </div>

      <div class="form-group">
        <input
          type="email"
          v-model="loginData.email"
          placeholder="이메일 입력"
        />
        <span class="input-icon"><i class="fa fa-envelope"></i></span>
      </div>
      <div class="form-group">
        <input
          class="password-input"
          type="password"
          v-model="loginData.password"
          placeholder="비밀번호 입력"
        />
        <span class="input-icon"><i class="fa fa-lock"></i></span>
      </div>
      <button class="login-btn">Login</button>
      <!-- <a class="reset-psw" href="#">아이디 찾기</a><a class="reset-psw" href="#">비밀번호 찾기</a> -->
      <div class="reset-links">
        <router-link to="/id-reset" class="reset-psw">아이디 찾기</router-link>
        <router-link to="/password-reset" class="reset-psw"
          >비밀번호 찾기</router-link
        ><br /><router-link to="/join" class="reset-psw">회원가입</router-link>
      </div>

      <b-form-group id="input-group-3" class="saveid">
        <div class="checkbox-input">
          <input
            type="checkbox"
            v-model="status"
            value="remember"
            style="height: 14px"
            unchecked-value="not_remember"
          />
        </div>
        이메일 저장
      </b-form-group>

      <div class="seperator"><b>or</b></div>

      <p>Social Login</p>
      <div class="social-icon">
        <button type="button">
          <i class="fa fa-naver"></i><span style="font-weight: bold">N</span>
        </button>
        <button type="button"><i class="fa fa-comment"></i></button>
        <button type="button"><i class="fa fa-google"></i></button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
      loginType: "user",
      status: "not_remember",
    };
  },
  created() {
    if (localStorage.getItem("rememberid") !== null) {
      this.status = "remember";
      this.loginData.email = localStorage.getItem("rememberid");
    } else {
      this.status = "not_remember";
    }
  },
  methods: {
    setLoginType(type) {
      this.loginType = type;
    },
    async submitForm() {
      try {
        const endpoint =
          this.loginType === "user"
            ? process.env.VUE_APP_API_ENDPOINT_USER
            : process.env.VUE_APP_API_ENDPOINT_BUSINESS;

        let response = await axios.post(endpoint, this.loginData);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("userEmail", response.data.userEmail);

        this.checkRememberId();
        if (this.loginType === "user") {
          this.$router.push({ name: "HomePage" });
          this.$router.go(0);
        } else {
          sessionStorage.setItem("bmId", response.data.bmId);
          this.$router.push({ name: "BmanReservations" });
          this.$router.go(0);
        }
      } catch (error) {
        if (error.response) {
          console.error("Error:", error.response.data);
          alert("로그인 실패: " + error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      }
    },
    checkRememberId() {
      if (this.status == "not_remember") {
        localStorage.removeItem("rememberid");
      } else {
        localStorage.setItem("rememberid", this.loginData.email);
      }
    },
  },
};
</script>

<style>
.password-input {
  font-family: "BMJUA_ttf";
}

.user-type-buttons {
  text-align: center;
  margin-bottom: 20px;
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
  background-color: #fc8d05;
  color: rgb(0, 0, 0);
  letter-spacing: 1px;
}

.user-type-btn.active {
  background-color: #fc8d05;
  color: rgb(255, 255, 255);
  transform: scale(1.08);
}

.login-form {
  background: #fff;
  width: 450px;
  border-radius: 6px;
  margin: 0 auto;
  display: table;
  padding: 15px 30px 30px;
  box-sizing: border-box;
  margin-top: 140px;
}

.login-form h1 {
  font-size: 36px;
  text-align: center;
  color: #ffae00;
  margin-bottom: 30px;
  font-weight: normal;
}
.login-form .social-icon {
  width: 100%;
  font-size: 20px;
  padding-top: 20px;
  color: #ffae00;
  text-align: center;
  float: left;
}

.form-group {
  color: #000000;
  float: left;
  width: 100%;
  margin: 0 0 15px;
  position: relative;
}
.login-form input {
  color: #000000;
  width: 100%;
  padding: 5px;
  height: 56px;
  border-radius: 74px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 15px;
  padding-left: 75px;
}
.login-form .form-group .input-icon {
  font-size: 15px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  height: 100%;
  padding-left: 35px;
  color: #000000;
}

.login-form .login-btn {
  background: #fff;
  padding: 11px 50px;
  border-color: hsl(40, 91%, 86%);
  color: #5e5e5e;
  text-align: center;
  margin: 0 auto;
  font-size: 20px;
  border: 3px solid #fce205;
  border-radius: 44px;
  width: 100%;
  height: 56px;
  cursor: pointer;
}

.login-form .login-btn:hover {
  background-color: #fc8d05;
  border: none;
  color: #ffffff;
  letter-spacing: 2px;
  /* transform: scale(1.2); */
}

/* .login-form .login-btn:active {
  transform: scale(1.5);
} */

.login-form .reset-psw {
  float: left;
  width: 100%;
  text-decoration: none;
  color: #e59e04;
  font-size: 14px;
  text-align: center;
  margin-top: 11px;
}
.saveid {
  float: right;
  width: 100%;
  text-decoration: none;
  color: #e59e04;
  font-size: 14px;
  text-align: center;
  margin-top: 11px;
}

.login-form .social-icon button {
  font-size: 20px;
  color: white;
  height: 50px;
  width: 50px;
  background: #fcd305;
  border-radius: 60%;
  margin: 0px 10px;
  border: none;
  cursor: pointer;
}
.login-form button:hover {
  opacity: 0.9;
}
.login-form .seperator {
  float: left;
  width: 100%;
  border-top: 1px solid #ffc30e;
  text-align: center;
  margin: 50px 0 0;
}
.login-form .seperator b {
  width: 40px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background: #fff;
  display: inline-block;
  border: 1px solid #ffc30e;
  border-radius: 50%;
  position: relative;
  top: -22px;
  z-index: 1;
}
.login-form p {
  float: left;
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin: 0 0 10px;
}
.social-icon {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.social-icon button {
  background-color: transparent; /* 버튼의 배경색을 투명하게 설정합니다 */
  transition: background-color 0.3s ease; /* 배경색 변화에 대한 전환 효과를 추가합니다 */
}

.social-icon button:hover {
  background-color: #fc8d05; /* 마우스 호버 시 배경색을 변경합니다 */
}

.social-icon button span {
  /* 텍스트에 대한 추가적인 스타일을 적용할 수 있습니다 */
  font-weight: bold;
}

.reset-links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.reset-psw {
  margin-right: 10px;
}
.checkbox-input {
  margin-left: -30px;
}
@media screen and (max-width: 767px) {
  .login-form {
    width: 90%;
    padding: 15px 15px 30px;
  }
}
</style>
