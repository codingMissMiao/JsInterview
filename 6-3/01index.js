// function fun() {
//     var count = 1;
//    function foo(){
//        console.log(count);
//    }
//    foo()
// }
// fun()


// 闭包的应用场景



// 面试题 
function fun (n,o){
    //解析过程
    var n, o;
    n = 0;
    console.log(o);
    return {
        fun:function(m){
            // a.fun(1)
            // var m = 1;  // n在当前作用域是没有的,要像上找
            return fun(m,n)
        }
    }
}
var a = fun(0);   // undefined  ✅  由于o没有赋值，故为undefined 
a.fun(1);   // 1 ❌  0     // a = { fun:function(m){ return fum(m,n) } }    
a.fun(2);   // 2 ❌  0 
a.fun(3);   // 3 ❌  0 

// 区分返回值  返回的是不是一个对象
var b = fun(0).fun(1).fun(2).fun(3)  // undefined ,0 , 1, 2

var c = fun(0).fun(1)
c.fun(2);
c.fun(3); // undefined, 0, 1, 1


/**
 * 解析过程 
 * 1. var a = fun(0);
 * 由于var o 没有实参传入，则为undefined 
 * 
 * 
 * 2. a.fun(1)
 * 首先 fun返回一个 对象  {fun:function(m){return fun(m,n )}}
 * 
 * a.fun(1) 返回一个函数 function fun(m,n ) { var m, n;}
 * 
 * 
 */