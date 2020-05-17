<template>
	<view>
		<hx-navbar color="#505050" :back="false" barPlaceholder="hidden" backgroundColor="#fff">
			<block slot="left">
				<view class="filter">
					<view class="icon-top" @click="goHome">
						<text class="lg cuIcon-home"></text>
					</view>
				</view>
			</block>
			<view class="ctn">
				<text class="lg cuIcon-search"></text>
				<input confirm-type="search" 
				v-model="key" 
				class="input" 
				type="text" 
				placeholder-class="input-placeholder" 
				placeholder="输入关键词"
				>
			</view>
		</hx-navbar>
		<view style="margin-top: 120upx;">
			<view style="background-color: #fff;">
				<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="3000"
				 duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index" @click="swiperClick(item.id)">
						<image :src="item.url"></image>
					</swiper-item>
				</swiper>
			</view>
			<!--通告栏-->
			<view class="notice">
				<uni-notice-bar showGetMore="true" showIcon="true" scrollable="true" single="true" text="请关注'i瓜大'公众号!!! 发布、合作请联系管理员!!!"></uni-notice-bar>
			</view>
			<view style="margin-top: 40upx;">
				<sl-filter themeColor="#008de1" :menuList="menuList" @result="result"></sl-filter>
			</view>
			<view class="game-list">
				<k-activity-item @click="goDetail" :activity="activity"></k-activity-item>
			</view>
			<kMoreBtn @addlisttap="clickMoreBtn" :addlistdata="moreOpList"></kMoreBtn>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import kActivityItem from '@/components/k-ui/k-activity/k-activity-item.vue'
	import uniLoadMore from '@/components/uni-ui/uni-load-more/uni-load-more.vue'
	import slFilter from '@/components/other/sl-filter/sl-filter.vue'
	import uniNoticeBar from '@/components/uni-ui/uni-notice-bar/uni-notice-bar.vue'
	import kMoreBtn from "@/components/k-ui/k-more-btn/k-more-btn.vue"
	export default {
		components: {
			kActivityItem,
			uniLoadMore,
			slFilter,
			uniNoticeBar,
			kMoreBtn
		},
		data() {
			return {
				activity: [],
				loadingType: 'more',
				currentPage: 1,
				key: '',
				// 轮播图
				swiperList: [{
					id: 0,
					url: "http://weteam.sys.iamk.top/weteam2.png",
				}],
				// 筛选
				filterResult: '',
				menuList: [{
						'title': '分类',
						'key': 'category',
						'detailTitle': '请选择技能类型（单选）',
						'isMutiple': false,
						'detailList': [{
							'title': '不限',
							'value': ''
						}]

					},
					{
						'title': '时间',
						'key': 'time',
						'isSort': true,
						'detailList': [{
								'title': '默认',
								'value': ''
							},
							{
								'title': '全部',
								'value': 7
							},
							{
								'title': '正在报名',
								'value': 5
							},
							{
								'title': '报名结束',
								'value': 6
							}
						]
					}
				],
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
			};
			
		},
		onLoad() {
			this.loadData()
			this.getCategories()
			this.loadSlideshow()
		},
		methods: {
			swiperClick(id) {
				if (id == 0) {
					uni.navigateTo({
						url: '/pages/notice/manual'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/activity/detail?id=' + id
				})
			},
			async loadSlideshow() {
				if (this.swiperList.length >= 4) return;
				const _this = this
				const res = await this.$api.request({
					url: '/activity/getSlideshow'
				})
				if (res.data.length != 0) {
					res.data.forEach(function(r) {
						const a = {
							'id': r.id,
							'url': r.poster_url
						}
						_this.swiperList.push(a)
					})
				}
			},
			clickMoreBtn(e){
				if(e==-1) {
					return
				}
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
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			async getCategories() {
				const res = await this.$api.request({
					url: '/activity/category'
				})
				console.log(res)
				const _this = this
				res.data.forEach(function(a){
					const item = {
						title: a.category,
						value: a.id
					}
					_this.menuList[0].detailList.push(item)
				})
			},
			async result(val) {
				console.log(val)
				this.filterResult = JSON.parse(JSON.stringify(val))
				this.loadData('refresh')
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/activity/detail?id=' + id
				})
			},
			async loadData(status = 'add') {
				if (status == 'refresh') {
					this.currentPage = 1
					this.activity = []
				} else if (status = 'add') {
					if (this.loadingType === 'nomore') return;
					this.loadingType = 'loading'
				} else {
					this.loadingType = 'more'
				}
				// this.loadingType = 'loading'
				const res = await this.$api.request({
					url: '/activity/activities',
					method: 'POST',
					data: {
						key: this.key,
						categoryId: this.filterResult.category || '',
						source: '',
						time: this.filterResult.time || '',
						currentPage: this.currentPage,
						pageSize: this.$common.pageSize
					}
				})
				console.log(res)
				this.activity = [...this.activity, ...res.data]
				uni.hideLoading()
				if (res.data.length == 0 || res.data.length < this.$common.pageSize) {
					this.loadingType = 'noMore'
				}
			},
			onReachBottom() {
				if (this.activity.length < this.currentPage * this.$common.pageSize) {
					this.loadingType = 'noMore'
					return;
				}
				this.currentPage++;
				this.loadData()
			},
			onPullDownRefresh() {
				this.currentPage = 1
				this.activity = []
				this.loadData()
				setTimeout(() => {
					uni.stopPullDownRefresh();
					uni.showToast({
						title: '刷新成功'
					})
				}, 1000)

			},
			onShareAppMessage() {
				return {
					desc: 'weTeam呀',
					title: 'npu的小瓜子们，快来查看近期活动吧~',
					imageUrl: 'http://weteam.sys.iamk.top/weteamLogo2.png',
					path: '/pages/activity/activity',
				}
			},
		}
	}
</script>

<style lang="scss">
	.notice {
		height: 15px;
		line-height: 15px;
		text-align: center;
		letter-spacing: 10px;
		background: #fff;
		margin: 10rpx 10rpx;
	}
	
	.filter {
		padding-left: 20upx;

		.icon-top {
			font-size: 40upx;

			.icon-top-tit {
				font-size: 34upx;
			}
		}
	}

	.ctn {
		// margin-left: 20upx;
		border-radius: 40upx;
		padding: 4upx 15upx;
		border: 1upx solid #505050;
		width: 85%;
		display: flex;
		line-height: 44rpx;

		.input {
			padding-left: 20upx;
		}

		.input-placeholder {
			color: #505050;
			font-size: 28upx;
		}
	}

	.game-list {
		margin-top: 15rpx;
		margin-bottom: 80upx;
	}
</style>
