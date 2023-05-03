export default{
    install(Vue){ 
        
        /**
         * 날짜 비교 함수 
         * ex ) this.$dateValidation("이전일자", 현재일자);
         */
        Vue.config.globalProperties.$dateValidation = function(prevDate, currentDate){
            
            prevDate = prevDate ?? '';
            currentDate = currentDate ?? '';

            if(prevDate > currentDate) {
                return false;
            }
            else{
                return true;
            }

        },
        /**
         * 공백체크(입력값 input)
         * null, undefind, 공백 체크
         * 빈값이 입력되면 false를 반환
         * this.$isEmpty('비교문자열');
         * @param {*} str 
         * @returns
         */
        Vue.config.globalProperties.$isEmpty = function(str) {

            //console.log(str);
            if( str == '' || str == null || str == undefined || ( str != null && typeof str == "object" && !Object.keys(str).length ) ){
                return true;
            }else{
                return false;
            }

        },
        /**
         * 특수문자 비교
         * 특수문자가 포함되어 있을 시 true 반환
         * this.$specialCharacter('비교문자열');
         * @param {*} str 
         * @returns
         */
        Vue.config.globalProperties.$specialCharacterValidation = function(str) {

            const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
            if(regExp.test(str)) {
                return true;
            }else{
                return false;
            }

        },
        /**
         * 비밀번호 유효성 검사
         * 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 ( 3 가지 조합)
         * 불일치시 true 반환
         * this.$passwordValidation('비교문자열');
         * @param {*} str 
         * @returns
         */
        Vue.config.globalProperties.$passwordValidation = function(str) {

            const regExp = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,15}$/;
            if( !regExp.test(str) ) {
                return true;
            } else {
                return false;
            }

        },
        /**
         * 휴대전화 유효성 검사
         * 010-1111-2222 형식이 아닐 경우 true를 반환
         * this.$phoneNumberValidation('비교문자열');
         * @param {*} str 
         * @returns
         */
        Vue.config.globalProperties.$phoneNumberValidation = function(str) {

            const regExp = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
            if( !regExp.test(str) ){
                return true;
            } else {
                return false;
            }

        },
        /**
         * 이메일 유효성 검사
         * abc@kakao.com 형식이 아닐 경우 true를 반환
         * 특수문자 등 불필요한 문자 미포함
         * this.$phoneNumberValidation('비교문자열');
         * @param {*} str 
         * @returns
         */
        Vue.config.globalProperties.$emailValidation = function(str) {

            console.log(str);
            const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            if( regExp.test(str) ){
                return true;
            } else {
                return false;
            }

        }

    }
}