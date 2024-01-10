<template>
  <div class="container">
    <div class="container-login">
      <div class="card px-8 signup_v4 mb-30">
        <div class="card-body">
          <div class="login-logo">
            <img src="@/assets/images/logo.png" />
          </div>
          <h4 class="text-center mt-4 mb-4" style="text-transform: uppercase">
            로그인
          </h4>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ active: loginType === 'user' }"
                @click="setLoginType('user')"
              >
                회원
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ active: loginType === 'business' }"
                @click="setLoginType('business')"
              >
                사업자
              </button>
            </li>
          </ul>
          <form @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputID">아이디 ID</label>
                <input
                  v-model="loginData.id"
                  type="text"
                  class="form-control"
                  id="inputID"
                  placeholder="이메일 입력"
                  required=""
                />
              </div>
              <div class="form-group col-md-12">
                <label for="inputPassword">비밀번호 Password</label>
                <input
                  v-model="loginData.password"
                  type="password"
                  class="form-control"
                  id="inputPassword"
                  placeholder="비밀번호 입력"
                  required=""
                />
              </div>
            </div>
            <div class="mt-2 mb-3">
              <button class="btn btn-primary full-width" type="submit">
                로그인
              </button>
            </div>
          </form>
          <div class="social-area">
            <h3 class="title">Social Login</h3>
            <p class="text">소셜 로그인</p>
            <ul class="social-links">
              <li>
                <a href="#">
                  <img
                    class="icon"
                    src="@/assets/images/네이버.png"
                    alt="네이버 로고"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    class="icon"
                    src="@/assets/images/카카오.png"
                    alt="카카오 로고"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    class="icon"
                    src="@/assets/images/구글.png"
                    alt="구글 로고"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="register"
          role="tabpanel"
          aria-labelledby="register-tab"
        >
          <h4
            class="text-center mt-4 mb-4"
            style="text-transform: uppercase"
          ></h4>
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputName">아이디 ID</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  placeholder="이메일 입력"
                  required=""
                />
              </div>
              <div class="form-group col-md-12">
                <label for="inputName">비밀번호 Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword4"
                  placeholder="비밀번호 입력"
                  required=""
                />
              </div>
              <div class="form-group col-md-12">
                <div
                  class="d-flex flex-wrap justify-content-between align-items-center"
                >
                  <div class="custom-checkbox d-block"></div>
                  <a href="#" target="_blank">비밀번호를 잊었습니까?</a>
                </div>
              </div>
            </div>
            <div class="mt-2 mb-3">
              <button class="btn btn-primary full-width" type="submit">
                로그인
              </button>
            </div>
          </form>
          <div class="social-area">
            <h3 class="title">Social Login</h3>
            <p class="text">소셜 로그인</p>
            <ul class="social-links">
              <li>
                <a href="#">
                  <img
                    class="icon"
                    src="@/assets/images/네이버.png"
                    alt="네이버 로고"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    class="icon"
                    src="@/assets/images/카카오.png"
                    alt="카카오 로고"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    class="icon"
                    src="@/assets/images/구글.png"
                    alt="구글 로고"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import axios from 'axios';
import userStore from '../store/modules/userStore';

export default {
  name: "UserLogin",
  data() {
    return {
      loginData: {
        id: '',
        password: ''
      },
      loginType: 'user',
    };
  },
  methods: {
    setLoginType(type) {
      this.loginType = type;
    },
    async submitForm() {
  try {
    let response;
    const endpoint = this.loginType === 'user' ? '/member/login' : '/bm/login';
    response = await axios.post(endpoint, this.loginData);

    // 로그인 성공 처리
    userStore.commit('login', response.data); // 응답 데이터에 토큰이 포함되어 있다고 가정
    localStorage.setItem('token', response.data.token); // 토큰을 localStorage에 저장
    this.$router.push({ name: 'Home' }); // 홈페이지로 리디렉션
  } catch (error) {
    if (error.response) {
      // 서버 응답에 따른 에러 처리
      console.error('Error:', error.response.data);
      alert('로그인 실패: ' + error.response.data.message);
    } else {
      // 요청이 만들어지지 않은 경우
      console.error('Error:', error.message);
    }
  }
}

  },
  mounted() {
    this.loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
    );
    this.loadScript(
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
    );
    this.loadStylesheet(
      "https://use.fontawesome.com/releases/v5.8.1/css/all.css"
    );
    this.loadStylesheet(
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    );
  },

};
</script>


<style scoped>
.container {
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 30px;
}

/* Login v4 */
.login-logo {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-logo img {
  width: 40px;
}

.signup_v4 .social-area {
  text-align: center;
  padding-top: 14px;
}

.signup_v4 .social-area .title {
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 600;
  display: inline-block;
  color: #007bff;
  position: relative;
}

.signup_v4 .social-area .text {
  font-size: 17px;
  font-weight: 400;
  color: #143250;
}

.signup_v4 .social-area .title::before {
  position: absolute;
  content: "";
  width: 40px;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 100%;
  margin-left: 7px;
}

.signup_v4 .social-area .title::after {
  position: absolute;
  content: "";
  width: 40px;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 100%;
  margin-right: 7px;
}
.icon {
  width: 60px;
  height: auto;
  margin-left: 20px;
}

.px-8 {
  padding-left: 15%;
  padding-right: 15%;
}
.signup_v4 ul.social-links {
  padding: 0;
  margin: 0;
}

.signup_v4 .social-area .social-links li {
  display: inline-block;
}

.signup_v4 .social-area .social-links li a i {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 50px;
  display: inline-block;
  color: #fff;
  margin: 0 5px;
  -webkit-box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
  box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
}

.signup_v4 .social-area .social-links li a i.fa-facebook-f {
  background: #0069f7;
}

.signup_v4 .social-area .social-links li a i.fa-google-plus-g {
  background: #d1062c;
}

.signup_v4 .nav-tabs .nav-link.active {
  background: #007bff;
}

.signup_v4 .nav-tabs .nav-link {
  background: #143250;
}

.signup_v4 .nav-tabs .nav-link {
  border: 0;
  margin: 0;
  padding: 10px 0;
  text-align: center;
  border-radius: 0;
  color: #fff;
}

.signup_v4 .nav-tabs li.nav-item {
  width: 50%;
}

.signup_v4 .card-body {
  padding: 0 80 0 80px;
}

.signup_v4 .card-body .tab-content {
  padding: 0 1.25rem 1.75em;
}
</style>
