var http = require("http");
var fs = require("fs");
var cheerio = require("cheerio");
var url = "http://www.ivsky.com/";

function download ( url,callback ) {
    http.get( url,function(res){
        var data = "";
        res.on("data",function(chunk){
            data += chunk;
        });
        res.on("end",function(){
            callback(data)
        })
    }).on("error",function(err){
        console.log(err)
    })
}

download( url,function( data ) {
    if(data){
        var $=cheerio.load(data);
        console.log($('img').length)
        $("img").each(function(i,elem){
            var imgSrc=$(this).attr("src");
            console.log(imgSrc)
            http.get(imgSrc,function(res){
                var imgData="";
                res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
                res.on("data",function(chunk){
                    imgData += chunk;
                });
                // console.log(imgData+i);
                res.on("end",function(){
                    var imgPath="/"+i+"."+imgSrc.split(".").pop();
                    fs.writeFile(__dirname + "/imgs"+imgPath,imgData,"binary",function(err){
                        // console.log(err);
                        if (err) throw err;
                        console.log('It\'s saved!');
                    })
                })

            })
        })
    }
})
// 注意：所获取的数据的二进制数据，所以一定要设置编码格式为binary，因为writeFile的默认编码格式为utf-8，否则保存的图片无法打开。

/*
fs.writeFile:
以异步的方式将data写入文件，文件已存在的情况下，原内容将被替换。
fs.writeFile(filename, data, [options], [callback(err)])
接收参数：
filename      (String)            文件名称
data        (String | Buffer)    将要写入的内容，可以使字符串 或 buffer数据。
options        (Object)           option数组对象，包含：
· encoding   (string)            可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored。
· mode         (Number)        文件读写权限，默认值 438
· flag            (String)            默认值 ‘w'
callback {Function}  回调，传递一个异常参数err。

实例
fs.writeFile('message.txt', 'Hello Node', function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});

源码
fs.writeFile = function(path, data, options, callback) {
  var callback = maybeCallback(arguments[arguments.length - 1]);
  if (util.isFunction(options) || !options) {
    options = { encoding: 'utf8', mode: 438, flag: 'w' };
  } else if (util.isString(options)) {
    options = { encoding: options, mode: 438, flag: 'w' };
  } else if (!util.isObject(options)) {
    throw new TypeError('Bad arguments');
  }
  assertEncoding(options.encoding);
  var flag = options.flag || 'w';
  fs.open(path, options.flag || 'w', options.mode, function(openErr, fd) {
    if (openErr) {
      if (callback) callback(openErr);
    } else {
      var buffer = util.isBuffer(data) ? data : new Buffer('' + data,
          options.encoding || 'utf8');
      var position = /a/.test(flag) ? null : 0;
      writeAll(fd, buffer, 0, buffer.length, position, callback);
    }
  });
};

*/