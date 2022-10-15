<template>
    <div class="allbooksbox" @scroll="scrolling" ref="box">
        <div class="header">
            <div class="back" @click="back">返回</div>
            漫画索引
        </div>
        <div class="allbooks">
            <div class="typelist" v-for="i in classifyTitle" :key="i.id">
                <div v-for="j in i.content" :key="j.value"
                    :class="{active : j.value == title||j.value ==place||j.value ==isFin||j.value ==word}"
                    @click="changeClassify(i.type,j.value)">{{j.name}}</div>
            </div>
        </div>
        <ComicListComponents :comicListDate="selectComic" />
    </div>
</template>

<script>
import ComicListComponents from "@/components/ComicListComponents.vue";
export default {
    components: {
        ComicListComponents,
    },

    data() {
        return {
            classifyTitle: [
                {
                    name: "题材",
                    type: "title",
                    id: "1",
                    content: [
                        {
                            name: "全部",
                            value: "tall",
                        },
                        {
                            name: "热血",
                            value: "rexue",
                        },
                        {
                            name: "机战",
                            value: "jizhan",
                        },
                        {
                            name: "运动",
                            value: "yundong",
                        },
                        {
                            name: "推理",
                            value: "tuili",
                        },
                        {
                            name: "冒险",
                            value: "maoxian",
                        },
                        {
                            name: "搞笑",
                            value: "gaoxiao",
                        },
                        {
                            name: "战争",
                            value: "zhanzheng",
                        },
                        {
                            name: "神魔",
                            value: "shenmo",
                        },
                        {
                            name: "忍者",
                            value: "renzhe",
                        },
                        {
                            name: "竞争",
                            value: "jingzheng",
                        },
                        {
                            name: "悬疑",
                            value: "xuanyi",
                        },
                        {
                            name: "社会",
                            value: "shehui",
                        },
                        {
                            name: "恋爱",
                            value: "lianai",
                        },
                        {
                            name: "宠物",
                            value: "chongwu",
                        },
                        {
                            name: "吸血",
                            value: "xixue",
                        },
                        {
                            name: "萝莉",
                            value: "luoli",
                        },
                        {
                            name: "御姐",
                            value: "yujie",
                        },
                        {
                            name: "霸总",
                            value: "bazong",
                        },
                        {
                            name: "玄幻",
                            value: "xuanhuan",
                        },
                        {
                            name: "古风",
                            value: "gufeng",
                        },
                        {
                            name: "历史",
                            value: "lishi",
                        },
                        {
                            name: "漫改",
                            value: "mangai",
                        },
                        {
                            name: "游戏",
                            value: "youxi",
                        },
                        {
                            name: "穿越",
                            value: "chuanyue",
                        },
                        {
                            name: "恐怖",
                            value: "kongbu",
                        },
                        {
                            name: "真人",
                            value: "zhenren",
                        },
                        {
                            name: "科幻",
                            value: "kehuan",
                        },
                        {
                            name: "防疫",
                            value: "fangyi",
                        },
                        {
                            name: "都市",
                            value: "dushi",
                        },
                        {
                            name: "武侠",
                            value: "wuxia",
                        },
                        {
                            name: "修真",
                            value: "xiuzhen",
                        },
                        {
                            name: "生活",
                            value: "shenghuo",
                        },
                        {
                            name: "动作",
                            value: "dongzuo",
                        },
                    ],
                },
                {
                    name: "地区",
                    type: "place",
                    id: "2",
                    content: [
                        {
                            name: "全部",
                            value: "pall",
                        },
                        {
                            name: "大陆",
                            value: "dalu",
                        },
                        {
                            name: "日本",
                            value: "riben",
                        },
                        {
                            name: "港台",
                            value: "gangtai",
                        },
                        {
                            name: "欧美",
                            value: "oumei",
                        },
                        {
                            name: "韩国",
                            value: "hanguo",
                        },
                    ],
                },
                {
                    name: "进度",
                    type: "isFin",
                    id: "3",
                    content: [
                        {
                            name: "全部",
                            value: "fall",
                        },
                        {
                            name: "连载",
                            value: "1",
                        },
                        {
                            name: "完结",
                            value: "2",
                        },
                    ],
                },
                {
                    name: "字母",
                    type: "word",
                    id: "4",
                    content: [
                        { name: "全部", value: "wall" },
                        { name: "A", value: "A" },
                        { name: "B", value: "B" },
                        { name: "C", value: "C" },
                        { name: "D", value: "D" },
                        { name: "E", value: "E" },
                        { name: "F", value: "F" },
                        { name: "G", value: "G" },
                        { name: "H", value: "H" },
                        { name: "I", value: "I" },
                        { name: "J", value: "J" },
                        { name: "K", value: "K" },
                        { name: "L", value: "L" },
                        { name: "M", value: "M" },
                        { name: "N", value: "N" },
                        { name: "O", value: "O" },
                        { name: "P", value: "P" },
                        { name: "Q", value: "Q" },
                        { name: "R", value: "R" },
                        { name: "S", value: "S" },
                        { name: "T", value: "T" },
                        { name: "U", value: "U" },
                        { name: "V", value: "V" },
                        { name: "W", value: "W" },
                        { name: "X", value: "X" },
                        { name: "Y", value: "Y" },
                        { name: "Z", value: "Z" },
                    ],
                },
            ],
            title: "tall",
            place: "pall",
            isFin: "fall",
            word: "wall",
            excessive: [],
            excessivelength:20
        };
    },

    created() {
        this.allComic = JSON.parse(localStorage.getItem("allComic"));
        this.selectComic = this.allComic.slice(0, 21);
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        changeClassify(type, value) {
            if (type == "title") {
                this.title = value
            }
            if (type == "place") {
                this.place = value
            }
            if (type == "isFin") {
                this.isFin = value
            }
            if (type == "word") {
                this.word = value
            }
            this.changeClassifyList()
        },
        changeClassifyList() {
            this.excessive = this.allComic
            if (this.title !== 'tall') {
                this.excessive = this.excessive.filter((e) => {
                    let thisClass = e.sort_typelist.replace(/[^a-zA-Z|\\|]/g, '').split('|')
                    let ishas = 0
                    for (let i = 0; i < thisClass.length; i++) {
                        if (thisClass[i] == this.title) {
                            ishas = 1
                        }
                    }
                    return ishas
                });
            }
            if (this.place !== 'pall') {
                this.excessive = this.excessive.filter((e) => {
                    return e.cartoon_area_tag.replace(/[^a-zA-Z|\\|]/g, '') == this.place
                });
            }
            if (this.isFin !== 'fall') {
                this.excessive = this.excessive.filter((e) => {
                    return e.comic_status == this.isFin
                });
            }
            if (this.word !== 'wall') {
                this.excessive = this.excessive.filter((e) => {
                    return e.comic_newid.slice(0, 1).toUpperCase() == this.word
                });
            }
            this.selectComic = this.excessive.slice(0, this.excessivelength)
            console.log(this.excessive);
            console.log(this.selectComic);
        },
        scrolling() {
            let boxtop =  this.$refs.box.scrollTop;
            let scrollheight = this.$refs.box.scrollHeight; 
            let clientheight = this.$refs.box.clientHeight;
            if(boxtop + clientheight >= scrollheight) {
                this.excessivelength += 21
                console.log(this.excessivelength);
            // this.selectComic = this.excessive.slice(0, this.excessivelength)
            this.changeClassifyList()
            console.log(this.selectComic);


            }
            /* console.log(this.$refs.box.scrollTop);
            console.log(this.$refs.box.scrollHeight);
            console.log(this.$refs.box.clientHeight); */
        }
    }
}
</script>
<style lang="scss">
.allbooksbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: auto;
    z-index: 999;

    .header {
        width: 100vw;
        height: calc(100vw / 375 * 45);
        line-height: calc(100vw / 375 * 45);
        text-align: center;
        background-color: #fc6976;
        color: white;
        position: fixed;
        top: 0;
        left: 0;

        .back {
            width: calc(100vw / 375 * 65);
            height: calc(100vw / 375 * 45);
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    .allbooks {
        width: calc(100vw / 375 * 345);
        margin: calc(100vw / 375 * 40) auto 0;

        .typelist {
            width: 100%;
            font-size: calc(100vw / 375 * 14);

            div {
                height: calc(100vw / 375 * 32);
                line-height: calc(100vw / 375 * 32);
                padding: calc(100vw / 375 * 2) calc(100vw / 375 * 10);
                float: left;
            }

            div:first-child {
                clear: both;
            }

            .active {
                background-color: white;
                color: #FC6976;
            }
        }
    }

    .bookslist {
        width: calc(100vw / 375 * 345);
        height: 300px;
        margin: 0 auto;
        padding: calc(100vw / 375 * 30) 0;
        clear: both;

    }
}
</style>