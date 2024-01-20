<template>
  <div class="container">
    <router-link class="nav-link" to="/join">
      <div class="nav-link-container">
        일반 회원으로<br />
        회원가입
      </div>
    </router-link>
    <div class="spacer"></div>
    <router-link class="nav-link" to="/bman/join">
      <div class="nav-link-container">
        사업자로<br />
        회원가입
      </div>
    </router-link>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.nav-link-container {
  width: 100%;
  height: 100%;
  border: 2px solid #000;
  padding: 20px;
}

.nav-link-container:hover {
  background-color: #fed273;
}

.spacer {
  width: 20%;
}

.nav-link {
  text-align: center;
}
</style>

<script>
export default {
  name: 'SelectJoin',
  data() {
    return {};
  },
};
</script>
