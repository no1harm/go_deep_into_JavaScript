/**
 * Object
 * Array
 * Date
 * RegExp
 * Function
 */
//Object类型
{
    var person = new Object()
    person = {
        name : "Nicholas",
        age : 30
    }
}

//Array类型
{
    var color = new Array()
    var color = new Array('red')
    var color = new Array('red',2,true)
    var color = new Array(20)   //创建一个length值为20的数组
    var color = []  
}
{   
    //检测是否是数组
    var value = []
    if (value instanceof Array){}
    //instanceof方法的问题在于，假定只有一个全局执行环境
    //应该用Array.isArray()
    if (Array.isArray(value)){} 
}
{
    //数组方法
    var colors = ['red','blue','green']
    console.log(colors.toString())   //返回数组本身
    console.log(colors.valueOf())   //返回数组本身
    console.log(colors.join(''))    //以指定分隔符构建字符串
    
    //栈方法：访问规则LIFO（后进先出）
    var bePushed = colors.push('yellow')   //在队列尾部推入并返回修改后的数组长度
    var bePoped = colors.pop()  //从队列尾部移除并返回移除项
    
    //队列方法：访问规则FIFO(先进先出)
    var beShifted = colors.shift("blue")  //移除队列中的第一项并返回该项
    var beUnshifted = colors.unshift("red")     //在队列中的前端添加任意各项并返回新数组的长度
    
    //排序方法
    var values = [1,2,3,4,5]
    values.reverse();
    console.log(values)   //5,4,3,2,1,

    values.sort()  //按升序排列数组项 

    //操作方法
    //合并数组concat()
    var color1 = ['red','blue','yellow']
    var color2 = [1,2,3,4]
    var color3 = color1.concat(color2)  
    console.log(color3)     //[ 'red', 'blue', 'yellow', 1, 2, 3, 4 ]
    //切割数组slice(arg1,arg2) arg1:起始位置 arg2:结束位置
    //splice() 返回一个经过处理的数组
    // 删除 splice(arg1,arg2) arg1:起始位置 arg2:要删除的项数
    // 插入 splice(arg1,arg2,arg3) arg1:起始位置 arg2:要删除的项数 arg2:要插入的项
    // 替换 splice(arg1,arg2,arg3) arg1:起始位置 arg2:要删除的项数 arg2:要插入的任意数量的项

    //位置方法
    var numbers = [1,2,3,4,5,6,7,8,8,9];
    console.log(numbers.indexOf(4))
    console.log(numbers.lastIndexOf(4))
    
    //迭代方法 P96
    // every()
    // filter()
    // forEach()
    // map()
    // some()

    //归并方法
    //reduce()和reduceRight()只是遍历方向相反
    var nums = [56,23,13,5,6,456,23,2]
    var sum = nums.reduce(function(prev,cur,index,array){
        return prev + cur
    })
    var sum2 = nums.reduce(function(prev,cur,index,array){
        return prev * cur
    })
    console.log(sum)    //584
    console.log(sum2)   //10536664320
}

//Date类型 P102

//RegExp类型 P103

//Function类型
//函数的名字仅仅是一个包含指针的变量而已
{
    // arguments:类数组对象，包含着传入函数中的所有参数
    // this:引用的是函数执行的环境对象
}
{
    // window.color = 'blue'
    var o = {color:'red'}
    function sayColor(){
        console.log(this.color)
    }
    sayColor()  //blue
    o.sayColor = sayColor
    o.sayColor()    //red
}
{
    //apply()和call()用途：都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值
    //接受两个参数，1.在其中运行函数的作用域 2.arguments/参数数组
    function sum(num1,num2){
        return num1 + num2
    }
    function callSum(num1,num2){
        return sum.apply(this,arguments) //把callSum()函数体内this对象指向sum()函数的this对象
    }
    function callSum2(num1,num2){
        return sum.apply(this,[num1,num2])
    }
    function callSum3(num1,num2){
        return sum.call(this,num1,num2)
    }
    console.log(callSum(10,20))     //30
    console.log(callSum2(10,20))    //30
    console.log(callSum3(10,20))    //30
    
    // 也就是说，本来callMsg()函数中的this被设置成了goWest()的this,执行环境变了
    function goWest(msg){
        return msg
    }
    function callMsg(msg){
        return goWest.apply(this,arguments)
    }
    console.log(callMsg('let\'s go'))
}
{
    //bind():会创建一个函数的实例，其this值会被绑定到传给bind()函数的值
    //具体到这里的代码就是：sayColor()创建了实例objSayColor，并且实例中的this被绑定到对象o中的this
    // window.color = 'blue'
    var o = {color:'red'}
    var s = {color:'yellow'}
    function sayColor(){
        console.log(this.color)
    }
    sayColor()  //blue

    // 扩充函数赖以运行的作用域
    sayColor.call(this) //blue
    sayColor.call(window)   //blue
    sayColor.call(o)    //red
    sayColor.call(s)    //yellow
    var objSayColor = sayColor.bind(o)
    objSayColor()   //red
}

//基本包装类型