<template>
	<view class="container">
		<hx-navbar title="我的管理员" color="#ffffff" background-color-linear-deg="45" />
		<k-list :users="admins"></k-list>
		<!-- 添加模态框 -->
		<neil-modal :show="addShow" @close="closeAddModal" title="添加管理员" @cancel="addModalCancel" @confirm="addModalConfirm">
			<view class="add-box">
				<view class="add-title">学号</view>
				<input class="add-input" v-model="addUserName" maxlength=10 type="number" placeholder="请输入学号" />
			</view>
		</neil-modal>
		<!-- 添加按钮 -->
		<view class="add-icon" @click="addAdmin">+</view>
	</view>
</template>

<script>
	import kList from '@/components/k-ui/k-user-list/k-list-delete.vue'

	export default {
		components: {
			kList
		},
		data() {
			return {
				admins: [{
						id: '1',
						avatarUrl: 'http://www.iamk.top/static/icon/missing-face.png',
						nickName: '昵称1',
						userName: '2017303083'
					},
					{
						id: '2',
						avatarUrl: 'http://www.iamk.top/static/icon/chexiao.png',
						nickName: '昵称2',
						userName: '2017303082'
					}
				],
				// 添加模态框
				addShow: false,
				addUserName: ""
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			async loadData() {
				const res = await this.$api.request({
					url: '/admin/myAdmin'
				})
				console.log(res)
			},
			addAdmin() {
				console.log("添加admin")
				this.addShow = true;
			},
			closeAddModal() {
				console.log("关闭addModal")
				this.addShow = false;
				// this.addUserName = ""
			},
			addModalCancel() {
				console.log("取消")
				this.addUserName = ""
			},
			addModalConfirm() {
				console.log("确认")
				console.log("addUserName: " + this.addUserName)
			},
			onUserNameInput(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	.add-box {
		display: flex;
		align-items: center;
		padding: 10upx 10upx 10upx 60upx;
		height: 80upx;
		// border: 1upx solid #f00;
		
		.add-input {
			// border: 1upx solid #00f;
			margin-left: 50upx;
		}
		
	}
	
	.add-icon {
		position: absolute;
		right: 50upx;
		bottom: 50upx;
		font-size: 85upx;
		color: #fff;
		background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
		;
		width: 90upx;
		height: 90upx;
		line-height: 90upx;
		border-radius: 50%;
		text-align: center;
	}
</style>
