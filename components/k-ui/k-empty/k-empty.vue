<template>
	<view class="empty-box">
		<view class="empty-logo animated bounce" :style="{marginTop: mTop + '%;'}">
			<image :src="logo"></image>
		</view>
		<view class="empty-tip">
			<text>{{tips}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			tips: {
				type: String,
				default: '这里空空如也~'
			},
			logo: {
				type: String,
				default: 'http://www.iamk.top/static/image/kong.png'
			},
			mTop: {
				type: Number,
				default: 40
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.empty-box {
		height: 100%;
		width: 100%;
		// height: 83vh;
		// margin-top: 20upx;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: column;
		// border: 1upx solid #f00;
		// background-color: #fff;
		
		.empty-logo {
			width: 250upx;
			height: 250upx;
			margin-top: 40%;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.empty-tip {
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			letter-spacing: 1upx;
			margin-top: 20upx;
			color:#767676;
		}
	}
</style>
