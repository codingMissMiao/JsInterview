* [题目分析]()
    * [day1 **函数作用域**](#1)
    * [day2 **值类型和引用类型**](#2)
    * [day3 **如何将字符串转成驼峰命名**](#3)
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
### 题目和结果如下：

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
 */
```
### 在分析这个题目的时候，我们首先需要了解值类型和引用类型
- 在JS中，每一个数据都需要一个内存空间。内存空间又被分为两种，栈内存(stock)与堆内存(heap)。
    - **栈内存**
        - 基础数据类型与栈内存。基础数据类型有`Number`,`String`,`Boolean`,`Null`,`Undefined`
        - JS中的基础数据类型，这些值都有固定的大小，往往都保存在栈内存中，由系统自动分配存储空间。我们可以直接操作保存在栈内存空间的值，因此基础数据类型都是按值访问。
        - 特点：先进后出，后进先出。
    - **引用类型与堆内存**
        - JS的引用数据类型，比如数组Array，它们值的大小是不固定的。引用数据类型的值是保存在堆内存中的对象。JavaScript不允许直接访问堆内存中的位置，因此我们不能直接操作对象的堆内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。因此，引用类型的值都是按引用访问的。这里的引用，我们可以粗浅地理解为保存在栈内存中的一个地址，该地址与堆内存的实际值相关联。
        - 特点：先进先出
    
    ```js
    var a1 = 0;   // 栈 
    var a2 = 'this is string'; // 栈
    var a3 = null; // 栈

    var b = { m: 20 }; // 变量b存在于栈中，{m: 20} 作为对象存在于堆内存中
    var c = [1, 2, 3]; // 变量c存在于栈中，[1, 2, 3] 作为对象存在于堆内存中
    ```
**因此当我们要访问堆内存中的引用数据类型时，实际上我们首先是从栈中获取了该对象的地址引用（或者地址指针），然后再从堆内存中取得我们需要的数据**
[特别有用的参考](https://juejin.im/entry/589c29a9b123db16a3c18adf)
#### 分析到这里，我想已经明白了上面那一道题的具体思路了，如果不了解，下附一张图：
!['栈和堆'](https://github.com/yaogengzhu/JsInterview/blob/master/images/README.png?raw=true)

#### [特别分享关于settimeout解释](https://mp.weixin.qq.com/s?__biz=MzI1MTE2NTE1Ng==&mid=2649515867&idx=1&sn=971a3e41da08ddf2da200d9d07af0fb0&chksm=f1efe7d0c6986ec688a746ece15f52c8df78bca37ca2609e75199f5c3fbbabd3fbcc00179885&scene=0&key=564c3e9811aee0abcc036cb111e6e7bdbe3938a8756b5bf3b98a1696b2f16c1e6e3a1b4af159d1ae1dd3e71ee5fae4e0b6655bd9f37cc81efb1174bf3ef39b43f874bc6a0482348422cc5245dfae917f&ascene=0&uin=MzIxNTY1NTU=&devicetype=iMac+MacBookPro11,1+OSX+OSX+10.12.1+build(16B2555)&version=12010210&nettype=WIFI&fontScale=100&pass_ticket=g24dIjS/70EF4QPCYwRMInMa218z6XagvevxLr5Mbzc=)
(本小节完！)

<h2 id ="3">如何使用驼峰命名</h2>

### 这个题目主要考察对字符串的几个使用方法。好了，让我们看看题目把！
```js 
var foo = 'hello-world-javaScript';
// var arr = foo.split('-');
// for (var i = 0; i<arr.length; i++){
//     if(i>0){
//         // console.log(arr[i].charAt(0));
//         // 把首字母转成大写
//         // console.log(arr[i].charAt(0).toUpperCase());
//         // 除掉第一个字母，然后进行拼接
//         // console.log(arr[i].charAt(0).toUpperCase() + arr[i].substr(1,arr[i].length));
//         // 重新赋值给arr[i]
//         arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1,arr[i].length);
//         // console.log(arr[i]);
//     }
// } 
// 已经成功的转成大写的数组形式  
// console.log(arr)
// 最后使用join 方式将数组转成字符串。
// console.log(arr.join(''))  // 已经成功的转成驼峰命名
// .charAt(0).toUppercase()+ arr[i].subStr(1,arr[i].length)  //拿到字符的第一个字母，转成大写。
// 
// 封装成函数  
function toString(str){
    // 第一步将字符串专程数组
    var arr = str.split('-');
    // 第一步循环遍历
    for (var i=0 ; i < arr.length ; i ++ ){
        // 因为要除去第一个单词不用遍历。 所以不要arr[0]
        if (i > 0) {
            // 一步到位，具体看上面演示
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1,arr[i].length);
        }
    }
    // 将数组重新转成字符串
    return arr.join(''); 
}

//test  
console.log(toString(foo));
```
#### 本次方法用到了`str.split()`字符串分割方法。 字符串的`str.charAt()`方法获取字符串的第一个字母 。使用字符串的方式截取字符`str.substr()`。            还使用了arr.join(''). 将数组专程字符串。 

[具体的字符串用法可参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)

（本节完～）