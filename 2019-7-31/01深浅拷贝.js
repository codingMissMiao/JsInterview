var a = 2 
var b = a 

b = 4 
console.log(a)
console.log(b)

/**
 * 
 *  基本类型值：number、 string、boolean、undefined  
 *  特点： 在做变量传旨的实际，内存会复制一份，做 == 判断的时候、=== 判断的时候仅比较值是否相当引用类型的值
 * 
 *  引用种类：function、 object、array、regexp、null
 *  特点：做变量传值的时候，内存中不会复制一份，做==判断的时候，=== 判断要看是否内存中的同一个对象
 * 
 *  浅拷贝
 *  只是克隆了一层，如果数组的某项也是数组，这个内层数组还是内存中的同一个对象
 *  
 */
// var c = [2,3,4]
// var d = c  
// d.push(444)
// console.log(c)
// console.log(d)
var arr = [1,2,3,4,5,[33,3,3,3]]

var _arr = []

for(let i = 0; i < arr.length; i++ ){
    _arr.push(arr[i])
}

console.log(arr === _arr ) // false
console.log(_arr[6] === arr[6]) // true

/**
 * 
 * 深克隆
 * 
 * 
 */

 function deepClone(o) {
     if (
         typeof o == 'string'
         ||
         typeof o == 'number'
         || 
         typeof o == 'boolean' 
         ||
         typeof o == 'undefined'
     ) {
         return o 
     } else if (Array.isArray(o)){
         let _arr = []
         for (let i=0; i < o.length; i++ ){
            _arr.push(deepClone(0[i]))
         }
         return _arr
     } else {
         var _o = {}
         for (var k in o ) {
             _o[k] = deepClone(o[k])
         }
         return _o
     }
 }

 var arr1 = [1,2,3,4,5,6[2,3,4,5]]

//  var arr2 = deepClone(arr1)
 console.log(deepClone(arr1))
