<template>
  <div class="city">
    <div class="nav">
      <div class="searchbox" @click="turnToSearch"><img src="../assets/search.png" alt=""></div>
      <ul @transitionend="transitionEndHandel" ref="ul"
        v-bind:style="{left: `${-100 * index}vw`, transition: needTransition? 'all 0.5s linear' : 'none'}"
        @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <li><img src="../assets/nav5.webp"></li>
        <li><img src="../assets/nav1.webp"></li>
        <li><img src="../assets/nav2.webp"></li>
        <li><img src="../assets/nav3.webp"></li>
        <li><img src="../assets/nav4.webp"></li>
        <li><img src="../assets/nav5.webp"></li>
        <li><img src="../assets/nav1.webp"></li>
      </ul>
      <div class="nekomimi"></div>
      <ol class="slide-spot">
        <li :class="{active : index==1}"></li>
        <li :class="{active : index==2}"></li>
        <li :class="{active : index==3}"></li>
        <li :class="{active : index==4}"></li>
        <li :class="{active : index==5}"></li>
      </ol>
    </div>
    <div class="citycontent">
      <div class="title">
        <span>热门推荐</span>
        <span class="fr" @click="turnToIndexCartoon">全部>></span>
      </div>
      <ComicListComponents :comicListDate="recommendComic" />
    </div>
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
      recommendComic: [
        { comic_id: "10102", comic_name: "傲世九重天" },
        { comic_id: "106518", comic_name: "逆天邪神" },
        { comic_id: "5754", comic_name: "穿越西元3000后" },
        { comic_id: "27417", comic_name: "妖神记" },
        { comic_id: "17745", comic_name: "凤逆天下" }
      ],
      navtime: null,
      index: 1,
      needTransition: true,
      turnleft: false,
      turnright: false,
    };
  },
  created() {
    this.settime()
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearInterval(this.navtime)
      } else {
        this.settime()
      }
    })
  },
  mounted() {
  },
  computed: {

  },
  watch: {

  },
  methods: {
    settime() {
      this.navtime = window.setInterval(() => {
        this.needTransition = true
        this.index++
      }, 2000);
    },

    touchstart(event) {
      event.preventDefault() //阻止默认事件（长按的时候出现复制）
      clearInterval(this.navtime)
      this.navtime = null;
      this.startX = event.changedTouches[0].pageX
      this.startY = event.changedTouches[0].pageY
      this.ulX = this.$refs.ul.style.left
    },
    touchmove(event) {
      // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      // event.preventDefault()
      var moveEndX = event.changedTouches[0].pageX
      var moveEndY = event.changedTouches[0].pageY
      var X = moveEndX - this.startX
      var Y = moveEndY - this.startY

      // 判断是否为左右滑动
      if (Math.abs(X) > Math.abs(Y)) {
        if (X > 0) {
          this.$refs.ul.style.left = `${-100 * this.index + X / 10}vw`
          if (X > 50) {
            this.turnleft = true
          }
        }
        if (X < 0) {
          this.$refs.ul.style.left = `${-100 * this.index + X / 10}vw`
        }
        if (X < -50) {
          this.turnright = true
        }
      }
    },
    touchend() {
      this.needTransition = true
      if (this.turnleft == true) {
        this.index--
        this.$refs.ul.style.left = `${-100 * this.index}vw`
        this.turnleft = false
      } else {
        this.$refs.ul.style.left = `${-100 * this.index}vw`
      }
      if (this.turnright == true) {
        this.index++
        this.$refs.ul.style.left = `${-100 * this.index}vw`
        this.turnright = false
      } else {
        this.$refs.ul.style.left = `${-100 * this.index}vw`
      }
      this.settime()
    },
    transitionEndHandel() {
      if (this.index === 6) {
        this.needTransition = false
        this.index = 1
      }
      if (this.index === 0) {
        this.needTransition = false
        this.index = 5
      }
    },
    turnToIndexCartoon() {
      this.$router.push({
        path: "/allbooks"
      })
    },
    turnToSearch() {
      this.$router.push({
        path: "/search",
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100vw;
  height: calc(100vw / 375 *250);
  position: relative;
  overflow: hidden;

  .searchbox {
    width: calc(100vw / 375 * 32);
    height: calc(100vw / 375 * 32);
    padding: calc(100vw / 375 * 5);
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: calc(100vw / 375 * 12);
    right: calc(100vw / 375 * 12);
    z-index: 10;

    img {
      width: calc(100vw / 375 * 22);
      height: calc(100vw / 375 * 22);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }

  .nekomimi {
    width: 100vw;
    height: calc(100vw / 375 * 38);
    background-image: url("../assets/icon_cat_ear.png");
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9;
  }

  .slide-spot {
    width: 100%;
    height: calc(100vw / 375 * 6);
    text-align: center;
    position: absolute;
    left: 0;
    bottom: calc(100vw / 375 * 10);
    z-index: 10;

    li {
      display: inline-block;
      width: calc(100vw / 375 * 6);
      height: calc(100vw / 375 * 6);
      margin: 0 calc(100vw / 375 * 4);
      border-radius: 50%;
      background-color: #999;
    }

    .active {
      background-color: #fc6976;

    }
  }
}

.nav ul {
  width: 1000%;
  height: 100%;
  list-style: none;
  overflow: hidden;
  position: absolute;
  top: 0;
  // left: 0;
}

.nav ul li {
  float: left;
  width: 10%;
  height: 100%;
}

.nav ul li img {
  display: block;
  width: 100%;
  height: 100%;
}



.citycontent {
  .title {
    width: calc(100vw - 100vw / 375 * 30);
    margin: calc(100vw / 375 * 40) auto 0;

    span:nth-of-type(1) {
      height: calc(100vw / 375 * 20);
      line-height: calc(100vw / 375 * 20);
      font-size: calc(100vw / 375 * 18);

    }

    span:nth-of-type(2) {
      height: calc(100vw / 375 * 20);
      line-height: calc(100vw / 375 * 20);
      font-size: calc(100vw / 375 * 13);
    }

    span:nth-of-type(2):hover {
      color: #fc6976;
    }
  }

}
</style>