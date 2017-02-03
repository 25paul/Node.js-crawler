
var http = require('http');
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348';

function filterChapters(html){
	var $ = cheerio.load(html)      //通过cheerio.load把html装载进来
	var chapters = $('.chapter')    //每一章的内容
	var courseData = []             //courseDate是一个数组
	chapters.each(function(item){
		var chapter = $(this)
		var chapterTitle = chapter.find('strong').text().trim()     //标题strong
		var videos  = chapter.find('.video').children('li')
		var charterData = {                       //每一章有名字和视频
			chapterTitle: chapterTitle,
			videos:[]
		}
		videos.each(function(item){
			var title = $(this).find('a').text().trim()
			var id = $(this).find('a').attr('href').split('video/')[1].trim()
			var video = {                  //每个视频有名字和id
				title:title,
				id:id
			}
			charterData.videos.push(video)
		})
		courseData.push(charterData)
	})
	return courseData
}

// data是数组，将获取到的数据打印出来
function printCourseInfo(data){
	data.forEach(function(item){
		console.log(item.chapterTitle + '\n')
		item.videos.forEach(function(video){
			console.log(' 【' + video.id + '】' + video.title)
		})
	})
}

// 清除字符串前后空格
String.prototype.trim = function() 
{ 
return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 

http.get(url,function(res){
	var html='';
	res.on('data',function(data){
		html += data;
	})
	res.on('end',function(){
		var courseDate = filterChapters(html)

		printCourseInfo(courseDate)
	})
}).on('error',function(){
	console.log('获取数据出错')
})


// 展示结构，获取到的是数组：
// [{
// 	chapterTitle:'',
// 	videos:[
// 		title:'',
// 		id:''
// 	]
// }]