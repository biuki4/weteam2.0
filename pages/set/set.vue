<template>
	<view class="container">
		<hx-navbar title="设置" color="#ffffff" background-color-linear-deg="45" />
		<view class="list-cell b-b m-t" @click="navTo('/pages/set/personInfo/personInfo')" hover-class="cell-hover"
		 :hover-stay-time="50">
			<text class="cell-tit">基本信息</text>
			<text class="cuIcon-right"></text>
		</view>
<!-- 		<view class="list-cell b-b" @click="navTo('我的地址')" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit">我的地址</text>
			<text class="cell-more iconfont icon-you"></text>
		</view> -->
<!-- 		<view class="list-cell" @click="navTo('实名认证')" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit">实名认证</text>
			<text class="cell-more iconfont icon-you"></text>
		</view> -->
		
		<view class="list-cell m-t">
			<text class="cell-tit">接收推送</text>
<!-- 			<view @click="showTip">
				<text class="cuIcon-question"></text>
			</view> -->
			<switch @change="SwitchA" :checked="userInfo.user.showMe==0?true:false"></switch>
			<!-- <switch @change="SwitchA" :checked="checked"></switch> -->
		</view>
		
<!-- 		<view>
			<van-dialog message="开启后将您的姓名、个性签名、特长、联系方式等个人信息展示在'大神'界面,以便更多小伙伴找到您一同参与比赛，请完善您的个人信息~" 
						confirm-button-text="知道了" 
						:show="tipShow" 
						@close="tipShow=false" 
						transition="fade" 
						close-on-click-overlay>
			</van-dialog>
		</view> -->
<!-- 		<view class="list-cell m-t b-b" @click="clear" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more iconfont icon-you"></text>
		</view> -->
		<view class="list-cell b-b m-t" @click="navTo('/pages/set/about')" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit">关于WeTeam</text>
			<text class="cuIcon-right"></text>
		</view>
<!-- 		<view class="margin-top20">
			<button open-type='feedback' class="feedback">问题反馈</button>
		</view> -->
<!-- 		<view class="list-cell b-b m-t" @click="checkVersion" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit">检查更新</text>
			<text class="cell-more iconfont icon-you"></text>
		</view> -->
		<view class="list-cell">
			<!-- <text class="cell-tit">检查更新</text> -->
			<text class="cell-tip">当前版本 1.0.2</text>
			<text class="cell-more iconfont icon-you"></text>
		</view>
		<view class="list-cell log-out-btn" @click="logout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				tipShow: false,
				user:[],
				isSwitch: false
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		mounted() {
			this.user = this.$store.getters.getUserInfo
			// console.log(this.user)
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			logout() {
				const that = this
				uni.showModal({
					title: '询问',
					content: '您确定要退出吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: (e) => {
						if (e.confirm) {
							that.$store.commit('logout')
							that.$api.logout()
							setTimeout(() => {
								uni.navigateBack();
							}, 200)
						}
					}
				})
			},
			SwitchA(e) {
				this.isSwitch = true
				const flag = e.detail.value?0:1
				this.updateUser(flag)
				if(flag==1) {
					uni.showModal({
						title: '关闭提示',
						content: '关闭后将无法接收到竞赛推送、组队提醒等功能',
						showCancel: false,
						confirmText: '知道了',
						success: (e) => {
							if (e.confirm) {
							}
						}
					})
				} else if(flag==0) {
					uni.showModal({
						title: '提示',
						content: '接收推送请关注‘i瓜大’公众号',
						showCancel: false,
						confirmText: '知道了',
						success: (e) => {
							if (e.confirm) {
							}
						}
					})
				}
			},
			showTip() {
				this.tipShow = true
			},
			async updateUser(flag) {
				const res = await this.$api.request({
					url: '/user/update/' + this.user.id,
					method: "PUT",
					contentType: "application/json",
					data: {
						showMe: flag
					}
				})
				console.log(res)
				this.user.showMe = flag
				this.$store.commit("updateUserInfo", this.user)
				console.log(this.isSwitch)
				if(this.isSwitch && res.status==200) {
					this.isSwitch = false
					return
				}
				this.$api.msg(res.msg)
				
			},
			clear(){
				this.$store.commit('logout')
				this.$api.logout()
				this.$api.msg("清除缓存成功~")
			},
		}
	}
</script>

<style lang='scss'>
	.tip-content {
		padding: 20upx;
	}
	
	page {
		background: $page-color-base;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
	
	.feedback {
		width: 100%;
		background-color: #fff;
		border: none;
	}
	
	.feedback::after {
		border: none;
	}
</style>
