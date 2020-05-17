<template>
	<view>
		<hx-navbar title="我要发布" color="#ffffff" background-color-linear-deg="45"/>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50" @click="showPublicModal('newAdmin')">
			<text class="cell-tit">申请管理员</text>
			<text class="cuIcon-right"></text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50" @click="showPublicModal('newGame')">
			<text class="cell-tit">发现新竞赛</text>
			<text class="cuIcon-right"></text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50" @click="showPublicModal('newActivity')">
			<text class="cell-tit">发现新活动</text>
			<text class="cuIcon-right"></text>
		</view>
		<!-- 模态框 -->
		<view class="cu-modal" :class="modalShow==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{modalTitle}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="text-align: left;">
					<view class="cu-form-group" v-if="modalTitle!='申请管理员'">
						<input
							maxlength="-1"
							v-model="modalInput" 
							:placeholder="modalTip" 
							name="input"
							@input="modalInputing">
						</input>
						<text class="cuIcon-roundclose" v-if="clearIconShow" @click="clearIcon"></text>
					</view>
					<view class="cu-form-group">
						<input
							maxlength="-1"
							v-model="modalInput2" 
							placeholder="联系方式" 
							name="input2"
							@input="modalInputing2">
						</input>
						<text class="cuIcon-roundclose" v-if="clearIconShow2" @click="clearIcon2"></text>
					</view>
					<view class="cu-form-group margin-top">
						<textarea maxlength="254" v-model="remark" :placeholder="remarkPlaceholder" @input="modalInputing3"></textarea>
						<text 
						v-if="clearIconShow3" @click="clearIcon3"
						style="height: 150upx;line-height: 150upx;width: 50upx;" class="cuIcon-roundclose" >
						</text>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="modalConfim">确定</button>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>

	export default {
		components:{
			
		},
		data() {
			return {
				// 公共模态框
				modalShow: false,
				modalTitle: '',
				modalInput: '',
				modalInput2: '',
				modalTip: '请输入您的信息~',
				clearIconShow: false,
				clearIconShow2: false,
				clearIconShow3: false,
				remark: '',
				remarkPlaceholder: '备注~'
			};
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			hideModal(){
				this.modalShow = false
				this.modalInput = ''
				this.modalInput2 = ''
				this.remark = ''
			},
			modalConfim(e){
				if(this.modalTitle=='发现新竞赛') {
					if(this.modalInput == '') {
						this.$api.msg("请填写链接~")
						return
					}
					this.found(0)
				}
				if(this.modalTitle=='发现新活动') {
					if(this.modalInput == '') {
						this.$api.msg("请填写链接~")
						return
					}
					this.found(1)
				}
				if(this.modalTitle=='申请管理员') {
					if(this.modalInput2=='' || this.remark=='') {
						this.$api.msg("请完善信息~")
						return
					}
					this.applyAdmin()
				}
			},
			async found(type) {
				uni.showLoading({
					title:'加载中...'
				})
				const res = await this.$api.request({
					url: '/found/found',
					contentType: "application/json",
					method: 'POST',
					data: {
						contact: this.modalInput2,
						url: this.modalInput,
						remark: this.remark,
						type: type
					}
				})
				uni.hideLoading()
				if(res.status == 200) {
					this.hideModal()
					this.$api.msg("感谢您的反馈~")
				} else {
					this.$api.msg("服务器正忙，请直接联系管理员，感谢您的反馈~")
				}
			},
			async applyAdmin() {
				// uni.showLoading({
				// 	title:'加载中...'
				// })
				const res = await this.$api.request({
					url: '/admin/apply',
					contentType: "application/json",
					method: 'POST',
					data: {
						contact: this.modalInput2,
						remark: this.remark
					}
				})
				// uni.hideLoading()
				if(res.status == 200) {
					this.hideModal()
					this.$api.msg("感谢您的反馈~")
				} else {
					this.$api.msg("服务器正忙，请直接联系管理员，感谢您的反馈~")
				}
			},
			modalInputing(){
				if(this.modalInput.length > 0) {
					this.clearIconShow = true
				}else {
					this.clearIconShow = false
				}
			},
			modalInputing2(){
				if(this.modalInput2.length > 0) {
					this.clearIconShow2 = true
				}else {
					this.clearIconShow2 = false
				}
			},
			modalInputing3(){
				if(this.remark.length > 0) {
					this.clearIconShow3 = true
				}else {
					this.clearIconShow3 = false
				}
			},
			showPublicModal(e){
				if(e == "newAdmin") {
					this.modalTitle='申请管理员'
					this.remarkPlaceholder = '申请理由'
				}
				if(e == "newGame") {
					this.modalTitle='发现新竞赛'
					this.modalTip = '请输入竞赛链接~'
					this.remarkPlaceholder = '备注'
				}
				if(e == "newActivity") {
					this.modalTitle='发现新活动'
					this.modalTip = '请输入活动链接~'
					this.remarkPlaceholder = '备注'
				}
				this.modalShow = true
			},
			clearIcon(){
				this.modalInput = ''
			},
			clearIcon2(){
				this.modalInput2 = ''
			},
			clearIcon3(){
				this.remark = ''
			},
		}
	}
</script>

<style lang="scss">
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
</style>
