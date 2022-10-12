<template>
  <div class="comicbox" @click="controlshow=!controlshow">
    <div class="controlbox" v-show="controlshow">
        <div class="controltop"><span @click="back">返回</span></div>
        <div class="controlbtm">
            <div @click="turnToPrev">上一章</div>
            <div @click="turnToNext">下一章</div>
        </div>
    </div>
    <div v-for="i in chapterimg" :key="i"><img :src="i" alt="" /></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comicId: "",
      chapterId: "",
      chapterinfo: [],
      chapterimg:[],
      controlshow: false
    };
  },
  created() {
    this.comicId = this.$route.query.comicId;
    this.chapterId = this.$route.query.chapterId;
  },
  computed: {
    chapterinfoURL() {
      return `https://www.kanman.com/api/getchapterinfov2?comic_id=${this.comicId}&chapter_newid=${this.chapterId}&quality=middle`;
    },
  },
  watch: {
    chapterinfoURL() {
      this.$axios.get(this.chapterinfoURL).then(({ data }) => {
        console.log(data);
        this.chapterinfo = data.data;
        this.chapterimg = this.chapterinfo.current_chapter.chapter_img_list
        console.log(this.chapterinfo);
      });
    },
  },
  methods: {
    back() {
        this.$router.go(-1);
    },
    turnToNext() {
        console.log(this.chapterinfo.next_chapter);
        if(this.chapterinfo.next_chapter != null) {
            this.chapterId =this.chapterinfo.next_chapter.chapter_newid
        }
    },
    turnToPrev() {
        console.log(this.chapterinfo.prev_chapter);
        if(this.chapterinfo.prev_chapter != null) {
            this.chapterId =this.chapterinfo.prev_chapter.chapter_newid
        }
    }
  },
};
</script>
<style lang="scss" scoped>
.comicbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: white;
    position: relative;
    overflow: auto;
    z-index: 999;
    .controlbox {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        .controltop {
            width: 100%;
            height: 45px;
            background-color: black;
            color: white;
        }
        .controlbtm {
            width: 100%;
            height: 50px;
            background-color: black;
            color: white;
            line-height: 50px;
            display: flex;
            position: absolute;
            left: 0;
            bottom: 0;
            div {
                width: 50%;
                height: 100%;
                text-align: center;
            }
        }
    }
    div {
        img {
            display: block;
            width: 100%;
            height: auto;
        }
    }
}
</style>