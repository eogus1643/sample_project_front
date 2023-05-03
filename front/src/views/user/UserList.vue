<template>
  <div class="content-main">
    <div class="content-top">
      <div class="top-title">
        <h2>회원 관리</h2>
        <div class="line"></div>
      </div>
      <div class="top-table">
        <table class="table-left">
          <tr>
            <td class="td-title">사용자ID</td>
            <td class="td-value">
              <input type="text" placeholder="사용자 ID를 입력하세요"  v-model="userId"/>
            </td>
          </tr>
        </table>
        <table class="table-right">
          <tr>
            <td class="td-title">성명</td>
            <td class="td-value">
              <input type="text" placeholder="성명을 입력하세요"  v-model="userName"/>
            </td>
          </tr>
        </table>
      </div>
      <div class="top-buttonbox">
        <button class="btnDisabled">
          <a @click="searchFormat">검색초기화</a>
        </button>
        <button class="btnPrimary" @click="searchListLoad">검색</button>
      </div>
    </div>
    <div class="content-bottom">
      <div class="sub-title">
        <h3>회원 관리 현황</h3>
        <button class="downloadExcel" @click="excelDown">
          <span class="material-symbols-outlined"> upload_file </span>엑셀
          저장
        </button>
      </div>
      <div class="bottom-table">
        <table :values="this.itemList" >
            <colgroup>
                <col width="5%"/>
                <col width="13%"/>
                <col width="13%"/>
                <col width="7%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="10%"/>
            </colgroup>
            <thead>
              <tr>
                  <td :class="{'vtl-1': sortDirection =='1', 'vtl-2' :sortDirection =='2'}" v-for="(column, index) in headerList" :key="'header-' + column.index"  @click="onSortChange($event)" >
                  {{column}}
                  </td>
              </tr>
            </thead>
            <tbody>
              <tr  @click="detail(item.userId, item.serialNumber)"  v-for="(item, index) in itemList"  :key="item.index">
                  <td  v-for="(itemKey, subIndex) in itemKeyList" :key="'item-key-' + subIndex">
                      {{item[itemKey]}} 
                  </td>
              </tr>
            </tbody>
        </table>
      </div>

      <Pagination 
        :currentPage="page.page"
        :totalPages="totalPages"
        :pageChange="onPageChange"
        />
    </div>
  </div>

</template>
<script>
// from npm gridjs
 import Pagination from '../../components/Pagination.vue';

export default {
name: 'UserList',
components: {
    // Pagination
},
// now accessible through 'this'
data() { 
return {
     userId:''
    , userName:''
     , headerList: ["NO", "사용자 ID", "성명","휴대폰",  "Email", "가입일시", "정보수정일", "최종 로그인",]
     , itemList: []
     , itemKeyList: ["seq","userId","userName", "userPhoneNumber" ,"userEmail", "regDt", "updDt","lastLoginDt"]
     , sortHeader: ''
     , sortDirection: '2'
     , totalPages: 0
     , page: {
            page: 0,
            size: 10,
            sortHeader: 'userId'
        }
    }
}, 

buildModules: [
'vue-sorted-table/nuxt'
],

// runs after vue has rendered

mounted() {
  this.listLoad();
},

methods: {
// 리스트 조회
listLoad(){
    var params = new URLSearchParams();
    params.append('userId', this.userId);
    params.append('userName', this.userName);

    params.append('page', this.page.page);
    params.append('size', this.page.size);

    //params.append('sortDirection', this.sortDirection);
    //params.append('sortHeader', this.page.sortHeader);

    this.$axios.post("./userList", params,{ 
    }).then((res) => {
        this.itemList = res.data.list;
        this.totalPages = res.data.totalPages;
        //this.codeList= res.data.codeList;

    }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          this.$swal('','네트워크가 원활하지 않습니다.<br>잠시 후 다시 시도해주세요.')
        }
    })
        
},
 
searchListLoad(){
    this.page.page=0;
    this.listLoad();
},

// 엑셀 다운로드
excelDown () {
    this.$swal.fire({
                title: '엑셀 저장',
                text: '회원 관리 현황을 엑셀 파일로 다운로드 하시겠습니까?',
                showCancelButton: true,
                cancelButtonText:'취소',
                confirmButtonText: '확인',
                cancelButtonColor:'#bebebe',
                confirmButtonColor:'#e35b0a',
                reverseButtons:'true'
                }).then((result) => {
                if (result.value) {
                    var params = new URLSearchParams();
                    params.append('userId', this.userId);
                    params.append('userName', this.userName);
            
            
                    let options = { 
                        headerList: this.headerList, 
                        itemKeyList: this.itemKeyList, 
                        headProps: 'header' 
                    } 
            
                    this.$excelDown("원격제어 회원관리","./userExcelList", options, params);
                } else if (result.dismiss == 'cancel') {
                    this.$swal("","엑셀다운로드를 취소하였습니다.");
                }
    })
},

// 상세
detail(userId, serialNumber){
    /* this.$router.push({
        name: 'userInfoDetail' 
        , params: {userId: userId , serialNumber : serialNumber}  
    }) ;  */
    
  //  this.$router.push({name: 'userInfoDetail', params: {userId: 'userId'}})


    this.$router.push('/user/userInfoDetail?userId=' + userId + '&serialNumber=' + serialNumber);
} ,

// 검색 초기화
searchFormat(){
    this.$swal.fire({
                title: '검색초기화',
                text: '검색을 초기화 하시겠습니까?',
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
                    this.userId = '';
                    this.userName = '';
                } else if (result.dismiss == 'cancel') {
                    this.$swal("","검색초기화를 취소하였습니다.");
                }
    })
},


onSubmitForm(e){
    // form의 새로 고침 막기
    e.preventDefault();
},

onPageChange(value) {
    this.page.page = value.requestPage;
    this.listLoad();
},
onSortChange(event) {
    if(this.sortDirection == '2'){
        this.sortDirection = '1'
    }else{
        this.sortDirection = '2'
    }
    this.page.sortHeader = this.itemKeyList[event.target.cellIndex];
    if(this.page.sortHeader != 'seq'){
      this.listLoad();
    }
},
onSortDirectionChange(event) {
    this.sortDirection = event.target.value;
    this.page.sort = this.sortHeader + ',' + this.sortDirection;
   
},

},
};

</script>

<style scoped>
@import "../../assets/css/user.css";
</style>