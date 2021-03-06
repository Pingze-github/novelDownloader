
module.exports = {
  // 文件保存路径
  saveDir: './books/',
  // 请求并发限制数目
  limit: 5,
  // 链接超时最大重试次数
  maxRetry: 5,
  // 请求通用设置
  requestOptions: {
    method: 'GET',
    timeout: 5000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
      'Referer': '',
    }
  },
  removeStringList: [
    'readx();',
    '                        readx();'
  ],
  // 站点规则配置（按主机名区分）
  hosts: {
    // 主机名
    'www.biquge.com': {
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
        selector: '#list a',
        jquery: "$('#list').children('a')"
      },
      // 正文容器
      content: {
        selector: '#content',
      }
    },
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
    },
    'www.biquzi.com': {
      title: {
        selector: '#info h1'
      },
      author: {
        selector: '#info p:nth-child(2)'
      },
      cover: {
        selector: '#fmimg img'
      },
      catalog: {
        selector: '#list dd a',
      },
      content: {
        selector: '#content',
      }
    },
    'www.biqubao.com': {
      title: {
        selector: '#info h1'
      },
      author: {
        selector: '#info p:nth-child(2)'
      },
      cover: {
        selector: '#fmimg img'
      },
      catalog: {
        selector: '#list dd a',
      },
      content: {
        selector: '#content',
      }
    },
    'www.sjtxt.com': {
      title: {
        selector: '.info_des h1'
      },
      author: {
        jquery: "$('.info_des dl').eq(0)"
      },
      cover: {
        selector: '.tupian>a>img'
      },
      catalog: {
        jquery: "$('[id=info]').eq(2).find('li>a')",
      },
      content: {
        selector: '#content1',
      }
    },
    'www.sjtxt.la': {
      title: {
        selector: '.info_des h1'
      },
      author: {
        jquery: "$('.info_des dl').eq(0)"
      },
      cover: {
        selector: '.tupian>a>img'
      },
      catalog: {
        jquery: "$('[id=info]').eq(2).find('li>a')",
      },
      content: {
        selector: '#content1',
      }
    },
    'www.miaobige.com': {
      title: {
        selector: '#smallcons>h1',
      },
      author: {
        selector: '#smallcons span a'
      },
      catalog: {
        selector: '#readerlists ul li a'
      },
      content: {
        selector: '#content'
      }
    },
    'www.23us.cc': {
      title: {
        selector: '.btitle h1'
      },
      author: {
        selector: '.btitle em'
      },
      catalog: {
        selector: '.chapterlist dd a'
      },
      content: {
        selector: '#content'
      }
    }
  }
};
