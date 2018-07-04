//async/await的用法(异步编程的解决方案)
//参考文章 https://segmentfault.com/a/1190000007535316
{
    //不用let会导致变量提升
    var a = 1;
    var b = 1;

    function foo() {
        let a = b + 3;
        console.log(a)
    }

    function bar() {
        let b = a * 2;
        console.log(b)
    }
    
    foo()   //4
    bar()   //2
}
// async/await
//async使用return返回的是一个Promise对象
{
    async function testAsync(){
        return "Hello Async"
    }
    const result = testAsync()
    console.log(result)     //Promise { 'Hello Async' }
    //async使用return返回的是一个Promise对象
    //在最外层不能用await获取其返回值的情况下，采用then()链来处理这个Promise对象
    testAsync().then( v => {
        console.log(v)      //"Hello Async"
    })
}

//await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）
{
    function getSomething() {
        return "something";
    }
    
    async function testAsync() {
        return Promise.resolve("hello async");
    }
    
    async function test() {
        const v1 = await getSomething();
        const v2 = await testAsync();
        console.log(v1, v2);    
    }
    
    test();     //"something hello async"
}
//具体例子
{   //takeLongTime()返回的是一个Promise对象
    function takeLongTime() {
        return new Promise(resolve => {
            setTimeout(() => resolve("long_time_value"), 1000);
        });
    }
    
    async function test() {
        const v = await takeLongTime();
        console.log(v);
    }
    
    test();     //"long_time_value"
}

//async/await优势：处理then()链
//案例用Promise处理
{   
    //创建takeLongTime()函数，返回一个Promise对象
    function takeLongTime(n){
        return new Promise(resolve => {
            setTimeout(() => resolve(n + 200),n)
        })
    }
    function step1(n) {
        console.log(`step1 with ${n}`);
        return takeLongTime(n);
    }
    
    function step2(n) {
        console.log(`step2 with ${n}`);
        return takeLongTime(n);
    }
    
    function step3(n) {
        console.log(`step3 with ${n}`);
        return takeLongTime(n);
    }
    //step1()的参数传入takeLongTime() -> takeLongTime()的resolve结果通过then()链传入step2() -> ...
    function doIt() {
        console.time("doIt");
        const time1 = 300;
        step1(time1)
            .then(time2 => step2(time2))
            .then(time3 => step3(time3))
            .then(result => {
                console.log(`result is ${result}`);
                console.timeEnd("doIt");
            });
    }
    
    doIt();
    // step1 with 300
    // step2 with 500
    // step3 with 700
    // result is 900
    // doIt: 1503.641ms
}
//案例用async/await处理

{
    function takeLongTime(n){
        return new Promise(resolve => {
            setTimeout(() => resolve(n + 200),n)
        })
    }
    function step1(n) {
        console.log(`step1 with ${n}`);
        return takeLongTime(n);
    }
    
    function step2(n) {
        console.log(`step2 with ${n}`);
        return takeLongTime(n);
    }
    
    function step3(n) {
        console.log(`step3 with ${n}`);
        return takeLongTime(n);
    }
    async function doIt(){
        console.time('doIt');
        const time1 = 300;  //定义初始时间
        //通过await获取Promise的resolve结果，并赋值给下一个常量
        const time2 = await step1(time1);   
        const time3 = await step2(time2);
        const result = await step3(time3);
        console.log(`result is ${result}`);
        console.timeEnd("doIt")
    }
    doIt()
}

/**
 * 总结:
 *      定义：async/await 是一种异步编程解决方案(async通过return可以返回一个Promise对象，await可以通过函数返回的Promise对象获取值)
 *      优势：处理 then 链(更清晰更直观)
 */