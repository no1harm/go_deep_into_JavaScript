/**
 *  ECMAScript只支持实现继承，而且实现继承主要依靠原型链来实现
 *  instanceof()方法确定原型和实例的关系
 *  isPropertyOf()方法确定原型和实例的关系
 *  给原型添加方法一定要放在替换原型的语句之后
 *  原型链的问题
 *  借用构造函数
 *  组合继承
 *  寄生组合式继承
 */ 
{
    function SuperType() {
        this.property = true
    }
    SuperType.prototype.getSuperValue = function () {
        return this.property;
    }
    function SubType(){
        this.subproperty = false
    }
    //继承SuperType(通过创建SuperType实例)
    SubType.prototype = new SuperType();

    SubType.prototype.getSubValue = function () {
        return this.subproperty
    }

    var instance = new SubType()
    console.log(instance.getSubValue())   //false
    console.log(instance.getSuperValue())   //true
    console.log(instance.constructor)   //SuperType /因为原来SubType.prototype中的constructor被重写了
    //instanceof
    console.log(instance instanceof Object)     //true
    console.log(instance instanceof SuperType)  //true
    console.log(instance instanceof SubType)    //true
    //isPropertyOf
    console.log(Object.prototype.isPrototypeOf(instance))     //true
    console.log(SuperType.prototype.isPrototypeOf(instance))  //true
    console.log(SubType.prototype.isPrototypeOf(instance))    //true
    //instance -> SubType原型 -> SuperType原型
}

//给原型添加方法一定要放在替换原型的语句之后
{
    function SuperType() {
        this.property = true
    }
    SuperType.prototype.getSuperValue = function () {
        return this.property;
    }
    function SubType(){
        this.subproperty = false
    }
    //继承SuperType(通过创建SuperType实例)
    SubType.prototype = new SuperType();
    //添加新方法
    SubType.prototype.getSubValue = function () {
        return this.subproperty
    }
    //重写超类型中的方法
    SubType.prototype.getSuperValue = function () {
        return false
    }

    var instance = new SubType()
    console.log(instance.getSuperValue())   //false
}

//原型链的问题
//在创建子类型的实例时，不能向超类型的构造函数中传递参数(没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数)
{
    function SuperType(){
        this.color = ["red","blue","green"]
    }
    function SubType(){}
    //继承SuperType
    SubType.prototype = new SuperType
    
    var instance = new SubType()
    instance.color.push("black")
    console.log(instance.color)     //[ 'red', 'blue', 'green', 'black' ]
    console.log(instance.constructor)   //SuperType
    
    var instance2 = new SubType()
    console.log(instance2.color)    //[ 'red', 'blue', 'green', 'black' ]
    console.log(instance2.constructor)  //SuperType


    var instance3 = new SuperType()
    console.log(instance3.color)    //[ 'red', 'blue', 'green' ]   
}

//借用构造函数
//优势：可以在子类型构造函数中向超类型构造函数传递参数
{
    function SuperType(){
        this.color = ["red","blue","green"]
    }
    //继承了SuperType
    function SubType(){
        SuperType.call(this)
    }
    var instance = new SubType()
    instance.color.push("black")
    console.log(instance.color)     //[ 'red', 'blue', 'green', 'black' ]
    var instance2 = new SubType()
    console.log(instance2.color)    //[ 'red', 'blue', 'green' ]    
}

//组合继承：使用原型链实现对原型属性和方法的继承，通过使用构造函数来实现对实例属性的继承
{
    function SuperType(name){
        this.name = name;
        this.colors = ["red","blue","green"];
    }
    SuperType.prototype.sayName = function(){
        console.log(this.name)
    }
    function SubType(name,age){
        //继承属性
        SuperType.call(this,name)
        // this.name = name;
        this.age = age;
    }
    //继承方法
    SubType.prototype = new SuperType();
    SubType.prototype.constructor = SubType;
    SubType.prototype.sayAge = function(){
        console.log(this.age)
    }
    
    var instance = new SubType("Nicholas",29);
    instance.colors.push("black");
    console.log(instance.colors)    //[ 'red', 'blue', 'green', 'black' ]
    instance.sayName()  //Nicholas
    instance.sayAge()   //29
    console.log(instance.constructor)   //SubType

    var instance2 = new SubType("Jack",30)
    console.log(instance2.colors)    //[ 'red', 'blue', 'green']
    instance2.sayName()  //Jack
    instance2.sayAge()   //30
}
//寄生组合式继承