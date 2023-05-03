<template>
    <div class="navbar">
          <div class="nav-wrapper-left">
            <div class="nav-menu-status">
              <button id="btnMenu" class="btnMenu" @click="menu">
                <span class="material-symbols-outlined"> menu </span>
              </button>
              <button id="btnClosed" class="btnClosed" @click="chevron_left">
                <span class="material-symbols-outlined"> chevron_left </span>
              </button>
            </div>
            <div class="nav-logo">
            <router-link to="/user/userList">
                <img
                  src="@/assets/img/slogo.png"
                  class="logo"
                  style="width: 4rem; height: 3rem;"
                  alt="logo"
                />
            </router-link>
            </div>
          </div>
          <div class="nav-wrapper-right">
            <div>
              <a class="nav-profile" @click="logOut">
              <img src="../assets/img/signout.svg" alt="로그아웃" />
              </a>
            </div>
          </div>
        </div>
</template>

<script>
const statusBtnClosed = document.getElementById("btnClosed");
const statusBtnMenu = document.getElementById("btnMenu");
const menuText0 = document.getElementById("links_name0");
const menuText1 = document.getElementById("links_name1");
const menuText2 = document.getElementById("links_name2");
const menuText3 = document.getElementById("links_name3");
const menuText4 = document.getElementById("links_name4");
const menuText5 = document.getElementById("links_name5");
const sideSlide = document.getElementById("boxSidebar");
export default {
    name : "Header",
    components: {},
    data() {
        return {
         loginId:''
         , loginPw:''
        }
    },
    mounted() {},
    methods: {
        menu(){
            const statusBtnClosed = document.getElementById("btnClosed");
            const statusBtnMenu = document.getElementById("btnMenu");
            const menuText0 = document.getElementById("links_name0");
            const menuText1 = document.getElementById("links_name1");
            const menuText2 = document.getElementById("links_name2");
            const menuText3 = document.getElementById("links_name3");
            const menuText4 = document.getElementById("links_name4");
            const menuText5 = document.getElementById("links_name5");
            const sideSlide = document.getElementById("boxSidebar");
            statusBtnClosed.style.display = "flex";
            statusBtnMenu.style.display = "none";
            sideSlide.style.width = "260px";
            sideSlide.style.minWidth = "260px";

            setTimeout(function () {
                menuText0.style.display = "flex";
                menuText1.style.display = "flex";
                menuText2.style.display = "flex";
                menuText3.style.display = "flex";
                menuText4.style.display = "flex";
                menuText5.style.display = "flex";
            }, 180);
        },
        chevron_left(){
            const statusBtnClosed = document.getElementById("btnClosed");
            const statusBtnMenu = document.getElementById("btnMenu");
            const menuText0 = document.getElementById("links_name0");
            const menuText1 = document.getElementById("links_name1");
            const menuText2 = document.getElementById("links_name2");
            const menuText3 = document.getElementById("links_name3");
            const menuText4 = document.getElementById("links_name4");
            const menuText5 = document.getElementById("links_name5");
            const sideSlide = document.getElementById("boxSidebar");
            statusBtnClosed.style.display = "none";
            statusBtnMenu.style.display = "flex";
            menuText0.style.display = "none";
            menuText1.style.display = "none";
            menuText2.style.display = "none";
            menuText3.style.display = "none";
            menuText4.style.display = "none";
            menuText5.style.display = "none";
            sideSlide.style.width = "80px";
            sideSlide.style.minWidth = "80px";
        },
        logOut(){
          this.$swal.fire({
                  title: '로그아웃',
                  text: '로그아웃을 하시겠습니까?',
                  // showDenyButton: true,
                  // denyButtonText: `Don't save`,
                  showCancelButton: true,
                  cancelButtonText:'취소',
                  confirmButtonText: '확인',
                  cancelButtonColor:'#bebebe',
                  confirmButtonColor:'#e35b0a',
                  reverseButtons:'true'
                }).then((result) => {
                    if (result.value) {
                      var params = new URLSearchParams();
                      this.$axios.post("./logOut",params,{
                      }).then((res) => {
                        if(res.data.result == 'Y'){
                          this.$swal('',res.data.message);
                          this.$router.push({
                              name: 'login'
                          });
                        }else {
                          this.$swal('',res.data.message);
                        }
                      }).catch((err) => {
                          if (err.message.indexOf('Network Error') > -1) {
                          this.$swal('','네트워크가 원활하지 않습니다.<br>잠시 후 다시 시도해주세요.')
                          }
                      })
                    } else if (result.dismiss == 'cancel') {
                        this.$swal('',"로그아웃을 취소하셨습니다.");
                    }
        })
          
        }
    },
};
</script>

<style scoped>
</style>