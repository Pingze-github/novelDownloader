/**
 * 通用小说下载器
 * author: wang719695@gmail.com
 * createdate: 2017.8.11
 */

// 异步控制
// 代码通用
// 用户可配置

const URL = require('url');
const request = require('request');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

const Taskpool = require('./taskpool');
const config = require('./config');

function randomIp() {
  let ip = '';
  for (let i in Array.from({length:4})) {
    let pattern = Math.ceil(Math.random() * 254);
    ip += pattern.toString() + '.';
  }
  return ip.slice(0, -1);
}

function getFullHref(href, url) {
  if (url.endsWith('/')) url = url.slice(0, -1);
  let {host, protocal} = URL.parse(url);
  if (href.startsWith('http')) return href;
  if (href.startsWith('//')) return `${protocal}:${href}`;
  if (href.startsWith('/')) return `${protocal}://${host}${href}`;
  return `${url}/${href}`;
}

function getPage(url) {
  return new Promise((resolve, reject) => {
    let options = config.requestOptions;
    options.url = url;
    options.headers['X-Real-IP'] = randomIp();
    options.headers['X-Forwarded-For'] = randomIp();
    let req = request(options);
    req.on('error', function(err) {
      reject(err);
    });
    req.on('response', function(res) {
      let chunks = [];
      res.on('data', function (chunk) {
        chunks.push(chunk);
      });
      res.on('end',function(){
        let body = chunks.toString();
        let charset = body.match('charset=["\']{0,1}([a-zA-Z0-9]{3,8})["\']');
        charset = charset ? charset[1] : 'utf-8';
        let result = iconv.decode(Buffer.concat(chunks), charset);
        resolve(result);
      });
    });
  });
}

async function start(url) {
  let host = URL.parse(url).host;
  if (!(host in config.hosts)) {
    console.log(`尚未配置此host: ${host} 。请配置后再尝试...`);
  }
  let hostConfig = config.hosts[host];
  let catalogPage = await getPage(url);
  const $ = cheerio.load(catalogPage);
  let $catalog;
  if (hostConfig.catalog.selector) {
    $catalog = $(hostConfig.catalog.selector);
  } else {
    eval(`$catalog = ${hostConfig.catalog.jquery}`);
  }
  if (!$catalog) {
    return console.log(`未找到目录，请检查 ${host} 配置...`);
  }


  let catalog = (($c) => {
    let c = [];
    for (let index of Array.from({length: $c.length}, (v, i) => i)) {
      $ch = $c.eq(index);
      c.push({
        title: $ch.text(),
        url: getFullHref($ch.attr('href'), url)
      });
    }
    return c;
  })($catalog);

  console.log(catalog.length)

}


if (!module.parent) {
  let url = 'http://www.biquge.tv/0_621/';
  start(url).catch((err) => {
    console.log(err);
  });
}
