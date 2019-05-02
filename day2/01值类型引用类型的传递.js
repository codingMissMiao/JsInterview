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
 * 
 *  
 * 
 */
 