<template>
	<!--竖版-->
	<view class="container">
		<view v-if="games.length!=0">
			<view class="game-item" v-for="item in games" :key="item.id">
				<view @click="navigator(item.id)">
					<view class="game-title">
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
							<text class="time-tlt">报名时间：</text>
							<text>{{isUnknowTime(item.registerStartTime)}} ~ {{isUnknowTime(item.registerEndTime)}}</text>
						</view>
						<view>
							<text class="time-tlt">比赛时间：</text>
							<text>{{isUnknowTime(item.gameStartTime)}} ~ {{isUnknowTime(item.gameEndTime)}}</text>
						</view>
<!-- 						<view class="time-tip">
							<text>* 时间以详情为准</text>
						</view> -->
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
		</view>
<!-- 		<view v-if="games.length==0">
			<k-empty tips="这里空空如也哦~"></k-empty>
		</view> -->
	</view>
</template>

<script>
	// tag标签
	import uniTag from "@/components/uni-ui/uni-tag/uni-tag.vue"
	import uniFav from '@/components/uni-ui/uni-fav/uni-fav.vue' 

	export default {
		props: ['games'],
		components: {
			uniTag,
			uniFav
		},
		data() {
			return {
			};
		},
		// 接收父组件传过来的数据
		// props: ['games'],
		methods: {
			isUnknowTime(date){
				const flag = this.$common.isUnknowTime(date)
				if(flag) return "待定"
				return date
			},
			navigator(id) {
				console.log(id)
				this.$emit('click', id)
			},
			onClickCollect(){
				this.collectChecked = !this.collectChecked
			},
			type(i) {
				if(i == 0) return 'success'
				if(i == 1) return 'warning' 
				return 'primary'
			},
			getGameType(i){
				return this.$api.getGameType(i)
			},
			isEnd(e){
				return this.$api.isEnd(e)
			}
		}
	}
</script>

<style lang="scss">
	
	.container {
		margin-bottom: 50upx;
	}
	.game-item {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10upx;
		box-shadow: 10upx 10upx 10upx #ccc;
		margin: 20upx;
		padding: 30upx;
		position: relative;
		
		.game-title {
			font-size: 48upx;
			// width: 80%;
			text {
				// margin-left: 20upx;
			}
		}

		.game-image {
			width: 100%;
			height: 250upx;
			margin-top: 20upx;
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

		.introduce {
			font-size: 28upx;
			color: #595959;
			margin-top: 10upx;

			.time-tlt {
				color: $base-blue;
				margin-right: 15upx;
			}
			
			.time-tip {
				color: #686b6f;
				font-size: 24upx;
				margin-top: 10upx;
			}
		}

		.game-item-tags {
			display: flex;
			margin: 15upx 10upx 15upx 0;
		}

		.info {
			display: flex;
			// flex-direction: column;
			font-size: 24upx;
			color: #717171;
			
			// text {
			// 	margin-bottom: 10upx;
			// }
			
			// text:last-child {
			// 	margin-bottom: 0;
			// }
		}
	}
</style>
