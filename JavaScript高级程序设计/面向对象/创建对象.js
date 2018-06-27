/**
 * 工厂模式
 * 构造函数模式
 * 原型模式 
 *      isPrototypeOf()测试原型对象是否有此实例
 *      getPrototypeOf()方法返回对象的原型
 *      hasOwnPrototype()方法可以检测一个属性是否存在于实例中，是则true，否则false
 *      自定义hasPrototypeProperty()方法检测属性是否存在原型中 
 *      Object.keys()方法接受一个对象作为参数，返回一个包含所有可枚举属性的字符串数组
 *          如果是通过对象的实例调用，则只会返回实例属性
 *      Object.getOwnPropertyName()得到所实例属性，包括不可枚举的constructor属性
 *      Object.defineProperty()设置数据属性
 * 
 * 组合使用构造函数模式和原型模式
 * 寄生构造函数模式
 * 稳妥构造函数模式
 */

 //工厂模式
 //问题：没有解决对象识别的问题(怎样知道一个对象的类型)
 {
     function creatPerson(name,age,job){
         var o = new Object()
         o.name = name;
         o.age = age;
         o.job = job;
         o.sayName = function (){
             console.log(this.name)
         }
         return o
     }
     var person1 = creatPerson("Nicholas",29,"Software Engineer")
     var person2 = creatPerson("Jack",20,"Dortor")
     console.log(person1.name)  //Nicholas
     console.log(person2.name)  //Jack
     console.log(person1.constructor)   //Object
 }

 //构造函数模式
 //问题：每个方法都要在每个实例上重新创建一遍，浪费内存
 //和工厂模式区别：1.没有显式地创建对象 2.直接将属性和方法赋给了this对象 3.没有return语句
 {
     function Person(name,age,job){
         this.name = name;
         this.age = age;
         this.job = job;
         this.sayName = function(){
             console.log(this.name);
         }
     }
     //这两个对象都有一个constructor(构造函数)属性，指向Person
     var person1 = new Person("Nicholas",29,"Software Engineer")
     var person2 = new Person("Jack",20,"Dortor")
     console.log(person1.name)  //Nicholas
     console.log(person2.name)  //Jack
     console.log(person1.constructor)   //Person
     console.log(person2.constructor)   //Person
     console.log(person1.sayName == person2.sayName)    //false
     //不实例上的同名函数是不相等的
 }

 //原型模式
 //创建的每个函数都有一个prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法
 {
    function Person(){}
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 30;
    Person.prototype.sayName = function(){
        console.log(this.name)
    }
    var person1 = new Person();
    person1.sayName()   //Nicholas
    var person2 = new Person();
    person2.sayName()   //Nicholas
    console.log(person1.sayName == person2.sayName) //true
    //与构造函数不同，新对象的这些属性和方法是由是有实例共享的

    //isPrototypeOf()方法测试为true，因为这两个实例内部都有一个指向Person.prototype的指针(constructor)
    console.log(Person.prototype.isPrototypeOf(person1))    //true
    console.log(Person.prototype.isPrototypeOf(person2))    //true

    //getPrototypeOf()方法返回对象的原型
    console.log(Object.getPrototypeOf(person1) == Person.prototype)     //true
    console.log(Object.getPrototypeOf(person2).name)    //Nicholas
 }
 
 //修改(用"屏蔽"形容更合适)原型属性
 //当为实例设置属性时，这个属性就会屏蔽原型对象中保存的同名属性(并不是替换或者修改原型对象中的同名属性！)
 //delete操作符可以完全删除实例属性，从而让我们可以重新访问原型中的属性
 {
    function Person(){}
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 30;
    Person.prototype.sayName = function(){
        console.log(this.name)
    }
    var person1 = new Person();
    var person2 = new Person();
    person1.name = "Jack"
    person1.sayName()   //Jack  -> 来自实例
    person2.sayName()   //Nicholas  -> 来自原型
    
    delete person1.name     //把实例属性删除，恢复了对原型中name属性的连接
    person1.sayName()   //Nicholas  -> 来自原型
 }
 
 //hasOwnPrototype()方法可以检测一个属性是否存在于实例中，是则true，否则false
 {
    function Person(){}
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 30;
    Person.prototype.sayName = function(){
        console.log(this.name)
    }
    var person1 = new Person();
    var person2 = new Person();
    console.log(person1.hasOwnProperty('name'));    //false
    person1.name = 'Jack'
    console.log(person1.hasOwnProperty('name'));    //true
 }
 //hasPrototypeProperty()方法检测属性是否存在原型中
 {  
    function Person(){}
     function hasPrototypeProperty(object,name){
         return !object.hasOwnProperty(name) && (name in object)
     }
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 30;
    Person.prototype.sayName = function(){
        console.log(this.name)
    }
    var person1 = new Person();
    console.log(hasPrototypeProperty(person1,'name'));    //true
    person1.name = 'Jack'
    console.log(hasPrototypeProperty(person1,'name'))    //false
 }
 //Object.keys()方法接受一个对象作为参数，返回一个包含所有可枚举属性的字符串数组
 //如果是通过对象的实例调用，则只会返回实例属性
 {  
    function Person(){}
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 30;
    Person.prototype.sayName = function(){
        console.log(this.name)
    }
    var keys = Object.keys(Person.prototype)
    console.log(keys)    //[ 'name', 'age', 'sayName' ]
    var person1 = new Person()
    var person2 = new Person()
    person1.name = "Jack";
    person1.age = 30;
    var key2 = Object.keys(person1)
    console.log(key2)    //[ 'name', 'age' ]
    delete person1.name
    delete person1.age
    var key3 = Object.keys(person1)
    console.log(key3)    //[]
 }
 
 //Object.getOwnPropertyName()得到所实例属性，包括不可枚举的constructor属性
 {
    function Person(){}
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 30;
    Person.prototype.sayName = function(){
        console.log(this.name)
    }
    var keys = Object.keys(Person.prototype)
    console.log(keys)    //[ 'name', 'age', 'sayName' ]
    var person1 = new Person()
    var key2 = Object.getOwnPropertyNames(Person.prototype)
    console.log(key2)   //[ 'constructor', 'name', 'age', 'sayName' ]
 }
 
 //更简单的原型语法
 {
     function Person(){}
     Person.prototype = {
         name : "Nicholas",
         age : 20,
         sayName : function() {
             console.log(this.name)
         }
     }
     //注意，此时的constructor属性不再指向Person
     var person1 = new Person()
     console.log(person1.constructor)   //Object
 }
 {
    //指定constructor,从而确保通过该属性能够访问到适当的值
    function Person(){}
    Person.prototype = {
        constructor : Person,
        name : "Nicholas",
        age : 20,
        sayName : function() {
            console.log(this.name)
        }
    }
    var person1 = new Person()
    console.log(person1.constructor)   //Person
    
    //缺点：导致constructor的[Enumerable]特性设置为true，即为可枚举
    var descriptor = Object.getOwnPropertyDescriptor(Person.prototype,"constructor")
    console.log(descriptor)    //{ value: [Function: Person],writable: true,enumerable: true,configurable: true }
    
    //Object.defineProperty()设置数据属性
    Object.defineProperty(Person.prototype,"constructor",{
        enumerable : false,
        value : Person
    })
    var descriptor1 = Object.getOwnPropertyDescriptor(Person.prototype,"constructor")
    console.log(descriptor1)    //{ value: [Function: Person],writable: true,enumerable: false,configurable: true }
}

//原型对象的问题
{
    function Person(){}
    Person.prototype = {
        constructor : Person,
        name : "Nicholas",
        age : 20,
        friends : ["shelby","Court"],
        sayName : function() {
            console.log(this.name)
        }
    }
    var person1 = new Person()
    var person2 = new Person()
    person1.name = 'John'
    console.log(person1.name)   //John
    console.log(person2.name)   //Nicholas
    person1.friends.push("Van")
    console.log(person1.friends)    //[ 'shelby', 'Court', 'Van' ]
    console.log(person2.friends)    //[ 'shelby', 'Court', 'Van' ]
}
//组合使用构造函数模式和原型模式
{
    function Person(name,age,job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.friends = ["Shelby","Court"];
    }
    Person.prototype = {
        constructor : Person,
        sayName : function (){
            console.log(this.name)
        }
    }
    var person1 = new Person("Nicholas",29,"Software Engineer")
    var person2 = new Person("Jack",30,"Dortor")
    person1.friends.push("Van")
    console.log(person1.friends)    //[ 'Shelby', 'Court', 'Van' ]
    console.log(person2.friends)    //[ 'Shelby', 'Court' ]
    //实例属性都是在构造函数中定义的，所有的实例共享的属性constructor和方法则是在原型中定义的
}
