<template>
	<view>
		<hx-navbar title="用户手册" color="#ffffff" background-color-linear-deg="45" />
		<!-- 用户手册 -->
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>普通用户
			</view>
		</view>
		<view class="margin-top10"> 
			<uni-collapse>
				<uni-collapse-item title="查找比赛">
				    <view class="item">
				       <uni-card title="查找比赛" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
								方法一： 
								首页中点击左上角的折叠图标，展示左侧边栏，点击想要查看的竞赛类别
								\n\n					
				    		</text>
							<image src="http://www.iamk.top/static/manual/search1.png" style="width: 100%;height: 1000upx;"></image>
							<text>
								\n\n
								方法二: 
								点击首页顶部中【查找比赛】搜索框进入搜索界面，可以根据分类、发布学院、竞赛级别、时间进行筛选
								\n\n
							</text>
							<image src="http://www.iamk.top/static/manual/search2.png" style="width: 100%;height: 1000upx;"></image>
							<text>\n</text>
							<image src="http://www.iamk.top/static/manual/search3.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
				<uni-collapse-item title="竞赛组队">
				    <view class="item">
				       <uni-card title="竞赛组队" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
				    			首先：点击想参加的竞赛，点击右下角【立即组队】
								\n\n		
				    		</text>
				    		<image src="http://www.iamk.top/static/manual/team1.png" style="width: 100%;height: 1000upx;"></image>
							<text>
								\n\n
								接着，选择一支队伍进入队伍详情，点击申请加入。
								\n\n
							</text>
							<image src="http://www.iamk.top/static/manual/team2.png" style="width: 100%;height: 1000upx;"></image>
							<text>
								\n\n
								最后，如果没找到合适的队伍，点击【创建】队伍，等待他人加入。
								\n\n
							</text>
							<image src="http://www.iamk.top/static/manual/team3.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
		
		<view class="cu-bar bg-white margin-top20">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>管理员
			</view>
		</view>
		<view class="margin-top10">
			<uni-collapse>
				<uni-collapse-item title="发布竞赛">
					<view class="item">
					   <uni-card title="发布竞赛" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
							<text>
								第一步：
								点击【我的】=> 【发布竞赛】
								\n\n
							</text>
							<text>
								依次完成“基本信息”、“竞赛描述”、“上传附件”、“确认发布”/
								\n\n
							</text>
							<image src="http://www.iamk.top/static/manual/post1.png" style="width: 100%;height: 1000upx;"></image>
					   </uni-card>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="我的发布">
					<view class="item">
					   <uni-card title="我的发布" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
							<text>
								点击【我的】=> 【我的发布】，即可对已发布的比赛进行查看及编辑。
								\n\n
							</text>
							<image src="http://www.iamk.top/static/manual/myPost.png" style="width: 100%;height: 1000upx;"></image>
					   </uni-card>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
		
		<view class="cu-bar bg-white margin-top20">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>其他
			</view>
		</view>
		<view class="margin-top10">
			<uni-collapse>
			    <uni-collapse-item title="登录">
			        <view class="item">
			           <uni-card title="登录" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
							<text>
								方法一：
								点击【我的】=> 点击提示框【登录】=> 【微信授权登录】
								\n\n
								方法二：
								点击【我的】=> 【未登录】=> 【微信授权登录】
								\n\n
							</text>
							<image src="http://www.iamk.top/static/manual/login1.png" style="width: 100%;height: 1000upx;"></image>
							<text>
								\n\n
								点击【微信授权登录】，选择授权后方可登录。
								\n\n
							</text>
							<image src="http://www.iamk.top/static/manual/login2.png" style="width: 100%;height: 1000upx;"></image>
			           </uni-card>
			        </view>
			    </uni-collapse-item>
			    <uni-collapse-item title="修改信息">
			        <view class="item">
			           <uni-card title="修改信息" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
			        		<text>
								点击【我的】=>【设置】=>【基本信息】
								\n\n
			        		</text>
							<image src="http://www.iamk.top/static/manual/set1.png" style="width: 100%;height: 1000upx;"></image>
			           </uni-card>
			        </view>
			    </uni-collapse-item>
				<uni-collapse-item title="查看荣誉">
				    <view class="item">
				       <uni-card title="查看荣誉" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
								方法一：
								点击【我的】=>【我的荣誉】
								\n\n
								方法二：
								点击【我的】=>【设置】=>【基本信息】=>【我的荣誉】
								\n\n
				    		</text>
							<image src="http://www.iamk.top/static/manual/award1.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
				<uni-collapse-item title="添加荣誉">
				    <view class="item">
				       <uni-card title="添加荣誉" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
								方法一：
								点击【我的】=>【我的荣誉】=> 点击右下角添加按钮
								\n\n
								方法二：
								点击【我的】=>【设置】=>【基本信息】=>【我的荣誉】=> 点击右下角添加按钮 
								\n\n
				    		</text>
							<image src="http://www.iamk.top/static/manual/award-add2.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
				<uni-collapse-item title="编辑荣誉">
				    <view class="item">
				       <uni-card title="编辑荣誉" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
								方法一：
								点击【我的】=>【我的荣誉】=> 点击荣誉列表右上角编辑图标
								\n\n
								方法二：
								点击【我的】=>【设置】=>【基本信息】=>【我的荣誉】=> 点击荣誉列表右上角编辑图标
								\n\n
				    		</text>
							<image src="http://www.iamk.top/static/manual/award-edit1.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
				<uni-collapse-item title="查看特长">
				    <view class="item">
				       <uni-card title="查看特长" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
				    			方法一：
				    			点击【我的】=>【我的特长】
				    			\n\n
				    			方法二：
				    			点击【我的】=>【设置】=>【基本信息】=>【我的特长】
				    			\n\n
				    		</text>
				    		<image src="http://www.iamk.top/static/manual/advantage1.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
				<uni-collapse-item title="添加特长">
				    <view class="item">
				       <uni-card title="添加特长" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
								方法一：
								点击【我的】=>【我的特长】=> 点击右下角添加按钮
								\n\n
								方法二：
								点击【我的】=>【设置】=>【基本信息】=>【我的特长】=> 点击右下角添加按钮 
								\n\n
				    		</text>
							<image src="http://www.iamk.top/static/manual/advantage-add2.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
				<uni-collapse-item title="编辑特长">
				    <view class="item">
				       <uni-card title="编辑特长" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
								方法一：
								点击【我的】=>【我的特长】=> 点击特长列表右上角编辑图标
								\n\n
								方法二：
								点击【我的】=>【设置】=>【基本信息】=>【我的特长】=> 点击特长列表右上角编辑图标
								\n\n
				    		</text>
							<image src="http://www.iamk.top/static/manual/advantage-edit1.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
				<uni-collapse-item title="查看队伍">
				    <view class="item">
				       <uni-card title="查看队伍" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
								点击【我的】=>【我的队伍】
								\n
								可以选择查看创建的队伍及申请参加的队伍
								\n\n
				    		</text>
							<image src="http://www.iamk.top/static/manual/myTeam.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
				<uni-collapse-item title="管理队伍">
				    <view class="item">
				       <uni-card title="管理队伍" thumbnail="http://www.iamk.top/static/icon/weTeamLogo.png" :extra="version" :note="time">
				    		<text>
								点击【我的】=>【我的队伍】=>【我的创建】
								\n
								点击【我的小队】查看当前队伍中的人
								点击【申请列表】查看当前申请的人
								\n\n
				    		</text>
							<image src="http://www.iamk.top/static/manual/myTeam2.png" style="width: 100%;height: 1000upx;"></image>
							<text>
								\n\n
								【我的小队】中向左滑动用户列表可以将队伍中的人踢出
								【申请列表】中向左滑动用户列表可以同意该用户入队或拒绝该申请
							</text>
							<image src="http://www.iamk.top/static/manual/myTeam3.png" style="width: 100%;height: 1000upx;"></image>
				       </uni-card>
				    </view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-ui/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-ui/uni-collapse-item/uni-collapse-item.vue'
	import uniCard from '@/components/uni-ui/uni-card/uni-card.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			uniCard
		},
		data() {
			return {
				version: 'v2',
				time: '2020-4-16'
			};
		}
	}
</script>

<style lang="scss">
	.item {
		background-color: #fafafa;
		padding: 30rpx;
	}
</style>
