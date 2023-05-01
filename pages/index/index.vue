<template>
	<view>
		<!-- 头部搜索 -->
		<MySearch></MySearch>
		<!-- 轮播图 -->
		<swiper class="banner" autoplay circular indicator-dots>
			<swiper-item v-for="item in list" :key="item.goods_id">
				<image class="banner_img" :src="item.image_src" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 导航模块 -->
		<view class="nav">
			<navigator v-for="item in navList" :key="item.name" :url="item.navigator_url"
				:open-type="item.open_type || 'navigate'">
				<image class="nav_img" :src="item.image_src" mode="aspectFill"></image>
			</navigator>
		</view>

		<!-- 楼层模块 -->
		<view class="floor" v-for="(item, index) in floorList" :key="index">
			<view class="floor_title">
				<image :src="item.floor_title.image_src" mode="widthFix"></image>
			</view>
			<view class="floor_content">
				<navigator :url="item2.navigator_url" :open-type="item2.open_type" v-for="item2 in item.product_list"
					:key="item2.name">
					<image :src="item2.image_src" :style="{ width: `${item2.image_width}rpx` }"></image>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import MySearch from '@/components/MySearch/MySearch.vue'
export default {
	components: {
		MySearch
	},
	data() {
		return {
			list: [],
			navList: [],
			floorList: []
		}
	},
	async onLoad() {
		this.getBanner();
		this.getNav();
		this.getFloor()
	},
	// 下拉刷新 
	async onPullDownRefresh() {
		// console.log(1111);
		this.list = [],
			this.navList = [];
		this.floorList = []
		// 请求全部加载完毕之后 执行
		await Promise.all([
			this.getBanner(),
			this.getNav(),
			this.getFloor()
		])
		// 关闭下拉刷新
		uni.stopPullDownRefresh()
	},
	methods: {
		// 获取轮播图api
		async getBanner() {
			let [err, res] = await uni.request({
				method: 'get',
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
			})
			if (err) {
				console.log('有错误', err);
			} else {
				// console.log(res);
				this.list = res.data.message
				// console.log(this.list);
			}
		},
		async getNav() {
			let [err, res] = await uni.request({
				method: 'GET',
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
			})
			if (err) {
				console.log(err);
			} else {
				// console.log(res);
				this.navList = res.data.message
			}
		},
		// 楼层数据
		async getFloor() {
			let [err, res] = await uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
				method: 'GET'
			})
			if (err) {
				console.log(err);
			} else {
				// console.log(res);
				this.floorList = res.data.message
			}
		}
	}


}
</script>

<style lang="scss">
.banner {
	width: 750rpx;
	height: 340rpx;

	.banner_img {
		width: 750rpx;
		height: 340rpx;
	}
}

// 导航分区
.nav {
	padding-top: 12rpx;
	padding-bottom: 43rpx;

	display: flex;
	justify-content: space-evenly;

	.nav_img {
		width: 128rpx;
		height: 140rpx;
	}

}

// 楼层分区
.floor {
	.floor_title {
		image {
			width: 100%;
		}
	}

	.floor_content {
		image {
			float: left;
			height: 188rpx;
			margin-left: 13rpx;
			margin-bottom: 8rpx;
		}

		navigator:first-child image {
			height: 386rpx;
		}
	}
}
</style>
