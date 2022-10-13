<template>
  <div class="resultbox">
    <div class="searchipt">
        <div class="back" @click="back">返回</div>
        <input type="text" v-model="newkeyword"/>
        <span @click="changeSearchResult">搜索</span>
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
    console.log(this.keyword);
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
    changeSearchResult() {
        this.keyword = this.newkeyword
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
    height: 46px;
    text-align: center;
    display: flex;
    .back {
        width: 46px;
        height: 46px;
        line-height: 46px;
    }
    input {
        width: calc(100% - 52px * 2);
        height: 34px;
        margin-top: 6px;
        padding: 0 6px;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #fc6976;
        border-radius: 8px;
    }
    span {
        width: 46px;
        height: 46px;
        line-height: 46px;
    }
}
}
.resultlist {
    width: 100%;
    .cartoonbox{
        width: 100%;
        height: 150px;
        padding: 0 20px;
        margin-bottom: 20px;
        display: flex;
        .imgbox{
            width: 100px;
            height: 135px;

            img {
                width: 100%;
                height: 100%;
            }
        }
        .cartoon-info {
            width: calc(100% - 110px);
            display: flex;
            flex-direction: column;
        }
    }
}
</style>