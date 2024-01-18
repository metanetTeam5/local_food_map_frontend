<template>
  <div class="sidebar">
    <h2>AMATMU ADMIN</h2>
    <br />
    <br />
    <ul>
      <li>
        <router-link to="/">
          <i class="fas fa-home"></i>
          <span>사이트 바로가기</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/notice">
          <i class="fas fa-bell"></i>
          <span>공지사항 관리</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/blackreview">
          <i class="fas fa-gavel"></i>
          <span>악성 리뷰 관리</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/partnership">
          <i class="fas fa-gavel"></i>
          <span>제휴 요청 관리</span>
        </router-link>
      </li>
      <!-- 추가 링크 -->
    </ul>
  </div>
</template>
  
<script>
export default {
  name: 'AdminSidebar',
};
</script>
  

<style scoped>
.sidebar {
  width: 250px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #343a40;
  /* 더 어두운 배경색으로 변경 */
  color: #fff;
  /* 텍스트 색상을 밝게 변경 */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.sidebar h2 {
  padding-bottom: 20px;
  border-bottom: 1px solid #495057;
  /* 헤더 아래에 어두운 선 추가 */
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  /* 목록 상단의 여백 추가 */
}

.sidebar ul li {
  margin-bottom: 20px;
  /* 각 항목 사이의 여백 증가 */
}

.sidebar ul li a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #adb5bd;
  /* 텍스트 색상 변경 */
  font-weight: 500;
  /* 폰트 굵기 변경 */
}

.sidebar ul li a:hover {
  color: #f8f9fa;
  /* 호버 색상 변경 */
}

.sidebar ul li a i {
  margin-right: 10px;
  /* 아이콘과 텍스트 사이 간격 추가 */
}

.sidebar ul li a span {
  line-height: 1;
}
</style>

  <!-- <style>
  .sidebar {
    width: 250px;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #f4f4f4;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .sidebar h2 {
    padding: 20px 0;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar ul li {
    margin-bottom: 10px;
  }
  
  .sidebar ul li a {
    text-decoration: none;
    color: #333;
  }
  
  .sidebar ul li a:hover {
    color: #007bff;
  }

  .sidebar h2 {
  padding: 20px 0;
  border-bottom: 2px solid #333; /* 헤더 아래에 선을 추가합니다. */
}
  </style>
   -->