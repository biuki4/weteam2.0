<template>
	<view>
		<view>
			<k-list :users="datas" :ids="ids" :navBarName="userInfo.user.id==id?'我的关注':'TA的关注'" @follow="follow"></k-list>
		</view>
	</view>
</template>

<script>
	import kList from '@/components/k-ui/k-user-list/k-list2.vue'
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
				// 查看的用户id
				id: '',
				// 当前登录的用户
				currUser:[]
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		mounted() {
			this.currUser = this.$store.getters.getUserInfo
			console.log(this.currUser)
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
					url: '/user/attentionsList/' + id
				})
				console.log(res)
				this.datas = res.data.attentions
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
