/* eslint-disable no-redeclare */

/* global kakao */
import router from '@/router/router';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const userStore = new Vuex.Store({
  state: {
    userId: '',
    userEmail: '',
    token: '',
    searchResults: [],
    userProfileImg: '',
  },
  mutations: {
    login(state, payload) {
      state.userId = payload.userId;
      state.userEmail = payload.userEmail;
      state.token = payload.token;
      state.userProfileImg = payload.userProfileImg;
    },
    logout(state) {
      state.userId = '';
      state.userEmail = '';
      state.token = '';
      state.userProfileImg = '';
    },
    loginCheck(state) {
      if (!state.token) {
        router.push({
          name: 'UserLogin',
        }).catch(error => {
          console.log(error);
        });
      }
    },
    setSearchResults(state, results) {
      state.searchResults = results;
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    userProfileImg(state) {
      return state.userProfileImg;
    },
    userId(state) {
      return state.userId;
    },
    
  },
  actions: {
    async searchPlaces({ commit }, searchQuery) {
      try {
        var ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchQuery, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            commit('setSearchResults', data);
          } else {
            commit('setSearchResults', []);
          }
        });
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
        commit('setSearchResults', []);
      }
    },
  },
});

export default userStore;
