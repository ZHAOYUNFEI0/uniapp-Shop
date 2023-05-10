<template>
    <view class="goods_buttom_bar">
        <!-- 顶部安全区 -->
        <u-status-bar></u-status-bar>
        <!-- 返回按钮 -->
        <navigator class="navigator_back" open-type="navigateBack">
            <u-icon name="arrow-left" color="#fff" size="28rpx"></u-icon>
        </navigator>
        <!-- 轮播图 -->
        <swiper class="goods_swiper" indicator-dots circular>
            <swiper-item v-for="item in goodsInfo.pics" :key="item.pics_id">
                <image @click="hShowImage(item.pics_big_url)" class="goods_weiper_image" :src="item.pics_big_url"
                    mode="scaleToFill" />
            </swiper-item>
        </swiper>
        <!-- 文字信息 -->
        <view class="goods_info">
            <view class="goods_info_title">
                <view class="goods_info_price">{{ goodsInfo.goods_price }}</view>
                <view class="incon_group">
                    <u-icon name="share-square" color="#2979ff" size="40rpx"></u-icon>
                    <button open-type="share"></button>
                </view>
                <view class="incon_group">
                    <u-icon name="star" color="#2979ff" size="40rpx"></u-icon>
                </view>

            </view>
            <view class="goods_info_name">
                {{ goodsInfo.goods_name }}
            </view>
        </view>
        <!-- 间隔槽组件 -->
        <u-gap height="20rpx" bgColor="#f9f9f9"></u-gap>
        <!-- 图文信息 -->
        <view class="goods_introduce">
            <view class="goods_introduce_title">图文详情</view>
            <rich-text class="goods_introduce_content" :nodes="goodsInfo.goods_introduce"></rich-text>
        </view>
        <!-- 底部操作栏 -->
        <view class="buttom_bar">
            <view class="icon_group">
                <u-icon name="server-fill" color="#434343" size="34rpx"></u-icon>
                <view>联系客服</view>
                <button open-type="contact">按钮</button>
            </view>
            <view class="icon_group">
                <u-icon name="shopping-cart" color="#434343" size="34rpx"></u-icon>
                <view>购物车</view>
            </view>
            <view class="btn">加入购物车</view>
            <view class="btn">立即购买</view>
        </view>
    </view>
</template>

<script>
import { getGoodsDetailById } from '@/api/goods'
export default {
    name: 'goods_detail',
    data() {
        return {
            goods_id: '',
            goodsInfo: {}
        };
    },
    onLoad(query) {
        // console.log(query);
        this.goods_id = query.goods_id
        this.getGoodsDetail()
    },
    methods: {
        async getGoodsDetail() {
            const res = await getGoodsDetailById(this.goods_id)
            // console.log(res);
            this.goodsInfo = res.data.message
            this.goodsInfo.goods_introduce = this.goodsInfo.goods_introduce.replace(/<img/g, '<img class="img"')
        },
        hShowImage(current) {
            // console.log(current);
            const urls = this.goodsInfo.pics.map(item => item.pics_big_url)
            // console.log(urls);
            uni.previewImage({
                current,
                urls
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.navigator_back {
    width: 60rpx;
    height: 60rpx;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 30rpx;
    top: 90rpx;
    z-index: 99;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.goods_swiper {
    width: 750rpx;
    height: 750rpx;

    .goods_weiper_image {
        width: 750rpx;
        height: 750rpx;
    }
}

.goods_info {

    .goods_info_title {
        display: flex;
        padding-bottom: 20rpx;

        .goods_info_price {
            color: #eb4450;
            flex: 1;

            &::before {
                content: '￥';
                font-size: 80%;
                margin-right: 5rpx;
            }
        }

        .incon_group {
            width: 44rpx;
            height: 44rpx;
            // background-color: pink;
            position: relative;
            margin-left: 10rpx;

            button {
                position: absolute;
                width: 44rpx;
                height: 44rpx;
                left: 0;
                top: 0;
                opacity: 0;
            }
        }
    }

    // 商品文字
    .goods_info_name {
        font-size: 30rpx;
        line-height: 1.5;
    }
}

.goods_introduce {
    .goods_introduce_title {
        display: flex;
        font-size: 28rpx;
        height: 100rpx;
        justify-content: center;
        align-items: center;
    }

    .goods_introduce_content {
        .img {
            vertical-align: middle;
        }

    }
}

.buttom_bar {
    display: flex;
    align-items: center;
    height: 94rpx;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    .icon_group {
        flex: 1;

        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 22rpx;
        position: relative;

        button {
            position: absolute;
            left: 0;
            // bottom: 0;
            top: 0;
            height: 94rpx;
            opacity: 0;
        }
    }

    .btn {
        width: 196rpx;
        height: 60rpx;
        background-color: #fcaa23;
        border-radius: 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10rpx;
        font-size: 26rpx;
        color: #fff;
    }
}

.goods_buttom_bar {
    padding-bottom: 120rpx;
}
</style>