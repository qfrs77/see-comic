<template>
    <div class="update">
        <div class="time">
            <ul>
                <li v-for="(i) in updateList" :key="i.comicUpdateDate_week" @click="changeTime(i.comicUpdateDate_week)"
                    :ref="i.comicUpdateDate_week" :class="{active : i.comicUpdateDate_week == time}">
                    {{ i.comicUpdateDate_new }}
                </li>
            </ul>
        </div>
        <div class="fill"></div>
        <ComicListComponents :comicListDate="nowList" />
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
            updateURL: `https://www.kanman.com/api/updatelist?page=1&pageSize=$12`,
            updateList: [],
            nowList: [],
            time: new Date().getDay()
        };
    },
    created() {
        this.getUpdate()
        console.log(this.time);
    },
    computed: {
        nowtime() {
            return this.time
        }
    },
    watch: {
        nowtime() {
            this.changelist()
        }
    },
    methods: {
        getUpdate() {
            this.$axios.get(this.updateURL).then(({ data }) => {
                console.log(data.data.update);
                this.updateList = data.data.update
                this.changelist()
            })
        },
        /* // 获取当前年月日
        getNowtime() {
            this.time = new Date();
            this.fullYear = this.time.getFullYear();
            this.month = this.time.getMonth() + 1;
            this.date = this.time.getDate();
            this.time = this.fullYear + "-" + this.month + "-" + this.date;
            this.getTimelist()
        }, */

        changeTime(time) {
            this.time = time
        },
        changelist() {
            let arr = this.updateList.filter((e) => {
                return e.comicUpdateDate_week == this.time;
            });
            this.nowList = arr[0].info
        },
        turnToComicDetails(id, name) {
            this.$router.push({
                path: 'comicdetails',
                query: {
                    id: id,
                    name: name,
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.update {
    width: 100%;

    .time {
        width: 100%;
        height: calc(100vw / 375 * 44);
        position: fixed;
        top: 0;
        left: 0;
        background-color: #FC6976;
        color: white;

        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;

            li {
                width: calc(100vw / 375 * 40);
                height: calc(100vw / 375 * 22);
                line-height: calc(100vw / 375 * 22);
                font-size: calc(100vw / 375 * 13);
                margin: calc(100vw / 375 * 11) 0;
                text-align: center;
                border-radius: calc(100vw / 375 * 16);

            }

            .active {
                background-color: white;
                color: #FC6976;
            }
        }
    }

    .fill {
        width: 100vw;
        height: calc(100vw / 375 * 44);

    }
}
</style>