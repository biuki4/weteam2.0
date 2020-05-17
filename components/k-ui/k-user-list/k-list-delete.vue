<template>
	<view>
		<!-- 可删除 -->
		<view class="container">
			<uni-swipe-action>
				<view class="swipe-box" v-for="item in users" :key="item.id">
					<uni-swipe-action-item :options="options" @click="onClick" @change="change" autoClose>
						<view class="box">
							<img :src="item.avatarUrl" alt="">
							<view class="box-info">
								<text class="info-nickname">{{item.nickname || '未设置'}}</text>
								<text class="info-username">{{item.username || '未设置'}}</text></view>
							<view class="box-icon">
								<van-icon name="arrow"></van-icon>
							</view>
						</view>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		props: ['users'],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				deleteModalShow: false
			}
		},
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		methods: {
			onClick(e) {
				console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
				this.deleteModalShow = true
			},
			change(e) {
				console.log('当前开启状态：' + e)
			},
			deleteConfirm() {
				console.log("确认删除")
			},
			deleteCancel() {
				
			},
			deleteClose() {
				this.deleteModalShow = false
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
			padding: 25upx;
			// border: 1upx solid #f00;

			img {
				width: 77upx;
				height: 77upx;
			}

			.box-info {
				padding-left: 20upx;
				display: flex;
				flex-direction: column;
				// border: 1upx solid #00f;

				text {
					margin-top: -5upx;
				}

				.info-nickname {
					font-size: 36upx;
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
