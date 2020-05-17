<template>
	<view>
		<hx-navbar :title="award.length==0?'添加荣誉':'修改荣誉'" color="#ffffff" background-color-linear-deg="45" />
		<view class="margin-top20">
			<view class="cu-form-group">
				<view class="title required">竞赛名称</view>
				<input placeholder="请输入名称, 如2020年美赛" v-model="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title required">竞赛奖项</view>
				<input placeholder="请输入奖项, 如一等奖" v-model="brief"></input>
			</view>
			<!-- 比赛级别 -->
			<view style="background-color: #fff;">
				<view class="padding-L10">
					<view class="cu-form-group" style="display: flex;">
						<view class="title required">竞赛类型</view>
						<input 
						:value="gameTypeList[gameType]" 
						readonly 
						disabled
						@tap="showModal"
						data-target="addAward" 
						placeholder="请选择竞赛级别"></input>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='addAward'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in gameTypeList" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{item}}</view>
									<radio class="round" :class="gameType==index?'checked':''" 
											:checked="gameType==index?true:false" :value="index"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
			<!-- 上传图片 -->
			<!-- 			<view class="box3-uploadPic-box margin-top10" >
				<view class="uploadPic-tit">上传证书</view>
				<view class="box3-uploadPic">
					<van-uploader sizeType="compressed" preview-full-image upload-text="上传活动海报" max-count="1" :file-list="picList"
					 @delete="deletePic"
					 @after-read="afterReadPic"></van-uploader>
				</view>			
			</view> -->
		</view>
		<view class="cu-bar bg-white justify-end margin-top10">
			<view class="action">
				<button class="cu-btn bg-red" v-if="award.length!=0" @tap="delAward">删除</button>
				<button class="cu-btn bg-green margin-left" v-if="award.length!=0" @tap="editAward">修改</button>
				<button class="cu-btn bg-green margin-left" v-if="award.length==0" @tap="addAward">添加</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 表单
				name: '',
				brief: '',
				gameType: '-1',
				// 模态框
				modalName: null,
				// 活动级别
				gameTypeList: ['院级', '校级', '市级', '省级', '国家级', '国际', '其他'],
				popupTypeFlag: false,
				// 上传图片	{url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1'}
				picList: [{
					url: 'https://img.yzcdn.cn/vant/leaf.jpg',
					name: '图片1'
				}],
				award: []
			};
		},
		onLoad() {
			console.log("-----")
			uni.getStorage({
				key: 'award',
				success: (res => {
					this.award = res.data
					this.name = this.award.name
					this.brief = this.award.brief
					this.gameType = this.award.type
					uni.removeStorageSync('award')
				})
			})
			
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			// 模态框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				console.log(e)
				this.gameType = e.detail.value
				this.hideModal()
			},
			async addAward(){
				if(this.name == "" || this.brief == "" || this.gameType == "-1"){
					this.$api.msg("请完善信息")
					return;
				}
				uni.showLoading()
				const res = await this.$api.request({
					url: '/user/addAward',
					method: "PUT",
					contentType: "application/json",
					data: {
						name: this.name,
						brief: this.brief,
						type: this.gameType
					}
				})
				if(res.status == 200){
					this.returnPage("添加成功~")
				}
				
			},
			async editAward(){
				if(this.name == "" || this.brief == "" || this.gameType == "-1"){
					this.$api.msg("请完善信息")
					return;
				}
				uni.showLoading()
				const res = await this.$api.request({
					url: '/user/editAward/' + this.award.id,
					method: "PUT",
					contentType: "application/json",
					data: {
						name: this.name,
						brief: this.brief,
						type: this.gameType
					}
				})
				if(res.status == 200){
					this.returnPage("修改成功~")
				}
				
			},
			async delAward(){
				uni.showLoading()
				const res = await this.$api.request({
					url: '/user/delAward/' + this.award.id
				})
				if(res.status == 200){
					this.returnPage("删除成功~")
				}			
			},
			returnPage(msg){
				setTimeout(()=>{
					uni.hideLoading()
					this.$api.prePage().loadData()
					uni.navigateBack()
					this.$api.msg(msg)
				}, 1000)
			},
			
			
			
			// 上传图片
			fileIsEmpty() {
				if (this.picList.length == 0) {
					return true
				} else {
					return false
				}
			},
			afterReadPic(e) {
				console.log(e)
				console.log(e.detail)
				console.log(e.detail.file.path)
				const file = e.detail.file
				const test = {
					'url': file.path
				}
				console.log(test)
				this.picList.push(test)
				// const { file } = event.detail;
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				// wx.uploadFile({
				//   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
				//   filePath: file.path,
				//   name: 'file',
				//   formData: { user: 'test' },
				//   success(res) {
				//     // 上传完成需要更新 picList
				//     const { picList = [] } = this.data;
				//     picList.push({ ...file, url: res.data });
				//     this.setData({ picList });
				//   }
				// });
			},
			beforeRead(e) {
				console.log(e)
			},
			deletePic(e) {
				this.picList.pop(e.detail.index)
				this.$api.msg("删除成功")
			}
		}
	}
</script>

<style lang="scss">
	.box3-uploadPic-box {
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20upx;

		.uploadPic-tit {
			font-size: 30upx;
		}

		.box3-uploadPic {
			margin-top: 15upx;
		}
	}

	.preview-picture {
		width: 100%;
		height: 250upx;

		img,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.box3-tagBox {
		// border: 1upx solid #f00;

		.tagBox-add {}
	}
</style>
