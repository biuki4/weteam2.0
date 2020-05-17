<template>
	<view class="page">
		<hx-navbar title="收藏的竞赛" color="#ffffff" background-color-linear-deg="45" />
		<van-tabs animated sticky>
			<van-tab title="正在进行">
				<view class="game-list" v-if="datas.curGame.length!=0">
					<game-item :list="datas.curGame" @click="goGameDetail"></game-item>
				</view>
				<view v-else>
					<k-empty tips="没有收藏的竞赛~"></k-empty>
				</view>
			</van-tab>
			<van-tab title="已经结束">
				<view class="game-list" v-if="datas.endGame.length!=0">
					<game-item :list="datas.endGame" @click="goGameDetail"></game-item>
				</view>
				<view v-else>
					<k-empty tips="没有收藏的竞赛~"></k-empty>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	// 自定义gameItem组件
	import gameItem from '@/components/k-ui/k-game-list/k-game-attention.vue';
	// import kEmpty from '@/components/k-empty/k-empty.vue';
	export default {
		components: {
			gameItem,
			// kEmpty
		},
		data() {
			return {
				datas: [],
			}
		},
		onLoad(options){
			uni.showLoading({
				title: '正在加载'
			})
			this.getDatas(options.id)
		},
		watch:{
			// 监控数据名为datas的属性,显示empty界面
			// datas(e){
			// 	// console.log(e)
			// 	let empty = e.length === 0 ? true : false
			// 	if(this.empty !== empty){
			// 		this.empty = empty
			// 	}
				
			// }
		},
		methods:{
			async getDatas(id) {
				const res = await this.$api.request({
					url: '/game/attentionList?id=' + id
				})
				console.log(res)
				this.datas = res.data
				uni.hideLoading()
		},
		// 跳转到比赛详情
		goGameDetail(id) {
			uni.navigateTo({
				url: '/pages/game/game-detail?id=' + id
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
