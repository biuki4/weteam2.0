<template>
	<view>
		<!-- 关注 -->
		<hx-navbar :title="navBarName" color="#ffffff" background-color-linear-deg="45" />
		<view class="container">
			<view class="swipe-box" v-for="(item, index) in users" :key="item.id" data-name="123">
				<view class="box">
					<img :src="item.avatarUrl" alt="">
					<view class="box-info">
						<text class="info-nickname">{{item.nickname}}</text>
						<text class="info-username">{{item.username}}</text>
					</view>
					<view class="box-icon" v-if="userInfo.user.id!=item.id">
						<!-- 关注图标 -->
						<uni-fav :content-text="favContext" bg-color-checked="#55aaff"
						:checked="ids.indexOf(item.id)==-1?false:true" @click="collect(item.id)" ></uni-fav>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniFav from '@/components/uni-ui/uni-fav/uni-fav.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			uniFav
		},
		props: {
			users:{
				type: Array,
				default: () => []
			},
			navBarName: {
				type: String,
				default: 'WeTeam'
			},
			ids:{
				type: Array,
				default: () => []
			},
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
		},
		data() {
			return {
				favContext:{
					contentDefault: '关注',
					contentFav:'已关注'
				}
			}
		},
		methods: {
			collect(id){
				this.$emit("follow", id)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;

		.swipe-box {
			margin: 3upx;
		}

		.box {
			display: flex;
			align-items: center;
			padding: 15upx 0 15upx 20upx;
			background-color: #fff;

			img {
				width: 77upx;
				height: 77upx;
				border-radius: 50%;
			}

			.box-info {
				padding-left: 20upx;
				display: flex;
				flex-direction: column;
				// border: 1upx solid #00f;

				// text {
				// 	margin-top: -5upx;
				// }

				.info-nickname {
					font-size: 30upx;
				}

				.info-username {
					font-size: 24upx;
					color: #535353;
					margin-top: 10upx;
				}

			}

			.box-icon {
				position: absolute;
				right: 20upx;
				font-size: 40upx;
			}
		}
	}
</style>
