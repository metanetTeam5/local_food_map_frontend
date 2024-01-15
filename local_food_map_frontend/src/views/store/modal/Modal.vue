<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
           
            <!-- 화면 1 -->
            <div v-if="currentScreen === 1" class="content-area">
              <button class="modal-close-button" @click="$emit('close')">닫기</button>
              <button class="reserve-title" @click="showCalendar = !showCalendar">날짜, 시간, 인원을 선택해주세요.</button>
              <div class="modal-footer">
                <button class="modal-next-button" @click="goToNextScreen">다음</button>
              </div>
            </div>
  
            <!-- 화면 2 -->
            <div v-if="currentScreen === 2" class="content-area">
              <button class="modal-close-button" @click="$emit('close')">닫기</button>
              화면2
              <div class="modal-footer">
                <button class="modal-prev-button" @click="goToPreviousScreen">이전</button>
                <button class="modal-next-button" @click="goToNextScreen">다음</button>
              </div>
            </div>
  
            <!-- 화면 3 -->
            <div v-if="currentScreen === 2" class="content-area">
              <button class="modal-close-button" @click="$emit('close')">닫기</button>
              화면2
              <div class="modal-footer">
                <button class="modal-prev-button" @click="goToPreviousScreen">이전</button>
                <button class="modal-next-button" @click="goToNextScreen">다음</button>
              </div>
            </div>
             <!-- 화면 4 -->
            <div v-if="currentScreen === 2" class="content-area">
              <button class="modal-close-button" @click="$emit('close')">닫기</button>
              화면2
              <div class="modal-footer">
                <button class="modal-prev-button" @click="goToPreviousScreen">이전</button>
                <button class="modal-next-button" @click="goToNextScreen">다음</button>
              </div>
            </div>
             <!-- 화면 5 -->
            <div v-if="currentScreen === 2" class="content-area">
              <button class="modal-close-button" @click="$emit('close')">닫기</button>
              화면2
              <div class="modal-footer">
                <button class="modal-prev-button" @click="goToPreviousScreen">이전</button>
                <button class="modal-next-button" @click="goToNextScreen">다음</button>
              </div>
            </div>
             <!-- 화면 6 -->
            <div v-if="currentScreen === 2" class="content-area">
              <button class="modal-close-button" @click="$emit('close')">닫기</button>
              화면2
              <div class="modal-footer">
                <button class="modal-prev-button" @click="goToPreviousScreen">이전</button>
                <button class="modal-next-button" @click="goToNextScreen">다음</button>
              </div>
            </div>
             <!-- 화면 7 -->
             <div v-if="currentScreen === 2" class="content-area">
              <button class="modal-close-button" @click="$emit('close')">닫기</button>
              화면2
              <div class="modal-footer">
                <button class="modal-prev-button" @click="goToPreviousScreen">이전</button>
                <button class="modal-next-button" @click="goToNextScreen">다음</button>
              </div>
            </div>
             <!-- 화면 8 -->
             <div v-if="currentScreen === 2" class="content-area">
              <button class="modal-close-button" @click="$emit('close')">닫기</button>
              화면2
              <div class="modal-footer">
                <button class="modal-prev-button" @click="goToPreviousScreen">이전</button>
                <button class="modal-next-button" @click="goToNextScreen">다음</button>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  
  <script>
  
export default {
  name: "MyModal",
  data() {
    return {
      currentScreen: 1,
    };
  },
  methods: {
    goToNextScreen() {
      if (this.currentScreen < 8) {
        this.currentScreen++;
      }
    },
    goToPreviousScreen() {
      if (this.currentScreen > 1) {
        this.currentScreen--;
      }
    },
  },
};
</script>
<style>
.modal-container {
  width: 600px;
  height: 600px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  overflow: auto;

}

.modal-close-button {
  position: absolute;
  top: 10px; /* 상단에서의 위치 */
  right: 10px; /* 우측에서의 위치 */
  /* 추가 스타일 */
}

.modal-footer {
  display: flex;
  justify-content: space-between; /* 양쪽 정렬 */
  padding: 10px;
  position: absolute;
  left: 10px; /* 하단 좌측에서의 위치 */
  right: 10px; /* 하단 우측에서의 위치 */
  bottom: 10px; /* 바닥에서의 위치 */
}

.modal-next-button {
  margin-left: auto; /* 오른쪽 정렬을 위한 설정 */
}

.modal-prev-button {
  /* 이전 버튼 스타일 */
}


</style>