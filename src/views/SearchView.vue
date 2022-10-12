<template>
    <div class="searchbox">
        <SearchCommponents />
        <div>
            <div>热门搜索</div>
            <div></div>
        </div>
    </div>
</template>
<script>
import SearchCommponents from "@/components/SearchCommponents.vue";
export default {
    setup() {
        
    },
    components: {
    SearchCommponents,
    }
}
</script>
<style lang="scss" scoped>
.searchbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: auto;
    z-index: 999;
}
</style>