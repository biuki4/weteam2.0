(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/activity/activity"],{"0baa":function(t,e,n){"use strict";var i=n("3a3f"),r=n.n(i);r.a},"3a3f":function(t,e,n){},"81d1":function(t,e,n){"use strict";n.r(e);var i=n("df88"),r=n("b834");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("0baa");var o,u=n("f0c5"),c=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);e["default"]=c.exports},"9dc7":function(t,e,n){"use strict";(function(t){n("1a2d"),n("921b");i(n("66fd"));var e=i(n("81d1"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},b1a9:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("a34a"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t){return c(t)||u(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function c(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function s(t,e,n,i,r,a,o){try{var u=t[a](o),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(i,r)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(i,r){var a=t.apply(e,n);function o(t){s(a,i,r,o,u,"next",t)}function u(t){s(a,i,r,o,u,"throw",t)}o(void 0)}))}}var f=function(){n.e("components/k-ui/k-activity/k-activity-item").then(function(){return resolve(n("5860"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/uni-ui/uni-load-more/uni-load-more").then(function(){return resolve(n("d169"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("components/other/sl-filter/sl-filter").then(function(){return resolve(n("8741"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/uni-ui/uni-notice-bar/uni-notice-bar").then(function(){return resolve(n("64be"))}.bind(null,n)).catch(n.oe)},v=function(){n.e("components/k-ui/k-more-btn/k-more-btn").then(function(){return resolve(n("0527"))}.bind(null,n)).catch(n.oe)},g={components:{kActivityItem:f,uniLoadMore:d,slFilter:h,uniNoticeBar:p,kMoreBtn:v},data:function(){return{activity:[],loadingType:"more",currentPage:1,key:"",swiperList:[{id:0,url:"http://weteam.sys.iamk.top/weteam2.png"}],filterResult:"",menuList:[{title:"分类",key:"category",detailTitle:"请选择技能类型（单选）",isMutiple:!1,detailList:[{title:"不限",value:""}]},{title:"时间",key:"time",isSort:!0,detailList:[{title:"默认",value:""},{title:"全部",value:7},{title:"正在报名",value:5},{title:"报名结束",value:6}]}],moreOpList:[{title:"版本日志",icon:"formfill",color:"#ff9900",url:"/pages/user/log"},{title:"问题反馈",icon:"questionfill",color:"#dd6161",url:"/pages/user/user"},{title:"发现新活动",icon:"activityfill",color:"#19be6b",url:"/pages/user/want"},{title:"发现新竞赛",icon:"upstagefill",color:"#55aaff",url:"/pages/user/want"}]}},onLoad:function(){this.loadData(),this.getCategories(),this.loadSlideshow()},methods:{swiperClick:function(e){0!=e?t.navigateTo({url:"/pages/activity/detail?id="+e}):t.navigateTo({url:"/pages/notice/manual"})},loadSlideshow:function(){var t=l(i.default.mark((function t(){var e,n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(this.swiperList.length>=4)){t.next=2;break}return t.abrupt("return");case 2:return e=this,t.next=5,this.$api.request({url:"/activity/getSlideshow"});case 5:n=t.sent,0!=n.data.length&&n.data.forEach((function(t){var n={id:t.id,url:t.poster_url};e.swiperList.push(n)}));case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),clickMoreBtn:function(e){-1!=e&&(1!=e?t.navigateTo({url:this.moreOpList[e].url}):t.switchTab({url:this.moreOpList[e].url}))},goHome:function(){t.switchTab({url:"/pages/index/index"})},getCategories:function(){var t=l(i.default.mark((function t(){var e,n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.request({url:"/activity/category"});case 2:e=t.sent,console.log(e),n=this,e.data.forEach((function(t){var e={title:t.category,value:t.id};n.menuList[0].detailList.push(e)}));case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),result:function(){var t=l(i.default.mark((function t(e){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log(e),this.filterResult=JSON.parse(JSON.stringify(e)),this.loadData("refresh");case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),cardSwiper:function(t){this.cardCur=t.detail.current},navTo:function(e){t.navigateTo({url:e})},goDetail:function(e){t.navigateTo({url:"/pages/activity/detail?id="+e})},loadData:function(){var e=l(i.default.mark((function e(){var n,r,o=arguments;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=o.length>0&&void 0!==o[0]?o[0]:"add","refresh"!=n){e.next=6;break}this.currentPage=1,this.activity=[],e.next=13;break;case 6:if(!(n="add")){e.next=12;break}if("nomore"!==this.loadingType){e.next=9;break}return e.abrupt("return");case 9:this.loadingType="loading",e.next=13;break;case 12:this.loadingType="more";case 13:return e.next=15,this.$api.request({url:"/activity/activities",method:"POST",data:{key:this.key,categoryId:this.filterResult.category||"",source:"",time:this.filterResult.time||"",currentPage:this.currentPage,pageSize:this.$common.pageSize}});case 15:r=e.sent,console.log(r),this.activity=[].concat(a(this.activity),a(r.data)),t.hideLoading(),(0==r.data.length||r.data.length<this.$common.pageSize)&&(this.loadingType="noMore");case 20:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),onReachBottom:function(){this.activity.length<this.currentPage*this.$common.pageSize?this.loadingType="noMore":(this.currentPage++,this.loadData())},onPullDownRefresh:function(){this.currentPage=1,this.activity=[],this.loadData(),setTimeout((function(){t.stopPullDownRefresh(),t.showToast({title:"刷新成功"})}),1e3)},onShareAppMessage:function(){return{desc:"weTeam呀",title:"npu的小瓜子们，快来查看近期活动吧~",imageUrl:"http://weteam.sys.iamk.top/weteamLogo2.png",path:"/pages/activity/activity"}}}};e.default=g}).call(this,n("543d")["default"])},b834:function(t,e,n){"use strict";n.r(e);var i=n("b1a9"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},df88:function(t,e,n){"use strict";var i,r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))}},[["9dc7","common/runtime","common/vendor"]]]);