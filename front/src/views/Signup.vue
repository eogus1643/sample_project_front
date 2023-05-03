<template>
  <div class="login-wrapper">
    <div class="signup-page">

      <div class="top-wrapper">
        <div class="logobox">
          <!-- logo area -->
          <img src="@/assets/img/slogo.png" alt="LOGO"/>
          <h2>회원가입</h2>
        </div>
      </div>

      <div class="dividing-line"></div>

      <div class="center-wrapper">
        <table class="top-table">
          <tr>
            <th>아이디</th>
            <td>
              <label class="id-flex-conrainer">
                <input type="text" class="signupText" placeholder="아이디" v-model="userId" maxlength="10" required>
                <button type="button" class="btnPrimary btn-smaill-darkolivegreen checkId" @click="userIdDuplicationCheck">중복확인</button>
              </label>
            </td>
          </tr>
          <tr>
            <th>성명</th>
            <td>
              <label>
                <input type="text" maxlength="20" placeholder="이름을 입력해 주세요." v-model="userName" required>
              </label>
            </td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>
              <label><input type="password" placeholder="비밀번호" v-model="userPassword" maxlength="15" @blur="passwordCheck" required></label>
            </td>
          </tr>
          <tr>
            <th>비밀번호 확인</th>
            <td>
              <label style="display: none;"><p>비밀번호가 일치하지 않습니다.</p></label>
              <label>
                <input type="password" placeholder="비밀번호 확인" name="userPasswordConfirm" v-model="userPasswordConfirm" maxlength="15" required @blur="passwordCheck">
              </label>
          </td>
          </tr>
          <tr>
            <th>휴대전화</th>
            <td>
              <label>
                <input type="text" class="phone-number" placeholder="하이픈('-') 포함" maxlength="13" v-model="userPhoneNumber" required @input="autoHyphen($event)">
              </label>
            </td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>
              <label><input type="text" placeholder="이메일" v-model="userEmailOne">
                <select class="email" v-model="userEmailTwo" @change="changeEmail">
                  <option value="null">선택</option>
                  <option value="@kakao.com">카카오</option>
                  <option value="@google.com">구글</option>
                  <option value="@naver.com">네이버</option>
                  <option value="@nate.com">네이트</option>
                  <option value="input">직접입력</option>
                </select>
              <input type="text" placeholder="직접입력('@' 제외)" name="userEmailThree" v-model="userEmailThree" style="display:none" @blur="emailInputCheck($event)"></label>
            </td>
          </tr>
          

        </table>

        <div class="btn-group">
          <button type="button" class="btnPrimary btnBack" @click="login">뒤로가기</button>
          <button type="button" class="btnPrimary btnSignup" @click="signup($event)">가입하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
    components: {
    },
  data() { 
    return {
         userId : ''
         , userName : ''
         , userPassword : ''
         , userPasswordConfirm : ''
         , userPhoneNumber : ''
         , userEmail : ''
         , userEmailOne : ''
         , userEmailTwo : null
         , userEmailThree :''

         , target : ''
         , idFlag : 'N'
         , passwordFlag : 'N'
         , validationFlag : false
        }
    },
    methods: {
      signup(e){
       
        // form의 새로 고침 막기
        e.preventDefault();

        //유효성 검사
        this.validationFlag = true;
        this.validation();

        var params = new URLSearchParams();
        this.userEmail = this.userEmailTwo === 'input' ? this.userEmailOne.concat('@'.concat(this.userEmailThree)) : this.userEmailOne.concat(this.userEmailTwo)
        params.append('userId', this.userId);
        params.append('userName', this.userName);
        params.append('userPassword', this.userPassword);
        params.append('userPhoneNumber', this.userPhoneNumber);
        params.append('userEmail', this.userEmail);

        console.log(this.validationFlag)
        if (this.validationFlag ) {

          this.$axios.post("./signup",params,{
          }).then((res) => {
            if(res.data.result == 'Y'){
              this.$swal("",res.data.message);
              this.$router.push({
                  name: 'login'
              });
            }else {
              this.$swal("",res.data.message);
            }
          }).catch((err) => {
              if (err.message.indexOf('Network Error') > -1) {
              this.$swal('','네트워크가 원활하지 않습니다.<br>잠시 후 다시 시도해주세요.')
              }
          })
        }

      },
      login() {
        this.$router.push({name: 'login'});
      },
      validation(e) {
        /**
         * 이메일 유효성 검사
         * 직접입력 : 풀 형식 검사
         * 자동입력 : 공백제거 후 특수문자 포함 검사
         */
        if (this.$emailValidation(this.userEmailOne)) {
            this.$confirm('이메일 유효성 검사', '이메일 형식을 확인해 주세요.');
            this.validationFlag = false;
        } 

        //휴대전화 유효성 검사
        if ( this.$phoneNumberValidation(this.userPhoneNumber) ) {this.$confirm('휴대전화번호 유효성 검사', '"-"를 포함한 휴대전화번호 입력형식을 확인해 주세요.'); this.validationFlag = false;}

        //비밀번호 일치 확인
        if ( this.passwordFlag != 'Y' ) {this.$confirm('비밀번호 유효성 검사', '비밀번호가 일치하는지 확인 해 주세요.'); this.validationFlag = false;}

        //password 유효성 검사
        if ( this.$passwordValidation(this.userPassword) ) {this.$confirm('비밀번호 유효성 검사', '문자, 숫자, 특수 문자가 한개씩 포함되어야 하며</br>8~15자리 이내로 지정해 주세요.'); this.validationFlag = false;}

        //성명 특수문자 입력 확인
        if ( this.$specialCharacterValidation(this.username) ) {this.$confirm('성명 유효성 검사', '성명에 특수문자가</br>포함되어 있는지 확인해 주세요.'); this.validationFlag = false;}

        //ID 중복확인
        if ( this.idFlag != 'Y' ) {this.$confirm('비밀번호 유효성 검사', '아이디 중복확인을 해주세요.'); this.validationFlag = false;}

        //ID 특수문자 체크
        if ( this.$specialCharacterValidation(this.userId) ) {this.$confirm('아이디 유효성 검사', '아이디에 특수문자가</br>포함되어 있는지 확인해 주세요.');  this.validationFlag = false;}

        //값이 있는지 체크
        if ( this.userEmailTwo === 'input' ) {
          if ( this.$isEmpty(this.userEmailThree) ) {this.$confirm('필수 입력 확인', '이메일 주소를 확인해 주세요.'); this.validationFlag = false;}
        } else {
          if ( this.$isEmpty(this.userEmailTwo) ) {this.$confirm('필수 입력 확인', '이메일 주소를 선택해 주세요.'); this.validationFlag = false;}
        }

        if ( this.$isEmpty(this.userEmailOne) ) {this.$confirm('필수 입력 확인', '이메일 주소를 입력해 주세요'); this.validationFlag = false;}
        if ( this.$isEmpty(this.userPhoneNumber) ) {this.$confirm('필수 입력 확인', '휴대전화 번호를 입력해 주세요.'); this.validationFlag = false;}
        if ( this.$isEmpty(this.userPasswordConfirm) ) {this.$confirm('필수 입력 확인', '비밀번호 확인란에 입력해 주세요.'); this.validationFlag = false;}
        if ( this.$isEmpty(this.userPassword) ) {this.$confirm('필수 입력 확인', '비밀번호를 입력해 주세요.'); this.validationFlag = false;}
        if ( this.$isEmpty(this.userName) ) {this.$confirm('필수 입력 확인', '성명을 입력해 주세요.'); this.validationFlag = false;}
        if ( this.$isEmpty(this.userId) ) {this.$confirm('필수 입력 확인', '아이디를 입력해 주세요.'); this.validationFlag = false;}

      },
      changeEmail() {

        if ( this.userEmailTwo === 'input' ) {
          document.querySelector('input[name="userEmailThree"]').style.display = 'block';
          document.querySelector('input[name="userEmailThree"]').value = '';
        } else {
          document.querySelector('input[name="userEmailThree"]').style.display = 'none';
          document.querySelector('input[name="userEmailThree"]').value = '';
        }

      },
      passwordCheck() {

        const span = document.createElement('p');
        const elUserPasswordConfirm = document.querySelector('input[name="userPasswordConfirm"]');

        /**
         * password 일치 확인
         * 비밀번호, 비밀번호 확인란에 값이 모두 존재할때 실행
         */
        if ( !this.$isEmpty(this.userPassword) && !this.$isEmpty(this.userPasswordConfirm) ) {

          //문구가 이미 있을경우 삭제
          if ( elUserPasswordConfirm.parentElement.querySelector('p') != null ) {
            elUserPasswordConfirm.parentElement.querySelector('p').remove()
          }

          if  ( this.userPassword === this.userPasswordConfirm ) {
          
            //비밀번호가 일치한다면 일치 문구 표시
            const text = document.createTextNode('비밀번호 일치');
            span.classList.add('greenText');
            span.appendChild(text);
            span.style.color = 'darkgreen';
            elUserPasswordConfirm.after(span);

            //비밀번호 일치 플래그 설정
            this.passwordFlag = 'Y'
          } else {
            
            //비밀번호가 불일치한다면 불일치 문구 표시
            const text = document.createTextNode('비밀번호 불일치');
            span.classList.add('redText');
            span.appendChild(text);
            span.style.color = 'red';
            elUserPasswordConfirm.after(span);

            //비밀번호 일치 플래그 설정
            this.passwordFlag = 'N'
          }

        }
        

      },
      autoHyphen(e) {
        //휴대전화 형식으로 포맷 변환
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
      },
      userIdDuplicationCheck() {
       
        //아이디 중복검사

        const span = document.createElement('p');
        const elUserIdDuplicationText = document.querySelector('.checkId');
        let text= '';

        //문구가 이미 있을경우 삭제
        if ( elUserIdDuplicationText.parentElement.parentElement.querySelector('p') != null ) {
          elUserIdDuplicationText.parentElement.parentElement.querySelector('p').remove()
        }

        var params = new URLSearchParams();
        params.append('userId', this.userId);

        this.$axios.post("./userIdDuplicationCheck",params,{
          }).then((res) => {
            if(res.data.result == 'Y'){
              text = document.createTextNode(res.data.message);
              span.classList.add('greenText');
              span.style.color = 'darkgreen';
              span.style.fontSize = '12px';
              span.appendChild(text);
              elUserIdDuplicationText.parentElement.after(span);
              this.idFlag = 'Y';
            }else {
              text = document.createTextNode(res.data.message);
              span.classList.add('redText');
              span.style.color = 'red';
              span.style.fontSize = '12px';
              span.appendChild(text);
              elUserIdDuplicationText.parentElement.after(span);
              this.idFlag = 'N';
            }
          }).catch((err) => {
              if (err.message.indexOf('Network Error') > -1) {
              this.$swal('','네트워크가 원활하지 않습니다.<br>잠시 후 다시 시도해주세요.')
              }
        })

      },
      emailInputCheck(e) {
        e.target.value = e.target.value.replace(/\@/g,'');
      }
  },

}
</script>

<style scoped>
@import "../assets/css/signup.css";
</style>