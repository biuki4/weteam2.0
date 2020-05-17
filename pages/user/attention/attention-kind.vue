<template>
	<view>
		<hx-navbar title="我的收藏" color="#ffffff" background-color-linear-deg="45"/>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50" @click="navTo('/pages/user/attention/game-attention?id='+userId)">
			<text class="cell-tit">竞赛</text>
			<text class="cuIcon-right"></text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50" @click="navTo('/pages/user/attention/activity-attention?id='+userId)">
			<text class="cell-tit">活动</text>
			<text class="cuIcon-right"></text>
		</view>	
	</view>
</template>

<script>

	export default {
		components:{
			
		},
		data() {
			return {
				userId: ''
			};
		},
		onLoad(options) {
			this.userId = options.id
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
