<template>
	<view>
		<view class="card-box" v-for="(item, index) in list" :key="index">
			<view class="cu-bar bg-white solid-bottom card-title">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> <text>{{item.name}}</text>
				</view>
				<view class="action" v-if="isMy==true">
					<view @click="onClick(index)"><text class="cuIcon-write"></text></view>
				</view>
			</view>
			<view class="card-content">
				{{item.brief}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['list', 'isMy'],
		data() {
			return {

			};
		},
		methods:{
			onClick(index) {
				console.log("click")
				this.$emit("edit", index)
			}
		}
	}
</script>

<style lang="scss">
	.card-box {
		background-color: #fff;
		// border: 1upx solid #c2c2c2;
		margin: 20upx;

		.card-title {
			background-color: #fff;
		}

		.card-content {
			padding: 40upx;
			border-top: 1upx dotted #cccccc;
			color: #787878;
		}
	}
</style>
