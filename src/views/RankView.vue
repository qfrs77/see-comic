<template>
    <div class="rank">
        <div class="ranktop">
            <div class="style">
                <ul>
                    <li v-for="i in rankNavStyleList" :key="i.value" @click="changeSort(i.value)" :ref="i.value"
                        :class="{ active: i.value == 'all' }">
                        {{ i.name }}
                    </li>
                </ul>
            </div>
            <div class="time">
                <ul>
                    <li v-for="i in rankNavTimeList" :key="i.value" @click="changeTime(i.value)" :ref="i.value"
                        :class="{ active: i.value == 'day' }">
                        {{ i.name }}
                    </li>
                </ul>
            </div>
            <div class="comictopbox">
                <div class="comictop" v-for="i in comictopInfo" :key="i.comic_id"
                    @click="turnToComicDetails(i.comic_id, i.comic_name)">
                    <div>
                        <img :src="`https://image.yqmh.com/mh/${i.comic_id}.jpg`" alt="" />
                    </div>
                    <span>{{ i.comic_name }}</span>
                </div>
            </div>
            <div class="comicotherbox">
                <div class="comicothers" v-for="(i, index) in comicotherInfo" :key="i.comic_id"
                    @click="turnToComicDetails(i.comic_id, i.comic_name)">
                    <div class="ranknum">
                        <span>{{ index + 4 }}</span>
                    </div>
                    <div class="str">
                        <div class="str1">
                            <div class="title">{{ i.comic_name }}</div>
                            <div>{{ Math.trunc(i.count_num/10000) + '万' }}</div>
                        </div>
                        <div class="str2">
                            <div>{{ i.author_name }}</div>
                            <div>
                                <div v-for="j in i.cartoon_type_list" :key="j.id">{{j.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            timetype: "day",
            sorttype: "all",
            prevsort: 'all',
            prevtime: 'day',
            rankNavStyleList: [
                {
                    name: "综合榜",
                    value: "all",
                },
                {
                    name: "自制榜",
                    value: "self",
                },
                {
                    name: "少年榜",
                    value: "boy",
                },
                {
                    name: "少女榜",
                    value: "girl",
                },
                {
                    name: "新作榜",
                    value: "new",
                },
                {
                    name: "黑马榜",
                    value: "dark",
                },
                {
                    name: "付费榜",
                    value: "charge",
                },
                {
                    name: "免费榜",
                    value: "free",
                },
                {
                    name: "完结榜",
                    value: "finish",
                },
                {
                    name: "连载榜",
                    value: "serialize",
                },
            ],
            rankNavTimeList: [
                {
                    name: "日榜",
                    value: "day",
                },
                {
                    name: "周榜",
                    value: "week",
                },
                {
                    name: "月榜",
                    value: "month",
                },
                {
                    name: "总榜",
                    value: "total",
                },
            ],
            comictopInfo: [],
            comicotherInfo: [],
            arrnum: [],
        };
    },
    created() {
        this.getrank();
    },
    computed: {
        rankURL() {
            return `https://www.kanman.com/api/getRankDataForWeb?isalldata=0&time_type=${this.timetype}&sort_type=${this.sorttype}&rank_type=heat&page=1&pageSize=100`;
        },
    },
    watch: {
        rankURL() {
            this.getrank();
        },
    },
    methods: {
        getrank() {
            this.$axios.get(this.rankURL).then(({ data }) => {
                console.log(data);
                this.comictopInfo = data.data.list.slice(0, 3);
                this.arrnum = this.comictopInfo.splice(1, 1);
                this.comictopInfo.splice(0, 0, this.arrnum[0]);
                console.log(data.data.list);
                data.data.list.splice(0, 3);
                this.comicotherInfo = data.data.list;
                console.log(this.comicotherInfo);
            });
        },
        changeSort(sort) {
            this.sorttype = sort;
            this.$refs[this.prevsort][0].className = ""
            this.$refs[sort][0].className = "active"
            this.prevsort = sort
        },
        changeTime(time) {
            this.timetype = time;
            this.$refs[this.prevtime][0].className = ""
            this.$refs[time][0].className = "active"
            this.prevtime = time
        },
        turnToComicDetails(id, name) {
            this.$router.push({
                path: "comicdetails",
                query: {
                    id: id,
                    name: name,
                },
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.rank {
    width: 100vw;
    height: calc(100vh - 55px);

    .ranktop {
        width: 100%;
        height: calc(100vw / 375 * 284);
        background-image: url("https://m.kanman.com/static/images/rank/bg-comic-list.png");
        background-size: 100% auto;
        color: white;

        .style {
            width: 90vw;
            height: calc(100vw / 375 * 30);
            line-height: calc(100vw / 375 * 30);
            font-size: calc(100vw / 375 * 14);
            margin: 0 auto;
            overflow: auto;

            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }

            ul {
                width: 300vw;
                height: 100%;
                display: flex;
                flex-wrap: nowrap;

                li {
                    width: calc(100vw / 375 * 42);
                    margin-right: calc(100vw / 375 * 20);
                }

                .active {
                    border-bottom: calc(100vw / 375) solid #fff;
                }
            }
        }

        .time {
            display: flex;
            width: 90vw;
            height: calc(100vw / 375 * 30);
            line-height: calc(100vw / 375 * 30);
            font-size: calc(100vw / 375 * 14);
            margin: 0 auto;

            ul {
                width: 700px;
                display: flex;
                flex-wrap: nowrap;

                li {
                    width: calc(100vw / 375 * 28);
                    margin-right: calc(100vw / 375 * 20);
                }

                .active {
                    border-bottom: calc(100vw / 375) solid #fff;
                }
            }
        }

        .comictopbox {
            width: 100%;
            height: calc(100vw / 375 * 222);
            padding: calc(100vw / 375 * 25) calc(100vw / 375 * 33) calc(100vw / 375 * 62);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;

            .comictop {
                width: calc(100vw / 375 * 65);
                height: calc(100vw / 375 * 116);

                div {
                    width: 100%;
                    height: calc(100vw / 375 * 88);

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                span {
                    width: 100%;
                    height: calc(100vw / 375 * 28);
                    line-height: calc(100vw / 375 * 28);
                    display: block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }

            .comictop:nth-of-type(2) {
                width: calc(100vw / 375 * 90);
                height: calc(100vw / 375 * 148);

                div {
                    width: 100%;
                    height: calc(100vw / 375 * 120);
                }
            }
        }

        .comicotherbox {
            width: 100vw;
            padding-bottom: calc(100vw / 375 * 55);

            .comicothers {
                width: 100vw;
                height: calc(100vw / 375 * 58);
                padding: calc(100vw / 375 * 12) calc(100vw / 375 * 10);
                display: flex;

                div {
                    display: inline-block;
                }

                .ranknum {
                    width: calc(100vw / 375 * 34);
                    height: calc(100vw / 375 * 34);
                    line-height: calc(100vw / 375 * 34);
                    font-size: calc(100vw / 375 * 20);
                    text-align: center;
                    color: #ddd;
                }

                .str {
                    width: 100%;
                    height: calc(100vw / 375 * 34);
                    padding-left: 1vw;
                    display: flex;
                    flex-direction: column;
                    font-size: calc(100vw / 375 * 13);
                    color: #999;

                    .str1 {
                        width: 100%;
                        height: calc(100vw / 375 * 16);
                        margin-bottom: calc(100vw / 375 * 5);

                        .title {
                            font-size: calc(100vw / 375 * 16);
                            color: #333;
                        }

                        div:nth-of-type(2) {
                            float: right;
                        }
                    }

                    .str2 {
                        width: 100%;
                        height: calc(100vw / 375 * 13);

                        div:nth-of-type(2) {
                            float: right;

                            div {
                                margin-left: 1vw;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>