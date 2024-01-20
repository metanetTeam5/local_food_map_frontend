<template>
  <div class="join-form">
    <h1>회원가입</h1>
    <form method="post" action="">
      <div class="container">
        <div class="insert">
          <table>
            <tr>
              <td class="col1">이메일<span class="num">*</span></td>
              <td class="col2">
                <input
                  type="text"
                  v-model="email"
                  @blur="emailValidCheck"
                  maxlength="30"
                  required
                />
                <span v-if="!emailValid">
                  <small class="color-red">이메일 형식으로 입력해주세요.</small>
                </span>
                <span v-if="emailDuplicate">
                  <small class="color-red">이미 사용 중인 이메일입니다.</small>
                </span>
                <input
                  class="but1"
                  type="button"
                  value="중복확인"
                  @click="checkEmailDuplicate"
                />
              </td>
            </tr>
            <tr>
              <td class="col1">비밀번호<span class="num">*</span></td>
              <td class="col2">
                <input
                  type="password"
                  v-model="password"
                  name="pwd"
                  maxlength="16"
                  @input="checkPassword"
                />
                <p>
                  ※비밀번호는
                  <span class="num"
                    >문자, 숫자, 특수문자(~!@#$%^&*)의 조합 8 ~ 16자리</span
                  >로 입력이 가능합니다.
                </p>
              </td>
            </tr>
            <tr>
              <td class="col1">비밀번호 확인<span class="num">*</span></td>
              <td class="col2">
                <input
                  type="password"
                  v-model="passwordCheck"
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
              <td class="col1">이름<span class="num">*</span></td>
              <td class="col2">
                <input type="text" v-model="name" name="name" maxlength="16" />
              </td>
            </tr>
            <tr>
              <td class="col1">닉네임<span class="num">*</span></td>
              <td class="col2">
                <input type="text" v-model="nickname" maxlength="20" />
                <span v-if="nicknameDuplicate">
                  <small class="color-red">이미 사용 중인 닉네임입니다.</small>
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
              <td class="col1">생년월일<span class="num">*</span></td>
              <td class="col2">
                <input
                  type="date"
                  id="birthDate"
                  max="2099-12-31"
                  min="1900-01-01"
                  value="2024-01-25"
                  v-model="birthDate"
                />
              </td>
            </tr>
            <tr>
              <td class="col1">성별<span class="num">*</span></td>
              <td class="col2">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="남성"
                  checked="checked"
                  v-model="gender"
                />
                <label for="male">남성</label><br />
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="여성"
                  v-model="gender"
                />
                <label for="female">여성</label>
              </td>
            </tr>
            <tr>
              <td class="col1">프로필 사진</td>
              <td class="col2">
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  @change="handleFileChange"
                />
              </td>
            </tr>
            <tr>
              <td class="col1">휴대전화<span class="num">*</span></td>
              <td class="col2">
                <input type="text" v-model="phoneNumber" maxlength="20" />
                <span v-if="phoneNumberDuplicate">
                  <small class="color-red"
                    >이미 사용 중인 휴대전화 번호입니다.</small
                  >
                </span>
                <input
                  class="but1"
                  type="button"
                  value="중복확인"
                  @click="checkPhoneNumberDuplicate"
                />
              </td>
            </tr>
            <tr>
              <td class="col1">인증번호<span class="num">*</span></td>
              <td class="col2">
                <input
                  type="text"
                  v-model="authCode"
                  name="code"
                  maxlength="16"
                />
                <input
                  id="checkPasswordBtn"
                  class="but2"
                  type="button"
                  value="인증번호 전송"
                  @click="sendAuthCode"
                />
                <span class="authTime"></span>
                <br />
                <input
                  id="checkAuthCodeBtn"
                  class="but1"
                  type="button"
                  value="확인"
                  @click="checkAuthCode"
                />
              </td>
            </tr>
          </table>
        </div>
        <div class="create">
          <input
            class="but4"
            type="button"
            value="회원가입"
            @click="register"
          />
          <input class="but3" type="reset" value="가입취소" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserJoin',
  data() {
    return {
      email: '',
      password: '',
      passwordCheck: '',
      name: '',
      gender: '남성',
      nickname: '',
      birthDate: '',
      phoneNumber: '',
      profileImg: null,
      authCode: '',
      emailValid: true,
      emailDuplicate: false,
      nicknameDuplicate: false,
      phoneNumberDuplicate: null,
      validPassword: true,
      authCodeChecked: false,
    };
  },
  methods: {
    emailValidCheck() {
      // 이메일 형식 검사 로직
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.emailValid = emailRegex.test(this.email);
      return this.emailValid;
    },
    checkPassword() {
      if (this.password !== this.passwordCheck) {
        this.validPassword = false;
      } else {
        this.validPassword = true;
      }
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.profileImg = selectedFile;
    },
    async checkEmailDuplicate() {
      this.emailDuplicate = false;
      if (this.emailValidCheck()) {
        try {
          await axios.get(
            process.env.VUE_APP_API_ENDPOINT +
              '/member/checkemail?email=' +
              this.email
          );
          this.emailDuplicate = false;
          alert('사용 가능한 이메일입니다.');
        } catch (error) {
          this.emailDuplicate = true;
        }
      }
    },
    async checkNicknameDuplicate() {
      try {
        await axios.get(
          process.env.VUE_APP_API_ENDPOINT +
            '/member/checknickname?nickname=' +
            this.nickname
        );

        this.nicknameDuplicate = false;
        alert('사용 가능한 닉네임입니다.');
      } catch (error) {
        this.nicknameDuplicate = true;
      }
    },
    async checkPhoneNumberDuplicate() {
      try {
        await axios.get(
          process.env.VUE_APP_API_ENDPOINT +
            '/member/checkphonenumber?phoneNumber=' +
            this.phoneNumber
        );

        this.phoneNumberDuplicate = false;
        alert('사용 가능한 전화번호입니다.');
      } catch (error) {
        this.phoneNumberDuplicate = true;
      }
    },
    async sendAuthCode() {
      if (this.phoneNumberDuplicate === null) {
        alert('휴대전화 번호 중복 확인을 해주세요.');
      } else if (this.phoneNumber !== null) {
        if (!this.phoneNumberDuplicate) {
          try {
            await axios.get(
              process.env.VUE_APP_API_ENDPOINT +
                '/member/sendauthcode/' +
                this.phoneNumber
            );
            alert(
              '입력한 휴대전화 번호로 인증번호 전송했습니다.(인증 시간 : 2분)'
            );
          } catch (error) {
            console.error(error);
            alert('서버 에러 발생');
          }
        } else {
          alert('중복된 휴대전화 번호에 전송할 수 없습니다.');
        }
      } else {
        alert('휴대전화 번호를 입력해주세요.');
      }
    },
    async checkAuthCode() {
      if (this.authCode) {
        try {
          await axios.get(
            process.env.VUE_APP_API_ENDPOINT +
              '/member/checkauthcode?phoneNumber=' +
              this.phoneNumber +
              '&code=' +
              this.authCode
          );
          this.authCodeChecked = true;
          alert('휴대전화 인증 완료');
        } catch (error) {
          console.error(error);
          this.authCodeChecked = false;
          alert(error.response.data);
        }
      } else {
        alert('인증번호를 입력해주세요.');
      }
    },
    async register() {
      if (
        this.email &&
        this.password &&
        this.passwordCheck &&
        this.name &&
        this.gender &&
        this.nickname &&
        this.birthDate &&
        this.phoneNumber &&
        this.authCode
      ) {
        if (!this.authCodeChecked) {
          alert('휴대전화 인증을 완료해주세요.');
        }

        try {
          const response = await axios.post(
            process.env.VUE_APP_API_ENDPOINT + '/member/register',
            {
              email: this.email,
              password: this.password,
              nickname: this.nickname,
              name: this.name,
              gender: this.gender,
              birthDate: this.birthDate,
              phoneNumber: this.phoneNumber,
            }
          );

          if (this.profileImg !== null) {
            let formData = new FormData();
            formData.append('email', this.email);
            formData.append('file', this.profileImg);

            await axios.post(
              process.env.VUE_APP_API_ENDPOINT + '/member/profileimg',
              formData,
              {
                headers: { 'Content-Type': 'multipart/form-data' },
              }
            );
          }

          console.log(response);

          alert('회원가입이 완료되었습니다');
        } catch (error) {
          console.error(error);
          alert('회원가입 중 오류가 발생했습니다.');
        }

        this.resetFormData();
      } else {
        alert('필수 입력 항목 작성해주세요.');
      }
    },
    resetFormData() {
      this.email = '';
      this.password = '';
      this.passwordCheck = '';
      this.name = '';
      this.gender = '남성';
      this.nickname = '';
      this.birthDate = '';
      this.phoneNumber = '';
      this.profileImg = null;
      this.emailValid = true;
      this.emailDuplicate = false;
      this.nicknameDuplicate = false;
      this.phoneNumberDuplicate = false;
      this.validPassword = true;
      this.authCodeChecked = false;
    },
  },
};
</script>

<style scoped>
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
  height: 27px;
  width: 120px;
  background-color: #ffae00;
  color: white;
  border: 2px solid #ffae00;
  margin-left: 5px;
  margin-right: 10px;
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
  content: '@naver.com';
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
  content: '|';
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
</style>
