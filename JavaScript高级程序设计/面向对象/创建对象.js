/**
 * 工厂模式
 * 构造函数模式
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