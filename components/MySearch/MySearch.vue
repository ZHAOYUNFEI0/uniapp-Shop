<template>
	<view class="my">
		<u-search shape="square" :showAction="false" placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
	</view>
</template>

<script>
	export default {
		name:"MySearch",
		data() {
			return {
				keyword: ''
			};
		}
	}
</script>

<style>
.my{
	padding: 10rpx 25rpx;
	background-color: #eb4450;
}
</style>