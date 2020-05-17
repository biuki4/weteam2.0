<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login']),
		},
		onLaunch: function() {
			// 小程序版本更新
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res2) {
						uni.showModal({
							title: '更新提示',
							content: '有更新，马上重启应用?',
							showCancel: false,
							confirmText: '立即重启',
							// cancelColor:'#eeeeee',
							confirmColor:'#FF0000',
							success(res2) {
								if (res2.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
				}
			});
			updateManager.onUpdateFailed(function(res) {   
				// 新的版本下载失败
				uni.showModal({ 
					title: '提示',
					content: '无法更新到最新版本，请检查网络设置',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			
			
			//更新登陆状态
			let userInfo = uni.getStorageSync('userInfo') || '';
			if (userInfo.user) {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data);
					}
				});
			}
			
		},
		onShow: function(options) {
			console.log('App Show')
			// console.log(options)
			const scene = decodeURIComponent(options.query.scene)
			// const path = options.path
			// console.log("--" + scene)
			// console.log(path)
			if(scene != undefined && scene!=null && scene!="") {
				uni.navigateTo({
					url: scene
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang='scss'>
	/* 引入icon字体图标样式 */
	@import './common/font/iconfont.css';
	/* animate  */
	@import './common/animate/animate.min.css';
	/* colorUI */
	@import  './common/colorui/main.css';
	@import  './common/colorui/icon.css';
	/* uni-ui */
	@import './common/uniUI/uni.css';
	/* 动画 */
	@import './common/transition/transition.min.css';
	
	
	
	
	.page {
		background-color: $base-page;
	}
	
	.margin-top10 {
		margin-top: 10upx;
	}
	
	.margin-top20 {
		margin-top: 20upx;
	}
	
	.padding-LR20 {
		padding-left: 20upx;
		padding-right: 20upx;
	}
	
	.padding-L10 {
		padding-left: 10upx;
	}
	
	/* 超出后省略号 */
	.text-ellipsis {
		width: 200upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: right;
	}
	
	.required::before {
		content: '*';
		color: #f00;
	}
	
	.noPic{
		background-image: url(http://www.iamk.top/static/image/error.jpg);
	}
	
	.fontWeight550 {
		font-weight: 550;
	}
	
/* 	.cell-hover {
		background: #fafafa;
	} */

	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	uni-button[type=default],
	button[type=default] {
		color: $font-color-dark;
	}

	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}

	.cell-hover {
		background: #fafafa;
	}
</style>
