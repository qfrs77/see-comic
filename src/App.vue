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
  created() {},
};
</script>

<style lang="scss">
#app {
  
}

.tabbar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-around;
  z-index: 100;
  background-color: #f3f4f6;
  border-top: 1px solid #ccc;
}
</style>
