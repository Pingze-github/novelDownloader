

const Taskpool = require('./taskpool');

function log(...str) {
  console.log(`[${new Date()}] ${str}`)
}

function foo(i,j) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try{
        if (i === 2) JSON.parse('{{}');
      } catch (err) {
        reject(err)
      }
      log('i',i);
      log('j',j);
      resolve(i+j);
    }, i*1000);
  });
}

let tp = new Taskpool;

tp
  .option({
    limit: 1,
    endsWhenEmpty: false,
    saveResult: true
  })
  .init(Array.from({length: 3}, (v,i) => {return [i,i+1]}))
  .task(foo)
  .on('data', (data, params) => {
    console.log('result: ', data);
    console.log('params: ', params);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log('error!')
    // deal with error
  })
  .progress((finish, total, success, failed, type) => {
    console.log(`Progress: ${finish}/${total} ${success}/${failed}`);
  })
  .start();

setTimeout(() => {
  tp.push([1,1]);
  tp.waitend();
}, 5000);

