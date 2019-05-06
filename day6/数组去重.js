// 业务要求数组去重 
var arr = [1,3,4,5,,4,4,4,4,55,5,5];
// 设置一个新的数组
var newArr = [];
// 首先将数组的第一个值赋值给newArr 
// newArr[0] = arr[0];
// 循环遍历数组arr 
// for (var i=0 ; i< arr.length ; i++){
//     // 循环遍历数组是否和新数组中的一致 
//     for(var j=0; j<newArr.length; j++){
//         // 判断arr数组中是否有跟newArr相等的数 
//         if (newArr[j] === arr[i]) {
//             break;
//         }
//         // 控制一轮比完。
//         if (j=== newArr.length - 1){
//             newArr.push(arr[i]);
//         }
//     }
// }

//方式2 
arr.forEach( item =>{
    //判断
    if (newArr.indexOf(item) ===(-1)){
        newArr.push(item);
    }
})
console.log(newArr);

