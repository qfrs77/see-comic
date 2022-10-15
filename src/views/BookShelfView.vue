<template>
    <div class="shelf">
        <!-- <div class="comic" v-for="i in mineComic" :key="i+i.id" @click="turnToComicDetails(i.id,i.name)">
            <div><img :src="`https://image.yqmh.com/mh/${i.id}.jpg`" alt=""></div>
            <span>{{i.name}}</span>
        </div> -->
        <ComicListComponents :comicListDate="mineComic" />

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
            mineComic: []
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
        }
    }
}
</script>
<style lang="scss" scoped>
.shelf {
    width: 100%;

    .comic {
        width: 32vw;
        height: calc(32vw / 100 * 155);
        margin-left: 1vw;
        margin-top: 1vw;
        float: left;

        div {
            width: 100%;
            height: calc(32vw / 100 * 135);

            img {
                width: 100%;
                height: 100%;
            }
        }

        span {
            width: 100%;
            height: calc(32vw / 100 * 20);
            line-height: calc(32vw / 100 * 20);
            text-align: center;
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        ;
    }
}
</style>