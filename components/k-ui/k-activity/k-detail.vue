<template>
	<view>
		<view class="game-container">
			<view style="background-color: #fff;">
				<view class="game-title padding-LR20 fontWeight550">
					<text>{{list.activityName}}</text>
					<!-- <text class="iconfont icon-shoucang1-copy"></text> -->
				</view>
				<view class="game-time padding-LR20">
					<text class="game-source">{{list.activitySource}}</text>
					<text>{{list.postTime}}</text>
				</view>
				<view class="game-item-tags animated bounceInRight">
					<uni-tag :text="list.activityCategory.category" size="small" type="success"></uni-tag>
				</view>
				<view class="game-image">
					<image :src="list.posterUrl"></image>
					<view class="cover" v-if="isEnd(list.registerEndTime)">
						报名已结束
					</view>
				</view>
			</view>
			<view>
				<view class="time-box">
					<text class="cuIcon-time" style="margin-right: 10upx;"></text>
					<text>报名时间：</text>
					<text>{{isUnknowTime(list.registerStartTime)}} ~ {{isUnknowTime(list.registerEndTime)}}</text>
				</view>
			</view>
			<view class="game-detail">
				<view class="game-detail-topic">
					<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>
					<text class="fontWeight550">活动信息</text>
<!-- 					<text v-if="list.teamSize==1">(个人制)</text>
					<text v-else>(团体制)</text> -->
				</view>
				<view class="game-detail-context">
					<rich-text :nodes="list.activityContent || '还没有发布相关的比赛介绍~'"></rich-text>
				</view>
			</view>
			<view class="game-relative">
				<view class="game-relative-tit">
					<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>官方群：
				</view>
				<view style="">
					<view v-if="list.contact!=''" style="padding-left:50upx;">
						<uni-link :href="list.contact" :text="list.contact" copyTips="链接已复制~"></uni-link>
						<!-- <text>{{list.contact}}</text> -->
					</view>
					<view v-else style="padding: 20upx 40upx;">
						暂无官方群~
					</view>
				</view>
			</view>
			<view class="game-relative">
				<view class="game-relative-tit">
					<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>报名链接：
				</view>
				<view style="">
					<view v-if="list.registerUrl!=''" style="padding-left: 50upx;">
						<uni-link :href="list.registerUrl" text="点击复制" copyTips="链接已复制~"></uni-link>
					</view>
					<view v-else style="padding: 20upx 40upx;">
						暂无报名链接~
					</view>
				</view>
			</view>
			<view class="game-relative">
				<view class="game-relative-tit">
					<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>通知链接：
				</view>
				<view style="">
					<view v-if="list.activityUrl!=''" style="padding-left: 50upx;">
						<uni-link :href="list.activityUrl" text="点击复制" copyTips="链接已复制~"></uni-link>
					</view>
					<view v-else style="padding: 20upx 40upx;">
						暂无活动链接~
					</view>
				</view>
			</view>
			<view class="game-relative">
				<view class="game-relative-tit">
					<text class="iconfont icon-GroupCopy" style="color:#008de1"></text>活动发布者：
				</view>
				<view class="margin-top10 game-poster">
					<k-list :users="poster" @click="userDetail"></k-list>
				</view>
			</view>
			<view style="margin-bottom: 150upx;"></view>
<!-- 			<view class="game-participate">
				<text>已有小队：11支</text>
				<text>报名人数：11人</text>
			</view> -->
			<view class="game-footer" v-if="isPreview==false">
				<view class="icons">
					<text @click="collect(list.id)" :class="isCollect==false?'cuIcon-favor':'cuIcon-favorfill'"></text>
					<text v-if="userInfo.user.userType <= 2" @click="editActivity" class="cuIcon-edit"></text>
					<text v-if="userInfo.user.userType <= 2" @click="deleteActivity" class="cuIcon-delete"></text>
				</view>
<!-- 				<view @click="participate">
					<button class="cu-btn text-white bg-blue">立即组队</button>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	// tag标签
	import uniTag from "@/components/uni-ui/uni-tag/uni-tag.vue"
	import kList from '@/components/k-ui/k-user-list/k-list.vue'
	import uniLink from "@/components/uni-ui/uni-link/uni-link.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		props:{
			list: {
				
			},
			poster: {
				
			},
			isCollect: {
				type: Boolean,
				default: false
			},
			isPreview: {
				type: Boolean,
				default: false
			}
		},
		components: {
			uniTag,
			kList,
			uniLink
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		data() {
			return {
				// 数据
				datas:[],
				// 其他
				// isCollect: false
			}
		},
		methods: {
			isUnknowTime(date){
				const flag = this.$common.isUnknowTime(date)
				if(flag) return "待定"
				return date
			},
			trigger(e) {
				let other = this.content.map((d, i) => {
					d.active = i == e.index
				})

				uni.showToast({
					title: '选择了' + this.content[e.index].text
				})
			},
			type(i) {
				if(i == 0)
					return 'success'
				else if(i == 1)
					return 'warning'
				else 
					return 'primary'
			},
			userDetail(id){
				if(id==undefined || id=='') {
					this.$api.msg("用户不存在~")
					return
				}
				uni.navigateTo({
					url: '/pages/person/person-detail?id=' + id
				})
			},
			collect(id){
				this.$emit("collect", id)
			},
			participate(){
				this.$emit("participate")
			},
			editActivity(){
				this.$emit('editActivity')
			},
			deleteActivity(){
				this.$emit('deleteActivity')
			},
			isEnd(e){
				return this.$api.isEnd(e)
			}
		}
	}
</script>

<style lang="scss">
	
	.cell-hover {
		background: #f00;
	}

	.game-container {
		// padding: 20upx;
		display: flex;
		flex-direction: column;

		.game-title {
			font-size: 48upx;
			padding-top: 20upx;
			background-color: #fff;
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
			margin: 15upx 0 15upx 20upx;
		}

		.game-image {
			width: 100%;
			height: 300upx;
			// padding-top: 20upx;
			position: relative;

			image {
				width: 100%;
				height: 100%;
			}
			
			.cover {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, .5);
				font-size: 50upx;
				color: #fff;
				letter-spacing:15px;
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
			margin-top: 20upx;
			
			.game-relative-tit {
				padding: 20upx;
				color: $base-blue;
			}
			
			.game-poster {
				padding-left: 20upx;
			}
		}
		
		.game-other {
			margin-top: 20upx;
			.marginBottom100 {
				margin-bottom: 100upx;
			}
			
			.game-other-item {
				align-items: center;
				padding: 10upx 0 10upx 20upx;
				display: flex;
				justify-content: space-between;
				background-color: #fff;
				
				.other-icon {
					font-size: 40upx;
					margin-right: 20upx;
				}
				
				.other-link {
					padding: 10upx;
				}
			}
		}

		.game-participate {
			margin-top: 50upx;
			text-align: right;

			text:nth-child(2) {
				margin-left: 40upx;
			}
		}
		
		.game-footer {
			width: 100%;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			padding:15upx 40upx 15upx 20upx;
			align-items: center;
			background-color: #fafafa;
			border: 1upx solid #ccc;
			

			.icons text{
				font-size: 40upx;
				margin-left: 30upx;
			}

		}
	}
</style>
