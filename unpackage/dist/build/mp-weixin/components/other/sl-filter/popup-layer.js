(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/other/sl-filter/popup-layer"],{3496:function(t,a,e){"use strict";e.r(a);var n=e("99fa"),r=e("a4cc");for(var o in r)"default"!==o&&function(t){e.d(a,t,(function(){return r[t]}))}(o);e("ac44");var i,s=e("f0c5"),l=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);a["default"]=l.exports},"99fa":function(t,a,e){"use strict";var n,r=function(){var t=this,a=t.$createElement;t._self._c},o=[];e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return n}))},a4cc:function(t,a,e){"use strict";e.r(a);var n=e("ea48"),r=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(a,t,(function(){return n[t]}))}(o);a["default"]=r.a},ac44:function(t,a,e){"use strict";var n=e("e2ef"),r=e.n(n);r.a},e2ef:function(t,a,e){},ea48:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={name:"popup-layer",props:{direction:{type:String,default:"top"},autoClose:{type:Boolean,default:!0},isTransNav:{type:Boolean,default:!1},navHeight:{type:Number,default:0}},data:function(){return{ifshow:!1,translateValue:-100,timer:null,iftoggle:!1}},computed:{_translate:function(){if(this.isTransNav){var t={top:"transform:translateY(".concat(-this.translateValue,"%)"),bottom:"transform:translateY(calc(".concat(this.translateValue,"% + ").concat(this.navHeight,"px))"),left:"transform:translateX(".concat(-this.translateValue,"%)"),right:"transform:translateX(".concat(this.translateValue,"%)")};return t[this.direction]}var a={top:"transform:translateY(".concat(-this.translateValue,"%)"),bottom:"transform:translateY(".concat(this.translateValue,"%)"),left:"transform:translateX(".concat(-this.translateValue,"%)"),right:"transform:translateX(".concat(this.translateValue,"%)")};return a[this.direction]},_location:function(){var t={top:"bottom:0px;width:100%;",bottom:"top:0px;width:100%;",left:"right:0px;height:100%;",right:"left:0px;height:100%;"};return t[this.direction]+this._translate}},methods:{show:function(){var t=this;this.ifshow=!0;setTimeout((function(){t.translateValue=0,null}),100),setTimeout((function(){t.iftoggle=!0,null}),300)},close:function(){var t=this;null===this.timer&&this.iftoggle&&(this.translateValue=-100-this.navHeight,this.timer=setTimeout((function(){t.ifshow=!1,t.timer=null,t.iftoggle=!1}),300),this.$emit("close"))},ableClose:function(){this.autoClose&&this.close()},stopEvent:function(t){}}};a.default=n}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/other/sl-filter/popup-layer-create-component',
    {
        'components/other/sl-filter/popup-layer-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3496"))
        })
    },
    [['components/other/sl-filter/popup-layer-create-component']]
]);