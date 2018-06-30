//函数声明提升的问题
//需要事先声明变量
{
    sayHi();
    function sayHi(){
        console.log("Hi")   //Hi
    }
}
{
    sayHi();
    var sayHi = function(){
        console.log("Hi")   //Hi
    }
}