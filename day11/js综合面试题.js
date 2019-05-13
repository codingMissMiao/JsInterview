function Foo (){
    getName = function () {
        console.log(1)
    }
    return this 
}

Foo.getName = function () { console.log(2)}
Foo.prototype.getName = function() { console.log(3) }
var getName = function () {console.log(4)}
function getName() { console.log(5) }

// 输出结果 
Foo.getName()   //2 👌
getName() // 5 ❌   4  
Foo().getName() // ❌ (Foo()).getName()  ----> window.getName() 1
getName() // 5 ❌  1
new Foo.getName() //2 👌  new(Foo.getName)() ----->> new (function(){console.log(2)})  2
new Foo().getName()// ❌  (new Foo()).getName() ---> foo.getName()   3
new new Foo().getName() // ❌ new ((new Foo()).getName)()  --->  new (foo.getName)()  ---> new (function(){ console.log(3)})() //3

/**
 *  变量提升和函数提升   
 * 1. 函数提升（整体的提升）
 * 2. var 变量提升(声明的提升)   
 * 3. 重新赋值  
 * 4. 变量的查找规则，沿着作用域链去找
 * 5. 点的优先级关系最高
 * 6. 实例对象找属性。隐式原型链查找～
 * 7. 变量和函数自定义冲突，保留函数
 * 
 */


// function Foo (){
//     getName = function () {
//         console.log(1)
//     }
//     return this 
// }

// Foo.getName = function () { console.log(2)}
// Foo.prototype.getName = function() { console.log(3) }
// var getName = function () {console.log(4)}
// function getName() { console.log(5) }

//分析

function Foo (){
    getName = function () {
        console.log(1)
    }
    return this 
}
// 变量声明的提升 
// 和函数自定义名字冲突
// var getName    
// 函数的提升
// 变量和函数提后，继续从⬆️到⬇️执行代码， 发现后面的函数getName,  会重新赋值
// function getName() { console.log(5) }
Foo.getName = function () { console.log(2)}
Foo.prototype.getName = function() { console.log(3) }
getName = function () {console.log(4)}
