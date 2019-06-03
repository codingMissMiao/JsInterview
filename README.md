* [题目分析]()
    * [day1 **函数作用域**](#1)
    * [day2 **值类型和引用类型**](#2)
    * [day3 **如何将字符串转成驼峰命名**](#3)
    * [day4 **中的冒泡排序**](#4)
    * [day5 **数组的反转**](#5)
    * [day6 **数组去重**](#6)
    * [day7 **1px物理像素的实现**](#7)
    * [day8 **多种方式让元素水平垂直居中**](#8)
    * [day9 **利用css实现三角形**](#9)
    * [day10 **如何做rem适配**](#10)
    * [day11 **js综合题**](#11)
    * [day12 **函数节流和防抖**](#12)
    * [day13 什么是跨域？如何解决跨域](#13)
    * [day14 node事件轮询机制](#14)
    * [day15 输入url到最终页面的过程，发上了什么?](#15)
    * [day16 闭包](#16)
    * [day17 变量提升](#17)
    
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

<h2 id="4">js中的冒泡排序</h2>

### 如何解决js中的冒泡排序问题。
```js
//  如何对数组进行冒泡排序 

var arr = [10,3,4,5,6,1,2,3];

// 循环比较的轮数 
for (var i=0; i<arr.length-1; i++){
    // 每轮比较的次数 
    for (var j=0; j<arr.length-1-i; j++){
        //判断arr[j] 是否 大于arr[j+1] ,如果大于，两个数进行交换  
        if (arr[j] > arr[j+1]) {
            // 如果成立的话，交换两个数，需要借助第三方变量来实现 
            // 第一步，将arr[j] 先存放到temp 中。
            var temp = arr[j];
            // 第二步。将arr[j+1]的值赋值给arr[j]// 
            arr[j] = arr[j+1];
            // 第三步，将存放的arr[j]的值交给arr[j+1]
            arr[j+1] =temp;
        }
    }
}
// 到这已经完成了冒泡排序 
console.log(arr);
```
### 首先看懂这个图。
![图解](https://github.com/yaogengzhu/JsInterview/blob/master/images/maopao.png?raw=true)
### 分析图
- 第一，对于冒泡比较，我们比较的轮数的轮数可以看出都是数组的长度减1 
- 第二，分析每一轮比较的次数是多少？进行第二次循环。上面的代码已经分析得非常清楚。

<h2 id="5">数组的反转</h3>

### 数组反转解析 
```js

// 需求是实现数组的反转 
var arr = [1,3,4,5,6,7,8,9];
// 思路： 将第一个数字和最后一个数组交换 ，一共需要交换的次数就是数组的一半   
for (var i=0; i<arr.length/2; i++){
    // 思路
    /**
     * arr[0] = arr[arr.length-1-0]
     * arr[1] = arr[arr.length-1-1]
     * arr[2] = arr[arr.length-1-2]
     * ....
     * ....
     */
    //采用第三方变来存放交换的值 
    var temp = arr[i];
    arr[i] = arr[arr.length-1-i];
    arr[arr.length-1-i] = temp;
}
console.log(arr);
```
**当然这个是最原始的反转方式来，数组已经提供来原生API(`Array.prototype.reverse()`)可以使用**
[参考链接点我](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

(本节完！)

<h2 id="6">数组去重</h2>

### 看题分析
```js
// 业务要求数组去重 
var arr = [1,3,4,5,,4,4,4,4,55,5,5];
// 设置一个新的数组
var newArr = [];
// 首先将数组的第一个值赋值给newArr 
newArr[0] = arr[0];
// 循环遍历数组arr 
for (var i=0 ; i< arr.length ; i++){
    // 循环遍历数组是否和新数组中的一致 
    for(var j=0; j<newArr.length; j++){
        // 判断arr数组中是否有跟newArr相等的数,如果相等，break
        // 进行下一个比较 
        if (newArr[j] === arr[i]) {
            break;
        }
        // 控制一轮比完。
        if (j=== newArr.length - 1){
            newArr.push(arr[i]);
        }
    }
}
console.log(newArr);
```
#### 总结，数组去重的方式多样，本人更加喜欢`Array.prototype.indexOf()`这种方式去重 。

[关于indexOf去重，可以关注我的博客](https://www.cnblogs.com/yaogengzhu/p/10743177.html)

<h2 id="7">1px物理像素如何实现</h2>

### 物理像素和css像素 

### 方案1 通过js实现
需要首先搞明白物理像素和css像素 
- `设备像素（devie pixel` 是物理概念，指的是设备的物理像素。
- `css像素 (CSS pixel)` CSS 像素是web编程中的概念，指的是Css中的逻辑像素。在Css中，长度可以分为两类，绝对单位以及相对单位。`px` 是一个相对的单位，相对的是设备的像素。
 像素比 = 物理像素/css像素 
- [具体参考点我](https://www.jianshu.com/p/af6dad66e49a)
```js
// 获取当前的物理像素
var dpr = window.devicePixeRatio;
// 设置物理的像素的缩放比 
var scale = 1/dpr;
// 获取meta  
var metaNode = document.querySelect('meta[name="viewport"]');
// 设置初始缩放比 
metaNode.setAtttribute('content','widht=divce-width,inital-scale='+scale+'');
```
### 方案2 通过css实现 
直接看代码
```css
      .box {
            position: relative;
            width: 100px;
            /*  */
            height: 100px;
        }
        .box::before{
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: #000;
        }
        /* 媒体查询 */
        @media screen and (-webkit-min-device-pixel-ratio:2){
            .box::before{
                transform: scaleY(0.5)
            }
        }
        @media screen and (-webkit-min-device-pixel-ratio:3){
            .box::before{
                transform: scaleY(0.3333)
            }
        }
```
此类方式根据媒体查询来实现哦

#### 以上方法就实现1px 物理像素。

<h2 id="8"> 多种方式让元素水平垂直居中 </h2>

 本次采用了四种方式，看代码

 ```css 
  .box1{
            width: 400px;
            height: 400px;
            background-color: red;
            /* 方式1 2 3 需要解开 */
            /* position: relative; */
            /* 方式4 */
            display: flex;
            /* 水平方向上居中 */
            justify-content: center;
            /* 垂直方向向居中 */
            align-items: center;
        }
        .box2{
            width: 100px;
            height: 100px;
            background-color: pink;
            /* position: absolute; */
            /* 方式1 */
            /* top: 50%;
            left: 50%;
            margin-left: -50px;
            margin-top: -50px; */
            /* 方式2 */
            /* left: 0;top:0; right: 0;bottom: 0;
            margin:auto; */
            /* 方式3 */
            /* top: 50%;
            left: 50%;
            transform: translate(-50%,-50%); */
            
        }
``` 

### 总结： 上述方式用了四种方式，其中三种都是采用了`position` 方式。。在使用方式2的时候，记得对`margin:atuo`。不然没法实现。。第四种方式是`flex`布局方式。还有一种比较老版本的的居中方式是：

```css
*{
    display:-webkit-box;
    -webkit-box-pack:center;
    -webkit-box-align:center;
}
```

（ 本节完！）

<h2 id="9">利用css实现三角形</h2>

### 如何利用`css`实现▶️三角形 直接上代码

```css
.box{
    width:0;
    height:0;
    border:100px solid;
    border-top-color:red;
    /* border-right-color:green; */
    /* border-bottom-color:pink; */
    /* border-left-color:purple; */
    border-right-color:transparent;
    border-bottom-color:transparent;
    border-left-color:transparent;
}
```
### 实现原理 
利用边框的特点。而且每一条边框都可以设置不同的大小，或者颜色等。去掉中心内容，如果设置不同的颜色，就可以实现四个三角形。如果只需得到一个三角
形，就给其他的三个边都设置`transparent`。

(本节完！)

<h2 id="10">如何利用rem做移动端适配<h2>

### rem移动端适配 

#### 什么是rem ?
rem（font size of the root element）是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位。看到rem大家一定会想起em单位，em（font size of the element）是指相对于父元素的字体大小的单位。它们之间其实很相似，只不过一个计算的规则是依赖根元素一个是依赖父元素计算。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0 ">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div{
            width: 1rem;
            height: 1rem;
            background-color:red;
        }
    </style>
</head>
<div></div>
<body>
    <script>
        var ScreenWidth = document.documentElement.clientWidth
        // console.log(ScreenWidth)    
        var htmlNode = document.getElementsByTagName('html')[0]
        // console.log(htmlNode)
        // htmlNode.style.backgroundColor = 'red'
        htmlNode.style.fontSize = ScreenWidth + 'px'
    </script>
</body>
</html>
```

(本小节完～)

<h2 id="11">js综合题<h2>

### js综合题目（直接看代码和正确答案）
```js
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
```
### js代码解析  

```js
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
```

### 总结 （本次题目考察）
```js
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
```

(本节完！)

<h2 id= 12>函数的节流和防丢<h2>

### 函数的节流 
函数节流的含义： 让被执行函数在指定的时间内被触发，而不是时刻被触发。对于时刻被触发的函数有限制的作用，这样做的好处可以极大的提升浏览器的性能。

```js 
function throttle(fn, delay){
            // fn 执行函数 ，  delay 延迟时间  
            // 设置一个时间变量。 记录上一次时间 
            let lastTime = 0
            return  function(){
                // 记录当前的时间戳 
                let currentTime = Date.now()
                //判断当前时间减去记录上一次的时间，是否大于延迟时间 
                if( currentTime - lastTime > delay){
                    fn.call(this)
                    // 将当前时间赋值给上一次 
                    lastTime = currentTime 
                }
            }
        }    
        // test 
        document.addEventListener('scroll',throttle(function(){console.log('被触发了'+ Date.now())},1000))
``` 
### 从这个代码中，如果不理解的话，我们可以跳转[点我](https://github.com/yaogengzhu/life-share#14), 还是具有一定的参考性的～

<h2 id="13">什么是跨域</h2>

### 什么是跨域？解决跨域的方法 

同源策略 
- 是浏览器的安全策略
- 域名，协议，端口号必须一致 

跨域
- 违背同源策略，就会产生跨域 

如何解决跨域 
- jsonp (前端实现)
- cors (服务器代码模式) CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）

jsonp 
- 利用了浏览器的`script`标签,动态创建script
```js
// 创建script 
var script = document.createElement('script');
// 设置回调函数 
function getData(data){
    // 数据请求回来时触发 
    console.log(data);
}
// 设置script的src属性，设置请求地址 
script.src = '请求地址';
// 让script生效 
document.body.appendChild(script);
```

<h2 id="14">node的事件轮询机制</h2>

### node的事件轮询问机制 

#### 概括node事件的轮询机制，分为6个阶段。借助`libuv`实现。
- timer定时阶段 
（计时和执行到点的定时器回调函数）
- pending callbacks阶段 
（某些系统操作，如tcp错误）
- idle,prepare (准备工作)
- poll轮询阶段(轮询对列) 
    如果轮询队列不为空，依此同步取出轮询队列中的第一个回调函数执行，直到轮询队列为空或者达到系统最大的限制。
    如果轮询队列为空
    如果之前设置过`setImmediate函数`，会直接进入到下一个check阶段 
    如果之前没有设置过`setImmediate函数`,在当前poll阶段等待，直到轮询队列添加到回调函数，就去第一个情况执行
    如果定时器到点了也会去下一个阶段 
- check阶段 
    执行`setImmediate`设置的回调函数 
- close callbacks 关闭阶段
    执行close事件回调函数

#### process.nextTick()在任意阶段都可以优先执行。

<h2 id="15">输入url到最终页面的过程，发上了什么? </h2>

###  
- NDS解析，将域名地址解析为ip地址 （第一步）
    - 浏览器DNS缓存
    - 系统DNS缓存
    - 路由器DNS缓存
    - 网络运营商DNS缓存
    - 递归搜索 如 blog.baidu.com
        - .com 域名下查找DNS解析
        - .baidu
        - blog
        - 出错 
- TCP连接，TCP三次握手 （第二步）
    - 第一次握手，由浏览器发起，告诉服务器我要发送请求了
    - 第二次握手，由服务器发起，告诉浏览器，你赶紧发送
    - 第三次握手，由浏览器发起，告诉服务器，我马上就发了，准备接收了。
- 发送请求 (第三步)
    - 请求报文：http 协议的通信内容
- 接收响应 (第四步)
    - 响应报文
- 渲染页面 (第五步)
    - 遇见html 标记，浏览器调用html解析器解析成token并构建成dom树。
    - 遇见style/link标记，浏览器会调用css解析器，处理css标记并构建cssom树
    - 遇见script标签，会调用script解析器，处理script代码。
    - 将dom树和cssom树合并成渲染树
    - 根据渲染树来计算布局，计算每个节点的几何信息（布局）
    - 将各个节点的颜色绘制到屏幕上（渲染）

**注意**  这五个步骤，不一定按顺序执行，可能反复执行，或者执行多次布局和渲染，往往在实际页面中，这些步骤会执行多次。
- 断开连接（Tcp的四次挥手）（第六步）
    - 第一次挥手： 由浏览器发起，告诉服务器，我东西发完来（请求报文），能准备关闭吧。
    - 第二次挥手：由服务器发起，告诉浏览器，我东西接收完来（请求报文），我准备关闭来，你也准备吧。
    - 第三次挥手：由服务器发起，告诉浏览器，我东西发送完来 （响应报文），你准备关闭吧。
    - 第四次挥手：由浏览器发起，告诉服务器，我东西接收完了，我准备关闭来（响应报文），你也准备吧。

（本节完）

<h2 id="16">闭包 </h2>

## 什么闭包
解释闭包
- 密闭的容器，类似于set,map 容器，存储数据
- 闭包是一个对象，存放数据的格式：key:value

闭包形成的条件
- 函数嵌套
- 内部函数引用外部函数的局部变量

闭包的优点
- 延长外部函数布局变量的生命周期
闭包的缺点
- 容易造成内存泄露 

使用闭包需要注意：
- 合理使用闭包
- 用完闭包要及时销毁



```js
// 简单的闭包形成
function foo(){
    var count = 1;
    function(){
        console.log(count);
    }
}
// 一个函数嵌套着另一个函数，且内部函数访问外部函数的局部变量，于是产生了闭包问题。
```
经典面试题
```js
function fun (n,o){
    console.log(o);
    return {
        fun:function(m){
            return fun(m,n)
        }
    }
}
var a = fun(0);  
a.fun(1); 
a.fun(2); 
a.fun(3);   

var b = fun(0).fun(1).fun(2).fun(3);

var c = fun(0).fun(1)
c.fun(2);
c.fun(3); 
```
**答案可以自己测** 也可以在6-3这个文件夹中找到01index.js中查看。


<h2 id="17">变量提升 </h2>

### 变量提升 预处理 
js引擎在代码正式执行的之前会做一个预处理的工作
- 收集变量
- 收集函数

依据 
- var  将var 后面的变量先定义但是不赋值 
- function() {}  // 提前该函数

```js
console.log(a) ;  // undefined;
var a = 3; 

fun();  // 正常输出 
function fun(){
    console.log('ok');
}
```

### 执行上下文（EC  execute context)  执行上下文对象 
- 定义： 代码执行的环境 
- 时机：代码在正式执行之前会进入到执行环境

### 执行上下文所需要做的

- 创建变量对象
    - 变量 
    - 函数及函数的参数 
    - 全局：window 
    - 局部：抽象的确实存在

- 确认this的指向 
    - 全局 ：this ----> window 
    - 局部 ：this ----> 调用其的对象

- 创建作用域链
    - 父级作用域链 + 当前的变量对象
- 扩展 
```js
    ECObj = {
        变量对象:{'变量',' 函数','全局：window','局部：抽象的确实存在的' },
        scropeChain: '父级作用域链 + 当前的变量对象',
        this:{ window || '调用其对象' }
    }
```
