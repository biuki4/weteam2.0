<template>
	<view>
		<hx-navbar :title="userInfo.user.id==curUserId?'我的特长':'TA的特长'" color="#ffffff" background-color-linear-deg="45" />
		<!-- 特长列表 -->
		<view v-if="data.length!=0">
			<k-advantage :list="data" @edit="edit" :isMy="userInfo.user.id==curUserId?true:false"></k-advantage>
		</view>
		<view v-else>
			<k-empty tips="这里空空如也~"></k-empty>
		</view>
		<!-- 添加模态框 -->
		<view class="cu-modal" :class="modalName=='AddModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加特长</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="text-align: left;" v-if="modalName=='AddModal'"> 
					<view class="cu-form-group">
						<input maxlength="15" v-model="advantageTitle" placeholder="请输入特长名称,如python" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<textarea maxlength="60" v-model="advantageContent" placeholder="请填写特长描述~"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="addAdvantage">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 编辑 -->
		<view class="cu-modal" :class="modalName=='editModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">编辑特长</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="text-align: left;">
					<view class="cu-form-group">
						<input maxlength="15" v-model="advantageTitle" placeholder="请输入特长名称,如pthon" name="input"></input>
					</view>
					<view class="cu-form-group margin-top" v-if="modalName=='editModal'">
						<textarea maxlength="60" v-model="advantageContent"  placeholder="请填写特长描述~"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-red" @tap="delAdvantage">删除</button>
						<button class="cu-btn bg-green margin-left" @tap="editAdvantage">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 添加按钮 -->
		<view class="add-icon cu-btn" v-if="userInfo.user.id==curUserId"  @tap="showModal" data-target="AddModal"><text class="cuIcon-add"></text></view>
	</view>
</template>

<script>
	import kAdvantage from '@/components/k-ui/k-list/k-advantage.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			kAdvantage
		},
		data() {
			return {
				data: [],
				// 添加
				addShow: false,
				advantageTitle: '',
				advantageContent: '',
				// 编辑
				editShow: false,
				modalName: null,
				curUserId: '',
				editId: ''
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
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
			showModal(e) {
				console.log(e)
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
				this.advantageTitle = ""
				this.advantageContent = ""
			},
			edit(index){
				this.advantageTitle = this.data[index].name
				this.advantageContent = this.data[index].brief
				this.editId = this.data[index].id
				this.modalName = 'editModal'
			},
			async loadData(){
				const res = await this.$api.request({
					url: '/user/getAdvantage/' + this.curUserId
				})
				// console.log(res)
				this.data = res.data
				uni.hideLoading()
			},
			async addAdvantage(){
				if(this.advantageTitle == "" || this.advantageContent == ""){
					this.$api.msg("请完善信息~")
					return;
				}
				const res = await this.$api.request({
					url: '/user/addAdvantage',
					method: "PUT",
					contentType: "application/json",
					data: {
						name: this.advantageTitle,
						brief: this.advantageContent
					}
				})
				if(res.status == 200){
					this.$api.msg("添加成功~")
					this.loadData()
					this.hideModal()
				}
			},
			async delAdvantage(){
				const res = await this.$api.request({
					url: '/user/delAdvantage/' + this.editId
				})
				if(res.status == 200){
					this.$api.msg("删除成功~")
					this.loadData()
					this.hideModal()
				}
				
			},
			async editAdvantage(){
				if(this.advantageTitle == "" || this.advantageContent == ""){
					this.$api.msg("请完善信息")
					return;
				}
				const res = await this.$api.request({
					url: '/user/editAdvantage/' + this.editId,
					method: "PUT",
					contentType: "application/json",
					data: {
						name: this.advantageTitle,
						brief: this.advantageContent
					}
				})
				if(res.status == 200){
					this.$api.msg("修改成功~")
					this.loadData()
					this.hideModal()
				}
				
			}
		}
	}
</script>

<style lang="scss">
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
			// vertical-align: middle;
		}
</style>
