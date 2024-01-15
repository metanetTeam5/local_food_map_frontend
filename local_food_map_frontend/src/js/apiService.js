import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_BACKEND_URL || 'http://localhost:8088';

export const apiService = {
  getRestaurantById(restId) {
    return axios.get(`${API_BASE_URL}/restaurant/${restId}`);
  },
  //해당가게정보의 리뷰연결
  getReviewById(restId) {
    return axios.get(`${API_BASE_URL}/review/restaurant/${restId}`);
  },
  getFavoriteById(favoriteId) {
    return axios.get(`${API_BASE_URL}/favorite/${favoriteId}`);
  },
  getReserveById(reserveId) {
    return axios.get(`${API_BASE_URL}/reservation/${reserveId}`);
  },
  getMenuById(menuId) {
    return axios.get(`${API_BASE_URL}/Menu/${menuId}`);
  },
  getMemberById(memberId) {
    return axios.get(`${API_BASE_URL}/member/profileimg/${memberId}`);
  },
  searchRestaurants(searchKeyword) {
    return axios.get(`${API_BASE_URL}/restaurant/search/${searchKeyword}`);


  },

  
};
