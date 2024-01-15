<template>
  <div class="container-fluid mypage-container">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <div
          class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100"
        >
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li class="nav-item">
              <a class="nav-link align-middle px-0" href="/mypage/"
                ><div class="ms-1 d-none d-sm-inline menu-span selected-menu">
                  개인정보수정
                </div></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link align-middle px-0" href="/mypage/"
                ><div class="ms-1 d-none d-sm-inline menu-span">
                  주문내역
                </div></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link align-middle px-0" href="/mypage/"
                ><div class="ms-1 d-none d-sm-inline menu-span">
                  리뷰관리
                </div></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link align-middle px-0" href="/mypage/favorites"
                ><div class="ms-1 d-none d-sm-inline menu-span">나의 찜</div></a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col py-3">
        <h2>프로필 수정하기</h2>
        <div v-if="isLoading">로딩중</div>
        <div v-else>
          <form method="post" action="">
            <div class="container">
              <div class="insert">
                <table>
                  <tr>
                    <td class="col1">프로필 사진</td>
                    <td class="col2">
                      <img
                        v-if="profileImg"
                        class="profile"
                        :src="profileImg"
                        alt="프로필 이미지"
                      />
                      <img
                        v-else
                        class="profile"
                        src="../../assets/images/default-profile-picture.png"
                        alt="프로필 이미지"
                      />
                      <br />
                      <input
                        type="file"
                        id="profilePic"
                        name="profilePic"
                        @change="handleFileChange"
                      />
                      <input
                        class="but2"
                        type="button"
                        value="프로필 사진 변경"
                        @click="updateProfileImg"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="col1">이메일</td>
                    <td class="col2">
                      {{ email }}
                    </td>
                  </tr>
                  <tr>
                    <td class="col1">현재 비밀번호</td>
                    <td class="col2">
                      <input
                        type="password"
                        v-model="password"
                        name="pwdCheck"
                        maxlength="16"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="col1">새 비밀번호</td>
                    <td class="col2">
                      <input
                        type="password"
                        v-model="newPassword"
                        name="pwdCheck"
                        maxlength="16"
                        @input="checkPassword"
                      />
                      <p>
                        ※비밀번호는
                        <span class="num"
                          >문자, 숫자, 특수문자(~!@#$%^&*)의 조합 8 ~
                          16자리</span
                        >로 입력이 가능합니다.
                      </p>
                      <p>
                        <span class="num" v-if="!checkPasswordPattern"
                          >* 비밀번호 형식에 맞게 작성해주세요.</span
                        >
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td class="col1">새 비밀번호 확인</td>
                    <td class="col2">
                      <input
                        type="password"
                        v-model="newPasswordCheck"
                        name="pwdCheck"
                        maxlength="16"
                        @input="checkPassword"
                      />
                      <span class="num" v-if="!validPassword"
                        >* 비밀번호가 일치하지 않습니다.</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="col1">이름</td>
                    <td class="col2">{{ name }}</td>
                  </tr>
                  <tr>
                    <td class="col1">닉네임</td>
                    <td class="col2">
                      <input
                        type="text"
                        v-model="nickname"
                        maxlength="20"
                        @change="writeNickname"
                      />
                      <span v-if="nicknameDuplicate">
                        <small class="color-red"
                          >이미 사용 중인 닉네임입니다.</small
                        >
                      </span>
                      <input
                        class="but1"
                        type="button"
                        value="중복확인"
                        @click="checkNicknameDuplicate"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td class="col1">생년월일</td>
                    <td class="col2">{{ birthDate }}</td>
                  </tr>
                  <tr>
                    <td class="col1">성별</td>
                    <td class="col2">{{ gender }}</td>
                  </tr>
                  <tr>
                    <td class="col1">휴대전화</td>
                    <td class="col2">{{ phoneNumber }}</td>
                  </tr>
                  <tr>
                    <td class="col1">가입일</td>
                    <td class="col2">{{ createdDate }}</td>
                  </tr>
                </table>
              </div>
              <div class="create">
                <input
                  class="but4"
                  type="button"
                  value="회원정보 수정"
                  @click="updateMemberInfo"
                />
                <input
                  class="but4"
                  type="button"
                  value="회원 탈퇴"
                  @click="deleteMember"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MemberMyPage",
  data() {
    return {
      isLoading: true,
      userId: "",
      email: "",
      password: "",
      newPassword: "",
      newPasswordCheck: "",
      name: "",
      nickname: "",
      birthDate: "",
      phoneNumber: "",
      profileImg: null,
      newProfileImg: null,
      gender: "",
      createdDate: "",
      nicknameDuplicate: false,
      validPassword: true,
      changeNickname: false,
      checkPasswordPattern: true,
    };
  },
  methods: {
    async getInfo() {
      let token = sessionStorage.getItem("token");
      if (token !== null) {
        let response;
        try {
          response = await axios.get(
            process.env.VUE_APP_API_ENDPOINT + "/member/info",
            {
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            }
          );
          this.setMemberInfo(response);

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
    checkPassword() {
      this.checkPasswordPatternFunction();
      if (this.newPassword !== this.newPasswordCheck) {
        this.validPassword = false;
      } else {
        this.validPassword = true;
      }
    },
    checkPasswordPatternFunction() {
      let passwordPattern =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;

      if (!passwordPattern.test(this.newPassword)) {
        this.checkPasswordPattern = false;
      } else {
        this.checkPasswordPattern = true;
      }
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.newProfileImg = selectedFile;
    },
    async updateProfileImg() {
      let token = sessionStorage.getItem("token");
      if (this.newProfileImg !== null) {
        let formData = new FormData();
        formData.append("email", this.email);
        formData.append("file", this.newProfileImg);

        await axios.put(
          process.env.VUE_APP_API_ENDPOINT + "/member/profileimg/update",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-AUTH-TOKEN": token.toString(),
            },
          }
        );

        alert("프로필 사진 변경 완료");
        this.$router.go(0);
      } else {
        alert("선택된 파일이 없습니다.");
      }
    },
    writeNickname() {
      this.changeNickname = true;
    },
    async checkNicknameDuplicate() {
      try {
        await axios.get(
          process.env.VUE_APP_API_ENDPOINT +
            "/member/checknickname?nickname=" +
            this.nickname
        );

        this.nicknameDuplicate = false;
        this.changeNickname = false;
        alert("사용 가능한 닉네임입니다.");
      } catch (error) {
        this.nicknameDuplicate = true;
        this.changeNickname = true;
      }
    },
    async updateMemberInfo() {
      if (this.password === "") {
        alert("현재 비밀번호를 입력해주세요.");
      } else if (!this.validPassword || !this.checkPasswordPattern) {
        alert("새 비밀번호 확인해주세요");
      } else if (this.nicknameDuplicate || this.changeNickname) {
        alert("닉네임 중복 확인 해주세요.");
      } else {
        let token = sessionStorage.getItem("token");
        let response;
        try {
          response = await axios.put(
            process.env.VUE_APP_API_ENDPOINT + "/member/info/update",
            {
              password: this.password,
              newPassword: this.newPassword,
              nickname: this.nickname,
            },
            {
              headers: {
                "X-AUTH-TOKEN": token.toString(),
              },
            }
          );
          console.log(response.data);
          alert("회원 정보가 수정되었습니다.");
          this.$router.go(0);
        } catch (error) {
          console.error(error);
        }
      }
    },
    async deleteMember() {
      if (
        confirm("회원 탈퇴를 하시겠습니까? 탈퇴하면 회원 정보는 삭제됩니다.")
      ) {
        if (this.password === "") {
          alert("현재 비밀번호를 입력해주세요.");
        } else {
          let token = sessionStorage.getItem("token");
          let response;
          try {
            response = await axios.delete(
              process.env.VUE_APP_API_ENDPOINT + "/member/delete",
              {
                data: {
                  password: this.password,
                },
                headers: {
                  "X-AUTH-TOKEN": token.toString(),
                },
              }
            );
            console.log(response.data);
            sessionStorage.clear();
            alert("회원 탈퇴 완료");
            this.$router.push({ name: "HomePage" });
            this.$router.go(0);
          } catch (error) {
            console.error(error);
            alert("회원 탈퇴 실패");
          }
        }
      }
    },
    setMemberInfo(response) {
      this.email = response.data.email;
      this.name = response.data.name;
      if (response.data.gender === "M") {
        this.gender = "남성";
      } else {
        this.gender = "여성";
      }
      this.nickname = response.data.nickname;
      this.birthDate = response.data.birthDate;
      this.phoneNumber = response.data.phoneNumber;
      this.profileImg = response.data.profileImg;
      this.createdDate = response.data.createDate;
    },
  },
  mounted() {
    this.getInfo();
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
  margin-top: 100px; /* 헤더의 높이에 따라 조절 */
}

.join-form h1 {
  font-size: 36px;
  text-align: center;
  color: #ffae00;
  margin-bottom: 30px;
  font-weight: normal;
}
div.container {
}

div.insert {
}

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
  display: block; /*span 으로 감싸서 크기영역을 블록요소로 만들어ㅜ저야한다*/
  position: relative;
  /* border: 1px solid #000; */
}

.placehold-text:before {
  content: "@naver.com";
  position: absolute; /*before은 inline 요소이기 때문에 span으로 감싸줌 */
  right: 20px;
  top: 13px;
  pointer-events: none; /*자체가 가지고 있는 pointer event 를 없애준다 */
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
</style>
