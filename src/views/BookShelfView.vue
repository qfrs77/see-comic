<template>
    <div class="shelf">
        <div class="comic" v-for="i in mineComic" :key="i+i.id">
            <div><img :src="`https://image.yqmh.com/mh/${i.id}.jpg`" alt=""></div>
            <span>{{i.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
    return {
        mineComic:[]

    };
    },
    created() {
        this.mineComic = JSON.parse(localStorage.getItem("mineComic")) || [];
        console.log(this.mineComic);
    },
    computed: {
        infoURL() {
            return `https://www.kanman.com/api/getComicInfoAttribute?comic_id=${this.comicId}`;
        }
    },
    watch: {
        infoURL() {
            this.$axios.get(this.infoURL).then(({ data }) => {
                console.log(data);
                this.comicInfo = data.data
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
.shelf {
    width: 100%;
    padding: 10px;
    .comic{
        width: 100px;
        height: 155px;
        div {
            width: 100%;
            height: 135px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        span {
            width: 100%;
            height: 20px;
            line-height: 20px;
            text-align: center
        };
    }
}
</style>