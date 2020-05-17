<template>
	<!-- https://ext.dcloud.net.cn/plugin?id=1345 -->
	<!-- 富文本编辑器 -->
	<view class='wrapper'>
		<!-- 取消 保存 关闭 -->
		<view class="editor-box">
			<editor id="editor" class="ql-container" placeholder="开始输入..." 
			v-if="!previewMode" 
			v-show="!showPreview" 
			showImgSize
			showImgToolbar showImgResize 
			@statuschange="onStatusChange" 
			:read-only="readOnly" 
			@ready="onEditorReady" 
			@input="saveAuto">
			</editor>
		</view>
		<!-- 工具栏 -->
		<view class='toolbar animated bounceInRight' @tap="format" v-if="!showPreview">
			<block v-for="(t,i) in tools" :key="i">
				<view v-if="t=='bold'" :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"
				 data-label="加粗"></view>
				<view v-if="t=='italic'" :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"
				 data-label="斜体"></view>
				<view v-if="t=='underline'" :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
				 data-name="underline" data-label="下滑线"></view>
				<view v-if="t=='strike'" :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"
				 data-label="删除线"></view>
				<view v-if="t=='align-left'" :class="(formats.align === 'left' || !formats.align) ? 'ql-active' : ''" class="iconfont icon-zuoduiqi"
				 data-name="align" data-value="left" data-label="居左"></view>
				<view v-if="t=='align-center'" :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
				 data-name="align" data-value="center" data-label="居中"></view>
				<view v-if="t=='align-right'" :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
				 data-name="align" data-value="right" data-label="居右"></view>
				<view v-if="t=='align-justify'" :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
				 data-name="align" data-value="justify" data-label="平铺"></view>


				<!--                  <view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
                    		 data-value="2"></view>
                    <view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
                    		 data-value="2em"></view>
                    <view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
                    		 data-value="20px"></view>
                    <view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
                    		 data-name="marginBottom" data-value="20px"></view> -->


				<!-- 清除格式 -->
				<view v-if="t=='remove'" class="iconfont icon-clearedformat" @tap.stop="removeFormat"></view>
				<!-- 字体大小 -->
				<picker v-if="t=='font'" class="iconfont" mode="selector" :range="fontSizeRange" @change="fontSize">
					<view class="icon-fontsize"></view>
				</picker>
				<!-- 字体颜色 -->
				<view v-if="t=='color'" :style="fontColor!='#FFFFFF' ? 'color:'+formats.color : ''" class="iconfont icon-text_color"
				 data-name="color" @tap.stop="openColor"></view>
				<!-- 背景色 -->
				<!-- <view v-if="t=='backgroundColor'" :style="bgColor ? 'color:'+formats.backgroundColor : '' " class="iconfont icon-fontbgcolor"
				 data-name="backgroundColor" @tap.stop="openColor"></view> -->
				<!-- <view v-if="t=='image'" class="iconfont icon-charutupian" @tap.stop="insertImage"></view> -->
				<!-- 清空 -->
				<!-- <view v-if="t=='clear'" class="iconfont icon-shanchu" @tap.stop="clear"></view> -->
				<!-- 预览 -->
				<!-- <view v-if="t=='preview'" class="iconfont icon-preview" @tap.stop="preview"></view> -->
				<!-- 日期 -->
				<view v-if="t=='date'" class="iconfont icon-date" @tap="insertDate"></view>
				<!-- 符号 -->
				<view v-if="t=='list-check'" class="iconfont icon-checklist" data-name="list" data-value="check"></view>
				<!-- 序号 -->
				<view v-if="t=='list-ordered'" :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
				 data-name="list" data-value="ordered"></view>
				 <!-- 符号 -->
				<view v-if="t=='list-bullet'" :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
				 data-name="list" data-value="bullet"></view>
				 <!-- 撤销 -->
				<view v-if="t=='undo'" class="iconfont icon-undo" @tap="undo"></view>
				<!-- 恢复 -->
				<view v-if="t=='redo'" class="iconfont icon-redo" @tap="redo"></view>
				<!-- 左缩进 -->
				<view v-if="t=='outdent'" class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
				<!-- 右缩进 -->
				<view v-if="t=='indent'" class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
				<!-- 分割线 -->
				<view v-if="t=='divider'" class="iconfont icon-fengexian" @tap="insertDivider"></view>
				<!-- 标题 -->
				<view v-if="t=='h1'" :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
				 data-name="header" :data-value="1"></view>
				<view v-if="t=='h2'" :class="formats.header === 2 ? 'ql-active' : ''" class="iconfont icon-format-header-2"
				 data-name="header" :data-value="2"></view>
				<view v-if="t=='h3'" :class="formats.header === 3 ? 'ql-active' : ''" class="iconfont icon-format-header-3"
				 data-name="header" :data-value="3"></view>
				<view v-if="t=='h4'" :class="formats.header === 4 ? 'ql-active' : ''" class="iconfont icon-format-header-4"
				 data-name="header" :data-value="4"></view>
				<view v-if="t=='h5'" :class="formats.header === 5 ? 'ql-active' : ''" class="iconfont icon-format-header-5"
				 data-name="header" :data-value="5"></view>
				<view v-if="t=='h6'" :class="formats.header === 6 ? 'ql-active' : ''" class="iconfont icon-format-header-6"
				 data-name="header" :data-value="6"></view>
				<view v-if="t=='sub'" :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao"
				 data-name="script" data-value="sub"></view>
				<view v-if="t=='super'" :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao"
				 data-name="script" data-value="super"></view>
				<view v-if="t=='rtl'" :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl"
				 data-name="direction" :data-value="formats.direction === 'rtl' ? '' : 'rtl'"></view>
			</block>
		</view>
		<view class="options margin-top10">
			<!-- <view class="btn left" @click="cancel" v-if="labelCancel">{{labelCancel}}</view>
			<view class="btn right" @click="save" v-if="labelConfirm">{{labelConfirm}}</view> -->
			<view class="btn left" @click="reset">重置</view>
			<view class="btn right" @click="save">保存</view>
		</view>
		<uni-popup ref="popup" type="bottom" @transed="colorPop">
			<colorPicker :color="color" :show="showColor" @confirm="colorChanged" @cancel="colorPopClose"></colorPicker>
		</uni-popup>
		<!-- 预览 -->
		<view class="preview" v-show="showPreview">
			<rich-text :nodes="htmlData" class="previewNodes"></rich-text>
		</view>
	</view>
</template>

<script>
	import colorPicker from '@/components/colorPicker.vue'
	import uniPopup from "@/components/uni-ui/uni-popup/uni-popup.vue"
	export default {
		components: {
			colorPicker,
			uniPopup,
		},
		props: {
			// 显示的数据
			html: {
				type: String,
			},
			imageUploader: {
				type: Function
			},
			muiltImage: {
				type: Boolean,
				default: false
			},
			compressImage: {
				type: Boolean,
				default: false
			},
			previewMode: {
				type: Boolean,
				default: false
			},
			tools: {
				type: Array,
				default: function() {
					return ['bold', 'italic', 'underline', 'strike', 'align-left', 'align-center', 'align-right',
						'remove', 'font', 'color', 'backgroundColor', 'clear', 'preview', 'date', 'list-check', 'list-ordered',
						'list-bullet', 'undo', 'redo', 'outdent', 'indent', 'divider', 'h1', 'h2','h3','h4','h5','h6','sub',
						'super'
					]
				}
			}
		},
		data() {
			return {
				show: true,
				readOnly: false,
				formats: {},
				fontColor: "#000000",
				bgColor: "",
				color: "",
				colorPickerName: "",
				showColor: false,
				fontSizeRange: [10, 12, 14, 16, 18, 24, 32, 36, 42],
				showPreview: false,
				htmlData: "",
			}
		},
		mounted: function() {
			if (this.previewMode) {
				this.previewData(this.html)
			}
		},
		computed: {
			labelConfirm: function() {
				return this.showPreview ? "关闭" : "保存"
			},
			labelCancel: function() {
				return this.showPreview ? "" : "取消"
			}
		},
		methods: {
			openColor(e) {
				var name = e.currentTarget.dataset.name
				var color = this.formats[name]
				this.colorPickerName = name
				if (name == 'backgroundColor' && !color) {
					color = "#FFFFFF"
				}
				if (name == 'color' && !color) {
					color = "#000000"
				}
				this.color = color
				this.$refs.popup.open({
					type: "bottom"
				})
			},
			colorPop(e) {
				this.showColor = e.show
			},
			colorPopClose() {
				this.$refs.popup.close()
			},
			colorChanged(e) {
				let label = ''
				switch (this.colorPickerName) {
					case 'backgroundColor':
						if (e.color == '#FFFFFF') {
							e.color = ''
						}
						this.bgColor = e.color
						label = '背景色'
						break
					case 'color':
						this.fontColor = e.color
						label = '颜色'
						break
				}
				this.colorPopClose()
				this._format(this.colorPickerName, e.color, label + e.color)
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().in(this).select('#editor').context((res) => {
					this.editorCtx = res.context
					if (this.html) {
						this.editorCtx.setContents({
							html: this.html
						})
					}
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
				this.toast("撤销")
			},
			redo() {
				this.editorCtx.redo()
				this.toast("恢复")
			},
			format(e) {
				let {
					name,
					value,
					label
				} = e.target.dataset
				if (!name) return
				this._format(name, value, label)
			},
			_format(name, value, label) {
				this.editorCtx.format(name, value)
				this.toast(label)
			},
			toast(label) {
				uni.showToast({
					duration: 600,
					icon: 'none',
					title: label
				})
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				const _this = this
				this.editorCtx.insertDivider({
					success: function() {
						_this.toast("插入分割线")
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: (res) => {
						this.toast("清空")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
				this.toast("清除格式")
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
				this.toast("插入日期")
			},
			insertImage() {
				let params = {}
				params.count = this.muiltImage ? 9 : 1
				params.sizeType = this.compressImage ? ['compressed'] : ['original']
				uni.chooseImage({
					...params,
					success: (res) => {
						res.tempFilePaths.map(path => {
							this.imageUploader(path, (url) => {
								this.editorCtx.insertImage({
									src: url,
									alt: '图像'
								})
							})
						})
					}
				})
			},
			fontSize(e) {
				const index = e.detail.value
				const fz = this.fontSizeRange[index] + 'px'
				this._format('fontSize', fz, '字体大小:' + fz)
			},
			cancel() {
				console.log("cancel")
			},
			reset() {
				this.htmlData = ''
				this.editorCtx.clear({
					success: (res) => {
						this.toast("重置成功~")
						this.$emit("reset")
					}
				})
			},
			saveAuto(){
				this.editorCtx.getContents({
					success: res => {
						if (res.errMsg == "ok") {
							this.htmlData = res.html
						}
						this.$emit("save", {
							htmlData: this.htmlData
						})
					}
				})
			},
			save() {
				let _this = this
				console.log("save")
				if (this.showPreview) {
					if (this.previewMode) {
						this.cancel()
					} else {
						this.showPreview = false
					}
				} else {
					this.editorCtx.getContents({
						success: res => {
							if (res.errMsg == "ok") {
								this.htmlData = res.html
								this.toast("保存成功")
								// console.log(this.htmlData)
							}
							this.$emit("save", {
								htmlData: this.htmlData
							})
						}
					})
				}

			},
			previewData: function(html) {
				this.htmlData = html.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
				this.showPreview = true
			},
			preview: function() {
				this.editorCtx.getContents({
					success: res => {
						this.previewData(res.html)
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./editor-icon.css";

	.wrapper {
		padding: 5px;

		.header {
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 150upx;

		}
	}

	.toolbar {
		width: 100%;
		box-sizing: border-box;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		background-color: #fff;
		border-top: 1px solid #eee;
		// line-height: 45upx;
		justify-content: space-evenly;
		display: flex;
		flex-wrap: wrap;

		&::after {
			content: '';
			flex: 1;
		}

		.iconfont {
			display: block;
			padding: 12upx 0;
			width: 56upx;
			height: 68upx;
			text-align: center;
			font-size: 36upx;
			box-sizing: border-box;
		}
	}
	
	.editor-box{
		.ql-container {
			box-sizing: border-box;
			padding: 24upx 30upx;
			width: 100%;
			min-height: 30vh;
			height: auto;
			// min-height: 650upx;
			background: #fff;
			// margin-top: 90upx;
			font-size: 32upx;
			line-height: 1.5;
			border: 1px solid #eee;
		}
	}
	.preview {
		width: 100%;
		// margin-top: 10upx;
		// border: 1upx solid #f00;
		padding: 20upx;
		min-height: 700upx;
		background-color: #fff;

		.previewNodes {
			width: 100%;
		}
	}

	.ql-active {
		color: #06c;
	}

	.options {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 88upx;
		border-bottom: 1px solid #eee;
		// box-shadow: 1px 0 2px rgba(0, 0, 0, 0.1);
		background: #fff;

		.btn {
			display: block;
			width: 150upx;
			height: 80upx;
			line-height: 80upx;
			font-size: 30upx;
			color: #666;
			padding-left: 20upx;
			text-align: center;

			&.left {
				float: left;
			}

			&.right {
				float: right;
			}
		}
	}
</style>
