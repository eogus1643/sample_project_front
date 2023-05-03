import VueSweetalert2 from "vue-sweetalert2"

export default{

    install(Vue){ 
        
        /**
         * 모달창(alert 대체)
         * 확인 버튼만 있는 패턴
         * ex ) this.$confirm("제목", "내용(태그허용)");
         */
        Vue.config.globalProperties.$confirm = function(title, text){
            
            const Swal = window.Swal = require('sweetalert2');
            Swal.fire({
                title: title
                , html: text
                , confirmButtonText: '확인'
                , confirmButtonColor:'#e35b0a'
            });

        }

    }
}
