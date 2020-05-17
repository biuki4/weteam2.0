<template>
	<view>
		<hx-navbar title="竞赛" color="#ffffff" background-color-linear-deg="45" />
		<!-- 分类 -->
		<sl-filter themeColor="#008de1" :menuList="menuList" @result="result"></sl-filter>
		<view>
			<game-item2 @click="goGameDetail" :games="games"></game-item2>
		</view>
	</view>
</template>

<script>
	import gameItem2 from '@/components/k-ui/k-game-list/k-game-item.vue'
	// 筛选组件
	import slFilter from '@/components/other/sl-filter/sl-filter.vue';
	export default {
		components:{
			gameItem2,
			slFilter
		},
		data() {
			return {
				games: [],
				currentPage: 1,
				key: '',
				param: '',
				// 筛选
				filterResult: '',
				menuList: [{
						'title': '分类',
						'key': 'category',
						'detailTitle': '请选择技能类型（单选）',
						'isMutiple': false,
						'detailList': [{
								'title': '不限',
								'value':''
							}]
				
					},
					{
						'title': '学院',
						'key': 'source',
						'isMutiple': true,
						'detailTitle': '请选择学院（可多选）',
						'defaultSelectedIndex': '',
						'detailList': [{
								'title': '不限',
								'value': ''
							}]
				
					},
					{
						'title': '级别',
						'key': 'gameType',
						'isMutiple': true,
						'detailTitle': '请选择竞赛级别（可多选）',
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '院级',
								'value': 1
							},
							{
								'title': '校级',
								'value': 2
							},
							{
								'title': '市级',
								'value': 3
							},
							{
								'title': '省级',
								'value': 4
							},
							{
								'title': '国家级',
								'value': 5
							},
							{
								'title': '国际级',
								'value': 6
							},
							{
								'title': '其他',
								'value': 7
							}
						]
					},
					{
						'title': '时间',
						'key': 'time',
						'isSort': true,
						'detailList': [{
								'title': '默认',
								'value': ''
							},
							{
								'title': '正在报名',
								'value': 5
							},
							{
								'title': '报名结束',
								'value': 6
							},
							{
								'title': '一个月前',
								'value': 1
							},
							{
								'title': '三个月前',
								'value': 2
							},
							{
								'title': '半年前',
								'value': 3
							},
							{
								'title': '一年前',
								'value': 4
							}
						]
					}
				]
			}
		},
		onLoad(options) {
			if(options.key!=undefined){
				this.key = options.key
			}
			console.log(options)
			this.loadMenuList()
			this.loadData()
		},
		methods: {
			async loadData() {
				uni.showLoading({
					title:'加载中...'
				})
				// console.log(this.filterResult.category)
				const res = await this.$api.request({
					url: '/game/games?currentPage=' + this.currentPage,
					method: 'POST',
					data: {
						key: this.key || '',
						category: this.filterResult.category || '',
						gameSource: JSON.stringify(this.filterResult.source) || '',
						gameType: JSON.stringify(this.filterResult.gameType) || '',
						time: this.filterResult.time || '',
						pageSize: this.$common.pageSize
					}
				})
				console.log(res)
				this.games = [...this.games, ...res.data]
				uni.hideLoading()
			},
			// 筛选结果
			async result(val) {
				this.games = []
				this.currengPage = 1
				this.filterResult = JSON.parse(JSON.stringify(val))
				console.log(this.filterResult)
				this.loadData()
			},
			loadMenuList(){
				// 学院
				this.getAcademies()
				// 分类
				this.getCategories()
			},
			async getAcademies() {
				const res = await this.$api.request({
					url: '/academy',
					method: 'GET',
				})
				const _this = this
				res.data.forEach(function(r){
					const a = {
						'title': r.name,
						'value': r.name
					}
					_this.menuList[1].detailList.push(a)
				})
			},
			async getCategories() {
				const res = await this.$api.request({
					url: '/category'
				})
				console.log(res)
				const _this = this
				res.data.forEach(function(r){
					const a = {
						'title': r.category,
						'value': r.id
					}
					_this.menuList[0].detailList.push(a)
				})
			},
			goGameDetail(id) {
				uni.navigateTo({
					url: '/pages/game/game-detail?id=' + id
				})
			},
		},
		onReachBottom() {
			if (this.games.length < this.currentPage * this.$common.pageSize) return;
			this.currentPage++
			this.loadData()
		}
	}
</script>

<style>

</style>
