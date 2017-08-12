
module.exports = {
  // 文件保存路径
  saveDir: './books/',
  // 请求并发限制数目
  limit: 5,
  // 请求通用设置
  requestOptions: {
    method: 'GET',
    timeout: 5000,
    maxRetry: 3,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
  },
  // 站点规则配置（按主机名区分）
  hosts: {
    // 主机名
    'www.biquge.tv': {
      // 标题
      title: {
        // 内置两种选择方式：CSS选择器 和 jQuery语句。都存在时优先使用selector，取text()。
        selector: '#info h1'
      },
      // 作者
      author: {
        selector: '#info p:nth-child(2)'
      },
      // 目录。指页面中包含目录链接的<a>或底层元素
      catalog: {
        selector: null,
        jquery: "$('#list dt').eq(1).nextAll().children('a')"
      },
      // 正文容器
      content: {
        selector: '#content',
      }
    }
  }
};