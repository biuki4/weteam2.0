<template>
	<!--竖版-->
	<view class="container">
		<view v-if="activity.length!=0">
			<view class="game-item" v-for="item in activity" :key="item.id">
				<view @click="navigator(item.id)">
					<view class="game-title">
						<text>{{item.activityName}}</text>
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
					</view>
					<view class="game-item-tags">
						<uni-tag :text="item.activityCategory.category" size="small" type="success" circle></uni-tag>
					</view>
					<view class="info">
						<text>主办方 {{item.activitySource}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// tag标签
	import uniTag from "@/components/uni-ui/uni-tag/uni-tag.vue"
	import uniFav from '@/components/uni-ui/uni-fav/uni-fav.vue' 

	export default {
		props: ['activity'],
		components: {
			uniTag,
			uniFav
		},
		data() {
			return {
			};
		},
		// 接收父组件传过来的数据
		// props: ['activity'],
		methods: {
			isUnknowTime(date){
				const flag = this.$common.isUnknowTime(date)
				if(flag) return "待定"
				return date
			},
			navigator(id) {
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
			font-size: 40upx;
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
			font-size: 24upx;
			color: #717171;
		}
	}
</style>
