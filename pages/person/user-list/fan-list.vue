<template>
	<view>
		<view>
			<k-list :users="datas" :ids="ids" :navBarName="userInfo.user.id==id?'我的粉丝':'TA的粉丝'" @follow="follow"></k-list>
		</view>
	</view>
</template>

<script>
	import kList from '@/components/k-ui/k-user-list/k-list2.vue'
	// import kList from '@/components/k-ui/k-team/k-user.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components:{
			kList
		},
		data() {
			return {
				datas:[],
				// 关注的ids
				ids: [],
				// 查看的用户的id
				id: '',
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id
			this.getAttentions(options.id)	
		},
		methods:{
			async getAttentions(id) {
				// console.log("gameList: " + this.currentPage)
				const res = await this.$api.request({
					url: '/user/fansList/' + id
				})
				console.log(res)
				this.datas = res.data.fans
				this.ids = res.data.attentionIds
				
			},
			follow(id){
				const index = this.ids.indexOf(id)
				console.log(typeof(id))
				// 取消关注
				if(index!=-1){
					this.ids.splice(index, 1)
					this.$api.request({
						url: '/user/unFan/' + id
					})
				}
				// 关注
				if(index==-1){
					this.ids.push(id)
					this.$api.request({
						url: '/user/fan/' + id
					})
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
