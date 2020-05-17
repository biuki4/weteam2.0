<template>
	<view class="page">
		<hx-navbar title="WeTeam" color="#ffffff" background-color-linear-deg="45" />
		<k-detail :list="activity" :poster="poster" :isCollect="isCollect" @collect="collect" @participate="participate"
		 @editActivity="editActivity" @deleteActivity="deleteActivity">
		</k-detail>
	</view>
</template>

<script>
	import kDetail from '@/components/k-ui/k-activity/k-detail.vue'
	export default {
		components: {
			kDetail
		},
		data() {
			return {
				activity: [],
				poster: [],
				isCollect: false,
				currActivityId: '',
				user: ''
			}
		},
		mounted() {
			this.user = this.$store.getters.getUserInfo
		},
		onLoad(options) {
			this.currActivityId = options.id
			this.loadData()
		},
		methods: {
			async loadData() {
				if(this.currActivityId==undefined || this.currActivityId=="") {
					uni.navigateBack()
					return
				}
				const res = await this.$api.request({
					url: '/activity/' + this.currActivityId,
				})
				console.log(res)
				if (res.status.startsWith("4000")) {
					this.$api.msg(res.msg)
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
					return
				}
				this.activity = res.data.activity
				this.poster[0] = res.data.poster
				this.isCollect = res.data.isCollect
			},
			collect(id) {
				console.log(id)
				if (this.isCollect == true) {
					this.unCollect(this.activity.id)
					uni.showToast({
						title: '取消成功'
					})
				} else {
					this.goCollect(this.activity.id)
					uni.showToast({
						title: '取消成功'
					})
				}
				this.isCollect = !this.isCollect
			},
			async goCollect(id) {
				const res = await this.$api.request({
					url: '/activity/collect/' + id
				})
			},
			async unCollect(id) {
				const res = await this.$api.request({
					url: '/activity/unCollect/' + id
				})
			},
			deleteActivity() {
				if (this.user.id != this.poster[0].id && this.user.userType != 0) {
					uni.showModal({
						title: '提示',
						content: '权限不足，仅能删除您发布的活动~',
						showCancel: false,
						confirmText: '返回',
						success: (e) => {}
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
								title: '删除中...'
							})
							_this.delete()
						}
					}
				})
			},
			async delete() {
				const res = await this.$api.request({
					url: '/activity/delete/' + this.currActivityId
				})
				if (this.$api.prePage().loadData) {
					this.$api.prePage().loadData("refresh")
				}
				uni.hideLoading()
				if (res.status == 200) {
					uni.showToast({
						title: '删除成功'
					})
					setTimeout(()=>{
						uni.navigateBack()
					}, 1000)
				} else if (res.status.startsWith("2000")) {
					this.$api.msg(res.msg)
				} else {
					this.$api.msg("服务器正忙~")
				}

			},
			editActivity() {
				if (this.user.id != this.poster[0].id && this.user.userType != 0) {
					uni.showModal({
						title: '提示',
						content: '权限不足，仅能编辑您发布的活动~',
						showCancel: false,
						confirmText: '返回',
						success: (e) => {}
					})
					return
				}
				const _this = this
				uni.showModal({
					title: '编辑提示',
					content: '您确定要编辑该活动吗？',
					showCancel: true,
					confirmText: '确定',
					success: (e) => {
						if (e.confirm) {
							uni.navigateTo({
								url: '/pages/admin/post-activity?id=' + _this.currActivityId
							})
						}
					}
				})
			},
			participate() {
				const flag = this.$common.greater(new Date(), new Date(this.activity.registerEndTime))
				console.log(flag)
				if (flag) {
					this.$api.msg("报名已结束")
					return
				}
				console.log(this.activity.teamSize)
				if (this.activity.teamSize <= 1) {
					this.$api.msg("该活动为个人赛")
					return
				}
				this.navTo("/pages/team/team-list?id=" + this.currActivityId + "&&teamSize=" + this.activity.teamSize)
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
		},
		onPullDownRefresh() {
			this.loadData()
			setTimeout(() => {
				uni.stopPullDownRefresh();
				uni.showToast({
					title:'刷新成功'
				})
			}, 1000)
		},
		onShareAppMessage() {
			return {
				title: this.activity.activityName
			}
		}
	}
</script>

<style lang="scss">

</style>
