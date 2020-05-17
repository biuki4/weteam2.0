(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/game/game-detail"],{"19e1":function(t,e,n){"use strict";n.r(e);var a=n("714f"),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);e["default"]=i.a},"1a13":function(t,e,n){"use strict";(function(t){n("1a2d"),n("921b");a(n("66fd"));var e=a(n("1a73"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"1a73":function(t,e,n){"use strict";n.r(e);var a=n("c6c4"),i=n("19e1");for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);var r,o=n("f0c5"),u=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=u.exports},"714f":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("a34a"));function i(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,a,i,s,r){try{var o=t[s](r),u=o.value}catch(c){return void n(c)}o.done?e(u):Promise.resolve(u).then(a,i)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(a,i){var r=t.apply(e,n);function o(t){s(r,a,i,o,u,"next",t)}function u(t){s(r,a,i,o,u,"throw",t)}o(void 0)}))}}var o=function(){Promise.all([n.e("common/vendor"),n.e("components/k-ui/k-game-detail/k-game-detail")]).then(function(){return resolve(n("3a75"))}.bind(null,n)).catch(n.oe)},u={components:{kGameDetail:o},data:function(){return{games:[],poster:[],isCollect:!1,currGameId:"",user:""}},mounted:function(){this.user=this.$store.getters.getUserInfo},onLoad:function(e){t.showLoading({title:"正在加载"}),this.currGameId=e.id,this.loadData()},methods:{loadData:function(){var e=r(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.request({url:"/game/"+this.currGameId});case 2:if(n=e.sent,console.log(n),!n.status.startsWith("3000")){e.next=8;break}return this.$api.msg(n.msg),setTimeout((function(){t.navigateBack()}),2e3),e.abrupt("return");case 8:this.games=n.data.game,this.poster[0]=n.data.poster,this.isCollect=n.data.isCollect,t.hideLoading();case 12:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),collect:function(t){console.log(t),1==this.isCollect?(this.unCollect(this.games.id),this.$api.msg("取消成功")):(this.goCollect(this.games.id),this.$api.msg("收藏成功")),this.isCollect=!this.isCollect},goCollect:function(){var t=r(a.default.mark((function t(e){return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.request({url:"/game/collect/"+e});case 2:t.sent;case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),unCollect:function(){var t=r(a.default.mark((function t(e){return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.request({url:"/game/unCollect/"+e});case 2:t.sent;case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),deleteGame:function(){if(this.user.id==this.poster[0].id||0==this.user.userType){var e=this;t.showModal({title:"删除提示",content:"删除不可恢复，确定删除吗？",showCancel:!0,confirmText:"删除",success:function(n){n.confirm&&(t.showLoading({title:"删除中..."}),e.delete())}})}else t.showModal({title:"提示",content:"权限不足，仅能删除您发布的竞赛~",showCancel:!1,confirmText:"返回",success:function(t){}})},delete:function(){var e=r(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.request({url:"/game/delete/"+this.currGameId});case 2:n=e.sent,this.$api.prePage().loadData&&this.$api.prePage().loadData("refresh"),t.hideLoading(),200==n.status?(this.$api.msg("删除成功"),t.navigateBack()):2001==n.status||2002==n.status?this.$api.msg(n.msg):this.$api.msg("系统繁忙");case 6:case"end":return e.stop()}}),e,this)})));function n(){return e.apply(this,arguments)}return n}(),editGame:function(){if(this.user.id==this.poster[0].id||0==this.user.userType){var e=this;t.showModal({title:"编辑提示",content:"您确定要编辑该竞赛吗？",showCancel:!0,confirmText:"确定",success:function(n){n.confirm&&t.navigateTo({url:"/pages/admin/post-game?id="+e.currGameId})}})}else t.showModal({title:"提示",content:"权限不足，仅能编辑您发布的竞赛~",showCancel:!1,confirmText:"返回",success:function(t){}})},participate:function(){var t=this.$common.greater(new Date,new Date(this.games.registerEndTime));console.log(t),t?this.$api.msg("报名已结束"):(console.log(this.games.teamSize),this.games.teamSize<=1?this.$api.msg("该竞赛为个人赛"):this.navTo("/pages/team/team-list?id="+this.currGameId+"&&teamSize="+this.games.teamSize))},navTo:function(e){t.navigateTo({url:e})}},onShareAppMessage:function(){return{title:this.games.gameName}},onPullDownRefresh:function(){t.showLoading({title:"正在加载"}),this.loadData(),setTimeout((function(){t.stopPullDownRefresh(),t.showToast({title:"刷新成功"})}),1e3)}};e.default=u}).call(this,n("543d")["default"])},c6c4:function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return a}))}},[["1a13","common/runtime","common/vendor"]]]);