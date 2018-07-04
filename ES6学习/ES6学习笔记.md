## ES6学习笔记

### let/const命令

`let`命令

用于声明变量，只在let命令所在的代码块内有效
`let`变量应该在声明语句之后才可以使用，不存在变量提升
`let`在同一作用域内不允许重复声明
`let`实际上为JavaScript新增了块级作用域
```javascript
    {
        let a = 10;
        var b = 1;
    }

    a // ReferenceError: a is not defined.
    b // 1
```

`const`命令

`const`用于声明一个只读的常量，一旦声明，常量的值不可改变。
`const`本质上是变量指向的那个内存地址不得改动
```javascript
    {
        const PI = 3.1415;
        PI // 3.1415

        PI = 3;
        // TypeError: Assignment to constant variable.
    }
```

### 字符串扩展

`at()`方法，返回字符串给定位置的字符
```javascript
    {
        'abc'.charAt(0) // "a"
        '𠮷'.charAt(0) // "\uD842"
    }
```
`includes()`：返回布尔值，表示是否找到了参数字符串。
`startsWith()`：返回布尔值，表示参数字符串是否在原字符串的头部。
`endsWith()`：返回布尔值，表示参数字符串是否在原字符串的尾部。
```javascript
    {
        let s = 'Hello world!';

        s.startsWith('Hello') // true
        s.endsWith('!') // true
        s.includes('o') // true
    }
```
`repeat`方法返回一个新字符串，表示将原字符串重复n次。
```javascript
    {
        'x'.repeat(3) // "xxx"
        'hello'.repeat(2) // "hellohello"
        'na'.repeat(0) // ""
    }
```
`padStart()`用于头部补全。
`padEnd()`用于尾部补全。
```javascript
    {
        'x'.padStart(5, 'ab') // 'ababx'
        'x'.padStart(4, 'ab') // 'abax'

        'x'.padEnd(5, 'ab') // 'xabab'
        'x'.padEnd(4, 'ab') // 'xaba'
    }
```
**模板字符串**
```javascript
    {
        $('#result').append(`
        There are <b>${basket.count}</b> items
        in your basket, <em>${basket.onSale}</em>
        are on sale!
        `);
        // 普通字符串
        `In JavaScript '\n' is a line-feed.`

        // 多行字符串
        `In JavaScript this is
        not legal.`

        console.log(`string text line 1
        string text line 2`);

        // 字符串中嵌入变量
        let name = "Bob", time = "today";
        `Hello ${name}, how are you ${time}?`
    }
```

### 函数的扩展

**默认参数**
可以与解构赋值结合使用
```javascript
    {
        function log(x, y = 'World') {
        console.log(x, y);
        }

        log('Hello') // Hello World
        log('Hello', 'China') // Hello China
        log('Hello', '') // Hello
    }
```
**rest参数**
用于获取函数的多余参数
```javascript
    {
        function add(...values) {
        let sum = 0;

        for (var val of values) {
            sum += val;
        }

        return sum;
        }

        add(2, 5, 3) // 10
    }
    {
        // arguments变量的写法
        function sortNumbers() {
        return Array.prototype.slice.call(arguments).sort();
        }

        // rest参数的写法
        const sortNumbers = (...numbers) => numbers.sort();
    }
```

**箭头函数**

```javascript
    {
        var f = () => 5;
        // 等同于
        var f = function () { return 5 };

        var sum = (num1, num2) => num1 + num2;
        // 等同于
        var sum = function(num1, num2) {
        return num1 + num2;
        };
    }
```
注意：（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

### Class

**定义类**

```javascript
    {   //传统方法
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }

        Point.prototype.toString = function () {
        return '(' + this.x + ', ' + this.y + ')';
        };

        var p = new Point(1, 2);
        
        //ES6方法
        class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
        }
    }
```
**继承类**

Class通过`extends`关键字实现继承

```javascript
    {
        class ColorPoint extends Point {
            constructor(x, y, color) {
                super(x, y); // 调用父类的constructor(x, y)
                this.color = color;
            }

            toString() {
                return this.color + ' ' + super.toString(); // 调用父类的toString()
            }
        }
    }
    //子类必须在constructor方法中调用super方法，否则新建实例时会报错
```

`Object.getPrototypeOf`方法可以用来从子类上获取父类。


