<template>
	<view class="page">
		<hx-navbar :title="userInfo.user.id==datas.id?'我的参与':'TA的参与'" color="#ffffff" background-color-linear-deg="45" />
		<van-tabs animated sticky>
			<van-tab title="竞赛">
				<!--比赛信息-->
				<view class="game-list">
					<game-item :list="datas" @click="goGameDetail"></game-item>
				</view>
			</van-tab>
			<van-tab title="活动">
<!-- 				<view class="noData">
					<k-empty tips="你还没有参加任何活动哦~"></k-empty>
				</view> -->
			</van-tab>
		</van-tabs>
		<view class="noData" v-if="empty === true">
			<k-empty tips="你还没有参加任何活动哦~"></k-empty>
		</view>
	</view>
</template>

<script>
	// 自定义gameItem组件
	import gameItem from '@/components/k-ui/k-game-list/k-game-participate.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			gameItem
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		data() {
			return {
				currentPage: 1,
				datas: [],
				empty: false
			}
		},
		onLoad(options){
			this.getDatas(options.id)
		},
		watch:{
			// 监控数据名为datas的属性,显示empty界面
			datas(e){
				// console.log(e)
				let empty = e.length === 0 ? true : false
				if(this.empty !== empty){
					this.empty = empty
				}
				
			}
		},
		onReachBottom() {
			// if (this.notices.length < this.currentPage * this.$common.pageSize) return;
			// this.currentPage++
			// this.getNotices()
		},
		methods:{
			async getDatas(id) {
				// console.log("gameList: " + this.currentPage)
				const res = await this.$api.request({
					url: '/game/join/' + id,
					method: 'GET',
					data: {
						currentPage: this.currentPage,
						pageSize: this.$common.pageSize
					}
				})
				console.log(res)
				this.datas = res.data
			
		},
		// 跳转到比赛详情
		goGameDetail(e) {
			uni.navigateTo({
				url: '/pages/gameDetail/gameDetail?id=' + e
			})
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
