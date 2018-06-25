//执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为
//作用域链作用：保证对执行环境有权访问的所有变量和函数的有序访问

//活动对象：argument对象 -> 变量对象（来自包含（外部）环境） -> 变量对象（来自下一个包含环境）
{
    var color = "blue";
    
    console.log(color)  //blue
    
    //函数changeColor()的作用域链包含两个对象：1.argument 2.全局环境的变量对象(即 color)
    function changeColor(){
        if (color === "blue"){
            color = "red";
        }else{
            color= "blue";
        }
    }
    changeColor()

    console.log('Color is now ' + color)    //red
}
{
    var color = "blue";

    function changeColor(){
        var anotherColor = "red";

        function swapColors(){
            var temColor = anotherColor;
            anotherColor = color;
            color = temColor;
            console.log(temColor)   //red
            console.log(anotherColor)   //blue
            console.log(color)  //red
            //这里可以访问color、anotherColor、temColor，，因为这两个环境是他的父执行环境
        }
        //这里可以访问color/anotherColor,但不能访问temColor
        swapColors()
    }
    //这里只可以访问color
    changeColor()
}

//延长作用域链
    //try-catch语句的catch块
    //with语句

//没有块级作用域，只有函数作用域
    //1.注意声明变量
    //2.查询标识符
{
    for (var i=0;i<10;i++){
        console.log(i)  //0-9
    }
    console.log(i)  //10
}
