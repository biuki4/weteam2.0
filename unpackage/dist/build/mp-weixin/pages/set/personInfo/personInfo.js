(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/set/personInfo/personInfo"],{"1dfc":function(t,e,i){"use strict";var n,s=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.genderShow=!0},t.e1=function(e){t.genderShow=!1},t.e2=function(e){t.genderShow=!1},t.e3=function(e){t.signatureShow=!0},t.e4=function(e){t.academyShow=!0},t.e5=function(e){t.academyShow=!1},t.e6=function(e){t.academyShow=!1})},o=[];i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},"3f13":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(i("a34a")),s=i("2f62");function o(t){return t&&t.__esModule?t:{default:t}}function a(t,e,i,n,s,o,a){try{var r=t[o](a),u=r.value}catch(h){return void i(h)}r.done?e(u):Promise.resolve(u).then(n,s)}function r(t){return function(){var e=this,i=arguments;return new Promise((function(n,s){var o=t.apply(e,i);function r(t){a(o,n,s,r,u,"next",t)}function u(t){a(o,n,s,r,u,"throw",t)}r(void 0)}))}}function u(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function h(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?u(Object(i),!0).forEach((function(e){c(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):u(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function c(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var d={data:function(){return{user:"",genderShow:!1,genderList:["女","男","保密"],academyShow:!1,academyList:[],contact:"",signature:"",signatureShow:!1,picList:[],modalShow:!1,modalTitle:"",modalInput:"",isNumber:!1,modalLength:25,modalTip:"请输入您的信息~",clearIconShow:!1}},computed:h({},(0,s.mapState)(["hasLogin","userInfo"]),{getGender:function(){return 1==this.user.gender?"男":0==this.user.gender?"女":-1==this.user.gender?"保密":void 0}}),onLoad:function(){this.getAcademies()},mounted:function(){this.user=this.$store.getters.getUserInfo,this.signature=this.user.personInfo},methods:{checkEmail:function(t){return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(t)},modalInputing:function(){this.modalInput.length>0?this.clearIconShow=!0:this.clearIconShow=!1},clearIcon:function(){this.modalInput=""},showPublicModal:function(t){"昵称"==t&&(this.modalTitle="昵称",this.modalInput=this.user.nickname,this.modalLength=15,this.modalTip="请输入昵称~"),"学号"==t&&(this.modalTitle="学号",this.modalInput=this.user.username,this.isNumber=!0,this.modalLength=10,this.modalTip="请输入学号~"),"年级"==t&&(this.modalTitle="年级",this.modalInput=this.user.grade,this.isNumber=!0,this.modalLength=4,this.modalTip="请输入年级，如2017"),"联系方式"==t&&(this.modalTitle="联系方式",this.modalInput=this.user.contact,this.modalLength=30,this.modalTip="请输入常用联系方式, 如QQ:123456"),"电话"==t&&(this.modalTitle="电话",this.modalInput=this.user.phone,this.isNumber=!0,this.modalLength=11,this.modalTip="请输入电话号码~"),"邮箱"==t&&(this.modalTitle="邮箱",this.modalInput=this.user.email,this.modalLength=30,this.modalTip="请输入邮箱~"),this.modalShow=!0},hideModal:function(){this.modalShow=!1,this.modalShow="",this.modalInput="",this.isNumber=!1,this.modalLength="21"},modalConfim:function(t){if(""!=this.modalInput&&null!=this.modalInput){if("昵称"==this.modalTitle&&(this.user.nickname=this.modalInput),"学号"==this.modalTitle){var e=this.$common.checkUsername(this.modalInput);if(!e)return void this.$api.msg("请输入10位正确的学号~");this.user.username=this.modalInput}if("年级"==this.modalTitle){var i=this.$common.checkGrade(this.modalInput);if(!i)return void this.$api.msg("请输入4位数字，如2017");this.user.grade=this.modalInput}if("联系方式"==this.modalTitle&&(this.user.contact=this.modalInput),"电话"==this.modalTitle){var n=this.$common.checkMobile(this.modalInput);if(!n)return void this.$api.msg("请输入正确的手机号~");this.user.phone=this.modalInput}if("邮箱"==this.modalTitle){var s=this.$common.checkEamil(this.modalInput);if(!s)return void this.$api.msg("请输入正确的邮箱~");this.user.email=this.modalInput}this.updateUser(),this.hideModal()}else this.$api.msg("请完善信息~")},navTo:function(e){t.navigateTo({url:e})},genderConfirm:function(t){2==t.detail.index?this.user.gender=-1:this.user.gender=t.detail.index,this.updateUser(),this.genderShow=!1},academyConfirm:function(t){this.user.academyId=t.detail.index+1,this.user.academy=this.academyList[t.detail.index],this.updateUser(),this.academyShow=!1},sigConfirm:function(){this.signature!=this.user.personInfo?(this.user.personInfo=this.signature,this.updateUser(),this.signatureShow=!1):this.signatureShow=!1},sigClose:function(){this.signature=this.user.personInfo,this.signatureShow=!1},updateUser:function(){var e=r(n.default.mark((function e(){var i;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"更新中"}),e.next=3,this.$api.request({url:"/user/update/"+this.user.id,method:"PUT",contentType:"application/json",data:h({},this.user)});case 3:i=e.sent,t.hideLoading(),this.$store.commit("updateUserInfo",this.user),this.$api.msg(i.msg);case 7:case"end":return e.stop()}}),e,this)})));function i(){return e.apply(this,arguments)}return i}(),getAcademies:function(){var t=r(n.default.mark((function t(){var e,i;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.request({url:"/academy",method:"GET"});case 2:e=t.sent,i=this,e.data.forEach((function(t){i.academyList.push(t.name)}));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),afterReadPic:function(e){console.log(e),console.log(e.detail),console.log(e.detail.file.path);var i=this,n=e.detail.file;t.uploadFile({url:this.$config.def().baseUrl+"/upload/upload/1",filePath:n.path,name:"file",formData:{},success:function(t){console.log(t);var e=JSON.parse(t.data);console.log(e),i.picList.push(e.data)}})}}};e.default=d}).call(this,i("543d")["default"])},"5e26":function(t,e,i){"use strict";i.r(e);var n=i("1dfc"),s=i("d082");for(var o in s)"default"!==o&&function(t){i.d(e,t,(function(){return s[t]}))}(o);i("bc2f");var a,r=i("f0c5"),u=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);e["default"]=u.exports},"7b21":function(t,e,i){},a785:function(t,e,i){"use strict";(function(t){i("1a2d"),i("921b");n(i("66fd"));var e=n(i("5e26"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},bc2f:function(t,e,i){"use strict";var n=i("7b21"),s=i.n(n);s.a},d082:function(t,e,i){"use strict";i.r(e);var n=i("3f13"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=s.a}},[["a785","common/runtime","common/vendor"]]]);