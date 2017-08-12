
module.exports = {
  requestOptions: {
    method: 'GET',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
  },
  hosts: {
    // 主机名
    'www.biquge.tv': {
      // 目录。指页面中包含目录链接的<a>或底层元素
      catalog: {
        // 内置两种选择方式：CSS选择器 和 jQuery语句。都存在时优先使用selector。
        selector: null,
        jquery: "$('#list dt').eq(1).nextAll().children('a')"
      }
    }
  }
};