<template>
  <header>
    <nav id="header" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/home">
          <img
            src="../../assets/images/아맛무 로고.png"
            alt="Logo"
            style="height: 55px"
          />
        </a>
        <div :class="{ 'navbar-collapse': true, collapse: isCollapsed }">
          <form
            class="form-inline my-2 my-lg-0 mx-auto"
            @submit.prevent="searchPlaces"
          >
            <div class="search-container position-relative">
              <input
                class="form-control mr-sm-2 search-input"
                type="search"
                placeholder="지역, 상호명 또는 메뉴로 검색"
                aria-label="Search"
                v-model="searchQuery"
              />

              <button
                class="btn btn-outline-success my-2 my-sm-0 search-button"
                type="submit"
              >
                <img src="../../assets/images/search.png" alt="Search" />
              </button>
            </div>
          </form>
          <div class="navbar-nav ml-auto" v-if="!login">
            <router-link class="nav-link" to="/login">로그인</router-link>
            <router-link class="nav-link" to="/join">회원가입</router-link>
          </div>
          <div class="navbar-nav ml-auto" v-else>
            <span class="nav-link" @click="logout">로그아웃</span>
            <router-link class="nav-link" to="/mypage">마이페이지</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from "axios";

export default {
  name: "AppHeader",
  data() {
    return {
      isCollapsed: true,
      searchQuery: "",
      login: false,
    };
  },
  created() {
    let checkLogin = sessionStorage.getItem("token");
    if (checkLogin !== "" && checkLogin !== null && checkLogin !== undefined) {
      this.login = true;
    } else {
      this.login = false;
    }
  },
  mounted() {
    let checkLogin = sessionStorage.getItem("token");
    if (checkLogin !== "" && checkLogin !== null && checkLogin !== undefined) {
      this.login = true;
    } else {
      this.login = false;
    }
  },
  methods: {
    async searchPlaces() {
      if (this.searchQuery.trim() === "") {
        console.warn("검색어를 입력해주세요.");
        return;
      }

      try {
        await this.$store.dispatch(
          "fetchSearchResults",
          this.searchQuery.trim()
        );
        console.log("검색 성공, MapPage로 이동");

        if (this.$router.currentRoute.name !== "MapPage") {
          // this.$router.push({ name: "MapPage", query: { query: this.searchQuery.trim() } });
          this.$router.push({ name: "MapPage" });
        }
      } catch (error) {
        console.error("검색 중 오류 발생: ", error);
      }
    },

    async logout() {
      let token = sessionStorage.getItem("token");
      if (token === null) {
        alert("로그아웃 되었습니다.");
        this.$router.push({ name: "HomePage" });
        this.$router.go();
      } else {
        try {
          await axios.post(
            process.env.VUE_APP_API_ENDPOINT + "/member/logout",
            null,
            {
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            }
          );

          sessionStorage.clear();

          alert("로그아웃 되었습니다.");

          if (this.$route.path === "/") {
            this.$router.go(0);
          } else {
            this.$router.push({ name: "HomePage" });
            this.$router.go(0);
          }
        } catch (error) {
          sessionStorage.clear();

          alert("로그아웃 되었습니다.");

          if (this.$route.path === "/") {
            this.$router.go(0);
          } else {
            this.$router.push({ name: "HomePage" });
            this.$router.go(0);
          }
          console.error("Error:", error.message);
        }
      }
    },
  },
};
</script>

<style>
#header {
  position: fixed;
  height: 70px;
  width: 100%; /* 페이지 전체 너비를 차지하도록 설정 */
  z-index: 1000;
}

.navbar navbar-expand-lg navbar-light bg-light {
  position: fixed;
}

.search-container {
  margin-left: 180px;
  width: 800px;
  font-family: "BMHANNAPro";
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  display: none;
}

.search-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  outline: none;
}

.search-button:hover,
.search-input:hover {
  border: none;
  font-family: "BMHANNAPro";
}

.search-button:focus,
.search-input:focus {
  border: none;
  font-family: "BMHANNAPro";
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

.search-button {
  width: 3.5rem;
  height: 3rem;
  font-family: "BMHANNAPro";
}

.search-button img {
  width: 100%;
  height: auto;
  font-family: "BMHANNAPro";
}

.bg-light {
  background-color: #fefef8 !important;
}

.navbar-nav .nav-link {
  margin-right: 20px;
  color: #000000;
  font-family: "BMHANNAPro";
}
.navbar-nav .nav-link:focus {
  outline: none;
}

.navbar-nav .nav-link:hover {
  color: #000000;
}

.navbar-nav .nav-link:active {
  color: #000000;
}

@media (min-width: 576px) {
  .form-inline .form-control {
    width: 100% !important;
  }
}
</style>
