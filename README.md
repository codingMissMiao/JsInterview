* [题目分析]()
    * [day1 **函数作用域**](#1)
    * [day2 **值类型和引用类型**](#2)
<h2 id="1">1.函数作用域</h2>
###  题目分析
- 题目是下面控制台将打印什么？
    - 我自己先测试来一遍，和结果！注意查看。

```js
//  题意是下面输入结果分别是：
 var num1 = 60 ;
 var num2 = 50 ;
 function foo(num,num1){
     // 先看传入什么进来 
     // var num ;
    //  var num1 = 50;
     num = 100 ;
     num1 = 100;
     num2 = 100;
     console.log(num); // 100
     console.log(num1); // 100
     console.log(num2); // 100 
 }
 // 调用foo()
 foo(num1,num2);
 console.log(num1); //60
 console.log(num2); // 100
 console.log(num); //报错！

 // 这个题目看起来很简单，但是带着带着一些坑！
```
![](https://github.com/yaogengzhu/JavaScript-Interview-question/blob/master/images/WX20190501-225840@2x.png?raw=true)

### 看完这个题目我们首先来了解下函数作用域。
    在 JavaScript 中，函数也是对象，实际上，JavaScript 里一切都是对象。函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供 JavaScript 引擎访问的内部属性。其中一个内部属性是 [[Scope]]，由 ECMA-262 标准第三版定义，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链，它决定了哪些数据能被函数访问
[可以参考的链接](https://gaohaoyang.github.io/2015/05/20/scope/)
**下面具体分析下关于这个题**
- 首先我认为这个题目，考点在于全局作用域和局部作用域。 
- 什么是全局作用域？顾名思义，全局作用域就是在全局可以访问的。那么相对的局部作用域只有在局部才可以访问哦
- 那么这个题目？ 首先可以对foo 函数进行分析。 我们传递来两个参数，如果这两个参数没有对num1传值的话，那么又将是另外一个结果。
- 正因为参数的影响。我们可以将参数的值看成，`var num  ; var num1 = 60; `在函数中，一旦`var` 之后，那么就随之在函数内部变成了局部作用域，对于没有var的`num2`而言，属于隐式全局可以变量，所以结果是可以访问到外部，故它可以改变外面的值。这也就解释来为什么结果是这个样子了。

<h2 id="2">值类型和引用类型</h2>
题目分析
```js
// 第2题值类型与引用类型的传递 

function Person(name, age, salary){
    this.name = name;
    this.age = age;
    this.salary = salary;
}

function f1(person) {
    // 调用f1  
    // var person = p; 
    // 两个变量的地址指向同一个对象，改变p.name ='ls'
    person.name = 'ls';
    // 堆内存重新开辟一个空间
    // person 改变指向，但是p没有改变指向
    person = new Person('aa', 18, 10);
}
var p = new Person('zs', 18, 1000);
console.log(p.name) // 'zs'
f1(p);
console.log(p.name); // 'ls'

/**
 * 栈内存中--- 值的存储
 * 堆内存 --- 引用类型存储 
 * 
 *  
 * 
 */
```