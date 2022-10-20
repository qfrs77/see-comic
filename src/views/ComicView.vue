<template>
  <div class="comicbox" ref="box" @click="controlshow=!controlshow" @touchstart="touchstart" @touchmove="touchmove">
    <transition @before-enter="beforeEnterControlpanel" @enter="enterControlpanel"
      @after-enter="afterEnterControlpanel">
      <div class="controlbox" v-show="controlshow">
        <div class="controltop">
          <div class="back" @click="back">
            <svg-icon icon-class="rollback" color="#fff"></svg-icon>
          </div>
          <div class="chaptername">{{chapter_name}}</div>
        </div>
        <div class="controlbtm">
          <div class="progressbarbox">
            <div><span></span>{{moveProgress}}/<span>{{chapterimg.length}}</span></div>
            <input ref="progress" @input.self="progressMove" type="range" min="1" :max="chapterimg.length"
              :value="moveProgress" class="progress_ipt" />
          </div>
          <div class="btnbox">
            <div class="prevbox" @click="turnToPrev">
              <svg-icon className="svgicon prev" icon-class="back" color="#fff"></svg-icon>
              <span>上一章</span>
            </div>
            <div>
              <svg-icon className="svgicon catalogue" icon-class="catalogue" color="#fff"></svg-icon>
              <span>目录</span>
            </div>
            <div>
              <svg-icon className="svgicon bookmarks" icon-class="bookmarks" color="#fff"></svg-icon>
              <span>书签</span>
            </div>
            <div class="nextbox" @click="turnToNext">
              <svg-icon className="svgicon next" icon-class="next" color="#fff"></svg-icon>
              <span>下一章</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div v-for="i in chapterimg" :key="i" ref="img"><img :src="i" alt="" /></div>

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
    <div v-if="isLoad" class="loading">
      <div class="imgbox"></div>
    </div>
  </div>
</template>
<script>
import SvgIcon from '@/components/SvgIcon/index.vue';
export default {
  data() {
    return {
      comicId: "",
      chapterId: "",
      chapter_name: "",
      chapterinfo: [],
      chapterimg: [],
      controlshow: false,
      istop: false,
      isbottom: false,
      isclienttop: false,
      isclientbottom: false,
      tipsshow: false,
      isLoad: true,
      moveProgress: 1
    };
  },
  created() {
    this.comicId = this.$route.query.comicId;
    this.chapterId = this.$route.query.chapterId;
    this.mineComic = JSON.parse(localStorage.getItem("mineComic")) || [];
    this.comicReadHistory = JSON.parse(localStorage.getItem("comicReadHistory")) || [];
  },
  computed: {
    chapterinfoURL() {
      return `https://www.kanman.com/api/getchapterinfov2?comic_id=${this.comicId}&chapter_newid=${this.chapterId}&quality=middle`;
    },
  },
  watch: {
    chapterinfoURL() {
      this.$axios.get(this.chapterinfoURL).then((data) => {
        if (data.status == 200) {
          console.log(111111);
          this.chapterinfo = data.data.data;
          this.chapterimg = this.chapterinfo.current_chapter.chapter_img_list;
          this.chapter_name = this.chapterinfo.current_chapter.chapter_name;
          this.chapter_id = this.chapterinfo.current_chapter.chapter_newid;
          for (let i = 0; i < this.comicReadHistory.length; i++) {
            console.log(this.comicReadHistory[i].comic_id, this.comicId);
            if (this.comicReadHistory[i].comic_id == this.comicId) {
              this.comicReadHistory[i].chapter_name = this.chapter_name;
              this.comicReadHistory[i].chapter_id = this.chapter_id;
              localStorage.setItem("comicReadHistory", JSON.stringify(this.comicReadHistory));
            }
          }
          this.isLoad = false;
          console.log(this.isLoad);
        }
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
        this.chapterId = this.chapterinfo.next_chapter.chapter_newid;
        this.moveProgress = 1;

        this.isbottom = false;
        this.isLoad = true;
      }
      else {
        this.isbottom = false;
        this.tipsshow = true;
      }
    },
    turnToPrev() {
      console.log(this.chapterinfo.prev_chapter);
      if (this.chapterinfo.prev_chapter != null) {
        this.chapterId = this.chapterinfo.prev_chapter.chapter_newid;
        this.istop = false;
        this.moveProgress = 1;

      }
      else {
        this.istop = false;
        this.tipsshow = true;
      }
    },
    // 上下滑动事件
    touchstart(event) {
      // event.preventDefault() //阻止默认事件（长按的时候出现复制）
      this.startX = event.changedTouches[0].pageX;
      this.startY = event.changedTouches[0].pageY;
      let boxtop = this.$refs.box.scrollTop;
      let scrollheight = this.$refs.box.scrollHeight;
      let clientheight = this.$refs.box.clientHeight;
      // 判断是否到顶
      if (boxtop == 0) {
        this.isclienttop = true;
      }
      else {
        this.isclienttop = false;
      }
      if (boxtop + clientheight + 1 >= scrollheight) {
        this.isclientbottom = true;
      }
      else {
        this.isclientbottom = false;
      }
    },
    touchmove(event) {
      // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      // event.preventDefault()
      let boxtop = this.$refs.box.scrollTop;
      let allheight = 0
      console.log(boxtop, this.$refs.img[1].offsetHeight, this.moveProgress);
      for (let i = 0; i < this.$refs.img.length; i++) {
        if (boxtop > allheight) {
          this.$refs.progress.value = i
          this.moveProgress = parseInt(this.$refs.progress.value);
          let leftsize = this.$refs.progress.value / this.chapterimg.length * 100
          this.$refs.progress.style.backgroundSize = leftsize + '% 100%';
          allheight += this.$refs.img[i].offsetHeight

        }

      }
      var moveEndX = event.changedTouches[0].pageX;
      var moveEndY = event.changedTouches[0].pageY;
      var X = moveEndX - this.startX;
      var Y = moveEndY - this.startY;
      // 判断是否为上下滑动
      if (Math.abs(Y) > Math.abs(X)) {
        if (this.isclienttop == true) {
          if (Y > 0) {
            this.istop = true;
          }
        }
        else {
          this.istop = false;
        }
        if (this.isclientbottom == true) {
          if (Y < 0) {
            this.isbottom = true;
          }
        }
        else {
          this.isbottom = false;
        }
      }
    },
    // 淡入淡出弹窗
    beforeEnterTips(el) {
      console.log("动画开始了", el);
      el.style.opacity = "0";
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
          el.style.opacity = "0";
        }
        else {
          done();
        }
      };
      el.style.transition = "all .7s linear";
      el.style.opacity = "1";
    },
    afterEnterTips(el) {
      console.log("动画结束中", el);
      el.style.transition = "all 0s linear";
      this.tipsshow = false;
      el.ontransitionend = null;
    },

    progressMove(e) {
      this.moveProgress = parseInt(this.$refs.progress.value);
      let top = 0;
      let leftsize = this.$refs.progress.value / this.chapterimg.length * 100
      this.$refs.progress.style.backgroundSize = leftsize + '% 100%';
      for (let i = 0; i < this.moveProgress - 1; i++) {
        let height = e.path[4].children[i].clientHeight;
        top = top + height;
      }
      e.path[4].scrollTo({
        top: top,
        behavior: "smooth",
      });
    },

    // 控件弹出动画
    beforeEnterControlpanel(el) {
      console.log("动画开始了", el);
      el.firstChild.style.top = -12.86 + "vw"
      el.lastChild.style.bottom = -32 + "vw"
    },
    enterControlpanel(el) {
      // 强制刷新页面,等vue渲染元素
      // 让浏览器获取当前元素的某些样式值,会让浏览器顺便刷新ui渲染
      el.firstChild.offsetHeight;
      el.lastChild.offsetHeight;
      el.firstChild.style.transition = "all .3s linear";
      el.firstChild.style.top = 0
      el.lastChild.style.transition = "all .3s linear";
      el.lastChild.style.bottom = 0

    },
    afterEnterControlpanel(el) {
      console.log("动画结束中", el);
    },
  },
  components: { SvgIcon }
};
</script>
<style lang="scss" scoped>
input[type="range"] {
  -webkit-appearance: none;
  width: calc(100vw / 375 * 242);
  height: calc(100vw / 375 * 3);
  outline: none;
  background: none;
  background: -webkit-linear-gradient(#FC6976, #FC6976) no-repeat, #999999;
  background-size: 0 100%;
}

input[type="range"]::-webkit-slider-thumb {

  -webkit-appearance: none;

  position: relative;

  width: 10px;

  height: 10px;

  background: #FC6976;

  border-radius: 50%;

  transition: .2s;

}

.comicbox {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;
  overflow: auto;
  z-index: 998;

  .loading {
    width: 100vw;
    height: 100vh;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    .imgbox {
      width: calc(100vw / 375 * 120);
      height: calc(100vw / 375 * 120);
      margin: calc(50vh - 100vw / 375 * 60) calc(50vw - 100vw / 375 * 60);
      background-image: url("../assets/mascot-dance.gif");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }

  .controlbox {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;

    .controltop {
      width: 100vw;
      height: calc(100vw/375*52);
      background-color: rgba(0, 0, 0, .7);
      color: white;
      display: flex;
      position: absolute;
      left: 0;
      top: calc(-100vw/375*52);

      .back {
        width: calc(100vw / 375 * 50);
        height: calc(100vw / 375 * 52);
        padding: calc(100vw / 375 * 14) calc(100vw / 375 * 13);
      }

      .chaptername {
        height: calc(100vw / 375 * 52);
        line-height: calc(100vw / 375 * 52);
        font-size: calc(100vw / 375 * 16);
        font-weight: 300;
      }
    }

    .controlbtm {
      width: 100%;
      height: calc(100vw/375*120);
      background-color: rgba(0, 0, 0, .7);
      color: white;
      padding: calc(100vw / 375 * 8) calc(100vw / 375 * 16) calc(100vw / 375 * 12);
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 0;
      bottom: calc(-100vw/375*120);

      .progressbarbox {
        width: 100%;
        height: calc(100vw / 375 * 25);
        line-height: calc(100vw / 375 * 25);
        text-align: center;
        display: flex;
        justify-content: space-between;

        div {
          width: calc(100vw / 375 * 36);
          margin-left: calc(100vw / 375 * 30);
          font-size: calc(100vw / 375 * 12);
          color: #fff;
        }

        input {
          width: calc(100vw / 375 * 258);
          margin: calc(100vw / 375 * 11) calc(100vw / 375 * 8);
        }

      }

      .btnbox {
        width: 100%;
        height: calc(100vw / 375 * 75);
        text-align: center;
        display: flex;

        div {
          width: 25%;
          height: calc(100vw / 375 * 52);
          margin: calc(100vw / 375 * 12) 0 calc(100vw / 375 * 11);
          display: flex;
          flex-direction: column;

          .svgicon {
            width: 100%;
            margin: 0 auto;
          }

          span {
            height: calc(100vw / 375 * 16);
            line-height: calc(100vw / 375 * 16);
            font-size: calc(100vw / 375 * 12);
            margin-top: calc(100vw / 375 * 4);

          }
        }
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
    z-index: 999;
  }
}
</style>