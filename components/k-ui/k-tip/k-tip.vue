<template>
	<view>
		<view class="cu-modal" :class="isShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{title}}</view>
					<view class="action" @tap="cancelModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{content}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="cancelModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirmModal">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tipTitle: {
				type: String,
				default: '提示'
			},
			tipContent: {
				type: String,
				default: ''
			},
			tipShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			};
		},
		methods: {
			cancelModal(e) {
				this.$emit('cancel')
			},
			confirmModal(e) {
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss">

</style>
