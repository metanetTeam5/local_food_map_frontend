<template>
  <div class="container-fluid mypage-container">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
          <div class="nav nav-pills flex-column mb-0 align-items-center align-items-sm-start">
            <router-link to="/bman/reservations">
              <img src="../../assets/images/아맛무 로고.png" class="img-fluid" />
            </router-link>
          </div>
          <br />
          <ul class="nav nav-pills flex-column mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <router-link class="nav-link align-middle px-0" to="/bman/reservations">
                <div class="ms-1 d-none d-sm-inline menu-span">예약 조회</div>
              </router-link>
            </li>
            <br />
            <li class="nav-item">
              <router-link class="nav-link align-middle px-0" to="/bman/info">
                <div class="ms-1 d-none d-sm-inline menu-span selected-menu">
                  식당 정보 수정
                </div>
              </router-link>
            </li>
            <br />
            <li class="nav-item">
              <router-link class="nav-link align-middle px-0" to="/bman/reviews">
                <div class="ms-1 d-none d-sm-inline menu-span">리뷰 관리</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col py-3 my-custom-background">
        <h2>식당 정보 수정</h2>

        <br />
        <br />
        <br />
        <br />
        <div v-if="isLoading">
          <br />
          <br />
          <div class="image-container">
            <img src="@/assets/images/noRestFound.png" alt="가게 등록 대기 이미지" class="my-image" />
          </div>
          <br />
          <br />
          <div class="button-container">
            <button class="btn btn-danger" @click="registerRestaurant">
              가게 등록하기
            </button>
          </div>

        </div>




        <div v-else>
          <form method="post" action="">
            <div class="container">
              <div class="insert">
                <table class="table table-bordered">
                  <thead class="thead-light">
                    <tr>
                      <th colspan="2" class="text-center">식당 정보 수정</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="col1">식당 사진</td>
                      <td class="col2">
                        <img v-if="restImg" class="profile" :src="restImg" alt="식당 이미지" />
                        <img v-else class="profile" src="../../assets/images//아맛무 로고.png" alt="식당 이미지" />
                        <br />
                        <input type="file" id="profilePic" name="profilePic" @change="handleFileChange" />
                        <!-- <input class="but2" type="button" value="식당 사진 변경" @click="updateRestImg" /> -->
                        <b-button size="sm" variant="warning" @click="updateRestImg">
                          식당 사진 변경
                        </b-button>
                      </td>
                    </tr>
                    <tr>

                      <td class="col1">식당 이름</td>
                      <td class="col2">
                        {{ name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="col1">식당 키워드</td>
                      <td class="col2">
                        {{ keyword }}
                      </td>
                    </tr>
                    <tr>
                      <td class="col1">개점시간</td>
                      <td class="col2">
                        <input type="text" v-model="openTime" name="pwdCheck" maxlength="16" />
                      </td>
                    </tr>
                    <tr>
                      <td class="col1">폐점시간</td>
                      <td class="col2">
                        <input type="text" v-model="closeTime" name="pwdCheck" maxlength="16" />
                      </td>
                    </tr>
                    <tr>
                      <td class="col1">식당 전화번호</td>
                      <td class="col2">
                        {{ phoneNumber }}
                      </td>
                    </tr>
                    <tr>
                      <td class="col1">식당 예약금</td>
                      <td class="col2">
                        <input type="text" v-model="deposit" name="pwdCheck" maxlength="16" />
                        <span>수정된 예약금은 변경 후 적용됩니다.</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="col1">메뉴정보</td>
                      <td class="col2">
                        <b-button size="sm" variant="warning" @click="modalOpen">
                          메뉴 등록하기
                        </b-button>


                        <br />
                        {{ menu }}
                      </td>
                    </tr>
                    <!-- Your table rows -->
                  </tbody>
                </table>
              </div>
            </div>

            <div class="create">
              <b-button size="sm" variant="warning" @click="updateRestInfo">
                수정하기
              </b-button>
            </div>

          </form>

        </div>

        <div>
          <div v-if="modalCheck" class="modal-wrap">
            <div class="modal-container">
              <h2>메뉴 등록하기</h2>
              <label class="menuLabel">메뉴 이름</label>
              <input type="text" v-model="menuName" name="pwdCheck" maxlength="16" />
              <br />
              <label class="menuLabel">메뉴 가격</label>
              <input type="text" v-model="menuPrice" name="pwdCheck" maxlength="16" />
              <br />
              <label class="menuLabel">메뉴 사진</label>
              <input type="file" id="profilePic" name="profilePic" @change="handleMenuChange" />

              <div class="modal-btn">
                <button class="btn btn-primary mt-3 small-button" @click="registerMenu">
                  등록
                </button>
                <button class="btn btn-primary mt-3 small-button" @click="modalClose">
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BmanInfo",
  data() {
    return {
      isLoading: true,

      name: '',
      keyword: '',
      openTime: '',
      closeTime: '',
      phoneNumber: '',
      deposit: '',
      menu: '',
      restImg: '',
      restId: '',
      newRestImg: '',
      menuName: '',
      menuPrice: '',
      menuImg: null,
      menuImgUrl: '',
      modalCheck: false,

    };
  },
  methods: {
    async registerRestaurant() {
      this.$router.push("/mypage/restaurant");
    },
    async getRestInfo() {
      let token = sessionStorage.getItem("token");
      if (token !== null) {
        let response;
        try {
          response = await axios.get(
            process.env.VUE_APP_API_ENDPOINT + "/bm/restaurant/info",
            {
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            }
          );
          console.log(response.data);
          this.name = response.data.restName;
          this.keyword = response.data.restKeyword;
          this.openTime = response.data.restOpenTime;
          this.closeTime = response.data.restCloseTime;
          this.phoneNumber = response.data.restPhoneNumber;
          this.deposit = response.data.restDeposit;
          this.restImg = response.data.restImg;
          this.restId = response.data.restId;

          response = await axios.get(
            process.env.VUE_APP_API_ENDPOINT + "/menu/namelist/" + this.restId
          );

          this.menu = response.data;

          this.isLoading = false;
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("로그인 후 이용 가능합니다.");
        this.$router.push({ name: "HomePage" });
        this.$router.go(0);
      }
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.newRestImg = selectedFile;
    },

    async updateRestImg() {
      if (this.newProfileImg !== null) {
        let formData = new FormData();
        formData.append("restImg", this.newRestImg);

        await axios.put(
          process.env.VUE_APP_API_ENDPOINT +
          "/bm/update/restaurant/image/" +
          this.restId,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("식당 사진 변경 완료");
        this.$router.go(0);
      } else {
        alert("선택된 파일이 없습니다.");
      }
    },

    async updateRestinfo() {
      await axios.put(
        process.env.VUE_APP_API_ENDPOINT + "/bm/restaurant/info/update",
        {
          restId: this.restId,
          restOpenTime: this.openTime,
          restCloseTime: this.closeTime,
          restDeposit: this.deposit,
        }
      );

      alert("식당 정보 수정 완료");
      this.$router.go(0);
    },
    async registerMenu() {
      let response;
      if (this.menuImg !== null) {
        let formData = new FormData();
        formData.append('file', this.menuImg);

        response = await axios.post(
          process.env.VUE_APP_API_ENDPOINT + '/menu/image/insert',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        this.menuImgUrl = response.data;
      }

      response = await axios.post(
        process.env.VUE_APP_API_ENDPOINT + '/menu/register/' + this.restId,
        {
          menuName: this.menuName,
          menuPrice: this.menuPrice,
          menuImg: this.menuImgUrl,
        }
      );
      this.modalClose();
      alert('메뉴 등록 완료');
      this.$router.go(0);
    },
    modalOpen() {
      this.modalCheck = !this.modalCheck;
    },
    modalClose() {
      this.menuName = '';
      this.menuPrice = '';
      this.menuImg = null;
      this.menuImgUrl = '';
      this.modalCheck = !this.modalCheck;
    },
    handleMenuChange(event) {
      const selectedFile = event.target.files[0];
      this.menuImg = selectedFile;
    },
  },
  mounted() {
    this.getRestInfo();
  },
};
</script>

<style>
* {
  font-family: "BMHANNAPro";
}

.mypage-container {
  margin-top: 70px;
}

.menu-span {
  color: black;
}

.selected-menu {
  color: #ffae00;
}

.join-form {
  margin-top: 100px;
  /* 헤더의 높이에 따라 조절 */
}

.join-form h1 {
  font-size: 36px;
  text-align: center;
  color: #ffae00;
  margin-bottom: 30px;
  font-weight: normal;
}

div.container {}

div.insert {}

div.create {
  width: 800px;
  text-align: center;
  padding: 30px;
  margin: auto;
}

table {
  height: 300px;
  width: 900px;
  margin-right: auto;
  margin-left: auto;
}

td {
  border-bottom: 1px dotted black;
}

caption {
  text-align: left;
}

.col1 {
  background-color: white;
  border: solid 2px #fce205;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 0.8em;
}

.col2 {
  text-align: left;
  border: solid 2px #fce205;
  padding: 5px;
}

.but1 {
  height: 25px;
  width: 80px;
  background-color: #ffae00;
  color: white;
  border: 2px solid #ffae00;
  margin-left: 5px;
}

.but2 {
  height: 25px;
  width: 150px;
  background-color: #ffae00;
  color: white;
  border: 2px solid #ffae00;
  margin-left: 5px;
}

.but3 {
  height: 35px;
  width: 150px;
  background-color: #ffae00;
  color: white;
  border: 2px solid #ffae00;
  margin-left: 10px;
}

.but4 {
  height: 35px;
  width: 150px;
  background-color: #ffae00;
  color: white;
  border: 2px solid #ffae00;
  margin-right: 10px;
}

.but1:hover {
  background-color: #fed273;
  color: white;
  border: 2px solid #fed273;
}

.but2:hover {
  background-color: #fed273;
  color: white;
  border: 2px solid #fed273;
}

.but3:hover {
  background-color: #fed273;
  color: white;
  border: 2px solid #fed273;
}

.but4:hover {
  background-color: #fed273;
  color: white;
  border: 2px solid #fed273;
}

#checkAuthCodeBtn {
  margin-top: 10px;
}

p {
  font-size: 0.7em;
}

.g {
  font-size: 0.7em;
}

.c {
  font-size: 0.7em;
}

.a {
  font-size: 0.7em;
}

.num {
  color: red;
}

.field.tel-number div {
  display: flex;
}

.field.tel-number div input:nth-child(1) {
  flex: 2;
}

.field.tel-number div input:nth-child(2) {
  flex: 1;
}

.field.gender div {
  border: 1px solid #dadada;
  padding: 15px 5px;
  background-color: #fff;
}

.placehold-text {
  display: block;
  /*span 으로 감싸서 크기영역을 블록요소로 만들어ㅜ저야한다*/
  position: relative;
  /* border: 1px solid #000; */
}

.placehold-text:before {

  content: '@naver.com';
  position: absolute;
  /*before은 inline 요소이기 때문에 span으로 감싸줌 */

  right: 20px;
  top: 13px;
  pointer-events: none;
  /*자체가 가지고 있는 pointer event 를 없애준다 */
}

.userpw {
  /* background:url(./images/images2/icon-01.png) no-repeat center right 15px; */
  background-size: 20px;
  background-color: #fff;
}

.userpw-confirm {
  /* background:url(./images/images2/icon-02.png) no-repeat center right 15px; */
  background-size: 20px;
  background-color: #fff;
}

.member-footer {
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}

.member-footer div a:hover {
  text-decoration: underline;
  color: #2db400;
}

.member-footer div a:after {
  content: "|";
  font-size: 10px;
  color: #bbb;
  margin-right: 5px;
  margin-left: 7px;
  /*살짝 내려가 있기 때문에 위로 올려주기 위해 transform 사용하기*/
  display: inline-block;
  transform: translateY(-1px);
}

.member-footer div a:last-child:after {
  display: none;
}

@media (max-width: 768px) {
  .member {
    width: 100%;
  }
}

.color-red {
  color: red;
}

.profile {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.heart-button {
  float: right;
}

.sidebar-logo {
  width: 576px;
}

.my-image {
  max-width: 500px;
  /* 예시로 500px로 설정 */
  height: auto;
  /* 이미지의 비율을 유지하면서 높이 조절 */
}

.button-container {
  text-align: center;
  /* 버튼을 수평 중앙으로 정렬 */
}

.image-container {
  text-align: center;
  /* 이미지를 수평 중앙으로 정렬 */
}


.my-custom-background {
  background-color: white;
  /* Set the background color to white */

  .bm-logo {
    margin-bottom: 0;
  }

  .modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
  }

  .menuLabel {
    margin-right: 10px;

  }
}
</style>
