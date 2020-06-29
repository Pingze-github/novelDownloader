/**
 * 并发任务控制器
 * author: wang719695@gmail.com
 * createdate: 2017.8.11
 */

// 面向对象，使用组合模式
// 内置任务队列，可以通过init和push插入操作数据
// 参数包含回调，定义执行的任务
// 异常处理机制
// 支持多种设置
// 使用Promise
// 兼容ES6
// 链式调用
// 事件机制
// 进度查看

const EventEmitter = require('events').EventEmitter;

module.exports = Taskpool;

function Taskpool() {
  this.queue = [];
  this.pushed = 0;
  this.running = 0;
  this.success = 0;
  this.failed = 0;
  this.callback = null;
  this.timer = null;
  this.eventHub = new EventEmitter();
  this.result = [];
  this.options = {
    limit: 0,
    endsWhenEmpty: true,
    saveResult: true
  };
  this.optionsKeys = Object.keys(this.options);
  this.hasCatch = false;
}

Taskpool.prototype = {
  constructor: Taskpool,
  init(array) {
    if (!array || !array instanceof Array) throw new Error('taskpool init() cannot accept param not array');
    this.queue = array.slice(0);
    this.pushed += array.length;
    return this;
  },
  push(params) {
    this.queue.push(params);
    this.pushed++;
    this.eventHub.emit('taskPushed');
    return this;
  },
  task(callback) {
    // TODO 支持不返回Promise对象的callback
    this.callback = callback;
    return this;
  },
  option(options) {
    if (Object.prototype.toString.call(options) !== '[object Object]')
      throw new Error('taskpool option() cannot accept param not {}');
    for (let key in options) {
      if (!options.hasOwnProperty(key)) continue;
      if (this.optionsKeys.includes(key)) {
        this.options[key] = options[key];
      }
    }
    return this;
  },
  limit(limit) {
    if (typeof limit !== 'number') throw new Error('taskpool limit() cannot accept param not number');
    this.options.limit= limit;
    return this;
  },
  start(options) {
    if (options) {
      this.option(options);
    }
    this.run();
    return this;
  },
  run() {
    this.timer = setInterval(() => {
      if (this.options.endsWhenEmpty === true) {
        if (this.queue.length === 0 && this.running === 0) {
            this.end();
        }
      }
      let space = this.options.limit - this.running;
      if (space < 0 && this.options.limit !== 0) throw new Error('Internal error: running task num over than limit');
      if (this.options.limit === 0) space = this.queue.length;
      for (let i = 0; i < space; i++) {
        let params = this.queue.shift();
        if (params) this.runOne(params);
      }
    }, 0);
  },
  end() {
    this.eventHub.emit('end');
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  waitend() {
    this.options.endsWhenEmpty = true;
    return this;
  },
  runOne(params) {
    this.running++;
    let cparams = Object.prototype.toString.call(params) === '[object Array]' ? params : [params];
    this.callback(...cparams).then((result) => {
      this.running--;
      this.success++;
      if (this.options.saveResult === true) {
        this.result.push(result);
      }
      this.eventHub.emit('success', [result, params]);
    }).catch((err) => {
      this.running--;
      this.failed++;
      this.eventHub.emit('failed', [err, params]);
      if (this.hasCatch === true) {
        this.eventHub.emit('error', err);
      } else {
        console.error(err);
        process.exit();
      }
    });
  },
  on(type, callback) {
    if (type === 'data' || type === 'success') {
      this.eventHub.on('success', (data) => {
        callback(...data);
      });
    }
    if (type === 'data' || type === 'failed') {
      this.eventHub.on('failed', (data) => {
        callback(...data);
      });
    }
    return this;
  },
  then(callback) {
    this.eventHub.on('end', () => {
      callback(this.result);
    });
    return this;
  },
  catch(callback) {
    this.hasCatch = true;
    this.eventHub.on('error', (err) => {
      callback(err);
    });
    return this;
  },
  progress(callback) {
    this.eventHub.on('success', (data) => {
      callback(this.success + this.failed, this.pushed, this.success, this.failed, 0, data[1]);
    });
    this.eventHub.on('failed', (data) => {
      callback(this.success + this.failed, this.pushed, this.success, this.failed, -1, data[1]);
    });
    this.eventHub.on('taskPushed', (data) => {
      callback(this.success + this.failed, this.pushed, this.success, this.failed, 1, data[1]);
    });
    return this;
  }
};
