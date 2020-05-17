<template>
	<!-- 联系方式 -->
	<view class="container">
		<hx-navbar title="联系方式" color="#ffffff" background-color-linear-deg="45" />
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit">联系方式</text>
			<text>{{datas.contact || '未知'}}</text>
			<text class="cell-more iconfont icon-you"></text>
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit">电话</text>
			<text>{{datas.phone || '未知'}}</text>
			<text class="cell-more iconfont icon-you"></text>
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="100">
			<text class="cell-tit">邮箱</text>
			<text>{{datas.email || '未知'}}</text>
			<text class="cell-more iconfont icon-you"></text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				curUserid: '',
				datas: []
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: '正在加载'
			})
			this.curUserid = options.id
			this.loadData()
		},
		methods: {
			async loadData() {
				const res = await this.$api.request({
					url: '/user/' + this.curUserid,
					method: 'GET'
				})
				this.datas = res.data
				uni.hideLoading()
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

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
