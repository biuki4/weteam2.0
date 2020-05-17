(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/game-list/game-list"],{a2b5:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t){return o(t)||l(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function l(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function o(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function s(t,e,n,i,a,r,u){try{var l=t[r](u),o=l.value}catch(s){return void n(s)}l.done?e(o):Promise.resolve(o).then(i,a)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var r=t.apply(e,n);function u(t){s(r,i,a,u,l,"next",t)}function l(t){s(r,i,a,u,l,"throw",t)}u(void 0)}))}}var f=function(){n.e("components/k-ui/k-game-list/k-game-item").then(function(){return resolve(n("f787"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/other/sl-filter/sl-filter").then(function(){return resolve(n("8741"))}.bind(null,n)).catch(n.oe)},h={components:{gameItem2:f,slFilter:d},data:function(){return{games:[],currentPage:1,key:"",param:"",filterResult:"",menuList:[{title:"分类",key:"category",detailTitle:"请选择技能类型（单选）",isMutiple:!1,detailList:[{title:"不限",value:""}]},{title:"学院",key:"source",isMutiple:!0,detailTitle:"请选择学院（可多选）",defaultSelectedIndex:"",detailList:[{title:"不限",value:""}]},{title:"级别",key:"gameType",isMutiple:!0,detailTitle:"请选择竞赛级别（可多选）",detailList:[{title:"不限",value:""},{title:"院级",value:1},{title:"校级",value:2},{title:"市级",value:3},{title:"省级",value:4},{title:"国家级",value:5},{title:"国际级",value:6},{title:"其他",value:7}]},{title:"时间",key:"time",isSort:!0,detailList:[{title:"默认",value:""},{title:"正在报名",value:5},{title:"报名结束",value:6},{title:"一个月前",value:1},{title:"三个月前",value:2},{title:"半年前",value:3},{title:"一年前",value:4}]}]}},onLoad:function(t){void 0!=t.key&&(this.key=t.key),console.log(t),this.loadMenuList(),this.loadData()},methods:{loadData:function(){var e=c(i.default.mark((function e(){var n;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中..."}),e.next=3,this.$api.request({url:"/game/games?currentPage="+this.currentPage,method:"POST",data:{key:this.key||"",category:this.filterResult.category||"",gameSource:JSON.stringify(this.filterResult.source)||"",gameType:JSON.stringify(this.filterResult.gameType)||"",time:this.filterResult.time||"",pageSize:this.$common.pageSize}});case 3:n=e.sent,console.log(n),this.games=[].concat(r(this.games),r(n.data)),t.hideLoading();case 7:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),result:function(){var t=c(i.default.mark((function t(e){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.games=[],this.currengPage=1,this.filterResult=JSON.parse(JSON.stringify(e)),console.log(this.filterResult),this.loadData();case 5:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),loadMenuList:function(){this.getAcademies(),this.getCategories()},getAcademies:function(){var t=c(i.default.mark((function t(){var e,n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.request({url:"/academy",method:"GET"});case 2:e=t.sent,n=this,e.data.forEach((function(t){var e={title:t.name,value:t.name};n.menuList[1].detailList.push(e)}));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getCategories:function(){var t=c(i.default.mark((function t(){var e,n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.request({url:"/category"});case 2:e=t.sent,console.log(e),n=this,e.data.forEach((function(t){var e={title:t.category,value:t.id};n.menuList[0].detailList.push(e)}));case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),goGameDetail:function(e){t.navigateTo({url:"/pages/game/game-detail?id="+e})}},onReachBottom:function(){this.games.length<this.currentPage*this.$common.pageSize||(this.currentPage++,this.loadData())}};e.default=h}).call(this,n("543d")["default"])},c19a:function(t,e,n){"use strict";n.r(e);var i=n("a2b5"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},c78f:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}))},d674:function(t,e,n){"use strict";(function(t){n("1a2d"),n("921b");i(n("66fd"));var e=i(n("ed0a"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},ed0a:function(t,e,n){"use strict";n.r(e);var i=n("c78f"),a=n("c19a");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);var u,l=n("f0c5"),o=Object(l["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);e["default"]=o.exports}},[["d674","common/runtime","common/vendor"]]]);