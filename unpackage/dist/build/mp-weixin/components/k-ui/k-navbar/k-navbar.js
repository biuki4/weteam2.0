(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/k-ui/k-navbar/k-navbar"],{"02f6":function(t,o,r){"use strict";var a,n=function(){var t=this,o=t.$createElement;t._self._c},e=[];r.d(o,"b",(function(){return n})),r.d(o,"c",(function(){return e})),r.d(o,"a",(function(){return a}))},"421c":function(t,o,r){"use strict";r.r(o);var a=r("4fbf"),n=r.n(a);for(var e in a)"default"!==e&&function(t){r.d(o,t,(function(){return a[t]}))}(e);o["default"]=n.a},"4fbf":function(t,o,r){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var a=function(){Promise.all([r.e("common/vendor"),r.e("components/uni-ui/uni-icons/uni-icons")]).then(function(){return resolve(r("855f"))}.bind(null,r)).catch(r.oe)},n=t.getSystemInfoSync().statusBarHeight+"px",e={name:"hx-navbar",components:{uniIcons:a},data:function(){return{statusBarHeight:n,transparentValue:0,navTransparentFixedFontColor:"#fff",statusBarFontColorInfo:[],backgroundColorRgba:"rgba(255,255,255,1)",backgroundColorRgb:"rgb(222,222,222)",colorInfo:"#000000",placeholder:!1,colorContainer:null,slotSlidiSwitch:0}},props:{height:{type:String,default:"44px"},barPlaceholder:{type:String,default:"auto"},back:{type:[Boolean,String],default:!0},title:{type:String,default:""},leftSlot:{type:[Boolean,String],default:!0},rightSlot:{type:[Boolean,String],default:!0},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!0},color:{type:[Array,String],default:"#000000"},backgroundColor:{type:Array,default:function(){return new Array([224,195,252],[79,172,254],[142,197,252],[224,195,252])}},backgroundColorLinearDeg:{type:String,default:"45"},backgroundImg:{type:String,default:""},transparent:{type:String,default:"show"},statusBarFontColor:{type:[Array,String],default:function(){return new Array("#000000","#000000")}},statusBar:{type:[Boolean,String],default:!0},statusBarBackground:{type:String,default:""},shadow:{type:[String,Boolean],default:!1},border:{type:[String,Boolean],default:!1},defaultBackUrl:{type:String,default:""},backTabbarUrl:{type:String,default:"/pages/index/index"},leftSlidiSwitch:{type:[Boolean,String],default:!1},centerSlidiSwitch:{type:[Boolean,String],default:!1},rightSlidiSwitch:{type:[Boolean,String],default:!1}},created:function(){var t=this;switch(t.barPlaceholder){case"show":t.placeholder=!0;break;case"hidden":t.placeholder=!1;break;case"auto":t.fixed&&(t.placeholder=!0);break}switch(t.setStatusBarFontColor(),t.colorContainer="object"==typeof t.color?t.color:[t.color,t.color],t.colorInfo=t.colorContainer[0],t.transparent){case"show":t.transparentValue=1;break;case"hidden":t.transparentValue=0;break;case"auto":var o=getCurrentPages();o[o.length-1].onPageScroll=function(o){t.$emit("scroll",o),o.scrollTop>100?(t.transparentValue=1,t.colorInfo=t.colorContainer[1]):(t.transparentValue=o.scrollTop/100,t.colorInfo=t.colorContainer[0]),t.setBgColor()};break}if(t.setBgColor(),t.fixed&&(t.leftSlidiSwitch||t.centerSlidiSwitch||t.rightSlidiSwitch)){var r=getCurrentPages();r[r.length-1].onPageScroll=function(o){t.$emit("scroll",o),o.scrollTop>100?t.slotSlidiSwitch=1:t.slotSlidiSwitch=0}}},watch:{transparentValue:function(o,r){var a=this;r>.8?t.setNavigationBarColor({frontColor:a.statusBarFontColorInfo[1],backgroundColor:a.backgroundColorRgb}):r<.2&&t.setNavigationBarColor({frontColor:a.statusBarFontColorInfo[0],backgroundColor:a.backgroundColorRgb})},backgroundColor:function(t,o){var r=this;r.setBgColor()},color:function(t,o){var r=this;r.colorContainer="object"==typeof t?t:[t,t],r.colorInfo=r.colorContainer[0]}},methods:{onClickLeft:function(){this.back?getCurrentPages().length>1?t.navigateBack():this.defaultBackUrl?t.redirectTo({url:this.defaultBackUrl}):this.backTabbarUrl&&t.reLaunch({url:this.backTabbarUrl}):this.$emit("click-left")},onClickRight:function(){this.$emit("click-right")},setBgColor:function(){var t=this;if("object"==typeof t.backgroundColor[0]){var o=t.backgroundColor.length;if(o>=2){var r="linear-gradient("+t.backgroundColorLinearDeg+"deg,",a=null;for(var n in t.backgroundColor)a=t.backgroundColor[n],r+="rgba("+a[0]+","+a[1]+","+a[2]+","+t.transparentValue+")",o!=1*n+1&&(r+=",");r+=")",t.backgroundColorRgba=r}}else{var e=t.backgroundColor[0]+","+t.backgroundColor[1]+","+t.backgroundColor[2];t.backgroundColorRgb="rgb("+e+")",t.backgroundColorRgba="rgba("+e+","+t.transparentValue+")"}},setStatusBarFontColor:function(){var o=this;"string"==typeof o.statusBarFontColor?o.statusBarFontColorInfo=[o.statusBarFontColor,o.statusBarFontColor]:"object"==typeof o.statusBarFontColor&&(1==o.statusBarFontColor.length?o.statusBarFontColorInfo=[o.statusBarFontColor[0],o.statusBarFontColor[0]]:o.statusBarFontColor.length>=2&&(o.statusBarFontColorInfo=[o.statusBarFontColor[0],o.statusBarFontColor[1]])),t.setNavigationBarColor({frontColor:o.statusBarFontColorInfo[0],backgroundColor:o.backgroundColorRgb})}},destroyed:function(){}};o.default=e}).call(this,r("543d")["default"])},"87e1":function(t,o,r){"use strict";r.r(o);var a=r("02f6"),n=r("421c");for(var e in n)"default"!==e&&function(t){r.d(o,t,(function(){return n[t]}))}(e);r("faf7");var l,i=r("f0c5"),u=Object(i["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],l);o["default"]=u.exports},edcf:function(t,o,r){},faf7:function(t,o,r){"use strict";var a=r("edcf"),n=r.n(a);n.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/k-ui/k-navbar/k-navbar-create-component',
    {
        'components/k-ui/k-navbar/k-navbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("87e1"))
        })
    },
    [['components/k-ui/k-navbar/k-navbar-create-component']]
]);
