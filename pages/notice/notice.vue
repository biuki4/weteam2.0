<template>
	<view>
		<hx-navbar title="消息" color="#ffffff" background-color-linear-deg="45" />
		<!-- <k-empty tips="您还没有任何消息哦~"></k-empty> -->
<!-- 		<view v-if="!hasLogin">
			<k-empty tips="您还没有任何消息哦~"></k-empty>
			<view class="">
				去登陆
			</view>
		</view> -->
		<view class="notice-item" @click="navTo('/pages/notice/manual')">
			<text class="time">2020-4-13</text>
			<view class="content">
				<text class="title">欢迎使用WeTeam</text>
				<view class="img-wrapper">
					<image class="pic" src="http://www.iamk.top/static/manual/welcome.png"></image>
				</view>
				<text class="introduce">
					点击查看WeTeam用户手册及更多介绍~
				</text>
				<view class="bot b-t" hover-class="cell-hover" :hover-stay-time="50" @click="navTo('查看详情')">
					<text class="detail">查看详情</text>
					<text class="more-icon iconfont icon-you"></text>
				</view>
			</view>
		</view>
		
		
		
<!-- 		<view v-if="hasLogin">
			<view class="notice-item" v-for="(item, index) in notices" :key="item.id">
				<text class="time">{{item.createTime | dateFormat2}}</text>
				<view class="content">
					<text class="title">{{item.title}}</text>
					<view class="img-wrapper">
						<image class="pic" :src="item.imgUrl"></image>
					</view>
					<text class="introduce">
						{{item.msgContent}}
					</text>
					<view class="bot b-t" hover-class="cell-hover" :hover-stay-time="50" @click="navTo('查看详情')">
						<text class="detail">查看详情</text>
						<text class="more-icon iconfont icon-you"></text>
					</view>
				</view>
			</view>
		</view> -->
<!-- 		<view>
			<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	// 回调顶部
	import backTop from '@/components/other/back-top/back-top.vue'
	export default {
		components: {
			backTop
		},
		data() {
			return {
				//回到顶部
				backTop: {
					src: 'http://www.iamk.top/static/back-top/top.png',
					scrollTop: 0
				},
				currentPage: 1,
				notices: []
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad() {
			// this.loadData()
		},
		onShow() {
			
		},
		onReachBottom() {
			// if (this.notices.length < this.currentPage * this.$common.pageSize) return;
			// this.currentPage++
			// this.loadData()
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			async loadData() {
				const res = await this.$api.request({
					url: '/msg/msgList',
					method: 'GET',
					data: {
						currentPage: this.currentPage,
						pageSize: this.$common.pageSize
					}
				})
				this.notices = [...this.notices, ...res.data]
			},
			//监听image加载完成
			onImageLoad(item) {
				// this.loadedItemIds.add(item.id)
				// this.$forceUpdate()
			},
			//监听image加载失败
			onImageError(key, index) {
				// this[key][index].skuImg = '/static/errorImage.jpg';
			},
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;

		.time {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80upx;
			padding-top: 10upx;
			font-size: 26upx;
			color: #7d7d7d;
		}

		.content {
			width: 710upx;
			padding: 0 24upx;
			background-color: #fff;
			border-radius: 10upx;

			.title {
				display: flex;
				align-items: center;
				/* height: 90upx; */
				font-size: 45upx;
				font-weight: 500;
				padding: 20upx 0 15upx 0;
				color: #303133;
			}

			.img-wrapper {
				width: 100%;
				height: 260upx;
				position: relative;

				.pic {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 6upx;
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
					font-size: 36upx;
					color: #fff;
				}
			}

			.introduce {
				padding: 16upx 0;
				font-size: 28upx;
				color: #606266;
				line-height: 38upx;
				max-height: 90upx;
				width: 660upx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;		
				word-wrap: break-word;	
				white-space: normal !important;		
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;

			}

			.bot {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 80upx;
				font-size: 24upx;
				color: #707070;
				position: relative;

				.detail {
					color: $base-blue;
				}

				.more-icon {
					font-size: 32upx;
				}
			}


		}
	}

	.cell-hover {
		background: #fafafa;
	}
</style>
