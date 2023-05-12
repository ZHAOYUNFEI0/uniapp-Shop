<template>
	<view>
		<view class="goods_item">
			<view class="cart_item" v-for="item in cartList" :key="item.goods_id">
				<radio @click="isShow(item.goods_id)" :checked="item.goods_select" color="red" />
				<view class="cart_count">
					<u-number-box @change="changeCount" :name="item.goods_id" :value="item.goods_count"></u-number-box>
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
		<view class="bottom_bar">
			<view class="select">
				<radio @click="isShows" :checked="isShowAll" color="#eb4450" />
				<text class="check_text">全选</text>
			</view>
			<view class="total">
				<text class="total_name">合计：</text>
				<text class="total_price">{{ selectCartListPrice }}</text>
			</view>
			<view @click="jiesuan" class="jiesuan">去结算({{ selectCarListCount }})</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'cart',
	data() {
		return {

		};
	}
	,
	computed: {
		cartList() {
			return this.$store.state.cartList
		},
		// 全选
		// isShowAll() {
		// 	return this.$store.getters.isShowAll
		// },
		// // 总价
		// selectCartListPrice() {
		// 	return this.$store.getters.selectCartListPrice
		// },
		// // 总数
		// selectCarListCount() {
		// 	return this.$store.getters.selectCarListCount

		// }
		...mapGetters([
			'isShowAll',
			'selectCartListPrice',
			'selectCarListCount',
		])
	},
	methods: {
		isShow(id) {
			const newList = [...this.cartList]
			const index = newList.findIndex(item => item.goods_id === id)

			newList[index].goods_select = !newList[index].goods_select

			this.$store.commit('setCartList', newList)
		},
		changeCount(val) {
			// console.log(val);
			const newList = [...this.cartList]
			const index = newList.findIndex(item => item.goods_id === val.name)
			newList[index].goods_count = val.value
			this.$store.commit('setCartList', newList)
		},
		isShows() {
			const newList = [...this.cartList]
			const is = !this.isShowAll
			newList.forEach(item => {
				item.goods_select = is
			})

			// console.log(newList);
			this.$store.state.cartList = newList
		},
		jiesuan() {
			if (this.selectCarListCount === 0) {
				uni.showToast({
					title: '请选择结算商品',
					icon: 'none'
				})
				return
			}
			uni.navigateTo({ url: '/pages/pay/pay' })
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

	.select {

		.select_text {

			font-size: 22rpx;
			margin: 0 20rpx;
			color: #999;
		}

	}

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