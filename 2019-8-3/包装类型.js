// 包装类型 
var a = '222'
var c = 2222

var b = new String(a)
var d = new String(c) // 封装成一个对象
var e = d.valueOf()  // 解封
 
console.log(a.length)
console.log(b.length)
console.log(c.length)
console.log(d.length)
console.log(typeof d  == 'String' )
console.log(Object.prototype.toString.call(d))
console.log(e)
