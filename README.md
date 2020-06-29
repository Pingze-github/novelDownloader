# novelDownloader 
通用小说下载器

#### 使用

1. 运行 `node index.js http://www.xxx.tv/xxx/`。第三个参数为需要下载的小说的目录页。
2. 若报告未配置，需要自己在config.js里配置匹配规则。已经内置了一些网站的配置。

#### 特点

+ 站点通用。增加对新站点的支持只需配置匹配规则，无需重写代码。
+ 支持使用**CSS选择器**和**jQuery语句**进行匹配，有一些前端知识的同学都可以使用。
+ 并发控制。采用[taskpool](https://github.com/Pingze-github/taskpool)进行并发数目控制，始终保持一定数目的请求，高效下载。

#### 注意
请使用 **Node8.0.0** 及以上版本运行脚本。

#### 特别说明
如果你配置了新的站点，可以发起 pull request 或 issue 来分享给更多人。

