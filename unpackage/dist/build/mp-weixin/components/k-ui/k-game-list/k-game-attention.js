(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/k-ui/k-game-list/k-game-attention"],{"18a7":function(n,e,t){"use strict";var i=t("e81b"),r=t.n(i);r.a},"3fa8":function(n,e,t){"use strict";t.r(e);var i=t("a081"),r=t("9604");for(var a in r)"default"!==a&&function(n){t.d(e,n,(function(){return r[n]}))}(a);t("18a7");var u,o=t("f0c5"),c=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);e["default"]=c.exports},9604:function(n,e,t){"use strict";t.r(e);var i=t("a76b"),r=t.n(i);for(var a in i)"default"!==a&&function(n){t.d(e,n,(function(){return i[n]}))}(a);e["default"]=r.a},a081:function(n,e,t){"use strict";var i,r=function(){var n=this,e=n.$createElement,t=(n._self._c,n.__map(n.list,(function(e,t){var i=n.isEnd(e.registerEndTime),r=n.isUnknowTime(e.registerStartTime),a=n.isUnknowTime(e.registerEndTime),u=n.isUnknowTime(e.gameStartTime),o=n.isUnknowTime(e.gameEndTime),c=n.__map(e.gameTags,(function(e,t){var i=n.type(t);return{$orig:n.__get_orig(e),m5:i}})),s=n.getGameType(e.gameType);return{$orig:n.__get_orig(e),m0:i,m1:r,m2:a,m3:u,m4:o,l0:c,m6:s}})));n.$mp.data=Object.assign({},{$root:{l1:t}})},a=[];t.d(e,"b",(function(){return r})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){return i}))},a76b:function(n,e,t){"use strict";var i;function r(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){t.e("components/uni-ui/uni-tag/uni-tag").then(function(){return resolve(t("3c01"))}.bind(null,t)).catch(t.oe)},u=(i={props:["list"],components:{uniTag:a}},r(i,"components",{}),r(i,"data",(function(){return{}})),r(i,"methods",{isUnknowTime:function(n){var e=this.$common.isUnknowTime(n);return e?"待定":n},navigator:function(n){this.$emit("click",n)},type:function(n){return 0==n?"success":1==n?"warning":"primary"},isEnd:function(n){return this.$api.isEnd(n)},getGameType:function(n){return this.$api.getGameType(n)}}),i);e.default=u},e81b:function(n,e,t){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/k-ui/k-game-list/k-game-attention-create-component',
    {
        'components/k-ui/k-game-list/k-game-attention-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3fa8"))
        })
    },
    [['components/k-ui/k-game-list/k-game-attention-create-component']]
]);
