// router.js
import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login&join/Login.vue";
import Join from "../views/login&join/Join.vue";
import StoreMap from "../views/store/StoreMap.vue";
import PasswordReset from "../views/login&join/PasswordReset.vue";
import IdReset from "../views/login&join/IdReset.vue";
import MemberMyPage from "../views/member/MemberMyPage";
import MemberFavorites from "../views/member/MemberFavorites";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: Home,
    },
    {
      path: "/login",
      name: "UserLogin",
      component: Login,
    },
    {
      path: "/join",
      name: "UserJoin",
      component: Join,
    },
    {
      path: "/map",
      name: "MapPage",
      component: StoreMap,
    },
    {
      path: "/password-reset",
      name: "PasswordResetPage",
      component: PasswordReset,
    },
    {
      path: "/id-reset",
      name: "IdResetPage",
      component: IdReset,
    },
    {
      path: "/mypage",
      name: "MemberMyPage",
      component: MemberMyPage,
    },
    {
      path: "/mypage/favorites",
      name: "MemberFavorites",
      component: MemberFavorites,
    },
  ],
});
