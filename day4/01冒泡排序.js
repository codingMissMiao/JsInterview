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