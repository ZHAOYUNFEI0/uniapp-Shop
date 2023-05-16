<template>
    <view>
        <!-- 收货地址 -->
        <view class="address" @click="getUserAddress">
            <view class="address_info" v-if="address.userName">
                <view>{{ detailAddress }}</view>
                <view>{{ address.userName }} {{ address.telNumber }} </view>
            </view>
            <view class="address_btn" v-else>
                点击获取收货地址
            </view>
        </view>
        <!-- 商品信息 -->
        <view class="goods_list">
            <view class="cart_item" v-for="item in selectCartList" :key="item.goods_id">
                <view class="cart_count">
                    x{{ item.goods_count }}
                </view>

                <navigator hover-class="none" :url="`/pages/goods_detail/goods_detail?goods_id=${item.goods_id}`"
                    class="goods_item">

                    <!-- 商品图片 -->
                    <image class="goods_images" :src="item.goods_small_logo || doImage" mode="aspectFit" />
                    <view class="goods_info">
                        <view class="goods_title">{{ item.goods_name }}</view>
                        <view class="goods_price">{{ item.goods_price }}</view>
                    </view>
                </navigator>
            </view>
        </view>
        <!-- 底部按钮导航栏 -->
        <view class="bottom_bar">
            <view class="total">
                <text class="total_name">合计：</text>
                <text class="total_price">{{ selectCartListPrice }}</text>
            </view>
            <view @click="hPay" class="jiesuan">去支付({{ selectCarListCount }})</view>
        </view>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { usersWxLogin } from '@/api/users'
export default {
    name: 'pay',
    data() {
        return {
            address: {}
        };
    },

    mounted() {

    },

    methods: {
        async getUserAddress() {
            // 获取收货地址
            const [err, res] = await uni.chooseAddress()
            console.log(res);
            this.address = res
        },
        async hPay() {
            if (!this.address.userName) {
                uni.showToast({ title: '请选择收货地址', icon: 'none' })
                return
            }
            // 获取用户信息
            const [error, userInfores] = await uni.getUserInfo()
            console.log(error, userInfores);
            const { signature, iv, encryptedData, rawData } = userInfores

            // 获取登录验证码
            const [loginErr, loginRes] = await uni.login()

            const { code } = loginRes

            // 接口所需的5个请求参数
            const data = {
                signature, iv, encryptedData, rawData, code
            }
            const res = await usersWxLogin(data)
        }
    },
    computed: {
        detailAddress() {
            const { provinceName, cityName, countyName, detailInfo } = this.address
            return [provinceName, cityName, countyName, detailInfo].join(' ')
        },
        ...mapGetters([
            'selectCartList', 'selectCartListPrice', 'selectCarListCount'
        ])
    }
};
</script>

<style lang="scss" >
page {
    background-color: rgba(249, 249, 249);
}

.address {
    background-color: #fff;
    margin: 20rpx;
    padding: 20rpx;
    border-radius: 10rpx;
    display: flex;
    justify-content: center;

    .address_info {}

    .address_btn {
        width: 303rpx;
        height: 89rpx;
        border-radius: 98rpx;
        border: 1px solid #eb4450;
        color: #eb4450;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.goods_list {
    .cart_item {
        display: flex;
        align-items: center;
        padding-left: 20rpx;
        border-bottom: 1rpx solid #ddd;
        position: relative;

        .cart_count {
            position: absolute;
            // background-color: pink;
            bottom: 20rpx;
            right: 20rpx;
            padding: 20rpx;
        }

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
}

.bottom_bar {
    height: 80rpx;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1rpx solid #ddd;
    background-color: #fff;
    display: flex;
    padding: 0 20rpx;
    align-items: center;

    .total {
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        align-items: center;

        .total_name {
            font-size: 24rpx;

        }

        .total_price {
            color: #ea4350;

            &::before {
                content: '￥';
                font-size: 15rpx;
                color: #ea4350;
            }

        }
    }

    .jiesuan {
        background-color: #ea4350;
        color: #fff;
        font-size: 22rpx;
        width: 150rpx;
        height: 52rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 26rpx;
    }
}
</style>