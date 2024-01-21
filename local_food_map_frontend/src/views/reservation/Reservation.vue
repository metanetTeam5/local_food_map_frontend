<template>
  <div>
    <button class="btn btn-primary" @click="modalOpen">예약하기</button>

    <div v-if="modalCheck" class="modal-wrap">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- 모달창 content -->
          <form @submit.prevent="submitReservation" class="p-4">
            <h5 class="mb-4">예약 정보 입력</h5>
            <div class="form-group">
              <label for="headcount">인원 수:</label>
              <input
                type="number"
                class="form-control"
                id="headcount"
                v-model="reservation.headcount"
                :min="minHeadcount"
                required
              />
            </div>

            <div class="form-group">
              <label for="resvDate">날짜:</label>
              <input
                type="date"
                class="form-control"
                id="resvDate"
                v-model="reservation.resvDate"
                :min="minDate"
                required
                @change="resetReservationHour"
              />
            </div>

            <div class="form-group">
              <label for="resvHour">시간:</label>
              <div class="time-buttons">
                <button
                  v-for="hour in availableHours"
                  :key="hour"
                  @click="setReservationHour(hour)"
                  :disabled="isPastTime(hour) || !reservation.resvDate"
                  :class="{
                    'btn-primary': reservation.resvHour === hour,
                    selected: selectedHour === hour,
                  }"
                >
                  {{ hour }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="additionalRequirements">추가 요구사항:</label>
              <textarea
                class="form-control"
                id="additionalRequirements"
                v-model="reservation.additionalRequirements"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label>1인당 보증금: 10,000원</label>
              <p>{{ deposit }}</p>
            </div>

            <div class="modal-btn text-right">
              <button
                type="button"
                class="btn btn-secondary"
                @click="modalOpen"
              >
                닫기
              </button>
              <router-link
                :to="{
                  path: '/payment',
                  query: {
                    resvHour: reservation.resvHour,
                    additionalRequirements: reservation.additionalRequirements,
                  },
                }"
              >
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="!reservation.resvHour"
                >
                  <div id="pay">결제</div>
                </button>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReservationPage",
  data() {
    return {
      modalCheck: false,
      reservation: {
        headcount: 1,
        resvDate: null,
        resvHour: null,
        additionalRequirements: "",
      },
      selectedHour: null,
    };
  },
  computed: {
    currentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    currentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    minHeadcount() {
      return 1;
    },
    deposit() {
      const formattedDeposit = (
        this.reservation.headcount * 10000
      ).toLocaleString();
      return `결제예정금액: ${this.reservation.headcount}(명) X 10,000 = ${formattedDeposit}원`;
    },
    availableHours() {
      const startHour = this.isToday() ? new Date().getHours() + 1 : 9;
      const endHour = 19;
      const intervalMinutes = 30;

      const hours = [];
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
          const formattedHour = String(hour).padStart(2, "0");
          const formattedMinute = String(minute).padStart(2, "0");
          hours.push(`${formattedHour}:${formattedMinute}`);
        }
      }

      return hours;
    },
  },
  methods: {
    modalOpen() {
      this.modalCheck = !this.modalCheck;
    },
    submitReservation() {
      console.log("Reservation Submitted:", this.reservation);
    },
    setReservationHour(hour) {
      this.reservation.resvHour = hour;
      this.selectedHour = hour;
    },
    resetReservationHour() {
      this.reservation.resvHour = null;
      this.selectedHour = null;
    },
    isPastTime(hour) {
      if (this.isToday()) {
        const selectedTime = new Date(`${this.currentDate} ${hour}`);
        const currentTime = new Date();
        return selectedTime <= currentTime;
      }
      return false;
    },
    isToday() {
      return this.reservation.resvDate === this.currentDate;
    },
  },
};
</script>

<style>
#pay {
  color: white;
}
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

div.modal-content {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.time-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.time-buttons button {
  width: 80px;
  margin-bottom: 10px;
}

.selected {
  background-color: #4caf50;
  color: white;
}
</style>
