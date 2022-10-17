<template>
    <div class="comicListbox">
        <!-- <button @click="test(comicListDate)">click</button> -->
        <div class="comicDate" v-for="j in comicListDate" :key="j.comic_id"
            @click="turnToComicDetails(j.comic_id,j.comic_name)">
            <div><img :src="`https://image.yqmh.com/mh/${j.comic_id}.jpg`" alt=""></div>
            <span>{{j.comic_name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: { comicListDate:Array },
    data() {
        return {

        }
    },
    watch:{
        comicListDate(){
            console.log("1");
        }
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
        test(x) {
            console.log(x);
        }
    }
}
</script>
<style lang="scss">
.comicListbox {
    width: 100vw;
    margin: calc(100vw / 375 * 15) 0;
    padding: 0 calc(100vw / 375 * 15) calc(100vw / 375 * 55) 0;
    display: inline-block;

    .comicDate {
        width: calc(100vw / 375 * 105);
        height: calc(100vw / 375 * 155);
        margin-left: calc(100vw / 375 * 15);
        margin-bottom: calc(100vw / 375 * 15);
        float: left;

        div {
            width: 100%;
            height: calc(100vw / 375 * 140);

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
    }
}
</style>