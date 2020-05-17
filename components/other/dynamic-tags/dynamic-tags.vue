<template>
	<!-- https://ext.dcloud.net.cn/plugin?id=316? -->
	<view class="tagController">
		<view class="tagContainer ">
			<view class="tagItem animated bounceInRight tagBgDefault" 
					:class="index%5==0?colorList[index]:colorList[index%5]" 
					v-bind:key="index" 
					v-for="(tagText,index) in value">
				<text @tap="tapTag" :data-text="tagText">{{tagText}}</text>
				<text v-if="isShowDelIcon" class="tagDelIcon" @tap="delTag" :data-text="tagText">x</text>
			</view>
		</view>
		<view class="tagInput" v-if="isShowAdd">
			<view class="tagInput-tit">竞赛标签</view>
			<view class="tagInput-input">
				<input type="text" v-model="tagString" placeholder="输入竞赛标签,用逗号间隔" />
			</view>
			<view class="tagInput-btn">
				<button type="default" @tap="createTags">添加</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'robby-tags',
		// props: ['enableDel','bgColorType','value', 'enableAdd'],
		props: {
			enableDel: {
				type: Boolean,
				default: false
			},
			enableAdd: {
				type: Boolean,
				default: false
			},
			bgColorType: {
				type: String,
				default: 'tagBgPrimary'
			},
			value:{
				type: Array,
				default:()=>[]
			},
			maxTag:{
				type: Number,
				default: 10
			},
			
		},
		data() {
			return {
				tagString:'',
				isShowDelIcon: this.enableDel || false,
				isShowAdd: this.enableAdd || false,
				colorList: ['tagBgPrimary','tagBgPink','tagBgError','tagBgWarning','tagBgSuccess',],
				currTag: []
			}
		},
		watch: {
			value: function(newVal, oldVal) {
				if (newVal != oldVal) {
					this.currTag = this.value;
				}
				// console.log(this.currTag)
		    }
		},
		// computed:{
		// 	// const a = 
		// 	tagBgColor: function(){
		// 		if(this.bgColorType === null){
		// 			return 'tagBgDefault'
		// 		}else if(this.bgColorType === 'primary'){
		// 			return 'tagBgPrimary'
		// 		}else if(this.bgColorType === 'success'){
		// 			return 'tagBgSuccess'
		// 		}else if(this.bgColorType === 'warn'){
		// 			return 'tagBgWarning'
		// 		}else if(this.bgColorType === 'error'){
		// 			return 'tagBgError'
		// 		}else{
		// 			return 'tagBgDefault'
		// 		}
		// 	}
		// },
		methods: {
			createTags(){
				if(this.currTag.length >= this.maxTag){
					this.$api.msg("最多只能添加" + this.maxTag + "个")
					return
				}

				let tempTagArr = []
				if(this.tagString.length>0){
					let newvalue = this.tagString.split(/,|，/)
					let len = newvalue.length > this.maxTag ? this.maxTag:newvalue.length
					for(let i=0;i<len;i++){
						let newTag = newvalue[i].trim()
						
						if(newTag !== '' && this.value.indexOf(newTag) < 0){
							if(newTag.length > 8){
								this.$api.msg("单个标签长度不能超过8")
								continue
							}
							tempTagArr.push(newTag)
						}
					}
				}
				if(this.value.length < this.maxTag){
					this.tagString = ''
					this.value.splice(this.value.length,0, ...tempTagArr)
				}
				this.$emit('add', {
					currentTag: tempTagArr,
					allTags: this.value
				})
				this.$emit('input', this.value)
				
			}, 
			delTag: function(e){
				let delTagText = e.currentTarget.dataset.text
				let delTagIndex = this.value.indexOf(delTagText)
				this.value.splice(delTagIndex,1)
				this.$emit("delete", {
					currentTag: delTagText,
					allTags: this.value
				})
				this.$emit('input', this.value)
			},
			tapTag: function(e){
				let selTagText = e.currentTarget.dataset.text
				this.$emit("click", selTagText)
			}
		}
	}
</script>

<style lang="scss">
	.tagController{
		padding: 10upx;	
	}
	.tagContainer{
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.tagItem{
		padding: 10upx 20upx;
		margin: 10upx;
		border-radius: 40upx;
		color: white;
	}
	.tagBgDefault{
		background-color: #909090;
	}
	.tagBgPink{
		background-color: #aaaaff;
	}
	.tagBgPrimary{
		background-color: #55aaff;
	}
	.tagBgSuccess{
		background-color: #4cd964;
	}
	.tagBgWarning{
		background-color: #f0ad4e;
	}
	.tagBgError{
		background-color: #ff9277;
	}
	.tagDelIcon{
		padding-left: 20upx;
	}
	.tagInput{
		margin-top: 20upx;
		padding: 10upx;
		display: flex;
		background-color: #fff;
		height: 88upx;
		line-height: 88upx;;
		width: 100%;
		align-items: center;
		/* position: relative; */
		// border: 1upx solid #00f;
	}
	.tagInput-tit {
		
	}
	.tagInput-input {
		margin-left: 40upx;
		// border: 1upx solid #00f;
		width: 60%;
	}
	.tagInput-btn {
		position: absolute;
		right: 20upx;
		
		button {
		height: 70upx;
		line-height: 70upx;
		background-color: #07c160;
		color: #fff;
		font-size: 30upx;
		}
	}
	.tagInput input{
		width: 100%;
	}
</style>