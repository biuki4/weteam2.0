<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="http://www.iamk.top/static/icon/user-bg3.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">

					<image class="portrait" :src="userInfo.user.avatarUrl || 'http://www.iamk.top/static/icon/missing-face.png'"></image>
					<view class="gender-icon">
						<view class=" cu-tag badge" :class="{'cuIcon-female bg-pink':userInfo.user.gender==0,'cuIcon-male bg-blue':userInfo.user.gender==1, 'cuIcon-attentionforbid bg-cyan':userInfo.user.gender==-1}"></view>
					</view>
				</view>
				<view class="info-box" @click="toLogin()">
					<text class="username">{{hasLogin ? (userInfo.user.nickname || '未设置昵称') : '未登录'}}</text>
				</view>
				<view class="union">
					<image src="http://weteam.sys.iamk.top/unionLogo.jpg"></image>
					<text>i 瓜大联盟</text>
				</view>
			</view>
			<view class="vip-card-box">
				<!-- <image class="card-bg" src="http://www.iamk.top/static/icon/vip-card-bg.png" mode=""></image> -->
				<view class="b-btn" v-if="userInfo.user.userType == 0">
					<text>超管</text>
				</view>
				<view class="b-btn" v-if="userInfo.user.userType == 1">
					<text>一级管理员</text>
				</view>
				<view class="b-btn" v-if="userInfo.user.userType == 2">
					<text>二级管理员</text>
				</view>
				<view class="tit">
					<text>自我介绍</text>
					<view class="edit-icon" @click="navTo('/pages/set/personInfo/personInfo')">
						<text class="cuIcon-write"></text>
					</view>
				</view>

				<text class="e-b">{{userInfo.user.personInfo || '还没有设置~快去完善吧'}}</text>
			</view>
		</view>

		<view class="cover-container" :style="[{
						transform: coverTransform,
						transition: coverTransition
					}]"
		 @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
			<image class="arc" src="http://www.iamk.top/static/icon/arc.png"></image>

			<!-- 			<view class="tj-sction">
				<view class="tj-item" @click="navTo('/pages/person/user-list/attention-list?id=' + userInfo.user.id)">
					<text class="num">{{attention || 0}}</text>
					<text>关注</text>
				</view>
				<view class="tj-item" @click="navTo('/pages/person/user-list/fan-list?id=' + userInfo.user.id)">
					<text class="num">{{fans || 0}}</text>
					<text>粉丝</text>
				</view>
				<view class="tj-item">
					<text class="num">0</text>
					<text>积分</text>
				</view>
			</view> -->

			<!-- 管理员显示的界面 -->
			<view class="history-section icon" v-if="userInfo.user.userType <= 2">
				<list-cell icon="iconfont icon-fabu" iconColor="#54b4ef" title="立即发布" @eventClick="navTo('/pages/admin/post-kind')"></list-cell>
				<list-cell icon="iconfont icon-liebiao" iconColor="#54b4ef" title="我的发布" @eventClick="navTo('/pages/admin/my-post?id=' + userInfo.user.id)"></list-cell>
				<!-- <view v-if="userInfo.user.userType <= 1"> -->
				<!-- <list-cell icon="iconfont icon-huojiang" iconColor="#5fcda2" title="我的管理员" @eventClick="navTo('/pages/user/admin/myAdmins')"></list-cell> -->
				<!-- </view> -->
			</view>

			<view class="history-section icon">
				<!-- <list-cell icon="iconfont icon-canyu" iconColor="#ee883b" title="我的参与" tips="..." @eventClick="navTo('/pages/user/participate?id=' + userInfo.user.id)"></list-cell> -->
				<list-cell icon="iconfont icon-canyu" iconColor="#5fcda2" title="我的队伍" tips="..." @eventClick="navTo('/pages/team/my-team?id=' + userInfo.user.id)"></list-cell>
				<list-cell icon="iconfont icon-shoucang0" iconColor="#5fcda2" title="我的收藏" @eventClick="navTo('/pages/user/attention/attention-kind?id=' + userInfo.user.id)"></list-cell>
				<list-cell icon="iconfont icon-zhuanyetechang" iconColor="#5fcda2" title="我的特长" @eventClick="navTo('/pages/set/personInfo/advantage?id=' + userInfo.user.id)"></list-cell>
				<list-cell icon="iconfont icon-rongyu" iconColor="#5fcda2" title="我的荣誉" @eventClick="navTo('/pages/set/personInfo/award/award?id=' + userInfo.user.id)"></list-cell>
				<!-- <list-cell icon="iconfont icon-fenxiang" iconColor="#9789f7" title="分享" tips="邀请好友一起参加"></list-cell> -->
			</view>

			<view class="history-section icon">
				<!-- <list-cell icon="iconfont icon-fabu" iconColor="#e07472" title="我要发布" tips="..." @eventClick="navTo('/pages/user/want')"></list-cell> -->
				<list-cell icon="iconfont icon-bangzhudisc" iconColor="#e07472" title="使用指南" tips="..." @eventClick="navTo('/pages/notice/manual')"></list-cell>
				<list-cell icon="iconfont icon-rizhi" iconColor="#e07472" title="版本日志" tips="..." @eventClick="navTo('/pages/user/log')"></list-cell>
				<view class="cu-list menu">
					<view class="cu-item">
						<button class="cu-btn content" open-type="feedback">
							<text class="cuIcon-btn text-olive" style="color:#e07472;"></text>
							<text class="text-grey" style="color: #2b2b2b;font-size: 28upx;">问题反馈</text>
						</button>
					</view>
				</view>
				<list-cell icon="iconfont icon-config--shixin-copy" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
			</view>
		</view>


	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import {
		mapState
	} from 'vuex';
	let startY = 100,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				// 关注
				attention: '',
				// 粉丝
				fans: '',
				user: ''
			}
		},
		// mounted() {
			// this.updateUser()
		// },
		onLoad() {
			this.updateUser()
			setInterval(()=>{
				// console.log("自动更新")
				this.updateUser()
			},1000*60*5);
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		onShow() {
			this.isLogin()
			if(this.user==undefined || this.user=='') {
				this.user = this.$store.getters.getUserInfo
			}
		},
		methods: {
			updateUser(){
				this.user = this.$store.getters.getUserInfo
				if (this.user!=undefined && this.user != '') {
					this.getUser()
				}
			},
			async isLogin() {
				const res = await this.$api.request({
					url: '/isLogin',
					isShowLoading: false
				})
				console.log(res)
				uni.hideLoading()
				if(res.status.startsWith("5000")) {
					if(res.status == "50001") {
						this.goLogin('您尚未登录，是否立即登录？')
					} else {
						this.goLogin(res.msg)
					}	
					return
				}
				// console.log("res.data.isBoundWeChat: " + res.data.isBoundWeChat)
				// console.log(this.user)
				// console.log("this.user.isBoundWeChat: " + this.user.isBoundWeChat )
				if(this.user!=undefined && this.user!='') {
					if(res.data.isBoundWeChat != this.user.isBoundWeChat) {
						console.log("有更新")
						this.updateUser()
					}
				}
			},
			goLogin(tip = '') {
				uni.showModal({
					title: '登录提示',
					content: tip,
					showCancel: true,
					confirmText: '登录',
					success: (e) => {
						if (e.confirm) {
							uni.navigateTo({
								url: '/pages/public/login'
							})
						}
					}
				})
			},
			async getUser() {
				if (this.user != null && this.user != 'undefined' && this.user != '') {
					const res = await this.$api.request({
						url: '/user/getMyInfo',
						isShowLoading: false
					})
					console.log(this.user)
					console.log(res.data)
					console.log(res)
					this.user = res.data
					this.$store.commit("updateUserInfo", res.data)
				}
			},
			async getFanNum() {
				const res = await this.$api.request({
					url: '/user/countFans'
				})
				// console.log("fans")
				// console.log(res)
				this.fans = res.data
			},
			async getAttentionNum() {
				const res = await this.$api.request({
					url: '/user/countAttentions'
				})
				console.log("attention")
				// console.log(res)
				this.attention = res.data

			},
			toLogin() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}

				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				// uni.navigateTo({
				// 	url: '/pages/notice/notice'
				// })
				uni.switchTab({
					url: '/pages/notice/notice'
				})
			}
		},
		onPullDownRefresh() {
			this.getUser()
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000)
		},
	}
</script>

<style lang='scss'>
	.feedback {
		background-color: #fff;
		border: 1upx solid #f00;

		button {
			border: none;
		}
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}

	.user-info-box {

		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait-box {
			position: relative;

			.gender-icon {
				border: 1upx solid #00f;
				position: absolute;
				top: 10upx;
				right: 10upx;
			}
		}

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.info-box {
			margin-left: 20upx;

			.username {
				font-size: $font-lg + 6upx;
				color: $font-color-dark;
				margin-left: 20upx;
			}
		}
		
		.union {
			position: absolute;
			display: flex;
			right: 20upx;
			bottom: 10upx;
			vertical-align: middle;
			
			image {
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
			}
			
			text {
				margin-left: 20upx;
				color: #fff;
			}
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			/* width: 132upx; */
			padding: 8upx;
			/* height: 45upx; */
			text-align: center;
			/* line-height: 75upx; */
			vertical-align: middle;
			font-size: 25upx;
			color: #36343c;
			border-radius: 5px;
			background: linear-gradient(to top, #ff0844 0%, #ffb199 100%);
			z-index: 1;
			color: #fff;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 20upx;
			display: flex;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}

			.edit-icon {
				padding-left: 10upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;
		margin-top: 15upx;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
</style>
