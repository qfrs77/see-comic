<template>
  <div class="resultbox">
    <div class="searchipt">
        <div class="back" @click="back">返回</div>
        <input type="text"  placeholder="搜索漫画名or关键字" v-model="newkeyword"/>
        <span @click="changeSearchResult(newkeyword)">搜索</span>
    </div>
    <div class="resultlist">
        <div class="cartoonbox" v-for="i in resultList" :key="i.comic_id" @click="turnToComicDetails(i.comic_id,i.comic_name)">
            <div class="imgbox"><img :src="'https://image.yqmh.com/mh/' + i.comic_id + '.jpg'" /></div>
            <div class="cartoon-info">
                <div class="name">{{ i.comic_name }}</div>
                <div class="author">{{ i.comic_author }}</div>
                <div class="type">
                  <div v-for="j in i.comic_type.split('|')" :key="i+j">{{j.replace(/[^\u4e00-\u9f5a]/g,'')}}</div>
                  <!-- {{ i.comic_type }} -->
                  </div>
                <div class="chapter">{{ "更新至  " + i.last_chapter_name }}</div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      newkeyword:'',
      resultList:[]
    };
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.comicSearchHistory = JSON.parse(localStorage.getItem("comicSearchHistory")) || [];
  },
  computed: {
    resulturl() {
      return `https://www.kanman.com/api/getsortlist?search_key=${this.keyword}`;
    },
  },
  watch: {
    resulturl() {
      this.getcartoonResultList();
    },
  },
  methods: {
    back() {
        this.$router.go(-1);
    },
    getcartoonResultList() {
      this.$axios.get(this.resulturl).then(({ data }) => {
        console.log(data);
        this.resultList=data.data
      });
    },
    changeSearchResult(newkeyword) {
      if (newkeyword.length == 0) {
        return;
      }
      this.comicSearchHistory = this.comicSearchHistory.filter(e => {
                return e.keyword != newkeyword;
            });
            this.comicSearchHistory.unshift({
                keyword: newkeyword
            });
            localStorage.setItem("comicSearchHistory", JSON.stringify(this.comicSearchHistory));
        this.keyword = newkeyword
    },
    turnToComicDetails(id,name) {
        this.$router.push({
            path:'comicdetails',
            query: {
                id: id,
                name: name,
            }
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.resultbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: auto;
    z-index: 999;
    .searchipt {
    width: 100%;
    height: calc(100vw / 375 * 45);
    text-align: center;
    box-shadow: 0 calc(100vw / 375 * -4) calc(100vw / 375 * 12) #fc6976;
    background-color: white;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;

    .back {
        width: calc(100vw / 375 * 55);
        height: calc(100vw / 375 * 45);
        line-height: calc(100vw / 375 * 45);
    }
    input {
        width: calc(100vw / 375 * 265);
        height: calc(100vw / 375 * 35);
        margin-top: calc(100vw / 375 * 5);
        padding: 0 calc(100vw / 375 * 6);
        box-sizing: border-box;
        outline: none;
        border: calc(100vw / 375 * 1) solid #fc6976;
        border-radius: calc(100vw / 375 * 8);
    }
    span {
        width: calc(100vw / 375 * 55);
        height: calc(100vw / 375 * 45);
        line-height: calc(100vw / 375 * 45);
    }
}
}
.resultlist {
    width: 100%;
    margin-top: calc(100vw / 375 * 60);
    .cartoonbox{
        width: 100%;
        height: calc(100vw / 375 * 135);
        padding: 0 calc(100vw / 375 * 20);
        margin-bottom: calc(100vw / 375 * 20);
        display: flex;
        .imgbox{
            width: calc(100vw / 375 * 105);
            height: calc(100vw / 375 * 135);

            img {
                width: 100%;
                height: 100%;
            }
        }
        .cartoon-info {
            width: calc(100vw - 100vw / 375 * 105);
            padding-left: calc(100vw / 375 * 7);
            display: flex;
            flex-direction: column;
            div {
              height: calc(100vw / 375 * 22);
              line-height: calc(100vw / 375 * 22);
            }
            .name {
              font-size: calc(100vw / 375 * 18);
              margin-bottom: calc(100vw / 375 * 27);
              color: #333;
            }
            .author {
              font-size: calc(100vw / 375 * 13);
              margin-bottom: calc(100vw / 375 * 10);
              color: #999;
            }
            .type {
              font-size: calc(100vw / 375 * 13);
              margin-bottom: calc(100vw / 375 * 10);
              color: #999;
              display: flex;
              div {
                margin-left: calc(100vw / 375 * 2);
              }
            }
            .chapter {
              font-size: calc(100vw / 375 * 13);
              color: #999;
            }
        }
    }
}
</style>