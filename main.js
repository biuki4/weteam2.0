import Vue from 'vue'
import store from './store'
import App from './App'
import kEmpty from '@/components/k-ui/k-empty/k-empty.vue' // 空界面提示
import hxNavbar from '@/components/k-ui/k-navbar/k-navbar.vue' // 自定义导航
import common from './common/common.js'
import * as filters from './filters'
import * as config from './config'
// 挂载filter
// 使用方式 {{list.game.postTime | dateFormat}}
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

const defConfig = config.def

const msg = (title, duration = 2500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const navTo = (url) => {
	// this.$api.msg(`跳转到${url}`);
	uni.navigateTo({
		url
	})
}

// 竞赛是否结束
const isEnd = (e) =>{
	const flag = common.greater(new Date(), new Date(e))
	// console.log(new Date())
	// console.log(new Date(e))
	// console.log(flag)
	if(flag) return true
	return false
}

// 竞赛类型
const getGameType = (i)=>{
	if(i == 0) return '其他'
	if(i == 1) return '院级'
	if(i == 2) return '校级'
	if(i == 3) return '市级'
	if(i == 4) return '省级'
	if(i == 5) return '国家级'
	if(i == 6) return '国际级'
	if(i == 6) return '其他'
}

let userInfo = undefined

const logout = () => {
	userInfo = undefined
	uni.removeStorage({
		key: 'userInfo'
	})
}

const setUserInfo = (i) => {
	userInfo = i
}

const isAdmin = () => {
	const res = uni.getStorage({
		key: 'userInfo'
	})
	console.log(res)
	return res.user.userType
}

let loginLock = false

const animateCSS = (options) => {
	console.log("全局方法");
	console.log(options)

}

const request = (options, failCallback) => {
	//异步请求数据
	return new Promise(resolve => {
		const isShowLoading = options.isShowLoading == undefined?true:options.isShowLoading
		if(isShowLoading) {
			uni.showLoading({
				title:'加载中...'
			})
		}
		// console.log("异步请求")
		// console.log("请求参数： " + JSON.stringify(options))
		// console.log(userInfo)
		if (!userInfo || !userInfo.token) {
			userInfo = uni.getStorageSync('userInfo')
		}
		let token = userInfo ? userInfo.token : ''
		let baseUrl = config.def().baseUrl
		console.log(baseUrl + options.url)
		// console.log("token: " + token)
		uni.request({
			url: baseUrl + options.url,
			data: options.data || {},
			method: options.method || 'GET',
			header: {
				'Content-Type': options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
				'token': token || ''
			},
			success: (res) => {
				// console.log(res)
				// setTimeout(function () {
				//     uni.hideLoading();
				// }, 1000);
				// console.log(res)
				// console.log("success----------" + res.statusCode)
				uni.hideLoading()
				// 函数执行成功的响应码
				if (res.statusCode == 200) {
					// console.log("statusCode: " + res.statusCode)
					// console.log(res.data)
					// 	// 返回信息中的响应码
					if (res.data.status == 200) {
						// console.log("res.data.status: " + res.data.status)
						// console.log(res)
						resolve(res.data);
					} else if (res.data.status == 401) {
						// console.log("res401 :" + res.data.status)
						if (failCallback) {
							failCallback(res.data)
						}
						if (!loginLock) {
							// uni.hideLoading();
							// console.log("您尚未登录，是否立即登录？")
							loginLock = true
							uni.hideLoading()
							uni.showModal({
								title: '登录提示',
								content: '您尚未登录，是否立即登录？',
								showCancel: true,
								confirmText: '登录',
								success: (e) => {
									if (e.confirm) {
										uni.navigateTo({
											url: '/pages/public/login'
										})
									}
								},
								fail: () => {},
								complete: () => {
									loginLock = false
								}
							})
						}
					} else if (res.data.status == "003") {
						// 登录失效
						if (failCallback) {
							failCallback(res.data)
						}
						if (!loginLock) {
							uni.hideLoading();
							// console.log("登录失效，是否立即登录？")
							loginLock = true
							uni.hideLoading()
							uni.showModal({
								title: '登录提示',
								content: '登录失效，重新登录？',
								showCancel: true,
								confirmText: '登录',
								success: (e) => {
									if (e.confirm) {
										uni.navigateTo({
											url: '/pages/public/login'
										})
									}
								},
								fail: () => {},
								complete: () => {
									loginLock = false
								}
							})
						}
					}
					else {
						resolve(res.data);
					}
					// else {
						// uni.hideLoading()
						// // uni.navigateBack()
						// console.log(res.data)
						// uni.showToast({
						// 	title: "操作失败，请稍后再试！",
						// 	icon:'none'
						// })
						// if (failCallback) {
						// 	failCallback(res.data)
						// } else {
						// 	uni.showToast({
						// 		title: res.data.errmsg,
						// 		icon: 'none'
						// 	})
						// }
					// }
				} 
				else {
					console.log("服务器正忙")
					if (failCallback) {
						failCallback(res.data)
					}
				}
			}
		})
	})
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.prototype.$config = config
Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	prePage,
	request,
	logout,
	setUserInfo,
	defConfig,
	animateCSS,
	navTo,
	isAdmin,
	isEnd,
	getGameType
};
Vue.prototype.$common = common
Vue.component('k-empty', kEmpty)
Vue.component("hx-navbar", hxNavbar)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
