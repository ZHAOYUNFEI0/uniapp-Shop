<template>
	<view>
		<!-- 搜索框 -->
		<MySearch></MySearch>

		<!-- 滚动容器 -->
		<view class="div">
			<scroll-view class="div_left" scroll-y>
				<view class="div_left_view" :class="{ active: indexOf === index }" @click="btn(index)"
					v-for="(item, index) in leftList" :key="item.cat_id">{{ item.cat_name }}
				</view>
			</scroll-view>
			<scroll-view class="div_right" scroll-y :scroll-into-view="'id' + indexOf">
				<view :id="'id' + indexOf"></view>
				<view class="group" v-for="item in rightList" :key="item.cat_id">
					<view class="group_title">{{ item.cat_name }}</view>
					<view class="group_list">
						<navigator v-for="item2 in item.children" :key="item2.cat_id" url="">
							<image :src="item2.cat_icon" lazy-load mode="aspectFit" />
							<text>{{ item2.cat_name }}</text>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
import MySearch from '../../components/MySearch/MySearch.vue';

export default {
	data() {
		return {
			indexOf: 0,
			getcateList: []
		};
	},
	onLoad() {
		this.getList()
	},
	methods: {
		btn(index) {
			this.indexOf = index
		},
		// 获取列表数据
		async getList() {
			const [err, res] = await uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
				method: 'GET'
			})
			// console.log(res.data.message);
			if (!err) {
				this.getcateList = res.data.message
				// console.log(this.getcateList);	
			}
			console.log(this.rightList);
		}
	},
	computed: {
		leftList() {
			return this.getcateList.map(item => {
				return { cat_name: item.cat_name, cat_id: item.cat_id }
			})
		},
		rightList() {
			return this.getcateList[this.indexOf].children
		}
	},
	components: { MySearch }
}
</script>

<style lang="scss">
.div {
	display: flex;

	.div_left {
		background-color: #F3F3F3;
		width: 182rpx;
		height: calc(100vh - 88rpx);

		.div_left_view {
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.active {
			color: #EA4350;
			font-size: 28rpx;

			background-color: #fff;

			&::before {
				content: '';
				width: 4rpx;
				height: 44rpx;
				background-color: #EA4350;
				position: absolute;
				left: 0;
			}
		}
	}

	.div_right {
		flex: 1;
		// background-color: blue;
		height: calc(100vh - 88rpx);

		.group {
			.group_title {
				text-align: center;
				font-size: 26rpx;
				margin: 20rpx 0;

				&::before,
				&::after {
					content: '/';
					margin: 0 5px;
					color: #9C9C9C;
				}
			}

			.group_list {
				display: flex;
				flex-wrap: wrap;

				navigator {
					width: 33.33%;
					display: flex;
					justify-content: center; // 弹性盒子中 让内容 水平居中
					align-items: center; // 弹性盒子中 垂直居中 顶部居中 底部居中
					flex-direction: column; // 让弹性盒子中的 两个盒子 垂直或者水平
					padding: 20rpx 0;
				}

				image {
					height: 120rpx;
					width: 120rpx;
					// display: block;
				}

				text {
					font-size: 21rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
}
</style>
