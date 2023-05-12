<template>
	<view>
		<view class="goods_item">
			<view class="cart_item" v-for="item in cartList" :key="item.goods_id">
				<radio :checked="item.goods_select" color="red" />
				<view class="cart_count">
					<u-number-box :value="item.goods_count"></u-number-box>
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
	</view>
</template>

<script>
export default {
	name: 'cart',
	data() {
		return {

		};
	},
	methods: {

	},
	computed: {
		cartList() {
			return this.$store.state.cartList
		}
	}
};
</script>

<style lang="scss">
.cart_item {
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	border-bottom: 1rpx solid #ddd;
	position: relative;

	.cart_count {
		position: absolute;
		background-color: pink;
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
</style>