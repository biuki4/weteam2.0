<template>
	<!-- 修改个人信息 -->
	<view class="container">
		<hx-navbar title="个人信息" color="#ffffff" background-color-linear-deg="45" />
<!-- 		<view class="list-cell b-b m-t  avatar" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit">头像</text>
			<image src="http://www.iamk.top/static/icon/missing-face.png"></image>
		</view> -->
<!-- 		<van-uploader 
		sizeType="compressed" 
		preview-full-image 
		upload-text="上传活动海报" 
		max-count="1" 
		:file-list="picList"
		@after-read="afterReadPic"></van-uploader> -->
		
		<view class="list-cell margin-top20" hover-class="cell-hover" :hover-stay-time="100"  @click="showPublicModal('昵称')" data-target="publicModal">
			<text class="cell-tit">昵称</text>
			<text>{{user.nickname}}</text>
			<text class="cuIcon-right"></text>
		</view>
		<!-- 性别 -->
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="100" @click.native="genderShow=true">
			<text class="cell-tit">性别</text>
			<text>{{getGender}}</text>
			<text class="cuIcon-right"></text>
		</view>
		<van-popup :show="genderShow" @close="genderShow = false" position="bottom">
			<van-picker :columns="genderList" show-toolbar @cancel="genderShow=false" @confirm="genderConfirm" value-key="name" />
		</van-popup>
		<!-- 个性签名 -->
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="100" @click.native="signatureShow=true">
			<text class="cell-tit">自我介绍</text>
			<text class="text-ellipsis">{{user.personInfo}}</text>
			<text class="cuIcon-right"></text>			
		</view>
		<van-popup :show="signatureShow" @close="sigClose" position="bottom">
			<view class="signature-box">
				<view class="sig-textarea">
				    <textarea v-model="signature" value="signature" maxlength=60 placeholder="输入您的自我介绍~" placeholder-class="sig-placeholder" />
					<text class="sig-tip">60</text>
				</view>
				<view class="sig-foot">
					<text>支持中英文、数字</text>
					<view>
						<button class="cu-btn bg-blue" @click="sigConfirm">确定</button>
					</view>
				</view>
			</view>
		</van-popup>

		<view class="list-cell margin-top20" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit required">学号</text>
			<text>{{user.username}}</text>
			<!-- <text class="cuIcon-right"></text> -->
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="100"   @click="showPublicModal('年级')" data-target="publicModal">
			<text class="cell-tit required">年级</text>
			<text>{{user.grade}}</text>
			<text class="cuIcon-right"></text>			
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="100" @click.native="academyShow=true">
			<text class="cell-tit required">学院</text>
			<text>{{user.academy}}</text>
			<text class="cuIcon-right"></text>			
		</view>
		<van-popup :show="academyShow" @close="academyShow = false" position="bottom">
			<van-picker :columns="academyList" show-toolbar @cancel="academyShow=false" @confirm="academyConfirm" value-key="name" />
		</van-popup>
		<view class="list-cell required" 
		hover-class="cell-hover" 
		:hover-stay-time="100"  
		@click="showPublicModal('联系方式')" 
		data-target="publicModal">
			<text class="cell-tit">联系方式</text>
			<text>{{user.contact}}</text>
			<text class="cuIcon-right"></text>			
		</view>
<!-- 		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="100"  @click="showPublicModal('电话')" data-target="publicModal">
			<text class="cell-tit">电话</text>
			<text>{{user.phone}}</text>
			<text class="cuIcon-right"></text>			
		</view> -->
<!-- 		<view 
		class="list-cell" 
		hover-class="cell-hover" :hover-stay-time="100"  
		@click="showPublicModal('邮箱')" 
		data-target="publicModal">
			<text class="cell-tit">邮箱</text>
			<text>{{user.email}}</text>
			<text class="cuIcon-right"></text>			
		</view> -->
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
					<view class="cu-form-group">
						<input
							:maxlength="modalLength" 
							v-model="modalInput" 
							:type="isNumber==true?'number':'text'"
							:placeholder="modalTip" 
							name="input"
							@input="modalInputing">
						</input>
						<text class="cuIcon-roundclose" v-if="clearIconShow" @click="clearIcon"></text>
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

		<view class="list-cell m-t margin-top20" hover-class="cell-hover" :hover-stay-time="100" @click="navTo('/pages/set/personInfo/award/award?id=' + userInfo.user.id)">
			<text class="cell-tit">获奖经历</text>
			<text class="cuIcon-right"></text>			
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="100" @click="navTo('/pages/set/personInfo/advantage?id=' + userInfo.user.id)">
			<text class="cell-tit">我的特长</text>
			<text class="cuIcon-right"></text>			
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
				user:'',
				// 性别
				genderShow: false,
				genderList: ['女', '男', '保密'],
				// 学院
				academyShow: false,
				academyList: [],
				//
				contact:'',
				// 个性签名
				signature: '',
				signatureShow: false,
				// 图片
				picList:[],
				// 公共模态框
				modalShow: false,
				modalTitle: '',
				modalInput: '',
				isNumber: false,
				modalLength: 25,
				modalTip: '请输入您的信息~',
				clearIconShow: false,
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
			getGender(){
				if(this.user.gender==1) return '男'
				if(this.user.gender==0) return '女'
				if(this.user.gender==-1) return '保密'
			}
		},
		onLoad() {
			this.getAcademies()
		},
		mounted() {
			this.user = this.$store.getters.getUserInfo
			this.signature = this.user.personInfo
		},
		methods: {
			checkEmail(email){
				return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(email);
			},
			modalInputing(){
				if(this.modalInput.length > 0) {
					this.clearIconShow = true
				}else {
					this.clearIconShow = false
				}
			},
			clearIcon(){
				this.modalInput = ''
			},
			showPublicModal(e){
				if(e == "昵称") {
					this.modalTitle='昵称'
					this.modalInput = this.user.nickname
					this.modalLength = 15
					this.modalTip = '请输入昵称~'
					// return
				}
				if(e == "学号") {
					this.modalTitle='学号'
					this.modalInput = this.user.username
					this.isNumber = true
					this.modalLength = 10
					this.modalTip = "请输入学号~"
					// return
				}
				if(e == "年级"){
					this.modalTitle='年级'
					this.modalInput = this.user.grade
					this.isNumber = true
					this.modalLength = 4
					this.modalTip = '请输入年级，如2017'
					// return
				}
				if(e == "联系方式") {
					this.modalTitle='联系方式'
					this.modalInput = this.user.contact
					// this.isNumber = true
					this.modalLength = 30
					this.modalTip = '请输入常用联系方式, 如QQ:123456'
					// return
				}
				if(e == "电话") {
					this.modalTitle='电话'
					this.modalInput = this.user.phone
					this.isNumber = true
					this.modalLength = 11
					this.modalTip = '请输入电话号码~'
					// return
				}
				if(e == "邮箱") {
					this.modalTitle='邮箱'
					this.modalInput = this.user.email
					this.modalLength = 30
					this.modalTip = '请输入邮箱~'
					// return
				}
				this.modalShow = true
			},
			hideModal(){
				this.modalShow = false
				this.modalShow = ''
				this.modalInput = ''
				this.isNumber = false
				this.modalLength = '21'
			},
			modalConfim(e){
				if(this.modalInput == "" || this.modalInput == null) {
					this.$api.msg("请完善信息~")
					return
				}
				if(this.modalTitle=='昵称') this.user.nickname = this.modalInput
				if(this.modalTitle=='学号') {
					const check = this.$common.checkUsername(this.modalInput)
					if(!check){
						this.$api.msg("请输入10位正确的学号~")
						return
					}
					this.user.username = this.modalInput
				}
				if(this.modalTitle=='年级') {
					const check = this.$common.checkGrade(this.modalInput)
					if(!check){
						this.$api.msg("请输入4位数字，如2017")
						return
					}
					this.user.grade = this.modalInput
				}
				if(this.modalTitle=='联系方式') {
					this.user.contact = this.modalInput
				}
				if(this.modalTitle=='电话') {
					const check = this.$common.checkMobile(this.modalInput)
					if(!check){
						this.$api.msg("请输入正确的手机号~")
						return
					}
					this.user.phone = this.modalInput
				}
				if(this.modalTitle=='邮箱'){
					const check = this.$common.checkEamil(this.modalInput)
					if(!check){
						this.$api.msg("请输入正确的邮箱~")
						return
					}
					this.user.email = this.modalInput
				}
				this.updateUser()
				this.hideModal()
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			genderConfirm(e) {
				if(e.detail.index==2){
					this.user.gender = -1
				}else {
					this.user.gender = e.detail.index
				}
				this.updateUser()
				this.genderShow = false
			},
			academyConfirm(e){
				this.user.academyId = e.detail.index+1
				this.user.academy = this.academyList[e.detail.index]
				// console.log(e.detail)
				// console.log(this.user.academyId)
				// console.log(this.user.academy)
				// return
				this.updateUser()
				this.academyShow = false
			},
			sigConfirm(){
				if(this.signature == this.user.personInfo) {
					this.signatureShow = false
					return;
				}
				this.user.personInfo = this.signature
				this.updateUser()
				this.signatureShow = false
			},
			sigClose() {
				this.signature = this.user.personInfo
				this.signatureShow = false
			},
			async updateUser() {
				uni.showLoading({
					title: '更新中'
				})
				// console.log(this.user)
				const res = await this.$api.request({
					url: '/user/update/' + this.user.id,
					method: "PUT",
					contentType: "application/json",
					data: {
						...this.user
					}
				})
				uni.hideLoading()
				this.$store.commit("updateUserInfo", this.user)
				this.$api.msg(res.msg)
			},
			async getAcademies() {
				const res = await this.$api.request({
					url: '/academy',
					method: 'GET',
				})
				// this.academyList = res.data
				const _this = this
				res.data.forEach(function(a){
					_this.academyList.push(a.name)
				})
				// console.log(this.academyList)
			},
			afterReadPic(e) {				
				console.log(e)
				console.log(e.detail)
				console.log(e.detail.file.path)
				const _this = this
				const file = e.detail.file
				uni.uploadFile({
				  url: this.$config.def().baseUrl + '/upload/upload/1', 
				  filePath: file.path,
				  name: 'file',
				  formData: { 
					  // user: 'test',
				  },
				  success(res) {
					  console.log(res)
					  const r = JSON.parse(res.data)
					  console.log(r)
					  _this.picList.push(r.data)
				  }
				});
			},

		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.m-t40 {
		margin-top: 40upx !important;
	}

	.avatar {
		position: relative;

		image {
			position: absolute;
			right: 40upx;
			top: 10upx;
			;
			width: 80upx;
			height: 80upx;
		}
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

	.signature-box {
		padding: 40upx 40upx 20upx 40upx;
		background-color: #f8f8f8;
				
		.sig-textarea{
			background-color: #fff;
			padding: 20upx;
			height: 200upx;
			position: relative;
			/* border: 1upx solid #f00; */
			
			textarea {
				width: 100%;
				height: 100%;
			}
			
			.sig-tip {
				color:#565656;
				position: absolute;
				bottom: 10upx;
				right: 20upx;
			}	
			
			.sig-placeholder {
				color: #ccc;
			}
		}

		.sig-foot {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20upx;
			/* border: 1upx solid #00f; */

			text {
				color: #646464;
				font-size: 24upx;
			}
		}
	}
</style>
