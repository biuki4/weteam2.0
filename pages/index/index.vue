<template>
	<view class="container">
		<view>
			<hx-navbar color="#ffffff" :back="false" barPlaceholder="hidden" transparent="auto">
				<block slot="left">
					<view class="city">
						<view class="icon-top" @click="drawerVisiable = !drawerVisiable">
							<text class="lg cuIcon-sort"></text>
						</view>
					</view>
				</block>
				<view class="ctn">
					<text class="lg cuIcon-search"></text>
					<input confirm-type="search" disabled class="input" type="text" placeholder-class="input-placeholder" placeholder="查找比赛"
					 @click="navTo('/pages/index/game-list/game-list')">
				</view>
			</hx-navbar>
		</view>
		<view>
			<!-- 左侧边栏 -->
			<view>
				<uni-drawer :visible="drawerVisiable" @close="this.drawerVisiable = false">
					<view class="left-drawer">
						<van-sidebar :active-key="categoryIndex" @change="onKeyChange">
							<van-sidebar-item title="正在报名" />
							<van-sidebar-item title="往期精彩" />
							<view v-for="item in categories" :key="item.id">
								<van-sidebar-item :title="item.category" />
							</view>
							<!-- 							<van-sidebar-item title="往期精彩" />
							<van-sidebar-item title="标签名称" /> -->
						</van-sidebar>
					</view>
				</uni-drawer>
			</view>

			<!-- 头部轮播 -->
			<view class="carousel-section">
				<!-- 标题栏和状态栏占位符 -->
				<view class="titleNview-placing"></view>
				<!-- 背景色区域 -->
				<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
				<swiper class="carousel" circular @change="swiperChange" autoplay interval="3000">
					<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="swiperClick(item.id)">
						<image :src="item.src" />
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength}}</text>
				</view>
			</view>
			<!--通告栏-->
			<view class="notice">
				<uni-notice-bar showGetMore="true" showIcon="true" scrollable="true" single="true" text="请关注'i瓜大'公众号!!! 发布、合作请联系管理员!!!"></uni-notice-bar>
			</view>
			<!-- 			<view class="select" @click="navTo('/pages/index/game-list/game-list')">
				<text>更多筛选</text>
			</view> -->
			<!--比赛信息-->
			<view class="game-list">
				<game-item2 @click="goGameDetail" :games="games"></game-item2>
			</view>
			<!-- 回到顶部 -->
			<view>
				<backTop :src="backTop.src"></backTop>
			</view>
		</view>
		<kMoreBtn @addlisttap="clickMoreBtn" :addlistdata="moreOpList"></kMoreBtn>
		<uni-load-more :status="loadingType"></uni-load-more>
		<!-- <k-empty mTop=10 v-if="games.length==0"></k-empty> -->
	</view>
</template>

<script>
	import backTop from '@/components/other/back-top/back-top.vue'
	import gameItem2 from '@/components/k-ui/k-game-list/k-game-item.vue'
	import uniNoticeBar from '@/components/uni-ui/uni-notice-bar/uni-notice-bar.vue'
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import uniLoadMore from '@/components/uni-ui/uni-load-more/uni-load-more.vue'
	import kMoreBtn from "@/components/k-ui/k-more-btn/k-more-btn.vue"
	export default {
		components: {
			gameItem2,
			uniNoticeBar,
			uniDrawer,
			backTop,
			uniLoadMore,
			kMoreBtn
		},
		data() {
			return {
				// game的数据
				games: [],
				currentPage: 1,
				categoryId: -1,
				categoryIndex: 0,
				// 左侧边栏展开
				drawerVisiable: false,
				categories: [],
				// keyAction: 0,
				//回到顶部
				backTop: {
					src: 'http://www.iamk.top/static/back-top/top.png',
					scrollTop: 0
				},
				titleNViewBackground: 'rgb(205, 215, 218)',
				swiperCurrent: 0,
				swiperLength: 4,
				carouselList: [{
					id: 0,
					src: "http://weteam.sys.iamk.top/weteam2.png"
				}],
				bgColor: ["rgb(205, 215, 218)", "#e07472", "rgb(203, 87, 60)", "#a8a8a8"],
				//回到顶部,
				animateName: 'animated bounceInRight',
				loadingType: 'more',
				// 更多操作 最前面的显示在最下方
				moreOpList:[
					{
						"title":"版本日志",
						"icon": "formfill",
						"color": "#ff9900",
						"url": "/pages/user/log"
					},
					{
						"title":"问题反馈",
						"icon": "questionfill",
						"color": "#dd6161",
						"url": "/pages/user/user"
					},
					{
						"title":"发现新活动",
						"icon": "activityfill",
						"color": "#19be6b",
						"url": "/pages/user/want"
					},
					{
						"title": "发现新竞赛",
						"icon": "upstagefill",
						"color": "#55aaff",
						"url": "/pages/user/want"
					}]
			}
		},
		onLoad() {
			uni.showLoading({
				title: '正在加载'
			})
			this.loadSlideshow()
			this.getCategories()
			this.loadData()
		},
		onHide() {
			this.drawerVisiable = false
			// this.currentPage = 1
			// this.categoryId = -1
			// this.games = []
			// this.carouselList = []
		},
		onShow() {
			// this.loadData()
			// this.loadSlideshow()
			// const scene = docodeUrlComponent(query)
		},
		methods: {
			clickMoreBtn(e){
				if(e==-1) {
					return
				}
				// console.log(e)
				if(e==1) {
					uni.switchTab({
						url: this.moreOpList[e].url
					})
					return
				}
				uni.navigateTo({
					url: this.moreOpList[e].url
				})
			},
			onKeyChange(e) {
				console.log(e)
				// uni.showLoading({
				// 	title: '正在加载'
				// })
				if(e.detail <=1) {
					this.categoryId = e.detail-1;
				} else {
					console.log(e.detail)
					console.log(this.categories[e.detail - 2])
					console.log(this.categories[e.detail - 2].category)
					this.categoryId = this.categories[e.detail - 2].id
				}
				this.categoryIndex = e.detail
				console.log(this.categoryId)
				this.games = []
				this.currentPage = 1;
				this.loadData()
				this.drawerVisiable = false
			},
			async loadData(status = 'add') {
				if (status == "refresh") {
					this.currentPage = 1
					this.categoryId = -1
					this.games = []
				} else if (status = 'add') {
					if (this.loadingType === 'nomore') return;
					this.loadingType = 'loading'
				} else {
					this.loadingType = 'more'
				}
				// this.loadingType = 'loading'
				const res = await this.$api.request({
					url: '/game/gameList',
					method: 'GET',
					data: {
						id: this.categoryId,
						currentPage: this.currentPage,
						pageSize: this.$common.pageSize
					}
				})
				console.log(res)
				this.games = [...this.games, ...res.data]
				uni.hideLoading()
				if (res.data.length == 0 || res.data.length < this.$common.pageSize) {
					this.loadingType = 'noMore'
				}
			},
			async loadSlideshow() {
				if (this.carouselList.length >= 4) return;
				const _this = this
				const res = await this.$api.request({
					url: '/game/getSlideshow'
				})
				console.log(res)
				if (res.data.length != 0) {
					res.data.forEach(function(r) {
						const a = {
							'id': r.id,
							'src': r.poster_url
						}
						_this.carouselList.push(a)
					})
				}
			},
			async getCategories() {
				const res = await this.$api.request({
					url: '/category',
					method: 'GET',
				})
				this.categories = res.data
				// console.log(this.categories)
			},
			animateCSS() {
				// let _animateName = this.animateName
				this.animateName = ''
				// this.animateName = 'animated bounceInRight'
				// 回到初始状态
				setTimeout(function() {
					// this.animateName = ''
					this.animateName = 'animated bounceInRight'
				}.bind(this), 0);
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.bgColor[index];
			},
			//详情页
			navToDetailPage(item) {
				this.$api.msg(`点击详细`);
			},
			// 跳转到比赛详情
			goGameDetail(id) {
				uni.navigateTo({
					url: '/pages/game/game-detail?id=' + id
				})
			},
			swiperClick(id) {
				if (id == 0) {
					uni.navigateTo({
						url: '/pages/notice/manual'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/game/game-detail?id=' + id
				})
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
		},
		onReachBottom() {
			if (this.games.length < this.currentPage * this.$common.pageSize) {
				this.loadingType = 'noMore'
				return;
			}
			uni.showLoading({
				title: '正在加载'
			})
			this.currentPage++;
			this.loadData()
		},
		onShareAppMessage() {
			return {
				desc: 'weTeam呀',
				title: 'npu的小瓜子们，快来查看近期竞赛资讯吧~',
				imageUrl: 'http://weteam.sys.iamk.top/weteamLogo2.png',
				path: '/pages/index/index',
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			uni.showLoading({
				title: '正在加载'
			})
			this.currentPage = 1
			this.categoryId = -1
			this.categoryIndex = 0
			this.games = []
			this.loadData()
			setTimeout(() => {
				uni.stopPullDownRefresh();
				uni.showToast({
					title:'刷新成功'
				})
			}, 1000)

		},

	}
</script>

<style lang="scss">
	.icon-top {
		font-size: 55upx;
	}

	.ctn {
		border-radius: 40upx;
		padding: 4upx 15upx;
		border: 1upx solid #e3e3e3;
		width: 80%;
		display: flex;
		line-height: 44rpx;

		.input {
			padding-left: 20upx;
		}

		.input-placeholder {
			color: #fff;
			font-size: 28upx;
		}
	}

	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: 8upx;
		white-space: nowrap;

	}

	.a {
		color: red;
	}

	.head-input-box {
		width: 100%;
		background-color: #fff;

		.head-input {
			width: 80%;
			margin: 0 auto;
		}
	}

	page {
		background-color: $base-page;
	}

	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		// padding-top: 10upx;
		padding-top: 4vh;

		.titleNview-placing {
			height: var(--status-bar-height);
			// padding-top: 20vh;
			padding-top: 88upx;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}

	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50upx;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	.notice {
		height: 15px;
		line-height: 15px;
		text-align: center;
		letter-spacing: 10px;
		background: #fff;
		margin: 10rpx 10rpx;
	}

	.select {
		margin-top: 30upx;
		// border: 1upx solid #f00;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		vertical-align: middle;
		background-color: #fff;
		color: #6c6c6c;

		text {
			letter-spacing: 20upx;
		}
	}

	.game-list {
		margin-top: 50rpx;
		margin-bottom: 80upx;
	}
</style>
