<template>
	<view>
		<view class="container" 
		v-for="(item,index) in users" :key="index">
			<view class="swipe-box" @click="onClick(item.id)">
				<view class="box">
					<img :src="item.avatarUrl">
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
	import {
		mapState
	} from 'vuex';
	export default {
		components: {

		},
		props: {
			users:{
				type: Array,
				default: () => []
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			onClick(id){
				this.$emit("click", id)
			},
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
			padding: 10upx 0 10upx 20upx;
			background-color: #fff;

			img {
				width: 60upx;
				height: 60upx;
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
					margin-top: 6upx;
				}

			}

			.box-icon {
				position: absolute;
				right: 20upx;
				font-size: 40upx;
				color: #ccc;
			}
		}
	}
</style>
