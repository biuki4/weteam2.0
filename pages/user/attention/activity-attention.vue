<template>
	<view class="page">
		<hx-navbar title="收藏的活动" color="#ffffff" background-color-linear-deg="45" />
		<van-tabs animated sticky>
			<van-tab title="正在报名">
				<view class="game-list" v-if="datas.curActivity.length!=0">
					<k-activity-item :activity="datas.curActivity" @click="goActivityDetail"></k-activity-item>
				</view>
				<view v-else>
					<k-empty tips="没有收藏的活动~"></k-empty>
				</view>
			</van-tab>
			<van-tab title="报名结束">
				<view class="game-list" v-if="datas.endActivity.length!=0">
					<k-activity-item :activity="datas.endActivity" @click="goActivityDetail"></k-activity-item>
				</view>
				<view v-else>
					<k-empty tips="没有收藏的活动~"></k-empty>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import kActivityItem from '@/components/k-ui/k-activity/k-activity-item.vue'
	export default {
		components: {
			kActivityItem
		},
		data() {
			return {
				datas: [],
			}
		},
		onLoad(options){
			this.loadData(options.id)
		},
		methods:{
			async loadData(id) {
				const res = await this.$api.request({
					url: '/activity/attentionList?id=' + id
				})
				console.log(res)
				this.datas = res.data
				console.log(this.datas)
		},
		goActivityDetail(id) {
			uni.navigateTo({
				url: '/pages/activity/detail?id=' + id
			})
		},
	}
}
</script>

<style lang="scss">
	.page {
		// border: 1upx solid #ccc;
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		// position: fixed;
	}
	
	.noData {
		flex:1 ;
	}
</style>
