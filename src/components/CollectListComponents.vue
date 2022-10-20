<template>
    <div class="collectListbox">
        <ul>
            <li v-for="item in collectListData" :key="item.comic_id" @click="turnToComicDetails(item.comic_id,item.comic_name)">
                <div class="collectListbox-image">
                    <img :src="`https://image.yqmh.com/mh/${item.comic_id}.jpg`" alt="">
                </div>
                <div class="collectListbox-content">
                    <p class="title">{{item.comic_name}}</p>
                    <p class="time">time</p>
                    <p class="readto">{{item.chapter_name ? '阅读至' + item.chapter_name:'未读'}}</p>
                </div>
                <div class="collectListbox-btn">
                    <span>继续阅读</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            collectListData: [],
        }
    },
    computed: {
    },
    watch: {
    },
    created() {
        this.collectListData = JSON.parse(localStorage.getItem("comicReadHistory")) || [];
    },
    methods: {
        turnToComicDetails(id, name) {
            this.$router.push({
                path: 'comicdetails',
                query: {
                    id: id,
                    name: name,
                }
            })
        },
    },
}
</script>

<style lang="scss">
.collectListbox {
    width: 100vw;
    margin: calc(100vw / 375 * 15) 0;
    padding: 0 calc(100vw / 375 * 15) calc(100vw / 375 * 55) 0;
    display: inline-block;
    margin-top: calc(100vw / 375 * 44);

    ul {
        width: 100%;
        padding-left: calc(100vw / 375 * 15);
        box-sizing: border-box;

        li {
            width: 100%;
            display: flex;
            position: relative;
            margin-bottom: calc(100vw / 375 * 10);

            .collectListbox-image {
                width: calc(100vw / 375 * 75);

                img {
                    width: 100%;
                    height: calc(100vw / 375 * 100);
                    display: block;
                }
            }

            .collectListbox-content {
                flex: 1;
                padding-left: calc(100vw / 375 * 10);

                .title {
                    height: calc(100vw / 375 * 28);
                    font-size: calc(100vw / 375 * 14);
                    color: #333;
                }

                .time {
                    height: calc(100vw / 375 * 20);
                    font-size: calc(100vw / 375 * 12);
                    color: #999;
                }

                .readto {
                    height: calc(100vw / 375 * 24);
                    font-size: calc(100vw / 375 * 12);
                    padding-top: calc(100vw / 375 * 28);
                    color: #ddd;
                }
            }

            .collectListbox-btn {
                position: absolute;
                bottom: calc(100vw / 375 * 24);
                right: calc(100vw / 375 * 10);
                font-size: calc(100vw / 375 * 14);
                z-index: 9;

                span {
                    width: calc(100vw / 375 * 74);
                    height: calc(100vw / 375 * 24);
                    line-height: calc(100vw / 375 * 24);
                    display: inline-block;
                    font-size: calc(100vw / 375 * 14);
                    padding: 0 calc(100vw / 375 * 8);
                    color: #fff;
                    background-color: #fc6976;
                    border-radius: 999px;
                }
            }
        }
    }
}
</style>