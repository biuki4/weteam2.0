<template>
	<view class="container">
		<hx-navbar title="登录" color="#ffffff" background-color-linear-deg="45" />
		<!-- <view class="back-btn iconfont icon-you" @click="navBack"></view> -->
		<!-- 头部logo -->
		<view class="header">
			<image src="http://www.iamk.top/static/image/login.png"></image>
		</view>
		<!-- 初始界面 -->
		<view v-if="!loginType">
			<view @click="chooseLoginType('phone')">
				<!-- <wButton text="登录 / 注册" bgColor="#55aaff;"></wButton> -->
			</view>
			<view class="">
				<button class="wxLogin-btn dlbutton" text="微信快捷登录" open-type="getUserInfo" @getuserinfo="wxLogin">微信授权登录</button>
				<!-- <wButton text="微信快捷登录" bgColor="#55aaff;" openType="getUserInfo" @getuserinfo="wxLogin"></wButton> -->
			</view>
			<!-- <button class="confirm-btn" open-type="getUserInfo" @getuserinfo="wxLogin">微信授权登录</button> -->
		</view>
		<!--loginType =  0 -->
		<view class="loginType-phone" v-if="loginType == 'phone'">
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="用户名/电话"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" placeholder="密码"></wInput>
				<wButton text="登 录" :rotate="isRotate" bgColor="#55aaff;"></wButton>
			</view>

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>


	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				loginType: '',
				isRotate: false, //是否加载旋转
				logoImage: '', //logo图片 base64
				phoneData: '', //用户/电话
				passData: '', //密码
				logining: false
			}
		},
		components: {
			wButton,
			wInput
		},
		onShow() {
			this.$api.logout()
			// this.wxLogin()
		},
		onLoad(options) {

		},
		methods: {
			...mapMutations(['login']),

			navTo(url) {
				// this.$api.msg(`跳转到${url}`);
				uni.navigateTo({
					url
				})
			},
			chooseLoginType(type) {
				console.log(type)
				this.loginType = type
			},
			navBack() {
				uni.navigateBack();
			},
			wxLogin() {
				console.log("登录")
				const _this = this
				console.log("---")
				uni.login({
					provider: 'weixin',
					success: (login_res) => {
						console.log("---")
						console.log(login_res)
						// 登录所需的code
						let code = login_res.code;
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								uni.showLoading({
									title: '登录中'
								})
								console.log(infoRes)
								// wx返回的用户信息
								let userInfo = JSON.parse(infoRes.rawData)
								console.log(userInfo)
								// console.log("userInfo:   " + userInfo.nickName)
								// 登录请求
								_this.$api.request({
									url: '/wxLogin',
									method: 'POST',
									data: {
										code: code,
										data: infoRes.rawData,
										encryptedData: infoRes.encryptedData,
										iv: infoRes.iv
									}
								}, failres => {
									_this.$api.msg("请稍后再试~")
									uni.navigateBack()
									uni.hideLoading()
								}).then(res => {
									console.log(res)
									if (res.status == 200) {
										// user和token
										let user_token = res.data
										
										_this.$api.setUserInfo(user_token)
										console.log(user_token)
										// 异步修改用户信息，同步微信头像
										_this.$api.request({
											url: '/user/update/' + user_token.user.id,
											method: "PUT",
											contentType: "application/json",
											data: {
												avatarUrl: userInfo.avatarUrl
											},
										}).then(syncRes => {
											// 更新本地信息
											user_token.user.avatarUrl = userInfo.avatarUrl
											uni.setStorageSync('userInfo', user_token)
											_this.$store.commit('login', user_token)
											_this.$api.setUserInfo(user_token)
											console.log(user_token)

											// 调用上一个界面的loadData方法
											if (_this.$api.prePage().loadData) {
												_this.$api.prePage().loadData()
											}

											uni.hideLoading()
											uni.navigateBack()
											_this.$api.msg("欢迎使用WeTeam ~")
										})																																																							
									} else {
										// console.log("服务器正忙！请重试！")
										_this.$api.msg("服务器正忙！请重试！")
									}
								})
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang='scss'>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");

	.header {
		/* margin-top: 350upx; */
	}

	.login-box {
		border: 1upx solid #f00;
		width: 80%;
		height: 500upx;
		background-color: #fff;
		box-shadow: 0 0 60upx 0 rgba(0, 0, 0, .2);
		margin:0 auto;
	}


	.wxLogin-btn {
		width: 600upx;
		height: 100upx;
		line-height: 100upx;
		background-color: #55aaff;
		color: #fff;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		border-radius: 2.5rem;
		box-shadow: 0 0 60upx 0 rgba(0, 0, 0, .2);
		margin-top: 70upx;

		button {
			border: none;
		}
	}



	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
</style>
