<template>
    <div class="login-form">
      <form @submit.prevent="submitForm">
        <h1>관리자 로그인</h1>
  
        <div class="form-group">
          <input
            type="email"
            v-model="loginData.email"
            placeholder="이메일을 입력"
          />
          <span class="input-icon"><i class="fa fa-envelope"></i></span>
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="loginData.password"
            placeholder="비밀번호 입력"
          />
          <span class="input-icon"><i class="fa fa-lock"></i></span>
        </div>
        <button class="login-btn">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  // import userStore from "../../store/modules/userStore";
  
  export default {
    name: "AdminLogin",
    data() {
      return {
        loginData: {
          email: "",
          password: "",
        },
        loginType: "admin",
        // status: "not_remember",                    ??
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
          // const endpoint = process.env.VUE_APP_API_ENDPOINT_ADMIN; // 관리자 로그인 API 엔드포인트
          const endpoint = "http://localhost:8088/member/admin/login";

          console.log(endpoint);
          console.log(this.loginData);
          let response = await axios.post(endpoint, this.loginData);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("userId", response.data.userId);
          sessionStorage.setItem("userEmail", response.data.userEmail);
  
          // userStore.commit("login", response.data);

          // console.log("관리자 로그인 성공");

          // this.checkRememberId();
          this.$router.push({ name: "AdminNotice" }); // 성공 시 이동할 경로
        } catch (error) {
          console.log("로그인 실패");
          if (error.response) {
            console.error("Error:", error.response.data);
            alert("로그인 실패: " + error.response.data.message);
          } else {
            console.error("Error:", error.message);
          }
        }
      },
      // checkRememberId() {
      //   if (this.status == "not_remember") {
      //     localStorage.removeItem("rememberid");
      //   } else {
      //     localStorage.setItem("rememberid", this.loginData.email);
      //   }
      // }
    },
    mounted() {
    // this.loadExternalCSS(
    //   "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    // );
  },
  };
  </script>
  