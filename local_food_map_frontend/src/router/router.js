// router.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login&join/Login.vue'
import Join from '../views/login&join/Join.vue'
import StoreMap from '../views/store/StoreMap.vue'
import PasswordReset from '../views/login&join/PasswordReset.vue'
import IdReset from '../views/login&join/IdReset.vue'
import Reservation from "../views/reservation/Reservation.vue";
import Payment from "../views/payment/Payment.vue";
import Result from "../views/payment/Result.vue";
import StoreDetail from "../views/store/StoreDetail.vue";
import MemberMyPage from "../views/member/MemberMyPage";
import MemberFavorites from "../views/member/MemberFavorites";
import NoticeSearch from '../views/notice/NoticeSearch.vue'
import NoticeDetail from '../views/notice/NoticeDetail.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminNotice from '../views/admin/AdminNotice.vue'
import AdminNoticeDetail from '../views/admin/AdminNoticeDetail.vue'
import AdminNoticeEdit from '../views/admin/AdminNoticeEdit.vue'

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
      path: '/notice',
      name: 'Notice',
      component: NoticeSearch
    },
    {
      path: '/notice/:id',
      name: 'NoticeDetail',
      component: NoticeDetail,
      props: true,
    },
    {
      path: '/admin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/notice',
      name: 'AdminNotice',
      component: AdminNotice
    },
    {
      path: '/admin/notice/:id',
      name: 'AdminNoticeDetail',
      component: AdminNoticeDetail
    },
    {
      path: '/admin/notice/edit/:id',
      name: 'AdminNoticeEdit',
      component: AdminNoticeEdit,
      props: true
    },
    {
      path: "/reservation",
      name: "ReservationPage",
      component: Reservation,
    },
    {
      path: "/payment",
      name: "PaymentPage",
      component: Payment,
    },
    {
      path: "/store",
      name: "StoreDetail",
      component: StoreDetail,
    },
    {
      path: "/result",
      name: "ResultPage",
      component: Result,
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