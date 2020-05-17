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
				<text>{{getType(item.type)}}</text>
				<text class="padding-LR20">·</text>
				<text>{{item.brief}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['list', 'isMy'],
		data() {
			return {};
		},
		methods:{
			onClick(index) {
				this.$emit("edit", index)
			},
			getType(type){
				if(type==0) return '院级'
				if(type==1) return '校级'
				if(type==2) return '市级'
				if(type==3) return '省级'
				if(type==4) return '国家级'
				if(type==5) return '国际级'
				if(type==6) return '其他'
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

