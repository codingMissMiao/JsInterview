// 如何检测数组 
// 方式1 使用 slice 方法  ，给自己定义的变量定义slice方法，故有的时候会失效 
var p1 = {
    slice: function() {
    }
}
typeof p1.slice   // 不能确定是一个数组  

p1.slice == Array.prototype.slice  // 可以确定p1这个对象是不是一个数组


