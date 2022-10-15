<template>
    <div class="search--commponent">
        <div class="back" @click="back">返回</div>
        <input type="text" placeholder="搜索漫画名or关键字" v-model="keyword" />
        <span @click="turnToSearchResult(keyword)">搜索</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: '',
        };
    },
    created() {
        this.comicSearchHistory = JSON.parse(localStorage.getItem("comicSearchHistory")) || [];

    },
    computed: {

    },
    watch: {

    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        turnToSearchResult(keyword) {
            this.keyword = keyword
            if (this.keyword.length == 0) {
                return;
            }
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
    }
}
</script>
<style lang="scss">
.search--commponent {
    width: 100%;
    height: calc(100vw / 375 * 46);
    text-align: center;
    display: flex;

    .back {
        width: calc(100vw / 375 * 46);
        height: calc(100vw / 375 * 46);
        line-height: calc(100vw / 375 * 46);
    }

    input {
        width: calc(100% - 52px * 2);
        height: calc(100vw / 375 * 34);
        margin-top: calc(100vw / 375 * 6);
        padding: 0 calc(100vw / 375 * 6);
        box-sizing: border-box;
        outline: none;
        border: calc(100vw / 375 * 1) solid #fc6976;
        border-radius: calc(100vw / 375 * 8);
    }

    span {
        width: calc(100vw / 375 * 46);
        height: calc(100vw / 375 * 46);
        line-height: calc(100vw / 375 * 46);
    }
}
</style>