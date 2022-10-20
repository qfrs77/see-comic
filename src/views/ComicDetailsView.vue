<template>
    <div class="detailsbox">
        <div class="details-top">
            <div class="detailsmask">
                <div class="back" @click="back">返回</div>
                <div class="name">
                    <h1>{{comicName}}</h1>
                </div>
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
            <div class="chapterhead">
                <div>全部章节</div>
                <div class="fr btn" v-show="orderShow" @click="onOrder">正序</div>
                <div class="fr btn" v-show="!orderShow" @click="onOrder">倒序</div>
            </div>
            <div v-for="j in chapterlist" :key="j.chapter_id" @click="turnToComic(j.chapter_newid)">{{j.chapter_name}}
            </div>
        </div>
        <div class="footer">
            <div class="btn">
                <div v-if="!ishas" @click="addShelf">加入书架</div>
                <div v-else @click="delShelf">移出书架</div>
            </div>
            <div class="btn">
                <div v-if="!isread" @click="firstReading">开始阅读</div>
                <div class="continuereading" v-else @click="continueReading(chapterId)">
                    <div>{{chapterName}}</div>
                    <div>继续阅读</div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            comicId: '',
            comicName: '',
            chapterName:'',
            chapterId:'',
            comicInfo: '',
            chapterlist: '',
            chapterinfo: '',
            mineComic: [],
            orderShow: true,
            comicReadHistory: [],
            hasHistory:false
        };
    },
    created() {
        this.comicId = this.$route.query.id
        this.comicName = this.$route.query.name
        this.mineComic = JSON.parse(localStorage.getItem("mineComic")) || [];
        this.comicReadHistory = JSON.parse(localStorage.getItem("comicReadHistory")) || [];
        console.log(this.$route.query.id);
        for (let i = 0; i < this.comicReadHistory.length; i++) {
            console.log(this.comicReadHistory[i]);
            if (this.comicReadHistory[i].comic_id == this.$route.query.id) {
                this.chapterName = this.comicReadHistory[i].chapter_name
                this.chapterId = this.comicReadHistory[i].chapter_id
                this.hasHistory = true
                console.log(this.hasHistory);
            }
        }
        console.log(this.hasHistory);
        if(this.hasHistory==false) {
            this.comicReadHistory.push({
                comic_id: this.comicId,
                comic_name: this.comicName,
                chapter_name:'',
                chapter_id:''
            })
            localStorage.setItem("comicReadHistory", JSON.stringify(this.comicReadHistory));
        }
    },
    computed: {
        ishas() {
            let flag = false
            this.mineComic.forEach(e => {
                if (e.comic_id == this.comicId) {
                    flag = true
                }
            })
            return flag
        },
        isread() {
            let flag1 = false
            this.comicReadHistory.forEach(e => {
                if (e.comic_id == this.comicId && e.chapter_name != '') {
                    flag1 = true
                }
            })
            return flag1
        },
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
            console.log(this.comicId,chapterId);
            this.$router.push({
                path: '/comic',
                query: {
                    comicId: this.comicId,
                    chapterId: chapterId
                }
            })
        },
        addShelf() {
            this.mineComic.unshift({
                comic_id: this.comicId,
                comic_name: this.comicName,
            })
            localStorage.setItem("mineComic", JSON.stringify(this.mineComic));
        },
        delShelf() {
            this.mineComic = this.mineComic.filter((e) => {
                return e.comic_id != this.comicId;
            });
            localStorage.setItem("mineComic", JSON.stringify(this.mineComic));
        },
        onOrder() {
            this.orderShow = !this.orderShow
            this.chapterlist = this.chapterlist.reverse()
        },

        firstReading() {
            /* this.$router.push({
                path: '/comic',
                query: {
                    comicId: this.comicId,
                    chapterId: this.comicInfo.first_chapter_id
                }
            }) */
            console.log(this.comicInfo.first_chapter_id);
        },
        continueReading(chapterId) {
            console.log(this.comicId,chapterId);
            this.$router.push({
                path: '/comic',
                query: {
                    comicId: this.comicId,
                    chapterId: chapterId
                }
            })
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

    .details-top {
        width: 100vw;
        height: calc(100vw/375*226);
        position: relative;

        .detailsmask {
            width: 100%;
            height: 100%;
            background-image: linear-gradient(0deg, rgba(0, 0, 0, .7), rgba(0, 0, 0, 0), rgba(0, 0, 0, .3));
            color: #fff;
            padding: calc(100vw/375*142) 0 calc(100vw/375*24);
            position: absolute;
            top: 0;
            left: 0;

            .back {
                position: absolute;
                top: calc(100vw/375*16);
                left: calc(100vw/375*16);
            }

            .name {
                height: calc(100vw/375*24);
                line-height: calc(100vw/375*24);
                padding-left: calc(100vw/375*10);
                font-size: calc(100vw/375*20);
                font-weight: bold;
            }

            .type {
                display: flex;
                height: calc(100vw/375*36);
                padding: calc(100vw/375*10);

                div {
                    height: calc(100vw/375*16);
                    font-size: calc(100vw/375*12);
                    margin-right: 7px;
                }
            }
        }

        .topimg {
            width: 100%;
            height: 100%;
        }
    }

    .desc {
        width: calc(100vw/375*345);
        margin: calc(100vw/375*20) auto calc(100vw/375*35);

        div:nth-of-type(1) {
            height: calc(100vw/375*20);
            margin-bottom: calc(100vw/375*8);
            font-size: calc(100vw/375*16);
            color: black;
        }

        div {
            font-size: calc(100vw/375*12);
            color: #999;
            line-height: calc(100vw/375*20);
        }
    }

    .chapterbox {
        width: calc(100vw/375*345);
        margin: calc(100vw/375*20) auto calc(100vw/375*55);

        .chapterhead {
            width: 100%;
            height: calc(100vw/375*35);
            line-height: calc(100vw/375*35);
            display: flex;

            div {
                width: calc(100vw - 100vw/375*35);
                font-size: calc(100vw/375*16);
                color: black;
            }

            .btn {
                width: calc(100vw/375*35);
                height: calc(100vw/375*21);
                line-height: calc(100vw/375*21);
                margin: calc(100vw/375*7) 0;
                font-size: calc(100vw/375*12);
                background-image: linear-gradient(90deg, #ff6b46, #ff2e67);
                color: white;
                border-radius: calc(100vw/375*10) 0 0 calc(100vw/375*10);
                text-align: center;
            }
        }

        div {
            height: calc(100vw/375*35);
            line-height: calc(100vw/375*35);
            font-size: calc(100vw/375*14);
            color: #999;
        }
    }

    .footer {
        width: 100%;
        height: calc(100vw / 375 * 50);
        background-color: black;
        color: white;
        line-height: calc(100vw / 375 * 50);
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;

        .btn {
            width: 50%;
            height: 100%;
            text-align: center;
            background-image: linear-gradient(90deg, #ff6b46, #ff2e67);
            .continuereading {
                padding: calc(100vw / 375 * 6) 0;
                div:nth-of-type(1) {
                    height: calc(100vw / 375 * 24);
                    line-height: calc(100vw / 375 * 24);
                    font-size: calc(100vw / 375 * 14);
                }
                div:nth-of-type(2) {
                    height: calc(100vw / 375 * 16);
                    line-height: calc(100vw / 375 * 16);
                    font-size: calc(100vw / 375 * 12);
                }
            }
        }
    }
}
</style>