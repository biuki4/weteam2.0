<template>
	<view class="page">
		<hx-navbar title="版本日志" color="#ffffff" background-color-linear-deg="45" />
		<view>
			<!-- v2.0 -->
			<view class="cu-timeline">
				<view class="cu-time" style="padding-left:15upx; display: flex;flex-direction: column;">
					<text>v2.0</text>
					<text>5-14</text>
				</view>
				<view class="cu-item text-green cuIcon-noticefill">
					<view><text>【增加】</text> </view>
					<view class="content bg-green shadow-blur ">
						<text>
							- 增加了【活动】板块
							
							- 增加【发现新竞赛/活动】功能。感谢反馈未发布的活动/竞赛
							
							- 增加【组队提醒】功能。使用前请关注"i瓜大"公众号
							
							-【组队列表】增加【帮助】手册，显示常见问题
						</text>
					</view>
				</view>
				<view class="cu-item text-green cuIcon-noticefill">
					<view><text>【修改】</text> </view>
					<view class="content bg-green shadow-blur ">
						<text>
							- 创建/申请队伍只需完善【联系方式】即可
							
							- 【学号】【年级】等信息，通过翱翔门户默认获取，【学号】将不可修改
						</text>
					</view>	
				</view>	
				
			</view>
			<!-- v1.1 -->
			<view class="cu-timeline">	
				<view class="cu-time" style="padding-left:15upx; display: flex;flex-direction: column;">
					<text>v1.1</text>
					<text>4-23</text>
				</view>
				<view class="cu-item text-grey cuIcon-noticefill">
					<view><text>【修改】</text> </view>
					<view class="content bg-grey shadow-blur ">
						<text>
							- 【问题反馈】移动到【我的】界面，无需登录即可反馈
						</text>
					</view>
				</view>
				<view class="cu-item text-grey cuIcon-noticefill">
					<view><text>【增加】</text> </view>
					<view class="content bg-grey shadow-blur ">
						<text>
							- 增加【组队完成】功能，通过联系方式自行组队成功后，结束组队
							
							- 添加【设置组队人数】功能，可以自行设置需要的人数
						</text>
					</view>
				</view>
				<view class="cu-item text-blue cuIcon-noticefill">
					<view><text>【提示】</text> </view>
					<view class="content bg-blue shadow-blur ">
						<text>
							- 大家组队记得完善个人信息哦，方便其他人通过联系方式找到你
							
							- 可以完善自己的【特长】【获奖经历】等信息，以供他人参考
							
							- 可以填写【自我介绍】，组队时可以参考哦~
						</text>
					</view>
				</view>
				<view class="cu-item text-blue cuIcon-noticefill">
					<view><text>【其他】</text> </view>
					<view class="content bg-blue shadow-blur ">
						<text>
							- 希望大家可以多多提供意见哦~
							- 官方交流QQ群：1060127624
						</text>
					</view>
				</view>
			</view>
			
			<view class="cu-timeline">
				<view class="cu-time">v1.0</view>
				<view class="cu-item text-green cuIcon-noticefill">
					<view><text>【2020-04-15】</text> </view>
					<view class="content bg-green shadow-blur ">
						第一个版本发布啦，欢迎大家使用weTeam，可以多提提意见哦~
					</view>
				</view>
				<view class="cu-item text-red cuIcon-noticefill">
					<view class="content bg-red shadow-blur ">
						<text>
							基本功能介绍
							- 查找竞赛
							- 竞赛组队
							- 发布竞赛
							- 其他功能
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: #fff;
		height: 100vh;

		.item-text {
			display: flex;
			flex-direction: column;
		}
	}
</style>
