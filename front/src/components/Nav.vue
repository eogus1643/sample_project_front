<template>
    <aside class="box-sidebar" id="boxSidebar">
        <ul class="nav-list">
            <li class="list active" @click="menuClick">
                <router-link to="/user/userList">
                    <span><img src="@/assets/img/user.svg" /></span>
                    <span class="links_name" id="links_name0">회원 관리</span>
                </router-link>
            </li>

            <li class="list">
                <router-link to="/equipment/equipmentList" @click="menuClick">
                    <span><img src="@/assets/img/equipment.svg" /></span>
                    <span class="links_name" id="links_name1">장비 관리</span>
                </router-link>
            </li>

            <li class="list">
                <router-link to="/log/logList" @click="menuClick">
                    <span><img src="@/assets/img/log.svg" /></span>
                    <span class="links_name" id="links_name2">로그 관리</span>
                </router-link>
            </li>

            <li class="list">
                <router-link to="/push/pushList" @click="menuClick">
                    <span><img src="@/assets/img/push.svg" /></span>
                    <span class="links_name" id="links_name3">PUSH 관리</span>
                </router-link>
            </li>

            <li class="list">
                <router-link to="/statistics/statisticsList" @click="menuClick">
                    <span><img src="@/assets/img/statistics.svg" /></span>
                    <span class="links_name" id="links_name4">통계 관리</span>
                </router-link>
            </li>

            <li class="list">
                <router-link to="/model/modelList" @click="menuClick">
                    <span><img src="@/assets/img/registration.svg" /></span>
                    <span class="links_name" id="links_name5">장비 이미지 등록관리</span>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>

export default {
    mounted() {
        this.activeIcon();
    },
    methods: {
        activeIcon(){
            let url = window.location.href;
            let list = document.querySelectorAll(".list");
            let j = 0;
            while (j < list.length) {
                list[j++].className = "list";
            }
            if(url.indexOf('user') > -1){
                list[0].className = "list active";
            }else if(url.indexOf('equipment') > -1){
                list[1].className = "list active";
            }else if(url.indexOf('log') > -1){
                list[2].className = "list active";
            }else if(url.indexOf('push') > -1){
                list[3].className = "list active";
            }else if(url.indexOf('statistics') > -1){
                list[4].className = "list active";
            }else if(url.indexOf('model') > -1){
                list[5].className = "list active";
            }
        },
        menuClick(){
            let list = document.querySelectorAll(".list");

            for (let i = 0; i < list.length; i++) {
                list[i].onclick = function () {
                    let j = 0;
                    while (j < list.length) {
                    list[j++].className = "list";
                    }
                    list[i].className = "list active";
                };
            }
        }
    },
};
</script>

<style scoped>
</style>