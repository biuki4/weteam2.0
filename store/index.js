import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorageSync('userInfo', provider)
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorageSync('userInfo')
		},
		updateUserInfo(state, provider) {
			state.userInfo.user = provider
			uni.getStorage({
				key: 'userInfo',
				success: (res => {
					let userInfo = res.data
					userInfo.user = provider
					uni.setStorageSync('userInfo', userInfo)
				})
			})
			
		}
	},
	actions: {

	},
	getters: {
		getUserInfo(state) {
			return state.userInfo.user
		}
	}
})

export default store
