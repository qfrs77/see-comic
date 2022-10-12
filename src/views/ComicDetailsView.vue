<template>
    <div class="detailsbox">
        <div class="details-top">
            <div class="detailsmask">
                <div @click="back">返回</div>
                <div class="name">{{comicName}}</div>
                <div class="type">
                    <div v-for="i in comicInfo.cartoon_type_list" :key="i.id">{{i.name}}</div>
                </div>
            </div>
            
            <img class="topimg" :src="'http://image.mhxk.com/mh/'+ this.comicId+'_2_1.jpg-noresize.webp'" />
        </div>
        <div class="desc">
            <div>简介：</div>
            <div>{{comicInfo.comic_desc}}</div>
        </div>
        <div class="chapterbox">
            <div>全部章节</div>
            <div v-for="j in chapterlist" :key="j.chapter_id" @click="turnToComic(j.chapter_newid)">{{j.chapter_name}}</div>
        </div>
        <div class="footer">
            <div @click="addShelf">加入书架</div>
            <div>开始阅读</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
    return {
        comicId:'',
        comicName:'',
        comicInfo:'',
        chapterlist:'',
        chapterinfo:'',
        chapterId:'',
        mineComic:[]

    };
    },
    created() {
        this.comicId = this.$route.query.id
        this.comicName = this.$route.query.name
        this.mineComic = JSON.parse(localStorage.getItem("mineComic")) || [];
        console.log(this.$route.query.id);
    },
    computed: {
        infoURL() {
            return `https://www.kanman.com/api/getComicInfoAttribute?comic_id=${this.comicId}`;
        },
        chapterlistURL() {
            return `https://www.kanman.com/api/getchapterlist?comic_id=${this.comicId}`
        },
    },
    watch: {
        infoURL() {
            this.$axios.get(this.infoURL).then(({ data }) => {
                console.log(data);
                this.comicInfo = data.data
            })
        },
        chapterlistURL() {
            this.$axios.get(this.chapterlistURL).then(({ data }) => {
                console.log(data);
                this.chapterlist = data.data
            })
        },
        
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        turnToComic(chapterId) {
            // this.chapterId = chapterId
            this.$router.push({
                path:'/comic',
                query:{
                    comicId:this.comicId,
                    chapterId:chapterId
                }
            })
        },
        addShelf() {
            this.mineComic.push ({
                id:this.comicId,
                name:this.comicName,
            })
            localStorage.setItem("mineComic", JSON.stringify(this.mineComic));
        }
    }
}
</script>
<style lang="scss" scoped>
.detailsbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: auto;
    z-index: 999;
    .details-top{
        width: 100%;
        height: 226px;
        position: relative;
        .detailsmask {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            position: absolute;
            top: 0;
            left: 0;
            .type {
                display: flex;
                div{
                    margin-right: 7px;
                }
            }
        }
        .topimg {
            width: 100%;
            height: 100%;
        }
    }
    .footer {
        width: 100%;
            height: 50px;
            background-color: black;
            color: white;
            line-height: 50px;
            display: flex;
            position: fixed;
            left: 0;
            bottom: 0;
            div {
                width: 50%;
                height: 100%;
                text-align: center;
            }
    }
}
</style>