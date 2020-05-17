<template>
	<view>
		<hx-navbar :title="userInfo.user.id==curUserId?'我的荣誉':'TA的荣誉'" color="#ffffff" background-color-linear-deg="45" />
		<view v-if="data.length!=0">
			<k-award-list :list="data" @edit="edit" :isMy="userInfo.user.id==curUserId?true:false"></k-award-list>
		</view>
		<view v-else>
			<k-empty tips="这里空空如也~"></k-empty>
		</view>
		<!-- 添加按钮 -->
		<view class="add-icon" 
		v-if="userInfo.user.id==curUserId" 
		@click="navTo('/pages/set/personInfo/award/addAward')"><text class="cuIcon-add"></text></view>
	</view>
</template>

<script>
	import kAwardList from '@/components/k-ui/k-list/k-award-list.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components:{
			kAwardList
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		data() {
			return {
				curUserId: '',
				data: []
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: '正在加载'
			})
			this.curUserId = e.id
			console.log(e)
			this.loadData()
		},
		methods: {
			navTo(url) {
				// this.$api.msg(`跳转到${url}`);
				uni.navigateTo({
					url
				})
			},
			async loadData(){
				const res = await this.$api.request({
					url: '/user/getAward/' + this.curUserId
				})
				// console.log(res)
				this.data = res.data
				console.log(this.data)
				uni.hideLoading()
			},
			edit(index){
				console.log(this.data[index])
				uni.setStorageSync('award', this.data[index])
				this.navTo('/pages/set/personInfo/award/addAward')
			}
		}
	}
</script>

<style lang="scss">
		.bg-blue {
			background-color: #55aaff;
		}
		
		.add-icon {
			position: fixed;
			right: 50upx;
			bottom: 50upx;
			font-size: 80upx;
			color: #fff;
			background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
			width: 90upx;
			height: 90upx;
			line-height: 90upx;
			border-radius: 50%;
			text-align: center;
		}
</style>
