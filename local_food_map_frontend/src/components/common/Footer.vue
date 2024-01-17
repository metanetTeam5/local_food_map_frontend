<template>
  <footer class="footer">
    <div>
      <div class="nav-links">
        <a class="nav-link" href="/"
          >아맛무제휴문의 | 이용약관 | 개인정보처리방침</a
        >
      </div>
      <hr />
      <div>
        <span>(주) 아맛무팀</span> <span>&nbsp;|</span>
        <span>&nbsp;소재지 : 서울특별시 종로구 창경궁로 254 </span>
      </div>
      <div>이메일문의 : metameta@metanet.com</div>
      <div>
        <p>전화문의 : 02-123-4567 (평일 : 10:00~19:00, 주말/공휴일 제외)</p>
        <p>Copyright Ⓒ 2024 METANET TEAM AMATMU</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 20px;
  background-color: #fefef8;
  color: black;
  text-align: left;
  font-family: "BMHANNAPro";
}

.nav-links {
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
}
</style>
