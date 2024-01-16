<template>
    <div class="sidebar">
      <h2>AMATMU ADMIN</h2>
      <br/>
      <br/>
      <ul>
        <li><router-link to="/">🗿 사이트 바로가기</router-link></li>
        <li><router-link to="/admin/notice">🗿 공지사항 관리</router-link></li>
        <!-- 추가 링크 -->
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminSidebar',
  };
  </script>
  
  <style>
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
  