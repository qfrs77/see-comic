<template>
  <div id="app">
    <div class="tabbar">
      <router-link tag="div" to="/shelf">
        <span>书架</span>
      </router-link>
      <router-link tag="div" to="/city">
        <span>书城</span>
      </router-link>
      <router-link tag="div" to="/rank">
        <span>排行</span>
      </router-link>
      <router-link tag="div" to="/update">
        <span>更新</span>
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  date() {
    return {
      nowactive: "city"
    }
  },
  created() {
    this.getAllDate()
    if(window.location.pathname=='/'){
      console.log(localStorage.getItem("mineComic"));
      if(localStorage.getItem("mineComic") == null) {
        this.$router.push({
        path:'city'
      })
      } else {
        this.$router.push({
        path:'shelf'
      })
      }
      
    }
  },
  methods: {
    getAllDate() {
      if (localStorage.getItem("allComic") === null) {
        this.$axios
          .get("https://www.kanman.com/api/getComicList")
          .then(({ data }) => {
            let allComic = data.data;

            localStorage.setItem("allComic", JSON.stringify(allComic));
          });
      } else {
        return;
      }
    },
  }
};
</script>

<style lang="scss">
#app {
  
}

.tabbar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: calc(100vw / 375 * 55);
  line-height: calc(100vw / 375 * 55);
  text-align: center;
  background-color: #f3f4f6;
  border-top: calc(100vw / 375 * 1) solid #ccc;
  display: flex;
  justify-content: space-around;
  z-index: 100;
  .router-link-exact-active {
        color: #fc6976;
      }
}
</style>
