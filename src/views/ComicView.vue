<template>
  <div class="comicbox" ref="box" @click="controlshow=!controlshow" @touchstart="touchstart" @touchmove="touchmove">
    <div class="controlbox" v-show="controlshow">
      <div class="controltop"><span class="back" @click="back">返回</span></div>
      <div class="controlbtm">
        <div @click="turnToPrev">上一章</div>
        <div @click="turnToNext">下一章</div>
      </div>
    </div>

    <div v-for="i in chapterimg" :key="i"><img :src="i" alt="" /></div>

    <div v-show="isbottom" @click.stop="turnToNext" class="turntobtn turntonext">
      <div>下</div>
      <div>一</div>
      <div>章</div>
    </div>
    <div v-show="istop" @click.stop="turnToPrev" class="turntobtn turntoprev">
      <div>上</div>
      <div>一</div>
      <div>章</div>
    </div>

    <transition @before-enter="beforeEnterTips" @enter="enterTips" @after-enter="afterEnterTips">
      <div class="tips" @click.self="tipsshow()" v-show="tipsshow">
        已经没有内容了哦~
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comicId: "",
      chapterId: "",
      chapterinfo: [],
      chapterimg: [],
      controlshow: false,
      istop: false,
      isbottom: false,
      isclienttop: false,
      isclientbottom: false,
      tipsshow: false
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
      if (this.chapterinfo.next_chapter != null) {
        this.chapterId = this.chapterinfo.next_chapter.chapter_newid
        this.isbottom = false
      } else {
        this.isbottom = false
        this.tipsshow = true
      }
    },
    turnToPrev() {
      console.log(this.chapterinfo.prev_chapter);
      if (this.chapterinfo.prev_chapter != null) {
        this.chapterId = this.chapterinfo.prev_chapter.chapter_newid
        this.istop = false
      } else {
        this.istop = false
        this.tipsshow = true
      }
    },

    // 上下滑动事件
    touchstart(event) {
      // event.preventDefault() //阻止默认事件（长按的时候出现复制）
      this.startX = event.changedTouches[0].pageX
      this.startY = event.changedTouches[0].pageY
      let boxtop = this.$refs.box.scrollTop;
      let scrollheight = this.$refs.box.scrollHeight;
      let clientheight = this.$refs.box.clientHeight;
      // 判断是否到顶
      if (boxtop == 0) {
        this.isclienttop = true
      } else {
        this.isclienttop = false
      }
      if (boxtop + clientheight + 1 >= scrollheight) {
        this.isclientbottom = true
      } else {
        this.isclientbottom = false
      }

    },
    touchmove(event) {
      // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      // event.preventDefault()
      var moveEndX = event.changedTouches[0].pageX
      var moveEndY = event.changedTouches[0].pageY
      var X = moveEndX - this.startX
      var Y = moveEndY - this.startY

      // 判断是否为上下滑动
      if (Math.abs(Y) > Math.abs(X)) {
        if (this.isclienttop == true) {
          if (Y > 0) {
            this.istop = true
          }
        } else {
          this.istop = false
        }
        if (this.isclientbottom == true) {
          if (Y < 0) {
            this.isbottom = true
          }
        } else {
          this.isbottom = false
        }
      }
    },

    // 淡入淡出弹窗
    beforeEnterTips(el) {
      console.log("动画开始了", el);
      el.style.opacity = "0"
    },
    enterTips(el, done) {
      // 强制刷新页面,等vue渲染元素
      // 让浏览器获取当前元素的某些样式值,会让浏览器顺便刷新ui渲染
      el.offsetHeight;

      let step = 0;
      el.ontransitionend = function () {
        step++;
        if (step == 1) {
          el.style.transition = "all 1s linear";
          el.style.opacity = "0"
        } else {
          done();
        }
      };
      el.style.transition = "all .7s linear";
      el.style.opacity = "1"
    },
    afterEnterTips(el) {
      console.log("动画结束中", el);
      el.style.transition = "all 0s linear";
      this.tipsshow = false
      el.ontransitionend = null;
    },
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
    z-index: 999;

    .controltop {
      width: 100vw;
      height: calc(100vw/375*45);
      background: linear-gradient(0deg, rgba(255, 231, 225, .6) 0%, rgba(252, 105, 118, .8) 100%);
      color: white;
      .back {
        width: calc(100vw / 375 * 65);
        height: calc(100vw / 375 * 45);
        line-height: calc(100vw/375*45);
        padding: 0 calc(100vw/375*10);
      }
    }

    .controlbtm {
      width: 100%;
      height: calc(100vw/375*50);
      background: linear-gradient(180deg, rgba(255, 231, 225, .6) 0%, rgba(252, 105, 118, .8) 100%);
      color: white;
      line-height: calc(100vw/375*50);
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

  .turntobtn {
    width: calc(100vw/375*42);
    height: 100vh;
    padding: 40vh calc(100vw/375*10);
    font-size: calc(100vw/375*22);
    text-align: center;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    bottom: 0;

    div {
      width: 20px;
      height: calc(100vw/375*20);
      line-height: calc(100vw/375*20);
    }
  }

  .turntonext {
    background: linear-gradient(90deg, rgba(255, 231, 225, .2) 0%, rgba(252, 105, 118, .6) 100%);
    right: 0;
  }

  .turntoprev {
    background: linear-gradient(270deg, rgba(255, 231, 225, .2) 0%, rgba(252, 105, 118, .6) 100%);
    left: 0;
  }

  .tips {
    width: calc(100vw/375*180);
    height: calc(100vw/375*60);
    line-height: calc(100vw/375*60);
    font-size: calc(100vw/375*16);
    border-radius: calc(100vw/375*10);
    background-color: #feabae;
    text-align: center;
    color: white;
    position: fixed;
    top: calc(50vh - 100vw/375*30);
    left: calc(50vw - 100vw/375*90);
    z-index: 9999;
  }
}
</style>