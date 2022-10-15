<template>
    <div class="searchbox">
        <SearchCommponents />
        <div class="historybox">
            <div class="head">历史记录</div>
            <div class="history" v-for="item in comicSearchHistory" :key="item+item.keyword" @click="turnToSearchResult(item.keyword)">
                <span>{{item.keyword}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import SearchCommponents from "@/components/SearchCommponents.vue";
export default {
    data() {
        return {
            keyword: '',
        };
    },
    created() {
        this.comicSearchHistory = JSON.parse(localStorage.getItem("comicSearchHistory")) || [];
    },
    methods: {
        turnToSearchResult(keyword) {
            this.keyword = keyword
            this.comicSearchHistory = this.comicSearchHistory.filter(e => {
                return e.keyword != this.keyword;
            });
            this.comicSearchHistory.unshift({
                keyword: this.keyword
            });
            localStorage.setItem("comicSearchHistory", JSON.stringify(this.comicSearchHistory));
            this.$router.push({
                path: "/searchResult",
                query: {
                    keyword: this.keyword
                }
            })
        },
    },
    components: {
    SearchCommponents,
    }
}
</script>
<style lang="scss" scoped>
.searchbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: auto;
    z-index: 999;
    .historybox {
        width: calc(100vw/375*345);
        margin: calc(100vw/375*10) auto;
        .head {
            margin-bottom: calc(100vw/375*15);
            font-size: calc(100vw/375*14);
            color: #fc6976;
        }
        .history {
            height: calc(100vw/375*27);
            line-height: calc(100vw/375*27);
            padding: 0 calc(100vw/375*10);
            margin: 0 calc(100vw/375*10) calc(100vw/375*10) 0;
            border-radius: calc(100vw/375*20);
            background: #fff4f3;
            color: #fa7669;
            float: left;
        }
    }
}
</style>