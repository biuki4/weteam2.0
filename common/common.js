
const checkEamil = function(email){
	return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(email);
}

const checkMobile = function(mobile){
	return RegExp(/^1[345789]\d{9}$/).test(mobile);
}

const checkGrade = function(grade){
	return RegExp(/[2][0][1-2][0-9]/).test(grade);
}

const checkUsername = function(grade){
	return RegExp(/[2][0][1-2][0-9]\d{6}$/).test(grade);
}

const isUnknowTime = function(date) {
	// const now = new Date()
	// const now_year = now.getFullYear()-2
	// const u = now_year + "-01-01"
	const u = "2018-01-01"
	if(u == date) {
		return true
	}
	return false
}


// d1 >= d2
const greaterEqual = function(d1, d2) {
	// console.log(d1.getFullYear())
	// console.log(d2.getFullYear())
	// console.log(d1.getMonth())
	// console.log(d2.getMonth())
	// console.log(d1.getDate())
	// console.log(d2.getDate())

	if(d1.getFullYear() > d2.getFullYear()) return true
	if((d1.getFullYear() == d2.getFullYear()) && (d1.getMonth() > d2.getMonth())) return true
	if((d1.getFullYear() == d2.getFullYear()) && (d1.getMonth() == d2.getMonth()) && (d1.getDate() >= d2.getDate())) return true
	return false
}

// d1 > d2
const greater = function(d1, d2){
	// console.log("greater-------------------")
	// console.log(d1.getFullYear())
	// console.log(d2.getFullYear())
	// console.log(d1.getMonth()+1)
	// console.log(d2.getMonth()+1)
	// console.log(d1.getDate())
	// console.log(d2.getDate())
	if(d1.getFullYear() > d2.getFullYear()) return true
	if((d1.getFullYear() == d2.getFullYear()) && (d1.getMonth() > d2.getMonth())) return true
	if((d1.getFullYear() == d2.getFullYear()) && (d1.getMonth() == d2.getMonth()) && (d1.getDate() > d2.getDate())) return true
	return false
}


export default {
	// 页面条数
	pageSize: 10,
	checkEamil,
	checkMobile,
	checkGrade,
	checkUsername,
	greaterEqual,
	greater,
	isUnknowTime
}

