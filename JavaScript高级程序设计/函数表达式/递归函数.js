//递归函数：一个函数通过名字调用自身
{
    function factorial(num){
        if (num <= 1){
            return 1
        } else {
            return num * factorial(num - 1)
        }
    }
    var s = factorial(5)
    console.log(s)  //120
}