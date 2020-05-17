<template>
	<view class="content">
		<hx-navbar title="WeTeam" color="#ffffff" background-color-linear-deg="45" />
		<view class="row b-b">
			<text class="tit">版本号</text>
			<text class="tiv">v1.0.1</text>
		</view>
		<view class="row b-b">
			<text class="tit">贡献</text>
			<text class="tiv">LK/FDX/LSC/MY/ZZF/YQL/LYQ</text>
		</view>
		<view class="row b-b">
			<text class="tit">联系方式</text>
			<text class="tiv">QQ群: 1060127624</text>
		</view>
		<text class="tcp">NWPU WeTeam开发</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background: $base-page;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.tiv{
			flex: 1;
			font-size: 30upx;
			color: #aaaaaa;
			text-align: right;
		}
		
	}
	
	.tcp{
		width: 100%;
		font-size: 28upx;
		color: #aaaaaa;
		text-align: center;
		position: absolute;
		bottom: 200upx;
	}
	
	
	
</style>
