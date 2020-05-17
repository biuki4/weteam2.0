<template>
	<view>
<!-- 		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
		</scroll-view> -->
		<view class="DrawerClose" :class="isShow?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow" :class="isShow?'show':''">
			<view style="padding: 20upx;">
				<view style="border: 1upx solid #fff;">
					<view class="cu-bar bg-white">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>常见问题
						</view>
					</view>
					<view class="margin-top10" style="border: 1upx solid #fff;">
						<uni-collapse>
							<uni-collapse-item title="使用须知">
								<view style="background-color: #fafafa;">
								   <uni-card title="使用须知" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png">
										<view>
											<text>- 为了让您更好的使用组队功能,请关注"i瓜大"公众号，当有小伙伴申请加入时，我们将通过公众号通知您，以便及时处理。\n\n</text>
											<text>- 您必须登录后才能使用组队的相关功能，如查看组队列表、创建队伍、申请加入等功能\n\n</text>
											<text>- 更多功能介绍请查询【我的】=>【使用指南】</text>
										</view>
								   </uni-card>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="如何组队？">
								<view style="background-color: #fafafa;">
								   <uni-card title="组队" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png">
										<view>
											<text>- 点击右下方【创建】按钮，输入相应的信息即可\n\n</text>
											<text>- 每人只能参加/创建一个队伍，若已经参加/创建队伍，则无法申请加入其他队伍</text>
										</view>
										
								   </uni-card>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="如何查看队伍情况？">
								<view style="background-color: #fafafa;">
								   <uni-card title="查看队伍情况" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png">
										<view>
											<text>方法一：\n</text>
											<text>点击队伍列表中每支队伍的【正在申请】，即可查看正在申请中的用户列表\n\n</text>
											<text>方法二：\n</text>
											<text>选择任一队伍查看详情，点击【队员列表】查看当前队伍中的队员，点击下方【申请列表】查看当前队伍中的申请用户列表</text>
										</view>
								   </uni-card>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="如何获取用户联系方式？">
								<view style="background-color: #fafafa;">
								   <uni-card title="获取用户联系方式" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png">
										<view>
											<text>方法一：\n</text>
											<text>点击用户头像进入用户介绍面板，点击【联系方式】即可查看用户填写的联系方式\n\n</text>
											<text>方法二：\n</text>
											<text>选择任一队伍查看详情，可以查询队长填写的联系方式\n\n</text>
											<text>方法三：\n</text>
											<text>关注“i瓜大”公众号，有用户申请加入时将通过公众号提醒您</text>
						
										</view>
								   </uni-card>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="如何管理队伍？">
								<view style="background-color: #fafafa;">
								   <uni-card title="管理队伍" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png">
										<view>
											<text>进入队伍详情，展开队员列表/申请列表，点击任一队员，即可进行相应的操作\n</text>	
										</view>
								   </uni-card>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="如何如何分享队伍？">
								<view style="background-color: #fafafa;">
								   <uni-card title="分享队伍" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png">
										<view>
											<text>进入队伍详情，点击右上方的"…"按钮,即可分享至微信用户\n</text>	
										</view>
								   </uni-card>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>
				</view>
			</view>
		</scroll-view>
		<view>
			<drag-button v-if="!isShow" :isDock="true" existTabBar text="帮助" @btnClick="btnClick" @btnTouchstart="btnTouchstart"
			 @btnTouchend="btnTouchend" />
		</view>
	</view>
</template>

<script>
	import dragButton from "@/components/other/drag-button/drag-button.vue";
	import uniCollapse from '@/components/uni-ui/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-ui/uni-collapse-item/uni-collapse-item.vue'
	import uniCard from '@/components/uni-ui/uni-card/uni-card.vue'
	export default {
		components: {
			dragButton,
			uniCollapse,
			uniCollapseItem,
			uniCard
		},
		data() {
			return {
				isShow: false
			};
		},
		methods: {
			showModal(e) {
				this.isShow = true
			},
			hideModal(e) {
				this.isShow = false
				this.onClick()
			},
			btnClick() {
				this.isShow = true
				this.onClick()
			},
			btnTouchstart() {
				// console.log('btnTouchstart');
			},
			btnTouchend() {
				// console.log('btnTouchend');
			},
			onClick() {
				this.$emit("click", this.isShow)
			}
		},
	}
</script>

<style lang="less" scoped>
	.item {
		background-color: #fafafa;
		padding: 30rpx;
	}

	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
