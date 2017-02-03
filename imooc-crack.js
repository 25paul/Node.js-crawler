var http = require('http');
var url = 'http://www.imooc.com/learn/348';

http.get(url,function(res){
	var html='';
	res.on('data',function(data){
		html += data;
	})
	res.on('end',function(){
		console.log(html);
	})
}).on('error',function(){
	console.log('获取数据出错')
})


// http.get(function(req,res){
// 	res.on('data',function(data){
// 		html += data;
// 	})
// 	res.end('data',function(){
// 		console.log(html);
// 	})
// }).on('error',function(){
// 	console.log('获取数据出错')
// })