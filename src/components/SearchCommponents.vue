<template>
    <div class="search--commponent">
        <div class="back" @click="back"><img src="../assets/back.png" alt=""></div>
        <div class="searchbox">
            <input type="text" maxlength="40" placeholder="搜索漫画名or关键字" v-model="keyword" />
            <div class="searchbtn" @click="turnToSearchResult(keyword)"><img src="../assets/search.png" alt=""></div>
        </div>
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
    height: calc(100vw / 375 * 44);
    text-align: center;
    display: flex;

    .back {
        width: calc(100vw / 375 * 44);
        height: calc(100vw / 375 * 44);
        padding: calc(100vw / 375 * 12) calc(100vw / 375 * 6);

        img {
            width: calc(100vw / 375 * 32);
            height: calc(100vw / 375 * 20);
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }

    .searchbox {
        width: calc(100vw / 375 * 320);
        height: calc(100vw / 375 * 32);
        margin-right: calc(100vw / 375 * 11);
        margin-top: calc(100vw / 375 * 6);
        padding: 0 calc(100vw / 375 * 10);
        position: relative;

        input {
            width: calc(100vw / 375 * 300);
            height: 100%;
            padding: 0 calc(100vw / 375 * 32) 0 calc(100vw / 375 * 16);
            border: calc(100vw / 375 * 1) solid #fc6976;
            border-radius: calc(100vw / 375 * 15);
            box-sizing: border-box;
            outline: none;
            position: relative;
            z-index: 10;
        }

        .searchbtn {
            width: calc(100vw / 375 * 32);
            height: calc(100vw / 375 * 32);
            padding: calc(100vw / 375 * 5);
            position: absolute;
            top: 0;
            right: calc(100vw / 375 * 20);
            z-index: 10;

            img {
                width: calc(100vw / 375 * 22);
                height: calc(100vw / 375 * 22);
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }
    }
}
</style>