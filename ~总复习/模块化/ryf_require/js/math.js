/*
* @Author: 王小猛
* @Date:   2016-09-07 16:53:54
* @Last Modified by:   王小猛
* @Last Modified time: 2016-09-07 21:04:32
*/


define('math',['./add','./sub','./mul','./div'],function(add,sub,mul,div){
	return {
		add : add,
		sub : sub,
		mul : mul,
		div : div
	};
})