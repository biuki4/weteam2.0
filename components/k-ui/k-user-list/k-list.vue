<template>
	<view>
		<!-- 按组使用 -->
		<view class="container">
			<view class="swipe-box" v-for="item in users" :key="item.id" @click="click(item.id)">
				<view class="box">
					<img :src="item.avatarUrl" alt="">
					<view class="box-info">
						<text class="info-nickname">{{item.nickname}}</text>
						<text class="info-username">{{item.username}}</text>
					</view>
					<view class="box-icon">
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['users'],
		data() {
			return {
			}
		},
		components: {
		},
		methods: {
			click(id){
				this.$emit("click", id)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		background-color: #fff;

		.swipe-box {
			// margin: 5upx;
			border-bottom: 1upx solid #ccc;
		}

		.box {
			display: flex;
			align-items: center;
			padding: 10upx 0 10upx 20upx;

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
