<template>
	<!-- 侧边栏，点击后展开 -->
	<view 
	class="main" 
	:class="[popupSize,position == 'left' ? 'position-left' : 'position-right']"
	:style="{width:status ? '200rpx' : '50rpx',backgroundColor:bgColor}">
		<slot name="main" v-if="status && position == 'right'"></slot>
		<image class="icon" :src="status ? changePath : initialPath" @click="handleOpen"></image>
		<slot name="main" v-if="status && position == 'left'"></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:false,
				changePath:''
			}
		},
		props:{
			position:{
				type:String,
				default:'left'
			},
			size: {
				type:String,
				default:'small',
			},
			bgColor:{
				type:String,
				default:'#12c7b6'
			}
		},
		methods: {
			handleOpen(){
				this.status = !this.status
			}
		},
		computed:{
			popupSize() {
				return `${this.position}-${this.size}`
			},
			initialPath() {
				return this.position == 'left' ? '../../static/arrow_right.png' : '../../static/arrow_left.png'
			}
		},
		watch:{
			status(val) {
				this.changePath = val && this.position == 'right' ? '../../static/arrow_right.png' : '../../static/arrow_left.png'
			}
		}
	}
</script>

<style>
.main {
	color: #fff;
	font-size: 28rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	transition: all .28s ease-out;
	min-width: 50rpx;
}
.left-small {
	height: 50rpx;
	border-radius:0 25rpx 25rpx 0;
}
.right-small {
	height: 50rpx;
	border-radius: 25rpx 0  0 25rpx;
}
.left-middle {
	height: 60rpx;
	border-radius:0  30rpx 30rpx 0;
}
.right-middle {
	height: 60rpx;
	border-radius: 30rpx 0  0 30rpx;
}
.position-right {
	position: fixed;
	right: 0;
	bottom: 250rpx;
}
.position-left {
	position: fixed;
	left: 0;
	bottom: 250rpx;
}
.icon{
	width: 40rpx;
	height: 40rpx;
}
.refrash_wrap{
	display: flex;
	align-items: center;
}
.text{
	width: 60rpx;
	margin-left:10rpx;
}
</style>
