<template>
  <div class="login-wrapper">
      <div class="login-page">
        <div class="left-wrapper">
          <div class="logobox">
            <!-- logo area -->
            <img src="@/assets/img/logo.png" alt="LOGO" />
            <h2>로그인</h2>
          </div>
        </div>

        <div class="dividing-line"></div>
        
        <!-- lgoin area -->
        
          <div class="right-wrapper">
            <form v-on:submit="login($event)">
            <div class="login-form">
              <input type="text" placeholder="ID를 입력하세요"  v-model="userId"/>
              <input type="password" placeholder="비밀번호를 입력하세요"  v-model="userPassword"/>
              <!-- <button class="btnDisabled">로그인</button> -->

              <!-- error message -->
              <div class="error-message">
                <span class="">아이디와 비밀번호를 확인해주세요</span>
              </div>
              <button type="submit" class="btnPrimary loginBtn">로그인</button>
            </div>
            </form>
            <div>
              <button type="button" class="btnPrimary signupBtn" @click="signup(e)">회원가입</button>
              <!-- <router-link to="/signup">회원가입1</router-link>> -->
            </div>
          </div>
      </div>
      <div class="bottombox bgtransparent" id="bottombox">
        <div class="bottomtext">ⓒ 2023 Sample Vue Project.</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'login',
    components: {
    },
  data() { 
    return {
         userId:''
         , userPassword:''
        }
    }, 

  methods: {
    login(e){
      // form의 새로 고침 막기
      e.preventDefault();
      var params = new URLSearchParams();
      params.append('userId', this.userId);
      params.append('userPassword',this.userPassword);
      this.$axios.post("./login",params,{
          }).then((res) => {
            if(res.data.result == 'Y'){
              this.$swal("",res.data.message);
              this.$router.push({
                  name: 'UserList'
              });
            }else {
              this.$swal("",res.data.message);
              document.querySelector('.error-message span').style.display = 'block';
            }
          }).catch((err) => {
              if (err.message.indexOf('Network Error') > -1) {
              this.$swal('','네트워크가 원활하지 않습니다.<br>잠시 후 다시 시도해주세요.')
              }
          })
    },
    signup(e) {
      this.$router.push({name: 'signup'});
    }
  },
}
</script>

<style scoped>
</style>
