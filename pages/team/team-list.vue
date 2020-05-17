<template>
	<view >
		<hx-navbar title="组队列表" color="#ffffff" background-color-linear-deg="45" />
		<view class="team-list" v-if="createBtnShow">
			<kTeam 
			v-if="datas.length!=0"
			:list="datas" 
			@userDetail="goUserDetail"
			@unApply="unApply" 
			@apply="apply" 
			@quit="quit"
			@goTeamDetail="goTeamDetail"></kTeam>
			<view v-else>
				<k-empty :tips="hasLogin?'还没有队伍或登录后查看哦~':'请登录后查看~'"></k-empty>
				<view 
				v-if="!hasLogin" 
				@click="navTo('/pages/public/login')"
				style="margin:0 auto;color:#0A98D5;text-align: center;">
					<text>去登陆</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		<!--手册-->
		<view>
			<kManualTeam @click="manualClick"></kManualTeam>
		</view>
		<!-- 创建队伍 -->
		<view class="cu-modal" :class="modalName=='AddModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">创建队伍</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				
				<view class="padding-xl" style="text-align: left;" v-if="modalName=='AddModal'"> 
					<view class="cu-form-group">
						<input maxlength="20" 
						v-model="teamName" 
						focus
						placeholder="请填写队伍名称" 
						name="input"></input>
					</view>
					<view class="cu-form-group">
						<input maxlength="30" 
						v-model="contact" 
						placeholder="请填写联系方式,如 QQ:123456" 
						name="input"></input>
					</view>
					<view class="need-box">
						<text>招募总人数：</text>
						<view style="margin-top: 15upx;">
							<uni-number-box :min="1" :max="teamSize" :value="need" @change="needChange"></uni-number-box>
						</view>
					</view>
					<view class="cu-form-group margin-top">
						<textarea maxlength="120" v-model="teamBrief" placeholder="请填写您的队伍介绍~"></textarea>
					</view>
					<view style="padding: 10upx;font-size: 24upx;">
						<text>* 关注"i瓜大"公众号，提供组队信息实时提醒功能~</text>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="createModal">确定</button>
					</view> 
				</view>
			</view>
		</view>
		<view v-if="createBtnShow" class="add-icon" @tap="showModal" data-target="AddModal"><text class="cuIcon-add"></text></view>
	</view>
</template>

<script>
	import kTeam from "@/components/k-ui/k-team/k-team.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import kManualTeam from "@/components/k-ui/k-manual/k-manual-team.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		components:{
			kTeam,
			uniNumberBox,
			kManualTeam
		},
		data() {
			return {
				user:'',
				datas: [],
				modalName: '',
				teamName: '',
				contact: '',
				teamBrief: '',
				currGameId: '',
				need: 1,
				teamSize: '',
				createBtnShow: true
			};
		},
		mounted() {
		    this.user = this.$store.getters.getUserInfo
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		onLoad(options) {
			console.log(options)
			uni.showLoading({
				title: '正在加载'
			})
			this.currGameId = options.id
			this.teamSize = options.teamSize
			this.loadData()
		},
		methods:{
			test() {
				console.log(this.user)
				this.isBoundWx()
			},
			manualClick(e){
				this.createBtnShow = e?false:true
				this.hideModal()
			},
			needChange(e) {
				this.need = e
				if(e==this.teamSize){
					this.$api.msg("已达人数上限~")
				}
			},
			goTeamDetail(id){
				// console.log(id)
				uni.navigateTo({
					url: '/pages/team/my-team-detail?id=' + id
				})
			},
			complete(msg){
				uni.showModal({
					title: '提示',
					content: msg,
					showCancel: true,
					confirmText: '去设置',
					success: (e) => {
						if (e.confirm) {
							uni.navigateTo({
								url: '/pages/set/personInfo/personInfo'
							})
						}
					}
				})
			},
			showModal(e) {
				if(this.user.contact==""){
					this.complete("请完善您的联系方式~")
					return
				}
				this.modalName = e.currentTarget.dataset.target
				console.log(e.currentTarget.dataset.target)
			},
			hideModal(e) {
				this.modalName = ''
				this.teamName = ""
				this.teamBrief = ""
				this.contact = ""
			},
			createModal(){			
				if(this.teamName == "" || this.teamBrief == "" || this.contact == ""){
					this.$api.msg("请完善信息~")
					return
				}
				this.create()
				this.hideModal()
			},
			async isBoundWx(){
				const res = await this.$api.request({
					url: '/isBoundWx/' + this.user.id,
				})
				console.log(res)
				if(res.data.isBoundWeChat == 0) {
					uni.showModal({
						title: '提示',
						content: '检测到您未关注‘i瓜大’公众号，无法为您推送组队信息',
						showCancel: false,
						confirmText: '知道了',
						confirmColor:'#8c8b83',
						success(res2) {
						}
					});
				}
			},
			async create(){
				const res = await this.$api.request({
					url: '/team/create',
					method: "POST",
					contentType: "application/json",
					data: {
						userId:this.user.id,
						gameId: this.currGameId,
						name: this.teamName,
						contact: this.contact,
						size: this.need,
						brief: this.teamBrief
					}
				})
				if(res.status == 200) {
					this.loadData()
					uni.showToast({
						title: '创建成功~'
					})
					setTimeout(()=>{
						this.isBoundWx()
					}, 1500)
					
				}else if(res.status.startsWith("1000")){
					this.$api.msg(res.msg)
				} else {
					this.$api.msg("服务器正忙~")
				}
				console.log(res)
			},
			async loadData() {
				const res = await this.$api.request({
					url: '/team/' + this.currGameId,
				})
				this.datas = res.data
				console.log(res)
				uni.hideLoading()
			},
			goUserDetail(id) {
				uni.navigateTo({
					url: '/pages/person/person-detail?id=' + id
				})
			},
			async unApply(id){
				const res = await this.$api.request({
					url: '/team/unApply/' + id,
				})
				if(res.status == 200) {
					this.loadData()
					uni.showToast({
						title:'取消成功~'
					})
				}else {
					this.$api.msg(res.msg)
				}
			},
			async apply(id){
				const res = await this.$api.request({
					url: '/team/apply/' + id,
				})
				if(res.status == 200) {
					this.loadData()
					uni.showToast({
						title:'申请成功~'
					})
				}else {
					this.$api.msg(res.msg)
				}
			},
			quit(id){
				uni.showModal({
					title: '退出提示',
					content: '您确定退出队伍吗？',
					showCancel: true,
					confirmText: '确定',
					success: (e) => {
						if (e.confirm) {
							this.unApply(id)
						}
					}
				})
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			btnClick() {
				// console.log('btnClick');
				this.$refs.kManualTeam.showModal();
			},
			btnTouchstart() {
				// console.log('btnTouchstart');
			},
			btnTouchend() {
				// console.log('btnTouchend');
			},
		},
		//下拉刷新
		onPullDownRefresh() {
			uni.showLoading({
				title: '正在加载'
			})
			this.datas = []
			this.loadData()
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				uni.showToast({
					title:'刷新成功'
				})
			}, 1000)
			
		}
	}
</script>

<style lang="scss">
	.team-list {
		margin-bottom: 150upx;
	}
	.add-icon {
		position: fixed;
		right: 50upx;
		bottom: 100upx;
		font-size:65upx;
		color: #fff;
		// background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
		background-color: #008de1;
		width: 70upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 50%;
		text-align: center;
		opacity:0.8;
		-webkit-box-shadow: #808080 0px 0px 4px;
		-moz-box-shadow: #808080 0px 0px 4px;
		box-shadow: #808080 0px 0px 4px;
		border-radius: 40px;
		border: 3upx solid #fff;
		
	}
	.need-box {
		margin-top: 20upx;
		background-color: #fff;
		display: flex;
		vertical-align: middle;
		padding-left: 20upx;
		justify-content: space-between;
		color:#8d8d8d;
		height: 100upx;
		line-height: 100upx;
	}

</style>
