<template>
	<view>
		<hx-navbar :title="datas.nickname" color="#ffffff" background-color-linear-deg="45" />
		<view class="container">
			<view class="head-box">
				<view class="card-box">
					<view class="card-head">
						<view class="head-avatar">
							<img :src="datas.avatarUrl || 'http://www.iamk.top/static/icon/missing-face.png'" alt="">
							<view class="gender-icon">
								<view class=" cu-tag badge" 
									:class="{'cuIcon-female bg-pink':datas.gender==0,
										'cuIcon-male bg-blue':datas.gender==1, 
										'cuIcon-attentionforbid bg-cyan':datas.gender==-1}">
								</view>
							</view>
						</view>
						<view class="head-info">
							<text class="info-name">{{datas.nickname || '未设置' }}</text>
							<view class="info-icon">
								<uni-tag :text="datas.academy || '学院未知'" size="small" type="primary"></uni-tag>
								<uni-tag :text="datas.grade || '年级未知'" size="small" type="success"></uni-tag>
							</view>
							<text class="info-sig">{{datas.personInfo || '该用户很懒，还没有自我介绍~~'}}</text>
						</view>
					</view>
				</view>
<!-- 				<view class="card-nav">
					<view class="nav-item" @click="navTo('/pages/person/user-list/attention-list?id=' + datas.id)">
						<text class="item-num">{{attention || 0}}</text>
						<text class="item-tit">TA的关注</text>
					</view>
					<text class="division">|</text>
					<view class="nav-item" @click="navTo('/pages/person/user-list/fan-list?id=' + datas.id)">
						<text class="item-num">{{fans || 0}}</text>
						<text class="item-tit">TA的粉丝</text>
					</view>
				</view> -->
			</view>
			<view class="history-section icon">
				<!-- <list-cell icon="iconfont icon-qianbao" iconColor="#e07472" title="TA的报名" tips="TA的报名~" @eventClick="this.$api.msg('敬请期待~')"></list-cell> -->
				<!-- <list-cell icon="iconfont icon-canyu" iconColor="#ee883b" title="TA的参与" tips="TA的参与~" @eventClick="navTo('/pages/user/participate?id=' + datas.id)"></list-cell> -->
				<list-cell icon="iconfont icon-rongyu" iconColor="#54b4ef" title="TA的荣誉" @eventClick="navTo('/pages/set/personInfo/award/award?id=' + datas.id)"></list-cell>
				<list-cell icon="iconfont icon-zhuanyetechang" iconColor="#e07472" title="TA特长" @eventClick="navTo('/pages/set/personInfo/advantage?id=' + datas.id)"></list-cell>
				<list-cell icon="iconfont icon-liebiao" iconColor="#5fcda2" title="TA的发布" tips="TA发布的竞赛~" @eventClick="navTo('/pages/admin/my-post?id=' + datas.id)"></list-cell>
				<list-cell icon="iconfont icon-canyu" iconColor="#9789f7" title="联系方式" tips="快去联系他吧~" @eventClick="navTo('/pages/person/contact?id=' + datas.id)"></list-cell>
			</view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import uniTag from "@/components/uni-ui/uni-tag/uni-tag.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			listCell,
			uniTag
		},
		data() {
			return {
				datas: [],
				fans: 0,
				attention:0,
				id: ''
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: '正在加载'
			})
			console.log(options)
			this.id = options.id
			this.loadData()
		},
		onShow() {
			// this.getAttentionNum(this.datas.id)
			// this.getFanNum(this.datas.id)
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		methods:{
			async loadData() {
				console.log(this.id)
				const res = await this.$api.request({
					url: '/user/' + this.id,
					method: 'GET'
				})
				console.log(res)
				this.datas = res.data
				uni.hideLoading()
			},
			async getFanNum() {
				const res = await this.$api.request({
					url: '/user/countFans',
					data: {
						id: this.id
					}
				})
				this.fans = res.data
			},
			async getAttentionNum() {
				const res = await this.$api.request({
					url: '/user/countAttentions',
					data: {
						id: this.id
					}
				})
				this.attention = res.data
				
			},
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $base-page;
	}

	.container {
		// padding: 30upx;
		margin-top: 40upx;
		
		.head-box {
			// box-shadow: 10upx 0 10upx #ccc;
			// border-radius: 20upx;
		}

		.card-box {
			background-color: #fff;
			padding: 20upx;
			// border-radius: 20upx 20upx 0 0;
			
			.card-head {
				display: flex;
				align-items: center;
				
				
				.head-avatar {
					width: 130upx;
					height: 130upx;
					border-radius: 50%;
					// border: 1upx solid #f00;
					flex-shrink: 0;
					position: relative;
					
					img {
						width: 100%;
						height: 100%;
					}
					
					.gender-icon {
						position: absolute;
						top: 0;
						right: 0;
					}
				}
				
				.head-info {
					display: flex;
					flex-direction: column;
					padding-left: 30upx;
					
					.info-name {
						font-size: 40upx;
					}
						
					.info-sig {
						font-size: 24upx;
						margin-top: 15upx;
						color:#818181;
					}
					
					.info-icon {
						display: flex;
						margin-top: 10upx;
						// width: 200upx;
					}
				}
			}
		}
		
		.card-nav {
			display: flex;
			align-items: center;
			background-color: #fff;
			border: 1upx solid #f0f0f0;
			padding: 20upx;
			color: #848484;
			
			.nav-item {
				display: flex;
				flex-direction: column;
				width: 50%;
				text-align: center;
				
				.item-num {
					color: #242424;
				}
				
				.item-tit {
					font-size: 24upx;
				}
			}
			
			.division {
				color: #d9d9d9;
			}
		}
		
		
		.history-section {
			padding: 30upx 0 0;
			margin-top: 20upx;
			background: #fff;
			border-radius: 10upx;
			// box-shadow: 10upx 10upx 10upx #ccc;
			// border-radius: 0 0 20upx 20upx;
			// border-left: 15upx solid #f4793b;

		}
	}
</style>
