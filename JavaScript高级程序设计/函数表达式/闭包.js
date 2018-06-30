//闭包指有权访问另一个函数作用域中的变量的函数
{
    function createComparisonFunction(propertyNmae){
        
        return function(obj1,obj2){
            var value1 = obj1[propertyNmae]
            var value2 = obj2[propertyNmae]
            if (value1 < value2){
                return -1
            } else if ( value1 > value2){
                return 1
            } else {
                return 0
            }
        }
    }
    //关键：执行环境和作用域链
}
//引用 https://zhuanlan.zhihu.com/p/22486908
//概念：「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。
