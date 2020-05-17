<template>
	<view>
		<view v-for="(item,index) in list" :key="index" @click="onClick(item.id)">
			<view class="team">
<!-- 				<view class="full-icon" v-if="item.members.length >= item.size-1">
					<img src="http://www.iamk.top/static/image/full.png" alt="">
				</view> -->
				<view class="team-head">
					<view class="head-left">
						<view class="left-item">
							<text class="iconfont icon-hongqi team-icon"></text>
							<text class="team-name">{{item.name}}</text>
						</view>
						<view class="left-item">
							<text class="left-item-tit">竞赛：</text>
							<text>{{item.game_name}}</text>
						</view>
						<view class="left-item">
							<text class="left-item-tit">队伍介绍：</text>
							<!-- <text>{{item.team_no}}</text> -->
						</view>
					</view>
				</view>
				<view class="team-info">
					<view class="team-info-brief">
						<text>{{item.brief}}</text>
					</view>
				</view>
			</view>
			<view class="bot b-t" hover-class="cell-hover" :hover-stay-time="50">
				<text class="detail">查看详情</text>
				<text class="more-icon iconfont icon-you"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-ui/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-ui/uni-collapse-item/uni-collapse-item.vue'
	import kList from '@/components/k-ui/k-team/k-user.vue'
	export default {
		props: ['list'],
		components: {
			 uniCollapse,
			 uniCollapseItem,
			 kList
		},
		data() {
			return {

			}
		},
		methods: {
			onClick(id){
				this.$emit('click', id)
			}
		}
	}
</script>

<style lang="scss">
	.team {
		background-color: #fff;
		padding: 20upx;
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
					flex-direction: column;
					
					.brief {
						margin-top: 10upx;
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
	}
	.bot {
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
		padding:0 20upx;
	
		.detail {
			color: $base-blue;
		}
	
		.more-icon {
			font-size: 32upx;
		}
	}
</style>
