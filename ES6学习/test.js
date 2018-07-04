//let
{
    {
        let a = 10;
        var b = 1;
    } 
    //console.log(a) // ReferenceError: a is not defined.
    console.log(b) // 1   
}
{
    console.log('abc'.charAt(0)) // "a"
    console.log('𠮷'.charAt(0)) // "\uD842"
}
//Class
{
    class Point {
        constructor(x,y,name){
            this.x = x;
            this.y = y;
            this.name = name;
        }
        sayHello(){
            console.log(this.name)
        }
    }
    let poi1 = new Point(1,2,"Jack")
    poi1.sayHello()     //Jack

    class Point2 extends Point {
        constructor(x,y,name){
            super(x,y)
        }
        sayHello(){
            console.log("Hello World")
        }
    }
    let poi2 = new Point2(4,5,"Nicholas")
    poi2.sayHello()     //Hello World
    console.log(poi2.x) //4
}