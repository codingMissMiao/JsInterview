//  题意是下面输入结果分别是：
 var num1 = 60 ;
 var num2 = 50 ;
 function foo(num,num1){
     // 先看传入什么进来 
    //  var num = 60;
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