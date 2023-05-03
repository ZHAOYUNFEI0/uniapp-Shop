<template>
    <view>
        商品列表
    </view>
</template>

<script>
import { getGoodSearchList } from '@/api/goods'
export default {
    name: 'goods_list',
    data() {
        return {
            queryParams: {}
        };
    },
    onLoad(query) {
        // console.log(query);
        this.queryParams = query
        // console.log(this.queryParams);
        this.getGoodsList()
    },
    methods: {
        async getGoodsList() {
            // 发送请求
            const res = await getGoodSearchList(this.queryParams)
            console.log(res);
        }
    },
};
</script>

<style scoped></style>