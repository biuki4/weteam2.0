<template>
	<view>
		<hx-navbar title="我的队伍" color="#ffffff" background-color-linear-deg="45" />
		<van-tabs animated sticky>
			<van-tab title="我的参与">
				<view v-if="datas.myParticipate.length!=0">
					<k-myTeam @click="getTeamDetail" :list="datas.myParticipate"></k-myTeam>
				</view>
				<view v-else>
					<k-empty tips="您还没有参与队伍哦~"></k-empty>
				</view>
			</van-tab>
			<van-tab title="我的创建">
				<view v-if="datas.myTeams.length!=0">
					<k-myTeam @click="getTeamDetail" :list="datas.myTeams"></k-myTeam>
				</view>
				<view v-else>
					<k-empty tips="您还没有创建队伍哦~"></k-empty>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import kMyTeam from "@/components/k-ui/k-team/k-myTeam.vue"
	export default {
		components:{
			kMyTeam
		},
		data() {
			return {
				currUserId: '',
				datas: []
			};
		},
		onLoad(options) {
			uni.showLoading({
				title: '正在加载'
			})
			this.currUserId = options.id
			this.loadData()
		},
		methods:{
			getTeamDetail(id){
				console.log(id)
				uni.navigateTo({
					url: '/pages/team/my-team-detail?id=' + id
				})
			},
			async loadData(){
				const res = await this.$api.request({
					url: '/team/myTeam',
					data: {
						id: this.currUserId
					}
				})
				console.log(res)
				this.datas = res.data
				uni.hideLoading()
			},
		}
	}
</script>

<style lang="scss">

</style>
