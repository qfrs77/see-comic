<template>
<div>
    <div class="top">
    <div @click="back">返回</div>
    </div>
    <div class="allbooks">
    <div class="typelist">
        <div v-for="i in typelist" :key="i">

        </div>
</div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            typelist: {}
        };
    },
    
    methods: {
        back() {
            this.$router.go(-1);
        },
    }
}
</script>