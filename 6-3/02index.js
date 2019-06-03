// 宏任务上的主线程代码  (1)
console.log('------------start----------')

// 第二个宏任务
setTimeout(() => {
    console.log('setTimout');
}, 0);

// new Promise().then() 是微任务 
new Promise( (resolved, rejected) =>{
    // 同步任务 ---- 主线程中的代码 (2)
    for (var i =0 ;i <5; i++){
        console.log(i);
    }
    // resolved一旦会被调用，就会调用then方法
    resolved();
}).then(() =>{
    // 微任务队列
    console.log('Promise实例回调执行');
})
// 主线程代码 (3)
console.log('-----------end----------');