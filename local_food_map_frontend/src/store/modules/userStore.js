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
    searchResults: [], // 검색 결과 상태

  },
  mutations: {
    login: function (state, payload){
        state.userId = payload.userId
        state.userEmail = payload.userEmail
        state.token = payload.token
        
    },

    loginCheck: function (state) {
        if (!state.token){
            router.push({
                name: 'UserLogin'
            }).catch(error => {
                console.log(error)
            })
        }
    },
    setSearchResults(state, results) {
      state.searchResults = results;
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
  }
});  

export default userStore;
