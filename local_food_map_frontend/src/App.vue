<template>
  <div id="app">
    <!-- 헤더 렌더링: 특정 경로가 아닐 때만 -->
    <AppHeader v-if="showHeader" />

    <router-view />

    <!-- 푸터 렌더링: 특정 경로가 아닐 때만 -->
    <AppFooter v-if="showFooter" />
  </div>
</template>

<script>
import AppHeader from "./components/common/Header.vue";
import AppFooter from "./components/common/Footer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    showHeader() {
      // 헤더를 숨길 페이지의 경로를 확인
      // return this.$route.path !== '/admin/dashboard';

      // const pathsToHideHeader = ['/admin/dashboard', '/admin/notice', '/admin/notice/*'];
      // return !pathsToHideHeader.includes(this.$route.path);

      const shouldHideHeader =
        this.$route.path === "/admin/dashboard" ||
        this.$route.path.startsWith("/admin/");
      return !shouldHideHeader;
    },
    showFooter() {
      // 푸터를 숨길 페이지의 경로를 확인
      // return this.$route.path !== '/admin/dashboard';
      // const pathsToHideFooter = ['/admin/dashboard', '/admin/notice', '/admin/notice/:id'];
      // return !pathsToHideFooter.includes(this.$route.path);
      const shouldHideFooter =
        this.$route.path === "/admin/dashboard" ||
        this.$route.path.startsWith("/admin/");
      return !shouldHideFooter;
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

@font-face {
  font-family: "BMHANNAPro";
  src: url("assets/fonts/BMHANNAPro.ttf") format("truetype");
  font-weight: 400;
}

@font-face {
  font-family: "BMJUA";
  src: url("./assets/fonts/BMJUA_ttf.ttf") format("truetype");
}
</style>
