
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
// 数组的api方法
console.log(arr.reverse());
console.log(arr.reverse());