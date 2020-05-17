<template>
	<view class="page">
		<hx-navbar :title="userInfo.user.id==curUserId?'我的发布':'TA的发布'" color="#ffffff" background-color-linear-deg="45" />
		<van-tabs animated sticky @click="onClick">
			<van-tab title="正在进行">
				<view v-if="curGame.length!=0" class="game-list">
					<game-item :list="curGame" @click="goGameDetail"></game-item>
				</view>
				<view v-else>
					<k-empty tips="这里空空如也~"></k-empty>
				</view>
			</van-tab>
			<van-tab title="已经结束">
				<view v-if="endGame.length!=0" class="game-list">
					<game-item :list="endGame" @click="goGameDetail"></game-item>
				</view>
				<view v-else>
					<k-empty tips="这里空空如也~"></k-empty>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import gameItem from '@/components/k-ui/k-game-list/k-game-attention.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			gameItem
		},
		data() {
			return {
				curGame: [],
				endGame: [],
				currentPage: 1,
				curUserId: '',
				index: 0
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		onLoad(options){
			this.curUserId = options.id
		},
		onShow() {
			uni.showLoading({
				title: '正在加载'
			})
			this.currentPage = 1
			this.curGame = []
			this.endGame = []
			this.loadData()
		},
		onReachBottom() {
			if(this.index==0){
				if (this.curGame.length < this.currentPage * this.$common.pageSize) return;
			}
			if(this.index==1){
				if (this.endGame.length < this.currentPage * this.$common.pageSize) return;
			}
			this.currentPage++
			this.loadData()
			
		},
		methods:{
			async loadData() {
				const res = await this.$api.request({
					url: '/game/myPost?id='+this.curUserId
				})
				this.curGame = [...this.curGame, ...res.data.curGame]
				this.endGame = [...this.endGame, ...res.data.endGame]
				uni.hideLoading()
			},
			// 跳转到比赛详情
			goGameDetail(id) {
				uni.navigateTo({
					url: '/pages/game/game-detail?id=' + id
				})
			},
			onClick(e){
				this.index = e.detail.index
			}
	}
}
</script>

<style lang="scss">
	.page {
		border: 1upx solid #ccc;
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
