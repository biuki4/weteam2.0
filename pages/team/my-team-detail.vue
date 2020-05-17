<template>
	<view>
		<hx-navbar title="队伍详情" color="#ffffff" background-color-linear-deg="45" />
		<view class="game-container">
			<view class="game-title">
				<text>{{datas.team.name}}</text>
			</view>
			<view>
				<view class="game-relative">
					<view class="game-relative-tit">
						<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>竞赛：
<!-- 						<text v-if="datas.team.size==1">（个人赛）</text>
						<text v-else>（团体赛）</text> -->
					</view>
					<view class="margin-top10 game-poster" 
					@click="goGameDetail(game.id)" 
					style="padding:0 0 20upx 40upx;font-size: 36upx;text-decoration:underline;">
						{{game.gameName}}
					</view>
				</view>
				<view class="time-box line">
					<text class="cuIcon-time" style="margin-right: 10upx;"></text>
					<text>报名时间：</text>
					<text>{{game.registerStartTime }} ~ {{game.registerEndTime}}</text>
				</view>
				<view class="time-box line">
					<text class="cuIcon-time" style="margin-right: 10upx;"></text>
					<text>比赛时间：</text>
					<text>{{game.gameStartTime}} ~ {{game.gameEndTime}}</text>
				</view>
			</view>
			<view class="game-relative">
				<view class="game-relative-tit">
					<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>队伍介绍：
				</view>
				<view class="margin-top10 game-poster" style="padding:0 40upx 20upx 40upx;">
					{{datas.team.brief || '还没有设置队伍介绍哦~'}}
				</view>
			</view>
			<view class="game-relative">
				<view class="game-relative-tit">
					<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>联系方式：
				</view>
				<view class="margin-top10 game-poster" style="padding:0 40upx 20upx 40upx;">
					<view v-if="showContact">
						<view v-if="datas.team.contact!=''">
							<text>{{datas.team.contact}}</text>
							<uni-link :href="datas.team.contact" text="点击复制, 记得说明来自weTeam小程序哦~" copyTips="已复制~"></uni-link>
						</view>
						<text v-else>还未设置，去个人信息看看~</text>
					</view>
					<view v-else>
						<text>
							申请后可查看~\n
							申请后将通过“i瓜大”公众号通知TA~
						</text>
					</view>
					<!-- {{datas.team.contact || '还未设置，去队长个人信息看看~'}} -->
				</view>
			</view>
			<view class="game-relative">
				<view class="game-relative-tit">
					<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>队长：
				</view>
				<view class="margin-top10 game-poster">
					<k-poster :users="leader" @click="userDetail"></k-poster>
				</view>
			</view>
			<view class="game-relative">
				<view class="game-relative-tit" style="position: relative;">
					<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>
					<text>队伍情况：</text>
					<text>差 {{needNum}} 人</text>
				</view>
			</view>
			<view class="team-foot">
				<view>
					<uni-collapse>
						<uni-collapse-item :title="'队员列表  (' + countMembers + ')'" showAnimation thumb="https://www.iamk.top/static/icon/wodeduiwu.png">
							<view style="background-color: #fff;">

								<view v-if="datas.team.members.length!=0">
									<k-List 
									:users="datas.team.members" 
									@click="memberOp"
									 ></k-List>
								</view>
								<view v-else style="padding: 40upx;color:#797979;">
									快来加入我们吧~
								</view>
							</view>
						</uni-collapse-item>
						<uni-collapse-item 
						:title="'申请列表  (' + countApplicant + ')'" 
						showAnimation 
						thumb="https://www.iamk.top/static/icon/shenqing.png">
							<view style="background-color: #fff;">
								<view v-if="datas.team.applicant.length!=0">
									<k-List 
									:users="datas.team.applicant" 
									 @click="applicantOp">
									 </k-List>
								</view>
								<view v-else style="padding: 40upx;color:#797979;">
									快来加入我们吧~
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<min-action-sheet ref="as" ></min-action-sheet>
				</view>
			</view>
			<!-- 编辑模态框 -->
			<view class="cu-modal" :class="modalShow?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">修改队伍信息</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl" style="text-align: left;">
						<view class="cu-form-group">
							<input maxlength="30" v-model="teamName" placeholder="请填写队伍名称" name="input"></input>
						</view>
						<view class="cu-form-group">
							<input maxlength="30" v-model="contact" placeholder="请填写联系方式" name="input"></input>
						</view>
						<view class="need-box">
							<text>招募总人数：</text>
							<view style="margin-top: 15upx;">
								<uni-number-box 
								:min="datas.team.members.length==0?1:datas.team.members.length" 
								:max="game.teamSize" 
								:value="need==0?1:need" 
								@change="needChange"></uni-number-box>
							</view>
						</view>
						<view class="cu-form-group margin-top" v-if="modalShow==true">
							<textarea maxlength="120" focus=false v-model="teamBrief" placeholder="请填写您的队伍介绍~"></textarea>
						</view>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="confirmModal">修改</button>
						</view>
					</view>
				</view>
			</view>
			<view class="game-footer">
				<view class="icons">
					<view>
						<text v-if="userInfo.user.id==datas.leader.id" @click="showModal" class="cuIcon-write"></text>
					</view>
				</view>
				<view class="btns">
					<button v-if="userInfo.user.id==datas.leader.id" class="cu-btn text-white bg-red" @click="dissolve">解散队伍</button>
					<button v-if="userInfo.user.id==datas.leader.id" class="cu-btn text-white bg-green" @click="finish">完成组队</button>
					<!-- <button class="cu-btn text-white bg-grey" @click="dissolve">申请加入</button> -->
					<button v-else-if="datas.team.isMember" class="cu-btn bg-green" @click="quit(datas.team.id)">退出</button>
					<button v-else-if="datas.team.isApplicant" class="cu-btn bg-blue" @click="unApply(datas.team.id)">取消申请</button>
					<!-- <button v-else class="cu-btn" @click="apply(datas.team.id)">申请加入</button> -->
					<button v-else class="cu-btn" @click="applyShowModal">申请加入</button>
				</view>
			</view>
			<!-- 申请模态框 -->
			<view class="cu-modal" :class="applyModalShow==true?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">申请理由</view>
						<view class="action" @tap="applyHideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl" style="text-align: left;">
						<view class="cu-form-group margin-top">
							<textarea maxlength="100" 
							v-model="applyModalInput"
							placeholder="理由/自我介绍" 
							@input="applyModalInputing">
							</textarea>
							<text 
							v-if="applyClearIconShow" @click="applyClearIcon"
							style="height: 150upx;line-height: 150upx;width: 50upx;" 
							class="cuIcon-roundclose" >
							</text>
						</view>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="applyHideModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="applyModalConfim">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-ui/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-ui/uni-collapse-item/uni-collapse-item.vue'
	import kList from '@/components/k-ui/k-team/k-user.vue'
	import kPoster from '@/components/k-ui/k-user-list/k-list.vue'
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import uniLink from "@/components/uni-ui/uni-link/uni-link.vue"
	import minActionSheet from '@/components/min-action-sheet/min-action-sheet.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		props: {},
		components: {
			uniCollapse,
			uniCollapseItem,
			kList,
			kPoster,
			uniNumberBox,
			uniLink,
			minActionSheet
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
			countApplicant() {
				if (this.datas == "") return 0
				return this.datas.team.applicant.length
			},
			countMembers() {
				if (this.datas == "") return 0
				return this.datas.team.members.length
			},
			needNum() {
				if(this.datas == "") return 0
				if(this.datas.team.size - this.datas.team.members.length < 0) return 0
				return this.datas.team.size - this.datas.team.members.length
			},
			showContact() {
				if(this.user=="" || this.datas == "") return false
				// console.log(this.user.id)
				// console.log(this.datas.leader.id)
				// console.log(this.datas.team.isMember)
				// console.log(this.datas.team.isApplicant)
				if(this.user.id==this.datas.leader.id || this.datas.team.isMember || this.datas.team.isApplicant) return true
				if(this.datas.leader.id==1) return true
				return false
			}
		},
		mounted() {
			this.user = this.$store.getters.getUserInfo
		},
		data() {
			return {
				modalShow: '',
				teamName: '',
				contact: '',
				teamBrief: '',
				need: '',
				curTeamId: '',
				datas: [],
				game: [], // 另外存储，否则时间过滤会有bug
				leader: [],
				placeholder: "",
				user: '',
				// 模态框
				applyModalShow: false,
				applyModalInput: '',
				applyClearIconShow: false,
				// 
				actions1: [
				  {
				    name: '同意入队',
				    icon: 'cuIcon-roundcheckfill',
				    color: '#19be6b'
				  },
				  {
				    name: '拒绝入队',
				    icon: 'cuIcon-roundclosefill',
				    color: '#fa3534'
				  },
				  {
				    name: '查看信息',
				    icon: 'cuIcon-search',
				    color: '#007aff'
				  }
				],
				actions2: [
				  {
				    name: '移出队伍',
				    icon: 'cuIcon-roundclosefill',
				    color: '#fa3534'
				  },
				  {
				    name: '查看信息',
				    icon: 'cuIcon-search',
				    color: '#007aff'
				  }
				],
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: '正在加载'
			})
			this.curTeamId = options.id
			// this.curTeamId=1
			this.loadData()
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: '正在加载'
			})
			this.loadData();
		},
		methods: {
			applicantOp (userId) {
				console.log(userId)
				let actions = this.actions1
				if(this.leader[0].id != this.user.id) {
					actions = []
					actions.push(this.actions1[2])
				}
				  this.$refs.as.handleShow({
					actions: actions,
					success: (res) => {
						if(actions.length==1) {
							this.userDetail(userId)
							return
						}
						switch (res.id) {
						// -1代表取消按钮
							case -1:
							  console.log(res)
							  break
							case 0:
							  this.agree(userId)
							  break
							case 1:
								this.disagree(userId)
								break
							case 2:
							 this.userDetail(userId)
							  break
						}
					}
				  })
				},			
			memberOp(userId) {
				let actions = this.actions2
				if(this.leader[0].id != this.user.id) {
					actions = []
					actions.push(this.actions2[1])
				}
			  this.$refs.as.handleShow({
			    actions: actions,
			    success: (res) => {
					if(actions.length==1) {
						this.userDetail(userId)
						return
					}
					switch (res.id) {
						// -1代表取消按钮
						case -1:
						  console.log(res)
						  break
						case 0:
						  this.kickOut(userId)
						  break
						case 1:
						  this.userDetail(userId)
						  break
					}
			    }
			  })
			},
			async isBoundWx(id){
				const res = await this.$api.request({
					url: '/isBoundWx/' + id,
				})
				if(res.data.isBoundWeChat == 0) {
					uni.showModal({
						title: '提示',
						content: '检测到该用户未关注‘i瓜大’公众号，将无法及时接收您的组队请求，建议自行联系~',
						showCancel: false,
						confirmText: '知道了',
						confirmColor:'#8c8b83',
						success(res2) {
						}
					});
				}
			},
			applyShowModal() {
				if(this.leader[0].id == 1) {
					uni.showModal({
						title: '提示',
						content: '官方转发信息，请自行联系~',
						showCancel: false,
						confirmText: '知道了',
						confirmColor:'#8c8b83',
						success(res2) {
						}
					});
					return
				}
				if (!this.check()) {
					return
				}
				this.applyModalShow = true
			},
			applyModalConfim() {
				if(this.applyModalInput=='') {
					this.$api.msg("请完善信息~")
					return
				}
				this.apply(this.datas.team.id)
				this.applyHideModal()
			},
			applyClearIcon(){
				this.applyModalInput = ''
			},
			applyModalInputing(){
				if(this.applyModalInput.length > 0) {
					this.applyClearIconShow = true
				}else {
					this.applyClearIconShow = false
				}
			},
			applyHideModal(){
				this.applyModalShow = false
				this.applyModalInput = ''
			},
			needChange(e) {
				this.need = e
				if (e == this.game.teamSize) {
					this.$api.msg("不大于队伍最大人数~")
				}
				if(this.datas != "") {
					if(e==this.datas.team.members.length) {
						this.$api.msg("不小于队伍中的人数~")
					}
				}

			},
			complete(msg) {
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
			check() {
				if (this.user.contact == "") {
					this.complete("请完善您的联系方式~")
					return false
				}
				return true
			},
			unApply(id) {
				uni.showModal({
					title: '取消提示',
					content: '两分钟内无法再次申请，您确定取消申请吗？',
					showCancel: true,
					confirmText: '确定',
					success: async (e) => {
						if (e.confirm) {
							uni.showLoading({
								title: '正在取消...'
							})
							const res = await this.$api.request({
								url: '/team/unApply/' + id,
							})
							uni.hideLoading()
							if (res.status == 200) {
								this.loadData()
								uni.showToast({
									title:'取消成功~'
								})
								setTimeout(()=>{
									if (this.$api.prePage().loadData) {
										this.$api.prePage().loadData()
									}
								}, 1000)
							} else if (res.status.startsWith("1000")) {
								this.$api.msg(res.msg)
							} else {
								this.$api.msg("系统正忙~")
							}
						}
					}
				})
			},
			async apply(id) {
				const res = await this.$api.request({
					url: '/team/apply/' + id,
					method: 'POST',
					data:{
						remark: this.applyModalInput
					}
				})
				// console.log(res)
				if (res.status == 200) {
					this.loadData()
					uni.showToast({
						title:'申请成功~'
					})
					setTimeout(()=>{
						if (this.$api.prePage().loadData) {
							this.$api.prePage().loadData()
						}
						console.log("----------------")
						console.log(this.datas)
						console.log(this.datas.leader.id)
						this.isBoundWx(this.datas.leader.id)
					}, 1000)
				} else if (res.status.startsWith("1000")) {
					this.$api.msg(res.msg)
				} else {
					this.$api.msg("系统正忙~")
				}
			},
			quit(id) {
				uni.showModal({
					title: '退出提示',
					content: '2分钟内无法再次申请，您确定退出队伍吗？',
					showCancel: true,
					confirmText: '确定',
					success: async (e) => {
						if (e.confirm) {
							uni.showLoading({
								title: '正在退出...'
							})
							const res = await this.$api.request({
								url: '/team/unApply/' + id,
							})
							uni.hideLoading()
							if (res.status == 200) {
								this.loadData()
								uni.showToast({
									title:'退出成功~'
								})
								setTimeout(()=>{
									if (this.$api.prePage().loadData) {
										this.$api.prePage().loadData()
									}
								}, 1000)
							} else if (res.status.startsWith("1000")) {
								this.$api.msg(res.msg)
							} else {
								this.$api.msg("系统正忙~")
							}
						}
					}
				})
			},
			showModal(e) {
				// console.log(this.datas)
				// console.log(this.datas.team.size)
				this.teamName = this.datas.team.name
				this.contact = this.datas.team.contact
				this.teamBrief = this.datas.team.brief
				this.need = this.datas.team.size
				this.modalShow = true
			},
			hideModal(e) {
				this.modalShow = false
			},
			confirmModal() {
				// console.log(this.teamName)
				// console.log(this.teamBrief)
				if (this.teamName == '' || this.teamBrief == '' || this.contact == '') {
					this.$api.msg("请完善信息~")
					return;
				}
				this.update()
				this.hideModal()
			},
			async update(id) {
				// uni.showLoading()
				const res = await this.$api.request({
					url: '/team/update',
					data: {
						teamId: this.curTeamId,
						name: this.teamName,
						contact: this.contact,
						size: this.need,
						brief: this.teamBrief
					}
				})
				this.showTip(res.status, res.msg)
			},
			userDetail(id) {
				uni.navigateTo({
					url: '/pages/person/person-detail?id=' + id
				})
			},
			finish(){
				const _this = this
				uni.showModal({
					title: '完成组队',
					content: '您已组队成功了吗？',
					showCancel: true,
					confirmText: '是的',
					success: (e) => {
						if (e.confirm) {
							_this.finishTeam()
						}
					}
				})
			},
			async finishTeam(id) {
				uni.showLoading()
				const res = await this.$api.request({
					url: '/team/update',
					data: {
						teamId: this.curTeamId,
						size: 0
					}
				})
				console.log(res)
				uni.hideLoading()
				if (res.status == 200) {
					uni.navigateBack()
					if (this.$api.prePage().loadData) {
						this.$api.prePage().loadData()
					}
					this.$api.msg("恭喜您组队成功~")
				} else if (res.status.startsWith("1000")) {
					this.$api.msg(res.msg)
				} else {
					this.$api.msg("服务器正忙~")
				}
			},
			dissolve() {
				const _this = this
				uni.showModal({
					title: '解散队伍',
					content: '您确定解散队伍吗？',
					showCancel: true,
					confirmText: '解散',
					success: (e) => {
						if (e.confirm) {
							_this.dissolveTeam()
						}
					}
				})
			},
			async dissolveTeam(id) {
				uni.showLoading()
				const res = await this.$api.request({
					url: '/team/dissolve/' + this.curTeamId
				})
				console.log(res)
				uni.hideLoading()
				if (res.status == 200) {
					uni.navigateBack()
					if (this.$api.prePage().loadData) {
						this.$api.prePage().loadData()
					}
					uni.showToast({
						title:'队伍已解散~'
					})
				} else if (res.status.startsWith("1000")) {
					this.$api.msg(res.msg)
				} else {
					this.$api.msg("服务器正忙~")
				}
			},
			async loadData() {
				if(this.curTeamId==undefined || this.curTeamId=="") {
					uni.navigateBack()
					return
				}
				const res = await this.$api.request({
					url: '/team/teamDetail/' + this.curTeamId
				})
				console.log(res)
				this.datas = res.data
				this.game = res.data.game
				this.leader[0] = res.data.leader
				// console.log(res.data.team.members)
				// console.log(res.data.team.applicant)
				uni.stopPullDownRefresh();
				uni.hideLoading()
			},
			showTip(status, msg) {
				console.log(status)
				console.log(msg)
				// setTimeout(() => {
					// uni.hideLoading()
					if (status.startsWith("1000")) {
						this.$api.msg(msg)
					} else if (status == "200") {
						this.loadData()
						uni.showToast({
							title:'操作成功~'
						})
					} else {
						this.$api.msg("系统正忙~")
					}
					
				// }, 1000)
			},
			async kickOut(id) {
				console.log(this.curTeamId)
				console.log(id)
				uni.showLoading()
				const res = await this.$api.request({
					url: '/team/deleteApply',
					data: {
						teamId: this.curTeamId,
						applyId: id
					}
				})
				this.showTip(res.status, res.msg)
			},
			async agree(id) {
				uni.showLoading()
				const res = await this.$api.request({
					url: '/team/agree',
					data: {
						teamId: this.curTeamId,
						applyId: id
					}
				})
				this.showTip(res.status, res.msg)
			},
			async disagree(id) {
				uni.showLoading()
				const res = await this.$api.request({
					url: '/team/disagree',
					data: {
						teamId: this.curTeamId,
						applyId: id
					}
				})
				this.showTip(res.status, res.msg)
			},
			// 跳转到比赛详情
			goGameDetail(id) {
				uni.navigateTo({
					url: '/pages/game/game-detail?id=' + id
				})
			},
		},
		onShareAppMessage() {
			// uni.share({
			//     provider: "qq",
			//     scene: "WXSceneSession",
			//     type: 1,
			//     summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
			//     success: function (res) {
			//         console.log("success:" + JSON.stringify(res));
			//     },
			//     fail: function (err) {
			//         console.log("fail:" + JSON.stringify(err));
			//     }
			// });
			return {
				title: '快来加入我的队伍吧~',
				// imageUrl: 'https://easycampus-asset.oss-cn-shenzhen.aliyuncs.com/sharebg.png',
				path: '/pages/user/team/my-team-detail?id=' + this.curTeamId
			}
		},
	}
</script>

<style lang="scss">
	.cell-hover {
		background: #ff3d2f;
	}

	.game-container {
		// padding: 20upx;
		display: flex;
		flex-direction: column;

		.game-title {
			font-weight:600;
			font-size: 48upx;
			padding: 20upx;
			background-color: #fff;
			word-wrap:break-word; 
			word-break:break-all; 
		}

		.game-time {
			font-size: 24upx;
			color: #a6a6a6;
			padding-top: 10upx;

			text {
				margin-right: 20upx;
			}

			.game-source {
				color: $base-blue;
			}
		}

		.game-item-tags {
			display: flex;
			margin: 30upx 0 15upx 20upx;
		}

		.game-image {
			width: 100%;
			height: 300upx;
			padding-top: 20upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.line {
			border-top: 1upx solid #ccc;
		}

		.time-box {
			display: flex;
			align-items: center;
			padding: 20upx;
			background-color: #fff;
			font-size: 30upx;
		}

		.time-box-game text {
			// font-size: 36upx;
			// font-weight: 550upx;
		}

		.game-detail {
			margin-top: 20upx;
			background-color: #fff;
			// padding: 30upx;

			.game-detail-topic {
				// margin-bottom: 20upx;
				font-size: 36upx;
				padding: 20upx 0 0 20upx;
			}

			.game-detail-context {
				// margin-top: 20upx;
				padding: 30upx;
			}
		}

		.game-relative {
			background-color: #fff;
			margin-top: 5upx;

			.game-relative-tit {
				padding: 20upx;
				color: $base-blue;
			}

			.game-poster {
				padding-left: 20upx;
			}
		}

		.game-footer {
			width: 100%;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			padding: 15upx 40upx 15upx 40upx;
			align-items: center;
			background-color: #fafafa;
			border: 1upx solid #ccc;
			vertical-align: middle;

			.icons {
				display: flex;
				vertical-align: middle;

				text {
					font-size: 40upx;
					margin-right: 25upx;
				}

				.share-btn {
					border: none;
					background-color: transparent;
					outline: none;
					// height: 50upx;
					// width: 50upx;
					border: 1upx solid #f00;
				}

				.share-btn:after {
					border: none;
				}
			}


			.btns {
				button {
					margin-right: 20upx;
				}
			}
		}

		.team-foot {
			margin-bottom: 150upx;
		}
	}

	.need-box {
		margin-top: 20upx;
		background-color: #fff;
		display: flex;
		vertical-align: middle;
		padding-left: 20upx;
		justify-content: space-between;
		color: #8d8d8d;
		height: 100upx;
		line-height: 100upx;
	}
</style>
