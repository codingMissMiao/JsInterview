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