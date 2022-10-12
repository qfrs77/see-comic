<template>
  <div class="city">
    <div class="search">
      <input type="text" 
      @click="turnToSearch"/>
    </div>
    <div class="citycontent">
      <div class="title">
        <span>热门推荐</span>
        <span @click="turnToIndexCartoon">全部</span>
      </div>
      <div class="books"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  computed: {

  },
  watch: {

  },
  methods: {
    turnToIndexCartoon() {
        this.$router.push({
            path:"/allbooks"
        })
    },
    turnToSearch() {
      this.$router.push({
        path:"/search",
      })
    }
  },
};
</script>

<style lang="sass" scoped>
</style>