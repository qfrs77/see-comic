<template>
    <div class="shelf">

        <wd-tabs v-model="tab" swipeable class="shelf-tabs">
            <wd-tab v-for="item in pathPage" :key="item.id" :title="`${item.title}`">
                <ComicListComponents :comicListDate="mineComic" v-if="isComicList" />
                <CollectListComponents v-if="isCollectList" />
            </wd-tab>
        </wd-tabs>
        <div class="shelf-icon" v-if="isCollectList" @click="popupWindow">
            <i></i>
        </div>
        <div class="confirm" v-if="isConfirm"> 
           <div class="confirm-image">
            <img src="../assets/confirm.png" alt="">
           </div>
           <div class="confirm-content">
             <p class="title">确定要删除记录吗？</p>
             <div class="confirm-btn">
                <button @click="undeleteData">取消</button>
                <button class="confirmed-btn" @click="remoteCollectListData">确定</button>
             </div>
           </div>
        </div>
    
    </div>
</template>
<script>

import WotUIPlugin from "../wotui/index.js"
Vue.use(WotUIPlugin)

import ComicListComponents from "@/components/ComicListComponents.vue";
import CollectListComponents from "@/components/CollectListComponents.vue";
import Vue from "vue";
export default {
    components: {
        ComicListComponents,
        CollectListComponents
    },
    data() {
        return {
            mineComic: [],
            tab: 0,
            pathPage: [{
                title: "书架",
                id: "xx01",

            },
            {
                title: "历史",
                id: "xx02",

            }
            ],
            isComicList: true,
            isCollectList: false,
            isConfirm:false

        };
    },
    created() {
        this.mineComic = JSON.parse(localStorage.getItem("mineComic")) || [];
    },
    computed: {
        infoURL() {
            return `https://www.kanman.com/api/getComicInfoAttribute?comic_id=${this.comicId}`;
        },
        isOPen() {
            return this.tab;
        }

    },
    watch: {
        infoURL() {
            this.$axios.get(this.infoURL).then(({ data }) => {
                console.log(data);
                this.comicInfo = data.data
            })
        },
        isOPen() {
            if (this.tab == 0) {
                this.isComicList = true;
                this.isCollectList = false;
            } else if (this.tab == 1) {
                this.isComicList = false;
                this.isCollectList = true;
            }
        },
        

    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        turnToComic(chapterId) {
            // this.chapterId = chapterId
            this.$router.push({
                path: '/comic',
                query: {
                    comicId: this.comicId,
                    chapterId: chapterId
                }
            })
        },
        addShelf() {
            this.mineComic.push({
                id: this.comicId,
                name: this.comicName,
            })
            localStorage.setItem("mineComic", JSON.stringify(this.mineComic));
        },
        turnToComicDetails(id, name) {
            this.mineComic = this.mineComic.filter((e) => {
                return e.id != id;
            });
            this.mineComic.unshift({
                id: id,
                name: name
            })
            localStorage.setItem("mineComic", JSON.stringify(this.mineComic));
            this.$router.push({
                path: 'comicdetails',
                query: {
                    id: id,
                    name: name,
                }
            })
        },
        popupWindow(){
            this.isConfirm = true;
        },
        undeleteData(){
            this.isConfirm = false;
        },
        remoteCollectListData() {
            this.isConfirm = false;
            
        }
    },
}
</script>
<style lang="scss" scoped>
.shelf {
    width: 100%;

    .shelf-icon {
        position: fixed;
        top: 0;
        z-index: 9;
        right: 0;

        i {
            display: inline-block;
            width: calc(100vw / 375 * 44);
            height: calc(100vw / 375 * 44);
            // background-color: #fc6976;
            background-image: url('../assets/remove.png');
            background-repeat: no-repeat;
            background-position: calc(100vw / 375 * 11) calc(100vw / 375 * 11);
            background-size: calc(100vw / 375 * 22) calc(100vw / 375 * 22);
        }
    }

    .wd-tab {
        width: 100%;
        height: 100vh;
        overflow: auto;

    }

    .shelf-tabs::v-deep .wd-tabs__nav {
        width: 100%;
        background-color: #fff;
        position: fixed;
        z-index: 9;

    }

    .shelf-tabs::v-deep .wd-tabs__nav-container {
        width: calc(100vw / 375 * 130);
        height: calc(100vw / 375 * 44);


        .wd-tabs__nav-item.is-active {
            color: #fc6976;
        }

        .wd-tabs__line {
            height: 1px;
            background: #fc6976;
        }

        .shelf-tabs {
            display: flex;
        }
    }
    .confirm{
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,.3);
        position: absolute;
        z-index: 999;
        top: 0;
        .confirm-image{
            width: 35%;
            margin: 0 auto;
            margin-top: 20vh;
            img{
                width: 100%;
                display: block;
                position: relative;
                z-index: 10;
            }
        }
        .confirm-content{
            position: relative;
            top: calc(-100vw / 375 * 10);
            width: 80%;
            margin: 0 auto;
            padding: calc(100vw / 375 * 25);
            text-align: center;
            background-color: rgb(247,247,247);
            border-radius: 10px;
            .title{
                padding: calc(100vw / 375 * 15) 0;
                font-size: calc(100vw / 375 * 18);
            }
            .confirm-btn{
                width: 60%;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                button{
                    width: calc(100vw / 375 * 70);
                    padding: calc(100vw / 375 * 5) 0;
                    border: 1px solid #ccc;
                    border-radius: 999px;
                }
                .confirmed-btn{
                    background-color: #fc6976;
                    color: #fff;
                }
            }
        }
    }


}
</style>