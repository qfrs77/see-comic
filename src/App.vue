<template>
  <div id="app">
    <div class="tabbar">
      <router-link tag="div" to="/shelf">
        <i class="shelf"></i>
        <span>书架</span>
      </router-link>
      <router-link tag="div" to="/city">
        <i class="city"></i>
        <span>书城</span>
      </router-link>
      <router-link tag="div" to="/rank">
        <i class="rank"></i>
        <span>排行</span>
      </router-link>
      <router-link tag="div" to="/update">
        <i class="updata"></i>
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
    if (window.location.pathname == '/') {
      console.log(localStorage.getItem("mineComic"));
      if (localStorage.getItem("mineComic") == null) {
        this.$router.push({
          path: 'city'
        })
      } else {
        this.$router.push({
          path: 'shelf'
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
#app {}

.tabbar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: calc(100vw / 375 * 55);
  // line-height: calc(100vw / 375 * 55);
  text-align: center;
  background-color: #f3f4f6;
  box-shadow: 0 -1px 10px #F5C1C5;
  display: flex;
  justify-content: space-around;
  z-index: 100;

  .router-link-exact-active {
    color: #fc6976;
    .shelf {
    display: block;
    background: url('./assets/sprite.tabs.png') no-repeat calc(-222px / 15 * 8) calc(-72px / 2);
    width: calc(100vw / 375 * 32);
    height: calc(100vw / 375 * 32);
    background-size: calc(284px / 15 * 8) calc(212px / 2) ;
    margin-top: 4px;
  }
  .city{
    display: block;
    background: url('./assets/sprite.tabs.png') no-repeat calc(-6px / 13 * 8) calc(-154px/ 13 * 8) ;
    width: calc(100vw / 375 * 32);
    height: calc(100vw / 375 * 32);
    background-size: calc(284px / 13 * 8) calc(212px / 13 * 8);
    margin-top: calc(100vw / 375 * 4);
  }
  .rank {
    display: block;
    background: url('./assets/sprite.tabs.png') no-repeat calc(-148px  / 2) calc(0);
    width: calc(100vw / 375 * 32);
    height: calc(100vw / 375 * 32);
    background-size: calc(284px / 2) calc(212px / 2);
   margin-top: calc(100vw / 375 * 4);
  }
 .updata{
  display: block;
    background: url('./assets/sprite.tabs.png') no-repeat calc(-148px  / 7 * 4) calc(-150px / 31 * 16);
    width: calc(100vw / 375 * 32);
    height: calc(100vw / 375 * 32);
    background-size: calc(284px / 7 * 4) calc(212px / 31 * 16);
    margin-top: calc(100vw / 375 * 4);
 }
  }

  .shelf {
    display: block;
    background: url('./assets/sprite.tabs.png') no-repeat calc(-228px /3 * 2) calc(-150px / 13 * 8);
    width: calc(100vw / 375 * 32);
    height: calc(100vw / 375 * 32);
    background-size: calc(284px / 3 *2) calc(212px / 13 * 8);
    margin-top: calc(100vw / 375 * 4);
  }

  .city{
    display: block;
    background: url('./assets/sprite.tabs.png') no-repeat calc(-78px / 13 * 8) calc(-154px/ 13 * 8) ;
    width: calc(100vw / 375 * 32);
    height: calc(100vw / 375 * 32);
    background-size: calc(284px / 13 * 8) calc(212px / 13 * 8);
    margin-top: calc(100vw / 375 * 4);
  }
  .rank {
    display: block;
    background: url('./assets/sprite.tabs.png') no-repeat calc(-154px  / 13 * 8) calc(-78px / 13 * 8);
    width: calc(100vw / 375 * 32);
    height: calc(100vw / 375 * 32);
    background-size: calc(284px / 13 * 8) calc(212px / 13 * 8);
    margin-top: calc(100vw / 375 * 4);
  }
 .updata{
  display: block;
    background: url('./assets/sprite.tabs.png') no-repeat calc(-230px  / 11* 8) calc(-8px / 25 * 16);
    width: calc(100vw / 375 * 32);
    height: calc(100vw / 375 * 32);
    background-size: calc(284px / 11 * 8) calc(212px / 25 * 16);
    margin-top: calc(100vw / 375 * 4);
 }
  span {
    display: inline-block;
    height: calc(100vw / 375 * 15);
    line-height: calc(100vw / 375 * 15);
    font-size: calc(100vw / 375 * 13);
  }
}
</style>
