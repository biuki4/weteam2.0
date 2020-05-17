<template>
	<view class="page">
		<hx-navbar title="WeTeam" color="#ffffff" background-color-linear-deg="45" />
		<k-game-detail 
			:list="games" 
			:poster="poster" 
			:isCollect="isCollect" 
			@collect="collect" 
			@participate="participate"
			@editGame="editGame"
			@deleteGame="deleteGame">
		</k-game-detail>
<!-- 		<button class="share-section" open-type="share">
			分享 
		</button> -->
	</view>
</template>

<script>
	import kGameDetail from '@/components/k-ui/k-game-detail/k-game-detail.vue'
	export default {
		components: {
			kGameDetail
		},
		data() {
			return {
				games: [],
				poster:[],
				isCollect: false,
				currGameId: '',
				user: ''
			}
		},
		mounted() {
		    this.user = this.$store.getters.getUserInfo
		},
		onLoad(options) {
			this.currGameId = options.id
			this.loadData()
		},
		methods: {
			async loadData() {
				if(this.currGameId==undefined || this.currGameId =="") {
					uni.navigateBack()
					return
				}
				// console.log("gameList: " + this.currentPage)
				const res = await this.$api.request({
					url: '/game/' + this.currGameId,
				})
				console.log(res)
				if(res.status.startsWith("3000")) {
					this.$api.msg(res.msg)
					setTimeout(()=>{
						uni.navigateBack()
					}, 2000)
					return
				}
				this.games = res.data.game
				this.poster[0] = res.data.poster
				this.isCollect = res.data.isCollect
				// console.log(this.games)
				// console.log(this.poster)
				// console.log(res)
			},
			collect(id){
				console.log(id)
				if(this.isCollect==true){
					this.unCollect(this.games.id)
					this.$api.msg("取消成功")
				}else {
					this.goCollect(this.games.id)
					this.$api.msg("收藏成功")
				}
				this.isCollect = !this.isCollect
			},
			async goCollect(id) {
				const res = await this.$api.request({
					url: '/game/collect/' + id
				})
			},
			async unCollect(id) {
				const res = await this.$api.request({
					url: '/game/unCollect/' + id
				})		
			},
			deleteGame() {
				if(this.user.id!=this.poster[0].id && this.user.userType!=0) {
					uni.showModal({
						title: '提示',
						content: '权限不足，仅能删除您发布的竞赛~',
						showCancel: false,
						confirmText: '返回',
						success: (e) => {
						}
					})
					return
				}
				const _this = this
				uni.showModal({
					title: '删除提示',
					content: '删除不可恢复，确定删除吗？',
					showCancel: true,
					confirmText: '删除',
					success: (e) => {
						if (e.confirm) {
							uni.showLoading({
								title:'删除中...'
							})
							_this.delete()
						}
					}
				})	
			},
			async delete(){
				const res = await this.$api.request({
					url: '/game/delete/' + this.currGameId
				})
				if (this.$api.prePage().loadData) {
					this.$api.prePage().loadData("refresh")
				}
				uni.hideLoading()
				if(res.status == 200){
					this.$api.msg("删除成功")
					uni.navigateBack()
				} else if(res.status == 2001 || res.status == 2002){
					this.$api.msg(res.msg)
				} else {
					this.$api.msg("系统繁忙")
				}
				
			},
			editGame(){
				if(this.user.id!=this.poster[0].id && this.user.userType!=0) {
					uni.showModal({
						title: '提示',
						content: '权限不足，仅能编辑您发布的竞赛~',
						showCancel: false,
						confirmText: '返回',
						success: (e) => {
						}
					})
					return
				}
				const _this = this
				uni.showModal({
					title: '编辑提示',
					content: '您确定要编辑该竞赛吗？',
					showCancel: true,
					confirmText: '确定',
					success: (e) => {
						if (e.confirm) {
							uni.navigateTo({
								url: '/pages/admin/post-game?id=' + _this.currGameId
							})
						}
					}
				})
			},
			participate(){
				const flag = this.$common.greater(new Date(), new Date(this.games.registerEndTime))
				console.log(flag)
				if(flag) {
					this.$api.msg("报名已结束")
					return
				}
				console.log(this.games.teamSize)
				if(this.games.teamSize <= 1) {
					this.$api.msg("该竞赛为个人赛")
					return
				}
				this.navTo("/pages/team/team-list?id=" + this.currGameId + "&&teamSize=" + this.games.teamSize)
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
		},
		onShareAppMessage() {
			return {
				title: this.games.gameName
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			uni.showLoading({
				title: '正在加载'
			})
			this.loadData()
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				uni.showToast({
					title:'刷新成功'
				})
			}, 1000)
			
		},
	}
</script>

<style lang="scss">

</style>
