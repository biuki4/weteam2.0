(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"042c":function(e,t,n){"use strict";var o=n("63d2"),r=n.n(o);r.a},"2f1e":function(e,t,n){"use strict";n.r(t);var o=n("b14b");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("042c");var a,c,u,i,f=n("f0c5"),l=Object(f["a"])(o["default"],a,c,!1,null,null,null,!1,u,i);t["default"]=l.exports},"63d2":function(e,t,n){},6988:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={methods:a({},(0,o.mapMutations)(["login"])),onLaunch:function(){var t=this,n=e.getUpdateManager();n.onCheckForUpdate((function(t){t.hasUpdate&&n.onUpdateReady((function(t){n.applyUpdate(),e.showModal({title:"更新提示",content:"有更新，马上重启应用?",showCancel:!1,confirmText:"立即重启",confirmColor:"#FF0000",success:function(e){e.confirm&&n.applyUpdate()}})}))})),n.onUpdateFailed((function(t){e.showModal({title:"提示",content:"无法更新到最新版本，请检查网络设置",success:function(e){e.confirm&&n.applyUpdate()}})}));var o=e.getStorageSync("userInfo")||"";o.user&&e.getStorage({key:"userInfo",success:function(e){t.login(e.data)}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=u}).call(this,n("543d")["default"])},b14b:function(e,t,n){"use strict";n.r(t);var o=n("6988"),r=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},ea68:function(e,t,n){"use strict";(function(e,t){n("1a2d"),n("921b");var o=s(n("66fd")),r=s(n("ca53")),a=s(n("2f1e")),c=s(n("8b37")),u=l(n("c957")),i=l(n("83a7"));function f(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return f=function(){return e},e}function l(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=f();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var a=o?Object.getOwnPropertyDescriptor(e,r):null;a&&(a.get||a.set)?Object.defineProperty(n,r,a):n[r]=e[r]}return n.default=e,t&&t.set(e,n),n}function s(e){return e&&e.__esModule?e:{default:e}}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(){n.e("components/k-ui/k-empty/k-empty").then(function(){return resolve(n("00f2"))}.bind(null,n)).catch(n.oe)},v=function(){n.e("components/k-ui/k-navbar/k-navbar").then(function(){return resolve(n("87e1"))}.bind(null,n)).catch(n.oe)};Object.keys(u).forEach((function(e){o.default.filter(e,u[e])}));var y=i.def,m=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none";!1!==Boolean(t)&&e.showToast({title:t,duration:n,mask:o,icon:r})},h=function(t){e.navigateTo({url:t})},O=function(e){var t=c.default.greater(new Date,new Date(e));return!!t},w=function(e){return 0==e?"其他":1==e?"院级":2==e?"校级":3==e?"市级":4==e?"省级":5==e?"国家级":6==e?"国际级":6==e?"其他":void 0},j=void 0,P=function(){j=void 0,e.removeStorage({key:"userInfo"})},k=function(e){j=e},S=function(){var t=e.getStorage({key:"userInfo"});return console.log(t),t.user.userType},T=!1,D=function(e){console.log("全局方法"),console.log(e)},M=function(t,n){return new Promise((function(o){var r=void 0==t.isShowLoading||t.isShowLoading;r&&e.showLoading({title:"加载中..."}),j&&j.token||(j=e.getStorageSync("userInfo"));var a=j?j.token:"",c=i.def().baseUrl;console.log(c+t.url),e.request({url:c+t.url,data:t.data||{},method:t.method||"GET",header:{"Content-Type":t.contentType||"application/x-www-form-urlencoded; charset=UTF-8",token:a||""},success:function(t){e.hideLoading(),200==t.statusCode?200==t.data.status?o(t.data):401==t.data.status?(n&&n(t.data),T||(T=!0,e.hideLoading(),e.showModal({title:"登录提示",content:"您尚未登录，是否立即登录？",showCancel:!0,confirmText:"登录",success:function(t){t.confirm&&e.navigateTo({url:"/pages/public/login"})},fail:function(){},complete:function(){T=!1}}))):"003"==t.data.status?(n&&n(t.data),T||(e.hideLoading(),T=!0,e.hideLoading(),e.showModal({title:"登录提示",content:"登录失效，重新登录？",showCancel:!0,confirmText:"登录",success:function(t){t.confirm&&e.navigateTo({url:"/pages/public/login"})},fail:function(){},complete:function(){T=!1}}))):o(t.data):(console.log("服务器正忙"),n&&n(t.data))}})}))},U=function(){var e=getCurrentPages(),t=e[e.length-2];return t.$vm};o.default.prototype.$config=i,o.default.config.productionTip=!1,o.default.prototype.$store=r.default,o.default.prototype.$api={msg:m,prePage:U,request:M,logout:P,setUserInfo:k,defConfig:y,animateCSS:D,navTo:h,isAdmin:S,isEnd:O,getGameType:w},o.default.prototype.$common=c.default,o.default.component("k-empty",b),o.default.component("hx-navbar",v),a.default.mpType="app";var C=new o.default(p({},a.default));t(C).$mount()}).call(this,n("543d")["default"],n("543d")["createApp"])}},[["ea68","common/runtime","common/vendor"]]]);