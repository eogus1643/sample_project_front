<template>
    <div class="pagination-container">
        <div class="pagination-wrapper">
            <button @click="onPageChange(currentPage - 1)">
            <span class="material-symbols-outlined"> chevron_left </span>
            </button>
            <ul class="page-group" style="text-align: center">
            <li class="pagenum" v-for="(paging, index) in pages" :key="index"><a @click="onPageChange(paging - 1)" :class="paging - 1 === currentPage ? 'active' : ''">{{paging }}</a></li>
            </ul>
            <button @click="onPageChange(currentPage + 1)">
            <span class="material-symbols-outlined"> navigate_next </span>
            </button>
        </div>
    </div>  
</template>

<script>
//import Pagination from './Pagination';

export default {
    name: 'Pagination',
    props: ['currentPage', 'totalPages', 'pageChange'],
    data() {
        return {};
    },
    computed: {
        pages: function() {
            const list = [];
            for (let index = this.startPage; index <= this.endPage; index += 1) { list.push(index); }
            return list;
        },
        startPage() {
            return parseInt(this.currentPage / 10) * 10 + 1;
        },
        endPage() {
            let lastPage = parseInt(this.currentPage / 10) * 10 + 10;
            return lastPage <= this.totalPages ? lastPage : this.totalPages;
        }
    },
    methods: {
        onPageChange(val) {
            if (val < 0) {
                this.$swal('','첫 페이지입니다.');
                return;
            }
            if (val >= this.totalPages) {
                this.$swal('','마지막 페이지입니다.');
                return;
            }
            const param = {
                requestPage: val,
            };
            this.pageChange(param);
        }
    }
}
</script>

<style scoped>
.pointer a {
    cursor: pointer;
    margin: 5px;
}
.currentPage {
    background: #A3C010;
}
</style>