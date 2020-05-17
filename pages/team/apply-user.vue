<template>
	<view>
		<hx-navbar title="申请列表" color="#ffffff" background-color-linear-deg="45" />
		<view v-if="datas.length!=0">
			<k-list :users="datas" @click="userDetail"></k-list>
		</view>
		<view v-else>
			<k-empty tips="这里空空如也~"></k-empty>
		</view>
	</view>
</template>

<script>
	import kList from '@/components/k-ui/k-user-list/k-list.vue'
	export default {
		components: {
			kList
		},
		data() {
			return {
				curteamId: '',
				datas: ''
			};
		},
		onLoad(options) {
			this.curteamId = options.id
			this.loadData()
		},
		methods:{
			async loadData() {
				const res = await this.$api.request({
					url: '/team/applyList/' + this.curteamId
				})
				console.log(res)
				this.datas = res.data
			},
			userDetail(id){
				uni.navigateTo({
					url: '/pages/person/person-detail?id=' + id
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
