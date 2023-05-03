<template>
    <view>
        <MySearch></MySearch>
        <u-tabs :list="list1" lineColor="#EB4450" :scrollable="false"></u-tabs>
        <view class="goods_list">
            <view class="goods_item" v-for="item in goodsList" :key="item.goods_id">
                <image class="goods_images" :src="item.goods_big_logo || doImage" mode="aspectFit" />
                <view class="goods_info">
                    <view class="goods_title">{{ item.goods_name }}</view>
                    <view class="goods_price">{{ item.goods_price }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getGoodSearchList } from '@/api/goods'
export default {
    name: "goods_list",
    data() {
        return {
            doImage: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp443184895.jpg&refer=http%3A%2F%2Fimg9.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685701028&t=141a28d68a3723b3452880e4b3c711a4',
            queryParams: {},
            goodsList: [],
            list1: [{ name: '综合' }, { name: '销量' }, { name: '价格' }]
        };
    },
    onLoad(query) {
        // console.log(query);
        this.queryParams = {
            query: query.query,
            cid: query.cid,
            pagenum: 1,
            pagesize: 20
        }
        // console.log(this.queryParams);
        this.getGoodsList();
    },
    onReachBottom() {
        this.queryParams.pagenum++,
            this.getGoodsList()
    },
    methods: {
        async getGoodsList() {
            // 发送请求
            const res = await getGoodSearchList(this.queryParams);

            this.goodsList.push(...res.data.message.goods)
            // console.log(this.goodsList);
        }
    }
};
</script>

<style lang="scss" scoped>
.goods_list {
    .goods_item {
        display: flex;
        border-bottom: 1rpx solid #ddd;
        padding: 25rpx;

        image {
            width: 190rpx;
            height: 190rpx;
        }

        .goods_info {
            flex: 1;
            font-size: 24rpx;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            padding: 20rpx;

            .goods_title {
                // 多行超出隐藏
                overflow: hidden;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }

            .goods_price {
                color: #eb4450;

                &::before {
                    content: '￥';
                    margin-right: 5rpx;
                }
            }
        }
    }
}
</style>