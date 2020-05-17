// 时间戳转时分秒
function getformatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt;
};

 // 时间过滤
export function dateFormat(time) {
  return getformatDate(new Date(time), "yyyy-MM-dd hh:mm");
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};



// 时间过滤
export function dateFormat2(time) {
		const nDate = new Date(time)
		const year = nDate.getFullYear()
		const month = (nDate.getMonth()+1).toString().padStart(2, 0)		// 往前补零至两位数
		const day = nDate.getDate().toString().padStart(2, 0)
		const hour = nDate.getHours().toString().padStart(2, 0)
		const min = nDate.getMinutes().toString().padStart(2, 0)

		const now = new Date()
		const now_year = now.getFullYear()
		const now_month = (now.getMonth()+1).toString().padStart(2, 0)
		const now_day = now.getDate().toString().padStart(2, 0)
		
		if(now_year != year || now_month != month || now_day != day) {
			return year + '-' + month + '-' + day + " " + hour + ":" + min
		}	
		return hour + ":" + min
}

export function dateFormat4(time) {
	return String(time).substr(0, 10)
}

// 数字过滤
export function formatViews(views) {
	if(10000 < views){
		return '1W+'
	}else if(5000 < views){
		return '5K+'
	}else if(4000 < views){
		return '4K+'
	}else if(3000 < views){
		return '3K+'
	}else if(2000 < views){
		return '2K+'
	}else if(1000 < views){
		return '1K+'
	}else{
		return views
	}
}
// Vue.filter('formatViews', (views) => {
// 	if(10000 < views){
// 		return '1W+'
// 	}else if(5000 < views){
// 		return '5K+'
// 	}else if(4000 < views){
// 		return '4K+'
// 	}else if(3000 < views){
// 		return '3K+'
// 	}else if(2000 < views){
// 		return '2K+'
// 	}else if(1000 < views){
// 		return '1K+'
// 	}else{
// 		return views
// 	}
// })
