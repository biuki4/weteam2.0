<template>
	<!-- 发布竞赛 -->
	<view class="page">
		<hx-navbar :title="editFlag==true?'编辑竞赛':'发布竞赛'" color="#ffffff" background-color-linear-deg="45" />
		<view class="bg-white" style="padding:20upx 0;">
			<view class="cu-steps">
				<view class="cu-item" :class="index>stepActive?'':'text-green'" v-for="(item,index) in stepList" :key="index">
					<text :class="index>stepActive?'cuIcon-title':'cuIcon-' + item.cuIcon"></text> {{item.name}}
				</view>
			</view>
		</view>
		<!-- <button @click="test">test</button> -->
		<!-- <button @click="postGame">post</button> -->
		<view class="post-box1" v-if="stepActive == 0">
			<view class="cu-form-group">
				<view class="title required">竞赛名称</view>
				<input v-model="name" placeholder="请输入竞赛名称"></input>
				<text class="cuIcon-roundclose" v-if="name.length!=0" @click="name=''"></text>
			</view>
			<view class="cu-form-group">
				<view class="title required">主办方</view>
				<input v-model="source" placeholder="请输入主办方名称, 如软件学院"></input>
				<text class="cuIcon-roundclose" v-if="source.length!=0" @click="source=''"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">通知链接</view>
				<input v-model="url" placeholder="请输入通知链接"></input>
				<text class="cuIcon-roundclose" v-if="url.length!=0" @click="url=''"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">报名链接</view>
				<input v-model="registerUrl" placeholder="请输入报名链接"></input>
				<text class="cuIcon-roundclose" v-if="registerUrl.length!=0"  @click="registerUrl=''"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">官方群</view>
				<input v-model="contact" placeholder="如:QQ群123456"></input>
				<text class="cuIcon-roundclose" v-if="contact.length!=0" @click="contact=''"></text>
			</view>
			<!-- 比赛级别 -->
			<view class="margin-top10">
				<view class="cu-form-group" style="display: flex;">
					<view class="title required">竞赛级别</view>
					<input 
					:value="gameTypeList[gameType-1]" 
					readonly 
					disabled
					@click.native="popupTypeFlag=true" 
					placeholder="请选择竞赛级别"></input>
					<text class="cuIcon-right"></text>
				</view>
				<van-popup :show="popupTypeFlag" @close="popupTypeFlag=false" position="bottom">
					<van-picker 
					:columns="gameTypeList" 
					show-toolbar 
					@cancel="closeTypePopup" 
					@confirm="chooseType" 
					value-key="name" />
				</van-popup>
			</view>
			<!-- 竞赛类别 -->
			<view>
				<view class="cu-form-group" style="display: flex;">
					<view class="title required">竞赛类别</view>
					<input 
					:value="category.category" 
					readonly 
					disabled
					@click.native="popupKindFlag=true" 
					placeholder="请选择竞赛类别"></input>
					<text class="cuIcon-right"></text>
				</view>
				<van-popup :show="popupKindFlag" @close="popupKindFlag=false" position="bottom">
					<van-picker 
					:columns="categories" 
					show-toolbar 
					@cancel="closeKindPopup" 
					@confirm="chooseKind" 
					value-key="name" />
				</van-popup>
			</view>
			<!-- 比赛方式 -->
			<view class="margin-top10 way-box">
				<view class="way-tit"><text>比赛方式</text></view>
				<view class="way-radios">
					<van-radio-group :value="gameWayRadio" @change="onChangeGameWay()">
						<van-radio name="1" checked-color="#07c160">个人赛</van-radio>
						<van-radio name="2" checked-color="#07c160">团体赛</van-radio>
					</van-radio-group>
				</view>
			</view>
			<view class="margin-top10 way-box" v-if="membersShowFlag">
				<view class="way-tit"><text>队伍规模</text></view>
				<view class="members">
					<!-- <van-stepper :value="members" min=1 max=20 integer input-width="100" @change="onChangeMembers()" /> -->
					<uni-number-box :min="1" :max="15" :value="num" @change="change"></uni-number-box>
				</view>
			</view>
			<!-- 时间 -->
			<view class="time-box margin-top10">
				<view class="cu-form-group">
					<view class="title required">报名时间</view>
					<picker mode="date" :value="date1" :start="startTime" :end="endTime" @change="Date1Change">
						<!-- <view style="display: flex; align-items: center;text-align: right;border: 1upx solid #f00;"> -->
							<!-- <input placeholder="请选择" :value="date1" readonly></input> -->
						<view style="color:#7d7d7d;text-align: center;">{{date1 || '请选择'}}</view>
						<!-- </view> -->
					</picker>
					<text style="text-align: left;">至</text>
					<picker mode="date" :value="date2" :start="startTime" :end="endTime" @change="Date2Change">
						<view style="color:#7d7d7d;text-align: right;">{{date2 || '请选择'}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title required">比赛时间</view>
					<picker mode="date" :value="date1" :start="startTime" :end="endTime" @change="Date3Change">
						<view style="color:#7d7d7d;text-align: center;">{{date3 || '请选择'}}</view>
					</picker>
					<text style="text-align: left;">至</text>
					<picker mode="date" :value="date4" :start="startTime" :end="endTime" @change="Date4Change">
						<view style="color:#7d7d7d;text-align: right;">{{date4 || '请选择'}}</view>
					</picker>
				</view>
				<view class="post-tip margin-top10" style="margin-left: 20upx;">
					<text style="color:#f00;margin-right: 15upx;">*</text><text> 时间待定请选择{{startTime}}</text>
				</view>
			</view>
		</view>
		<!-- 富文本编译器 -->
		<view class="post-box2 margin-top10" v-if="stepActive == 1">
			<my-editor @save="saveEditor" @reset="resetEditor" :html="gameContent"></my-editor>
		</view>
		<!-- 上传文件 -->
		<view class="post-box3" v-if="stepActive == 2">
			<!-- 上传图片 -->
			<view class="box3-uploadPic-box" v-if="fileIsEmpty()">
				<view class="uploadPic-tit required">上传图片</view>
				<view class="box3-uploadPic">
					<van-uploader 
					sizeType="compressed" 
					preview-full-image upload-text="上传竞赛海报" 
					max-count="1" 
					:file-list="picList"
					@after-read="afterReadPic"></van-uploader>
				</view>
			</view>
			<!-- 图片预览 -->
			<view v-if="!fileIsEmpty()">
				<uni-swipe-action>
					<uni-swipe-action-item :options="options" @click="previewOnClick" @change="previewChange">
						<view class="preview-picture animated bounceInRight">
							<img :src="picList" alt="">
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<view style="text-align: right;margin-top: 5upx;">（滑动删除）</view>
			</view>
			<!-- 上传附件 -->
<!-- 			<view class="box3-uploadPic-box margin-top20">
				<view class="uploadPic-tit">上传附件(
					<van-icon name="arrow-left" /> 1M) </view>
				<view class="box3-uploadPic">
					<van-uploader accept="file" max-size=1*1024*1024 max-count="3" :file-list="picList" @after-read="afterReadPic">
						<van-button icon="description" type="primary">点击上传</van-button>
					</van-uploader>
				</view>
			</view> -->
			<!-- 标签 -->
			<view class="box3-tagBox margin-top20">
				<view class="tagBox-add">
					<dynamic-tags 
					:value="tagList" 
					maxTag=3 
					@add="addTag" 
					@delete="delTag" 
					:enable-del="enableDel" 
					:enable-add="enableAdd">
					</dynamic-tags>
				</view>
			</view>
		</view>
		<view class="box4 margin-top10">
			<view v-if="stepActive == 3">
				<k-game-detail :list="games" :poster="poster" isPreview="true"></k-game-detail>
			</view>
		</view>
<!-- 		<view class="margin-top20 post-tip" style="margin-left: 20upx;" v-if="stepActive!=3">
			<text style="color:#f00;">*</text><text>请检查好所填的信息~</text>
		</view> -->
		<view class="foot">
			<view class="foot-option" v-if="stepActive!=3">
				<view class="option-item item-return" @click="lastStep" v-if="stepActive!=0&&stepActive!=3 ">
					<text class="cuIcon-back"></text>
					<text>返回</text>
				</view>
				<view class="option-item item-next" @click="nextStep" v-if="stepActive<2">
					<text>下一步</text>
					<text class="cuIcon-right"></text>
				</view>
				<view class="option-item item-next" @click="postGame" v-if="stepActive==2">
					<text>发布</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="padding flex flex-direction op-group" v-if="stepActive==3">
				<button class="cu-btn lg bg-grey" style="color:#fff;" @click="editGame">编辑</button>
				<button class="cu-btn lg bg-red" style="color:#fff;" @click="deleteGame">删除</button>
				<button class="cu-btn lg" style="background-color: #55aaff;color:#fff;" @click="finsh">完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	import myEditor from "@/components/other/robin-editor/editor.vue"
	// 滑动单元格
	import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue'
	import dynamicTags from '@/components/other/dynamic-tags/dynamic-tags.vue'
	import kGameDetail from '@/components/k-ui/k-game-detail/k-game-detail.vue'
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			myEditor,
			uniSwipeAction,
			uniSwipeActionItem,
			dynamicTags,
			kGameDetail,
			uniNumberBox
		},
		data() {
			return {
				name: '',
				source: '',
				url: '',
				registerUrl: '',
				contact: '',
				date1: '',
				date2: '',
				date3: '',
				date4: '',
				gameContent: '',
				// 活动级别
				gameType: '',
				gameTypeList: ['院级', '校级', '市级', '省级', '国家级', '国际级','其他'],
				popupTypeFlag: false,
				// 活动类别
				category: '',
				categories: [],
				categoryIds: [],
				popupKindFlag: false,
				// 步骤条
				stepActive: 0,
				stepList: [{
					cuIcon: 'usefullfill',
					name: '基本信息'
				}, {
					cuIcon: 'radioboxfill',
					name: '竞赛描述'
				}, {
					cuIcon: 'radioboxfill',
					name: '上传附件'
				}, {
					cuIcon: 'roundcheckfill',
					name: '确认发布'
				}],
				// 比赛方式
				gameWayRadio: '1',
				num: 1,
				// 队伍规模
				membersShowFlag: false,
				// 上传图片	{url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1'}
				picList: [],
				// 滑动单元格
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				// 活动标签
				tagList: [],
				enableDel: true,
				enableAdd: true,
				// 时间选择器开始 解释时间
				startTime: '',
				endTime: '',
				// 预览的数据
				games: [],
				poster:[],
				// 编辑
				curGameId: '',
				user: '',
				editFlag: false

			}
		},
		mounted() {
		    this.user = this.$store.getters.getUserInfo
		},
		onLoad(options) {		
			if(options.id!=undefined){
				console.log(options.id)
				this.curGameId = options.id
				this.editFlag = true
				this.loadData()
			}
			this.getCategories()
			this.getStartDate()
			this.getEndDate()
		},
		methods: {
			saveEditor(e){
				// console.log(e)
				this.gameContent = e.htmlData
				// console.log(this.gameContent)
			},
			resetEditor() {
				this.gameContent = ""
			},
			Date1Change(e){
				this.date1 = e.detail.value
			},
			Date2Change(e){
				this.date2 = e.detail.value
			},
			Date3Change(e){
				this.date3 = e.detail.value
			},
			Date4Change(e){
				this.date4 = e.detail.value
			},
			test(){
				// this.$common.isUnknowTime(this.date1)
				// console.log("this.name: " + this.name)
				// console.log("this.source: " + this.source)
				// console.log("this.url: " + this.url)
				// console.log("this.gameType: " + this.gameType)
				console.log("this.category: " + JSON.stringify(this.category))
				console.log(this.categories)
				// console.log("this.teamSize: " + this.num)
				// console.log(this.date1)
				// console.log(this.date2)
				// console.log(this.date3)
				// console.log(this.date4)
				// console.log("this.gameContent: " + this.gameContent)
				// console.log("this.picList: "  + this.picList)
				// console.log(this.tagList)	
			},
			async loadData() {
				const res = await this.$api.request({
					url: '/game/' + this.curGameId,
				})
				console.log(res)
				if(res.status == 200){
					const _this = this
					const game = res.data.game
					this.name = game.gameName
					this.source = game.gameSource
					this.url = game.gameUrl
					this.registerUrl = game.registerUrl
					this.gameType = game.gameType
					this.category = game.gameCategory
					if(game.teamSize>1){
						this.gameWayRadio = '2'
						this.membersShowFlag = true
					}
					this.num = game.teamSize
					this.date1 = game.registerStartTime
					this.date2 = game.registerEndTime
					this.date3 = game.gameStartTime
					this.date4 = game.gameEndTime
					this.gameContent = game.gameContent
					this.contact = game.contact
					game.gameTags.forEach(function(r){
						_this.tagList.push(r.tagName)
					})
					this.picList.push(game.posterUrl)
					// console.log(game.posterUrl)
					// this.source = game.
				} else {
					this.$api.msg("服务器正忙~")
				}	
			},
			getStartDate(){
				// const now = new Date()
				// const now_year = now.getFullYear()-2
				// const a = now_year + '-01-01'
				// this.startTime = a
				this.startTime = '2018-01-01'
			},
			getEndDate(){
				const now = new Date()
				const now_year = now.getFullYear()+2
				const a = now_year + '-01-01'
				// console.log(a)
				this.endTime = a
				// return now_year + '-01-01'
			},
			// 比赛类型
			chooseType(event) {
				const {value,index} = event.detail;
				this.gameType = index+1
				this.popupTypeFlag = false;
			},
			closeTypePopup() {
				this.popupTypeFlag = false;
			},
			// 比赛类别
			chooseKind(event) {
				// const {value,index} = event.detail;
				// this.category = index+1
				// this.popupKindFlag = false;
				
				// console.log(event)
				const {value,index} = event.detail;
				this.category = {
					id: this.categoryIds[index],
					category: value
				}
				console.log(this.category)
				this.popupKindFlag = false;
			},
			closeKindPopup() {
				this.popupKindFlag = false;
			},
			onChangeGameWay(e) {
				this.gameWayRadio = String(e.detail)
				if (this.gameWayRadio == 2) {
					this.membersShowFlag = true
				} else {
					this.membersShowFlag = false
					this.num=1
				}
			},
			change(e) {
				this.num = e
				// console.log(this.num)
			},
			nextStep() {
				// console.log(this.date3)
				if(this.stepActive == 0) {
					if(this.name == "")	{
						this.$api.msg("请填写竞赛名称~") 
						return
					}
					if(this.source == "") {
						this.$api.msg("请填写主办方~") 
						return
					}
					if(this.gameType == "")	{
						this.$api.msg("请选择竞赛级别~") 
						return
					}
					if(this.category == "")	{
						this.$api.msg("请选择竞赛类别~")
						return
					}
					if(this.date1 == "") {
						this.$api.msg("请选择报名开始时间~") 
						return
					}
					if(this.date2 == "") {
						this.$api.msg("请选择报名结束时间~") 
						return
					}
					if(this.date3 == ""){
						this.$api.msg("请选择竞赛开始时间~") 
						return
					}
					if(this.date4 == "") {
						this.$api.msg("请选择竞赛结束时间~") 
						return
					}
				}
				if(this.stepActive == 1){
					if(this.gameContent == ""){
						this.$api.msg("请填写竞赛内容并保存~")
						return
					}
				}
				this.stepActive = this.stepActive >= 4 ? this.stepActive : this.stepActive + 1
				// console.log(this.stepActive)
			},
			postGame() {
				if(this.picList.length == 0){
					this.$api.msg("请上传竞赛海报~")
					return
				}
				const _this = this
				if(this.tagList.length == 0){
					uni.showModal({
						title: '提示',
						content: '确定不添加竞赛标签吗？',
						showCancel: true,
						confirmText: '确定',
						success: (e) => {
							if (e.confirm) {
								uni.showLoading({
									title:'发布中...'
								})
								setTimeout(()=>{
									if(_this.curGameId==""){
										_this.post('/game/add')
									}else {
										_this.post('/game/update')
									}
								}, 1000)
							}
						}
					})
				}else {
					uni.showLoading({
						title:'发布中...'
					})
					setTimeout(()=>{
						if(_this.curGameId==""){
							_this.post('/game/add')
						}else {
							_this.post('/game/update')
						}
					}, 1000)
				}

			},
			finsh() {
				uni.navigateBack()
			},
			deleteGame() {
				if(this.user.userType>=3) {
					uni.showModal({
						title: '提示',
						content: '权限不足，无法删除~',
						showCancel: false,
						confirmText: '返回',
						success: (e) => {
						}
					})
					return
				}
				const _this = this
				uni.showModal({
					title: '删除提示',
					content: '删除不可恢复，确定删除吗？',
					showCancel: true,
					confirmText: '删除',
					success: (e) => {
						if (e.confirm) {
							uni.showLoading({
								title:'删除中...'
							})
							_this.delete()
						}
					}
				})	
			},
			async delete(){
				const res = await this.$api.request({
					url: '/game/delete/' + this.curGameId
				})
				uni.hideLoading()
				if(res.status == 200){
					this.$api.msg("删除成功")
					uni.navigateBack()
				} else if(res.status == 2001 || res.status == 2002){
					this.$api.msg(res.msg)
				} else {
					this.$api.msg("系统繁忙")
				}	
			},
			editGame(){
				if(this.user.userType>=3) {
					uni.showModal({
						title: '提示',
						content: '权限不足,无法编辑~',
						showCancel: false,
						confirmText: '返回',
						success: (e) => {
						}
					})
					return
				}
				const _this = this
				uni.showModal({
					title: '编辑提示',
					content: '您确定要重新编辑吗？',
					showCancel: true,
					confirmText: '确定',
					success: (e) => {
						if (e.confirm) {
							// uni.navigateTo({
							// 	url: '/pages/user/admin/post-game?id=' + _this.currGameId
							// })
							this.editFlag = true
							this.stepActive=0
						}
					}
				})
			},
			async post(url) {
				// this.test()
				const _this = this
				const res = await this.$api.request({
					url: url,
					contentType: "application/json",
					method: 'POST',
					data: {
						game: {
							id: this.curGameId,
							gameName: this.name,
							posterUrl: this.picList[0],
							gameContent: this.gameContent,
							contact: this.contact,
							registerStartTime: this.date1,
							registerEndTime: this.date2,
							gameStartTime: this.date3,
							gameEndTime: this.date4,
							gameSource: this.source,
							gameType: this.gameType,
							gameCategory: this.category,
							// gameCategory: {
							// 	'id': this.category,
							// 	'category': this.categories[this.category-1]
							// },
							gameUrl: this.url,
							registerUrl: this.registerUrl,
							teamSize: this.num,
						},
						tags: JSON.stringify(this.tagList)
					}
				})
				console.log(res)
				console.log(res.status)
				// console.log(this.tagList)
				if(res.status == 200){
					console.log("game发布成功")
					this.curGameId = res.data.id
					if(this.picList[0].startsWith("http://tmp") || this.picList[0].startsWith("wxfile:")){
						console.log("更新图片")
						this.upload()
					}else {
						uni.hideLoading()
						this.$api.msg("发布成功~")
						setTimeout(()=>{
							uni.showLoading({
								title:'预览中...'
							})
							this.getGame(this.curGameId)
						}, 1000)
					}
	
				}else {
					this.$api.msg("服务器正忙~")
				}
			},
			async getGame(id) {
				console.log(id)
				const res = await this.$api.request({
					url: '/game/' + id,
				})
				// console.log(res)
				if(res.status == 200){
					this.games = res.data.game
					this.poster[0] = res.data.poster
					setTimeout(()=>{
						this.stepActive = 3
						uni.hideLoading()
					}, 1000)
					// console.log(this.games)
					// console.log(this.poster)
				}		
			},
			lastStep() {
				this.stepActive = this.stepActive <= 4 ? this.stepActive - 1 : this.stepActive
				// console.log(this.stepActive)
			},
			afterReadPic(e) {
				const file = e.detail.file
				this.picList.push(file.path)
			},
			upload(){
				// console.log("上传文件")
				const _this = this
				console.log(this.picList)
				// console.log(this.curGameId)
				// console.log(this.picList)
				uni.uploadFile({
				  url: this.$config.def().baseUrl + '/upload/upload/' + this.curGameId, 
				  filePath: _this.picList[0],
				  name: 'file',
				  formData: { 
					  
				  },success(res) {
					// console.log(res)
					const r = JSON.parse(res.data)
					// console.log(r)
					if(r.status == 200) {
						uni.hideLoading()
						_this.$api.msg("发布成功~")
						setTimeout(()=>{
							uni.showLoading({
								title:'预览中...'
							})
							_this.getGame(_this.curGameId)
						}, 1000)
					}else {
						_this.$api.msg("服务器正忙~")
					}
				  },fail() {
				  	uni.hideLoading()
					_this.$api.msg("服务器正忙~")
				  }
			
				});
				// console.log("123")
			},
			beforeRead(e) {
				// console.log(e)
			},
			fileIsEmpty() {
				if (this.picList.length == 0) {
					return true
				} else {
					return false
				}
			},
			previewOnClick(e) {
				if (e.index == 0) {
					this.picList = []
				}
				// console.log(e)
				// console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
			},
			previewChange(open) {
				// console.log('当前开启状态：' + open)
			},
			addTag(e) {
				console.log(e)
				if (this.tagList.length < 3 && e.allTags.length <= 3) {
					this.tagList = e.allTags
				} else {
					this.$api.msg("最多只能添加三个")
				}

			},
			delTag(e) {
				console.log(e)
				this.tagList = e.allTags
			},
			async getCategories() {
				const res = await this.$api.request({
					url: '/category'
				})
				// console.log(res)
				const _this = this
				res.data.forEach(function(a){
					_this.categories.push(a.category)
					_this.categoryIds.push(a.id)
				})
				// res.data.forEach(function(a){
				// 	_this.categories.push(a.category)
				// })
				// console.log(this.categories)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $base-page;
	}

	.border {
		height: 10upx;
		width: 100%;
	}
	
	.title {
		// border: 1upx solid #f00;
		width: 180upx;
	}

	.post-box1 {
		margin-top: 20upx;

		.way-box {
			background-color: #fff;
			display: flex;
			height: 88upx;
			line-height: 88upx;
			padding-left: 20upx;
			align-items: center;

			.way-tit {
				color: #3e3e3e;
				font-size: 28upx;
			}

			.way-radios {
				margin-left: 50upx;
				position: absolute;
				right: 20upx;

				van-radio-group {
					display: flex;

					van-radio {
						margin-right: 30upx;
					}
				}
			}

			.members {
				position: absolute;
				right: 20upx;
			}
		}

		.time-box {
			display: flex;
			flex-direction: column;

			.timeSelect {
				background-color: #fff;
				flex-direction: row;
				display: flex;
				height: 88upx;
				align-items: center;
				justify-content: space-around;
				color: #3e3e3e;
				font-size: 28upx;

				.tit::before {
					content: '*';
					color: #f00;
				}

				.time-item {
					// border: 1upx solid #f00;
				}
			}
		}
	}

	.post-box2 {
		position: relative;
	}

	.post-box3 {
		margin-top: 20upx;

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
	}
	
	.post-tip {
		font-size: 30upx;
		color: #686868;
	}

	.foot {
		margin-top: 30upx;
		color: #6f6f6f;
		// padding: 20upx;

		// position: ab;
		// bottom: 20upx;
		width: 100%;

		.foot-option {
			height: 88upx;
			line-height: 88upx;
			// background-color: #fff;
			display: flex;
			// justify-content: space-between;
			margin-top: 20upx;
			padding: 0 20upx;
			position: relative;

			van-button {
				margin-left: 30upx;
			}

			.option-item {
				text {
					font-size: 36upx;
				}

				.iconfont {
					color: $base-blue;
					font-weight: 900;
					font-size: 40upx;
				}
			}

			.item-return {
				position: absolute;
				left: 20upx;
			}

			.item-next {
				position: absolute;
				right: 20upx;
			}
		}
		
		.op-group {
			button {
				margin-bottom: 15upx;
			}
		}
	}
</style>
