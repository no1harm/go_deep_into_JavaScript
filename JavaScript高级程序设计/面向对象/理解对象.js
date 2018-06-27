/**
 * 对象定义
 * 理解对象
 * 属性类型
 *      Object.defineProperty()方法，修改属性默认特性，接收三个参数：1.属性所在对象 2.属性名字 3.描述符对象
 * 定义多个属性
 * 读取属性的特性
 *      Object.getOwnPropertyDescriptor()方法，获取原型属性的描述符，接收参数：1.属性所在对象 2.要读取其描述符的属性名称
 * 
 */
//对象定义：无序属性的集合，其属性可以包含基本值、对象或者函数，每一个对象都是基于一个引用类型创建的

//创建对象
{   
    var person = {
        name: "Nicholas",
        age: 29,
        job: "Software Engineer",
        sayName: function(){
            console.log(this.name)
        }
    }
}

//属性类型
//数据属性
{
    // [Configurable] 表示能否通过delete删除属性从而重新定义属性，默认值为true
        //一旦把属性定义为不可配置，就不能再把它变回可配置了，设置为false后不可以再设置回true
    // [Enumerable] 表示能否通过for-in循环返回属性，默认值为true
    // [Writable] 表示能否修改属性的值，默认值为undefined
    // [Value] 包含这个属性的数据值
}
//修改属性默认的特性，使用Object.defineProperty()方法，接收三个参数：1.属性所在对象 2.属性名字 3.描述符对象
{
    var person = {}
    Object.defineProperty(person,"name",{
        writable:false, //属性值不可修改
        value:"Nicholas"
    })
    console.log(person.name)    //Nicholas
    person.name = "Greg"
    console.log(person.name)    //Nicholas
}
//访问器属性
//访问器属性不能直接定义，必须使用Object.defineProperty()定义
{
    // [Configurable] 表示能否通过delete删除属性从而重新定义属性，默认值为true
        //一旦把属性定义为不可配置，就不能再把它变回可配置了，设置为false后不可以再设置回true
    // [Enumerable] 表示能否通过for-in循环返回属性，默认值为true
    // [Get] 在读取属性时调用的函数。默认值undefined
    // [Set] 在写入属性时调用的函数。默认值undefined
}
{
    var book = {
        _year : 2018,
        edition : 1
    }
    Object.defineProperty(book,"year",{
        get:function(){
            return this._year
        },
        set:function(newVal) {
            if (newVal > 2018){
                this._year = newVal,
                this.edition += newVal - 2018
            }
        }
    })
    book.year = 2019
    console.log(book._year)     //2019
    console.log(book.edition)   //2
}

//定义多个属性
{
    var book = {}
    Object.defineProperties(book,{
        _year:{
            writable:true,
            value:2018
        },
        edition:{
            writable:true,
            value:1
        },
        year:{
            get:function(){
                return this._year
            },
            set:function(newVal){
                if (newVal > 2018){
                    this._year = newVal,
                    this.edition += newVal - 2018
                }
            }
        }
    })
}

//读取属性的特性
//Object.getOwnPropertyDescriptor()方法，获取原型属性的描述符，接收参数：1.属性所在对象 2.要读取其描述符的属性名称
{
    var book = {}
    Object.defineProperties(book,{
        _year:{
            writable:true,
            value:2018
        },
        edition:{
            writable:true,
            value:1
        },
        year:{
            get:function(){
                return this._year
            },
            set:function(newVal){
                if (newVal > 2018){
                    this._year = newVal,
                    this.edition += newVal - 2018
                }
            }
        }
    })

    var descriptor = Object.getOwnPropertyDescriptor(book,"_year")
    var descriptor2 = Object.getOwnPropertyDescriptor(book,"year")
    console.log(descriptor) //{ value: 2018,writable: true,enumerable: false,configurable: false }
    console.log(descriptor2)    //{ get: [Function: get],set: [Function: set],enumerable: false,configurable: false }
}
