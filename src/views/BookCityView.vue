<template>
  <div class="city">
    <div class="search">
      <input type="text" placeholder="搜索漫画名or关键字" @click="turnToSearch" />
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
      ]

    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
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
.search {
  input {
    width: calc(100vw - 100vw / 375 * 30);
    height: calc(100vw / 375 * 34);
    margin: calc(100vw / 375 * 15) calc(100vw / 375 * 15);
    padding: 0 calc(100vw / 375 * 6);
    box-sizing: border-box;
    outline: none;
    border: calc(100vw / 375 * 1) solid #fc6976;
    border-radius: calc(100vw / 375 * 8);
  }
}

.citycontent {
  .title {
    width: calc(100vw - 100vw / 375 * 30);
    margin: calc(100vw / 375 * 6) auto 0;
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