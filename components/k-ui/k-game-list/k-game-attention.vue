<template>
	<!--我的参与-->
	<view>
		<view class="game-item" @click="navigator(item.id)" v-for="(item, index) in list" :key="index">
			<view class="game-title">
				<text class="iconfont icon-GroupCopy"></text>
				<text>{{item.gameName}}</text>
				</view>
			<view class="game-image">
				<image :src="item.posterUrl"></image>
				<view class="cover" v-if="isEnd(item.registerEndTime)">
					报名已结束
				</view>
			</view>
			<view class="introduce">
				<view>
					<text>报名时间</text>
					<text>{{isUnknowTime(item.registerStartTime)}} ~ {{isUnknowTime(item.registerEndTime)}}</text>
				</view>
				<view>
					<text>比赛时间</text>
					<text>{{isUnknowTime(item.gameStartTime)}} ~ {{isUnknowTime(item.gameEndTime)}}</text>
				</view>
			</view>
			<view class="game-item-tags">
				<view  v-for="(tag, i) in item.gameTags" :key="i">
					<uni-tag :text="tag.tagName" size="small" :type="type(i)" circle></uni-tag>
				</view>
			</view>
			<view class="info">
				<text>主办方 {{item.gameSource}}</text>
			</view>
			<view class="info" style="margin-top: 10upx;">
				<text>{{item.gameCategory.category}}类</text>
				<text style="margin: 0 20upx;">|</text>
				<text>{{getGameType(item.gameType)}}</text>
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
		components: {
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
			position: relative;
			
			image{
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
			// flex-direction: column;
			font-size: 24upx;
			color: #717171;
		}
	}
</style>
