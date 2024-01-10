<template>
  <form method="post" action="">
    <div class="container">
      <div class="insert">
        <table>
          <caption>
            <h2>회원가입 양식</h2>
          </caption>
          <tr>
            <td class="col1">이메일</td>
            <td class="col2">
              <input
                type="text"
                v-model="email"
                @blur="emailValidCheck(), checkDuplicate('email')"
                maxlength="16"
              />
              <div v-if="!emailValid">
                <small class="color-red">이메일 형식으로 입력해주세요.</small>
              </div>
              <div v-else-if="emailDuplicate">
                <small class="color-red">이미 사용 중인 이메일입니다.</small>
              </div>
              <input class="but1" type="button" value="중복확인" onclick="" />
            </td>
          </tr>
          <tr>
            <td class="col1">비밀번호</td>
            <td class="col2">
              <input type="password" name="pwd" maxlength="16" />
              <p>
                ※비밀번호는
                <span class="num"
                  >문자, 숫자, 특수문자(~!@#$%^&*)의 조합 10 ~ 16자리</span
                >로 입력이 가능합니다.
              </p>
            </td>
          </tr>
          <tr>
            <td class="col1">비밀번호 확인</td>
            <td class="col2">
              <input type="password" name="pwdCheck" maxlength="16" />
              <p><span class="num">* 비밀번호가 일치하지 않습니다.</span></p>
            </td>
          </tr>
          <tr>
            <td class="col1">이름</td>
            <td class="col2">
              <input type="text" name="name" maxlength="16" />
            </td>
          </tr>
          <tr>
            <td class="col1">닉네임</td>
            <td class="col2">
              <input
                type="text"
                v-model="nickname"
                @blur="checkDuplicate('nickname')"
                maxlength="20"
              />
              <div v-if="nicknameDuplicate">
                <small class="color-red">이미 사용 중인 닉네임입니다.</small>
              </div>
              <input class="but1" type="button" value="중복확인" />
            </td>
          </tr>

          <tr>
            <td class="col1">생년월일</td>
            <td class="col2">
              <select name="grade">
                <option value="slc1" selected>출생 연도</option>
                <option value="g1">2019</option>
                <option value="g2">2</option>
                <option value="g3">3</option>
                <option value="g4">4</option>
                <option value="g5">5</option>
                <option value="g6">6</option>
              </select>
              <select name="cls">
                <option value="slc2" selected>월</option>
                <option value="c1">1</option>
                <option value="c2">2</option>
                <option value="c3">3</option>
                <option value="c4">4</option>
                <option value="c5">5</option>
              </select>
              <select name="cls">
                <option value="slc2" selected>일</option>
                <option value="c1">1</option>
                <option value="c2">2</option>
                <option value="c3">3</option>
                <option value="c4">4</option>
                <option value="c5">5</option>
                <option value="c3">6</option>
                <option value="c4">7</option>
                <option value="c5">8</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="col1">성별</td>
            <td class="col2">
              <input type="radio" id="male" name="gender" value="male" />
              <label for="male">남성</label><br />
              <input type="radio" id="female" name="gender" value="female" />
              <label for="female">여성</label>
            </td>
          </tr>
          <tr>
            <td class="col1">프로필 사진</td>
            <td class="col2">
              <input type="file" id="profilePic" name="profilePic" />
            </td>
          </tr>
          <tr>
            <td class="col1">휴대전화</td>
            <td class="col2">
              <input
                type="text"
                v-model="phoneNumber"
                @blur="checkDuplicate('phoneNumber')"
                maxlength="20"
              />
              <div v-if="phoneNumberDuplicate">
                <small class="color-red"
                  >이미 사용 중인 휴대전화 번호입니다.</small
                >
              </div>
              <input
                class="but1"
                type="button"
                value="인증번호 전송"
                onclick=""
              />
            </td>
          </tr>
          <tr>
            <td class="col1">인증번호</td>
            <td class="col2">
              <input type="password" name="pwd" maxlength="16" />
              <input class="but1" type="button" value="확인" onclick="" /><br />
              <input
                class="but1"
                type="button"
                value="인증번호 재전송"
                onclick=""
              />
            </td>
          </tr>
        </table>
      </div>
      <div class="create">
        <input class="but3" type="button" value="가입취소" onclick="" />
        <input
          class="but4"
          type="button"
          value="회원가입"
          onclick="formCheck(this.form)"
        />
      </div>
    </div>
  </form>
</template>


<script>
import axios from "axios";

export default {
  name: "UserJoin",
  data() {
    return {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      gender: "",
      nickname: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      phoneNumber: "",
      emailValid: true,
      emailDuplicate: false,
      nicknameDuplicate: false,
      phoneNumberDuplicate: false,
    };
  },
  methods: {
    emailValidCheck() {
      // 이메일 형식 검사 로직
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.emailValid = emailRegex.test(this.email);
      return this.emailValid;
    },
    async checkDuplicate(type) {
      // 중복 검사 로직
      try {
        let response;
        if (type === "email") {
          // 이메일 중복 검사 API 호출
          response = await axios.post("/member/checkEmail", {
            email: this.email,
          });
          this.emailDuplicate = response.data.isDuplicate;
        } else if (type === "nickname") {
          // 닉네임 중복 검사 API 호출
          response = await axios.post("/member/checkNickname", {
            nickname: this.nickname,
          });
          this.nicknameDuplicate = response.data.isDuplicate;
        } else if (type === "phoneNumber") {
          // 휴대폰번호 중복 검사 API 호출
          response = await axios.post("/member/checkPhoneNumber", {
            nickname: this.phoneNumber,
          });
          this.phoneNumberDuplicate = response.data.isDuplicate;
        }
        return response.data.isDuplicate;
      } catch (error) {
        if (error.response) {
          // 백엔드에서 반환한 에러 메시지를 사용자에게 표시
          alert(`오류: ${error.response.data.message}`);
        } else {
          // 일반적인 네트워크 오류 메시지 표시
          alert("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }
    },
    async submitForm() {
      if (!this.emailValidCheck()) {
        alert("유효한 이메일을 입력하세요.");
        return;
      }

      const isEmailDuplicated = await this.checkDuplicate("email");
      if (isEmailDuplicated) {
        alert("이미 사용 중인 이메일입니다.");
        return;
      }

      const isNicknameDuplicated = await this.checkDuplicate("nickname");
      if (isNicknameDuplicated) {
        alert("이미 사용 중인 닉네임입니다.");
        return;
      }

      const isPhoneNumberDuplicated = await this.checkDuplicate("phoneNumber");
      if (isPhoneNumberDuplicated) {
        alert("이미 사용 중인 핸드폰번호입니다.");
        return;
      }

      if (this.password !== this.passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 백엔드와의 연결
      try {
        const response = await axios.post("/member/register", {
          email: this.email,
          password: this.password,
          name: this.name,
          gender: this.gender,
          nickname: this.nickname,
          birth_date: `${this.birthYear}-${this.birthMonth}-${this.birthDay}`,
          phone_number: this.phoneNumber,
        });
        alert("회원가입이 완료되었습니다. 응답: " + response.data.message); // response 사용 예시
      } catch (error) {
        console.error(error);
        alert("회원가입 중 오류가 발생했습니다.");
      }

      // 폼 데이터 초기화
      this.resetFormData();
    },
    resetFormData() {
      this.email = "";
      this.password = "";
      this.passwordCheck = "";
      this.name = "";
      this.gender = "";
      this.nickname = "";
      this.birthYear = "";
      this.birthMonth = "";
      this.birthDay = "";
      this.phoneNumber = "";
    },
  },
};
</script>


<style scoped>
div.container {
}

div.insert {
}

div.create {
  width: 800px;
  text-align: center;
  padding: 30px;
  border-bottom: 1px solid black;
  margin: auto;
}

table {
  height: 300px;
  width: 900px;
  border-top: 3px solid black;
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
  background-color: #e8e8e8;
  padding: 10px;
  text-align: right;
  font-weight: bold;
  font-size: 0.8em;
}

.col2 {
  text-align: left;
  padding: 5px;
}

.but1 {
  height: 25px;
  width: 80px;
  color: white;
  background-color: black;
  border-color: black;
}

.but2 {
  height: 27px;
  width: 120px;
  color: white;
  background-color: black;
  border-color: black;
}

.but3 {
  height: 35px;
  width: 150px;
  background-color: white;
  border: 2px solid black;
}

.but4 {
  height: 35px;
  width: 150px;
  background-color: white;
  border: 2px solid black;
}

.but1:hover {
  background-color: #b9b9b9;
  color: black;
  border: 2px solid black;
}

.but2:hover {
  background-color: #b9b9b9;
  color: black;
  border: 2px solid black;
}

.but3:hover {
  background-color: black;
  color: white;
  border: 2px solid black;
}

.but4:hover {
  background-color: black;
  color: white;
  border: 2px solid black;
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
</style>


