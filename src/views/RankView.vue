<template>
    <div class="rank">
        <div class="ranktop">
            <div class="style">
                <ul>
                    <li v-for="i in rankNavStyleList"
                        :key="i.value"
                        @click="changeSort(i.value)"
                        :ref="i.value">
                        {{ i.name }}
                    </li>
                </ul>
            </div>
            <div  class="time">
            <ul>
                <li v-for="i in rankNavTimeList"
                    :key="i.value"
                    @click="changeTime(i.value)"
                    :ref="i.value"
                    :class="{ active: i.value == 'day' }">
                {{ i.name }}
                </li>
            </ul>
            </div>
            <div class="comictopbox">
                <div class="comictop" v-for="i in comictopInfo" :key="i.comic_id">
                    <div><img :src="`https://image.yqmh.com/mh/${i.comic_id}.jpg`" alt=""></div>
                    <span>{{i.comic_name}}</span>
                </div>
            </div>
            <div class="comicotherbox">
                <div class="comicothers" v-for="(i, index) in comicotherInfo" :key="i.comic_id">
                    <span>{{index+4}}</span>
                    <div>
                        <span>{{i.comic_name}}</span>
                        <span>{{i.author_name}}</span>
                    </div>
                    <div>
                        <span>{{i.count_num}}</span>
                        <div>
                            <span v-for="j in i.cartoon_type_list" :key="j.id">{{j.name}}</span>
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
        timetype:'day',
        sorttype:'all',
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
        comictopInfo:[],
        comicotherInfo:[],
        arrnum:[]
    };
    },
    created() {
        this.getrank()
    },
    computed: {
        rankURL() {
            return `https://www.kanman.com/api/getRankDataForWeb?isalldata=0&time_type=${this.timetype}&sort_type=${this.sorttype}&rank_type=heat&page=1&pageSize=100`;
        }
    },
    watch: {
        rankURL() {
            this.getrank()
        },
    },
    methods: {
        getrank() {
            this.$axios.get(this.rankURL).then(({ data }) => {
                console.log(data);
                this.comictopInfo = data.data.list.slice(0,3)
                this.arrnum = this.comictopInfo.splice(1,1)
                this.comictopInfo.splice(0,0,this.arrnum[0])
                console.log(data.data.list);
                data.data.list.splice(0,3)
                this.comicotherInfo = data.data.list
                console.log(this.comicotherInfo);
            })
        },
        changeSort(sort) {
            this.sorttype = sort
            console.log(this.sorttype);
        },
        changeTime(time) {
            this.timetype = time
            console.log(this.timetype);
        }
    }
}
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
        .style {
            width: 90%;
            height: calc(100vw /375 *30);
            line-height: calc(100vw /375 *30);
            font-size: 14px;
            margin: 0 auto;
            overflow: auto;
            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }
            ul {
            width: 700px;
            height: 100%;
            display: flex;
            flex-wrap: nowrap;
            li {
                width: 50px;
                margin-right: 20px;
            }
            }
        }
        .time {
            display: flex;
            width: 90%;
            height: calc(100vw /375 *30);
            line-height: calc(100vw /375 *30);
            font-size: 14px;
            margin: 0 auto;
            ul {
            width: 700px;
            display: flex;
            flex-wrap: nowrap;
            li {
                width: 50px;
                margin-right: 20px;
            }
            }
        }
        .comictopbox {
            width: 100%;
            height: calc(100vw /375 * 222);
            padding: calc(100vw /375 *25) calc(100vw /375 *33) calc(100vw /375 *62);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            .comictop {
                width: calc(100vw /375 * 65);
                height: calc(100vw /375 * 116);
                div {
                    width: 100%;
                    height: calc(100vw /375 * 88);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                span {
                    width: 100%;
                    height: 28px;
                    line-height: 28px;
                    display: block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
            .comictop:nth-of-type(2) {
                width: calc(100vw /375 * 90);
                height: calc(100vw /375 * 148);
                div {
                    width: 100%;
                    height: calc(100vw /375 * 120);
                }
            }
        }
        .comicotherbox {
            width: 100vw;
            .comicothers{
                width: 100vw;
                height: 65px;
                display: flex;
            justify-content: space-between;
                div {
                    display: flex;
                    flex-direction: column;
                    div {
                        display: flex;
                        flex-direction: row;
                    }
                }
            }
        }
    }
}
</style>