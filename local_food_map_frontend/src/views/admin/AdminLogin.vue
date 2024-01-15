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
  import userStore from "../../store/modules/userStore";
  
  export default {
    name: "AdminLogin",
    data() {
      return {
        loginData: {
          email: "",
          password: "",
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          const endpoint = process.env.VUE_APP_API_ENDPOINT_ADMIN; // 관리자 로그인 API 엔드포인트
          let response = await axios.post(endpoint, this.loginData);
  
          userStore.commit("login", response.data);
          console.log("관리자 로그인 성공");
          this.$router.push({ name: "AdminDashboard" }); // 성공 시 이동할 경로
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
    },
    // 나머지는 동일
  };
  </script>
  