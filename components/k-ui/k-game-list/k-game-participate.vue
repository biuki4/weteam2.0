<template>
	<!--我的参与-->
	<view>
		<view class="game-item" @click="navigator(item.game.id)" v-for="(item, index) in list" :key="index">
			<view class="game-title">
				<text class="iconfont icon-GroupCopy"></text>
				<text>{{item.game.gameName}}</text>
				</view>
			<view class="game-image">
				<image :src="item.game.posterUrl"></image>
				<view class="cover" v-if="isEnd(item.registerEndTime)">
					报名已结束
				</view>
			</view>
			<view class="introduce">
				<view>
					<text>报名时间</text>
					<text>{{isUnknowTime(item.game.registerStartTime)}} ~ {{isUnknowTime(item.game.registerEndTime)}}</text>
				</view>
				<view>
					<text>比赛时间</text>
					<text>{{isUnknowTime(item.game.gameStartTime)}} ~ {{isUnknowTime(item.game.gameEndTime)}}</text>
				</view>
			</view>
			<view class="game-item-tags">
				<view  v-for="(tag, i) in item.game.gameTags" :key="i">
					<uni-tag :text="tag.tagName" size="small" :type="type(i)" circle></uni-tag>
				</view>
			</view>
<!-- 			<view class="game-item-tags">
				<uni-tag text="编程" size="small" type="success" circle></uni-tag>
				<uni-tag text="建模" size="small" type="warning" circle></uni-tag>
				<uni-tag text="写作" size="small" type="primary" circle></uni-tag>
			</view> -->
			<view class="info">
				<text>主办方 {{item.gameSource}}</text>
			</view>
			<view class="info" style="margin-top: 10upx;">
				<text>{{item.gameCategory.category}}类</text>
				<text style="margin: 0 20upx;">|</text>
				<text>{{getGameType(item.gameType)}}</text>
			</view>
			<view class="game-team">
				<view>
					<text class="iconfont icon-hongqi game-team-icon"></text>
					<text></text>
				</view>
				<view class="game-team-member-box">
					<view class="game-team-member"><image src="http://www.iamk.top/static/icon/missing-face.png"></image></view>
					<view class="game-team-member"><image src="http://www.iamk.top/static/icon/jia.png"></image></view>
					<view class="game-team-member"><image src="http://www.iamk.top/static/icon/jia.png"></image></view>
					<view class="game-team-member"><image src="http://www.iamk.top/static/icon/jia.png"></image></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-ui/uni-tag/uni-tag.vue"
	export default {
		props:['list'],
		components: {
			uniTag
		},
		data() {
			return {

			};
		},
		methods: {
			isUnknowTime(date){
				const flag = this.$common.isUnknowTime(date)
				if(flag) return "待定"
				return date
			},
			navigator(id){
				this.$emit('click',id)
			},
			type(i) {
				if(i == 0)
					return 'success'
				else if(i == 1)
					return 'warning'
				else 
					return 'primary'
			},
			isEnd(e){
				return this.$api.isEnd(e)
			},
			getGameType(i){
				return this.$api.getGameType(i)
			},
		}
	}
</script>

<style lang="scss">
	.game-item:nth-last-child(1){
		margin-bottom: 100upx;
	}
	
	.game-item {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10upx;
		box-shadow: 10upx 10upx 10upx #ccc;
		margin: 20upx;
		padding: 30upx;
		
		.game-title{
			font-size: 48upx;
			
			text:nth-child(1) {
				// margin-left: 20upx;
				font-size: 48upx;
				color: #008de1;
			}
		}
		
		.game-image {
			width: 100%;
			height: 250upx;
			margin-top: 20upx;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		.introduce{
			font-size: 28upx;
			color: #595959;
			margin-top: 10upx;
			
			text:nth-child(1) {
				color: $base-blue;
				margin-right: 15upx;
			}
		}
		
		.game-item-tags{
			display: flex;
			margin: 15upx 10upx 15upx 0;
		}
		
		.info {
			display: flex;
			font-size: 24upx;
			color: #717171;
		}
		
		.game-team {
			margin-top: 20upx;
			border-top: 1upx solid #dedede;
			padding-top: 20upx;
			display: flex;
			// overflow: hidden;
			
			.game-team-icon {
				color: #fa436a;
				font-size: 48upx;
				font-weight: 500;
			}
			
			.game-team-member-box {
				height: 50upx;
				width: 95%;
				padding-left: 40upx;
				display: flex;
				// border: 1upx solid #f00;
				
				.game-team-member {
					width: 50upx;
					height: 50upx;
					margin-right: 20upx;
					
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
