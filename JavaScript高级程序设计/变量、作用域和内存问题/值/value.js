//基本类型值:只得是简单数据段,不是对象
/**
 * Undefined
 * Null
 * Boolean
 * Number
 * String
 */
{
    //不能给基本类型的值添加属性
    var name = "Nicholas";
    name.age =27;
    console.log(name.age)   //Undefined
}
{
    // 复制基本类型值
    var num1 = 5;
    var num2 = num1;
    console.log(num2)   //5
    num2 = 6;
    console.log(num1)   //5
    console.log(num2)   //6
    //num1 和 num2 完全独立
}
{
    // 参数传递 基本类型值
    function addTen(num){
        num+=10;
        return num;
    }
    var count = 20;
    var result = addTen(count);
    console.log(count)  //20
    console.log(result) //30
}
{
    // 检测基本类型值
    var s = "Nicholas"
    var n = null
    var o = new Object()
    console.log(typeof s)   //string
    console.log(typeof n)   //object
    console.log(typeof o)   //object
}



//引用类型值：保存在内存中的对象
//JavaScript不允许直接访问内存中的位置，在操作对象时，实际上是在操作对象的引用而不是实际的对象
{
    var person = new Object();
    person.name = "Nicholas";
    console.log(person.name)    //Nicholas
}
{
    // 复制引用类型值
    var obj1 = new Object();
    var obj2 = obj1;
    obj1.name = "Nicholas";
    console.log(obj2.name)  //Nicholas
    obj2.name = "Cherry";
    console.log(obj1.name)  //Cherry
    //两个变量实际上将引用同一个对象，因此，改变其中一个变量，就会影响另一个变量
}
{
    // 参数传递 引用类型值
    function setName(obj){
        obj.name = "Jack"
    }
    var person = new Object()
    person.name = "Nicholas"
    console.log(person.name)    //Nicholas
    setName(person)
    console.log(person.name)    //Jack
    //person指向的对象在堆内存中只有一个，而且是全局对象 
    //参数obj也会按引用来访问同一个对象
}
{
    // 检测引用类型值
    var person = new Object()
    console.log(person instanceof Object)
}




