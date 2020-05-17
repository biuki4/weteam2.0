<template>
	<!-- 组队列表 -->
	<view>
		<view class="team" v-for="(item, index) in list" :key="index">
			<view class="full-icon" v-if="item.size- item.members.length <= 0">
				<img src="http://www.iamk.top/static/image/full.png" alt="">
			</view>
			<view @click="goTeanDetail(item.id)">
				<view class="team-head">
					<view class="head-left">
						<view class="left-item left-item-name">
							<text class="iconfont icon-hongqi team-icon"></text>
							<text class="team-name">{{item.name}}</text>
						</view>
						<view class="left-item">
							<text class="left-item-tit">队伍介绍：</text>
							<text>(差 {{needNum(item.size, item.members.length)}} 人)</text>
							<!-- <text>(共招募 {{item.size}} 人)</text> -->
						</view>
					</view>
				</view>
				<view class="team-info">
					<view class="team-info-brief">
						<text>{{item.brief}}</text>
					</view>
				</view>
			</view>
			<view class="team-foot">
				<view class="team-foot-member-box">
					<view class="team-foot-member team-leader" @click="goUserDetail(item.userId)">
						<view class="leader-icon">
							<image src="http://www.iamk.top/static/image/huangguan.png"></image>
						</view>
						<image :src="item.leader.avatarUrl"></image>
					</view>
					<view class="member-box">
						<view class="team-foot-member" v-for="(member, i) in item.members" :key="i" @click="goUserDetail(member.id)">
							<image style="border:1upx solid #ccc;" :src="member.avatarUrl"></image>
						</view>
						<text v-if="item.members.length==0">快来加入我们吧~</text>
					</view>
				</view>
<!-- 				<view class="op-btn">
					<button v-if="userInfo.user.id == item.userId" class="cu-btn bg-green" @click="getTeamDetail(item.id)">查看</button>
					<button v-else-if="item.isMember" class="cu-btn bg-green" @click="quit(item.id)">已加入</button>
					<button v-else-if="item.isApplicant" class="cu-btn bg-blue" @click="unApply(item.id)">已申请</button>
					<button v-else class="cu-btn" @click="apply(item.id)">申请</button>
				</view> -->
			</view>
			<view class="cu-item arrow applying b-t" @click="goApplyList(item.id)">
				<view class="content">
					<text class="cuIcon-peoplelist text-pink"></text>
					<text class="text-grey">正在申请</text>
				</view>
				<view class="action">
					<view class="cu-avatar-group">
						<view v-for="(ite, i) in item.applicant" :key="i" class="cu-avatar round sm avatars" >
							<image :src="ite.avatarUrl"></image>
						</view>
						<view v-if="item.applicant.length==0" v-for="(ite, i) in 4" :key="i" class="cu-avatar round sm avatars" >
							<image src="http://www.iamk.top/static/icon/missing-face.png"></image>
						</view>
					</view>
					<text class="text-grey text-sm">{{item.applicant.length}} 人</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import kTip from '@/components/k-ui/k-tip/k-tip.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		props: ['list'],
		components:{
			kTip
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
			// needNum(item) {
			// 	if(this.list == "") return 0
			// 	if(item.size - item.members.length < 0) return
			// 	return item.size - item.members.length
			// }
		},
		methods: {
			needNum(a, b) {
				return a - b < 0 ? 0 : a - b
			},
			goUserDetail(id){
				this.$emit("userDetail", id)
			},
			goTeanDetail(id) {
				this.$emit("goTeamDetail", id)
			},
			unApply(id){
				this.$emit("unApply", id)
			},
			apply(id){
				this.$emit("apply", id)
			},
			quit(id){
				this.$emit("quit", id)
			},
			getTeamDetail(id){
				uni.navigateTo({
					url: '/pages/team/my-team-detail?id=' + id
				})
			},
			goApplyList(id){
				uni.navigateTo({
					url: '/pages/team/apply-user?id=' + id
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.team {
		background-color: #fff;
		padding: 30upx 30upx 15upx 30upx;
		position: relative;
		margin-top: 20upx;
		
		.full-icon {
			position: absolute;
			right: 10upx;
			top: 10upx;
			width: 120upx;
			height: 120upx;
			
			img {
				width: 100%;
				height: 100%;
			}
		}
		
		.team-head {
			
			.head-left {
				.left-item-name {
					word-wrap:break-word;
					word-break:break-all; 
				}
				
				.left-item {
					margin-top: 10upx;
					color: #616161;
						
					.left-item-tit {
						color: #55aaff;
						font-size: 30upx;
					}
					
					.team-icon {
						color: #fa436a;
						font-size: 48upx;
						font-weight: 500;
					}
					
					.team-name {
						font-size: 40upx;
						padding-left: 20upx;
						color: #000000;
					}
				}
				
				.team-brief {
					display: flex;
					// flex-direction: column;
					
					.brief {
						font-size: 28upx;
					}
				}
			}
		}
		.team-info {
			margin-top: 20upx;
			.team-info-brief {
				padding: 15upx;
				border: 1upx solid #ccc;
				border-radius: 10upx;
				min-height: 80upx;
				
				text {
					// font-size: 24upx;
					color: #909090;
				}
			}
		}
		.team-foot {
			margin-top: 20upx;
			border-top: 1upx solid #dedede;
			padding-top: 20upx;
			display: flex;
			// justify-content: space-around;
			
		
			.team-foot-member-box {
				// height: 50upx;
				width: 75%;
				display: flex;
				// border: 1upx solid #f00;
		
				.team-foot-member {
					width: 50upx;
					height: 50upx;
					line-height: 50upx;
					border-radius: 50%;
					margin: 0 10upx;
		
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				
				.team-leader {
					position: relative;
					margin-top: 5upx;
					flex-shrink: 0;
					// border: 1upx solid #f00;
					
					.leader-icon {
						width: 50upx;
						height: 50upx;
						position: absolute;
						top: -22upx;
						left: -22upx;
					}
				}
				.member-box {
					border-left: 1upx solid #ccc;
					display: flex;
					width: 80%;
					flex-wrap: wrap;
					padding-left: 20upx;
					margin-left: 10upx;
					
					.team-foot-member {
						margin-top: 5upx;
						margin-bottom: 5upx;
					}
					
					text {
						color: #909090;
						margin-top: 15upx;
					}
				}
			}
			
			.op-btn {
				margin-left: 20upx;
			}
		}
		
		.applying {
			display: flex;
			justify-content: space-between;
			margin-top: 15upx;
			padding-top: 20upx;
			font-size: 30upx;
			border-top: 1upx solid #ccc;
			vertical-align: middle;
			
			.content {
				text {
					margin-right: 15upx;
				}
			}
			
			.avatars {
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				
				image {
					height: 100%;
					width: 100%;
					border-radius: 50%;
				}
			}
		}
	}
</style>
