# HTTP 小爬虫
## 借助HTTP API
网络上每时每刻都有大量的请求，又从客户端到服务器端的，也有服务器端到服务器端的。浏览器有ajax可以获取数据，http中则有get和post<br/>
爬一个单页面的源码：*示例imooc-crack.js*。<br/>

接下来分析源码，把有价值的东西筛选出来：从整个html中过滤出所有章节的文字<br/>
在imooc-crack.js得到的html进行过滤，编写一个filterChapters(html)函数<br/>

推荐一个模块：解析代码可以使用一个模块：cheerio<br/>
npm install cheerio<br/>
由于没有配置路径，所以在D盘（其他盘也一样）运行不了，只能在用户所在的目录下运行。<br/>
模块安装的时候是在：C:\Users\CXJ\AppData\Roaming\npm\node_modules<br/>
我的问题：打开终端时要以管理员的身份打开<br/>
模块全局安装路径：http://www.cnblogs.com/GeoChen/p/5496322.html<br/>
https://segmentfault.com/q/1010000004529157<br/>
后来，搞着搞着居然好了，模块可以下载到node.js目录下了：<br/>
C:\Program Files\nodejs\node_global\node_modules<br/>
而不是：C:\Users\CXJ\AppData\Roaming\npm\node_modules<br/>
这样的话配置了环境变量到node.js目录，就可以在：<br/>
D:\20161101\Node\Node_muke\demo\crawler直接使用node crawler.js了。<br/>

*示例crawler.js*。
