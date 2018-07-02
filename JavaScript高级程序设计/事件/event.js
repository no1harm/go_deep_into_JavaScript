//IE事件流：事件冒泡(事件开始时由最具体的元素(文档中嵌套层次最深的那个节点)接收，然后逐级向上传播到较为不具体的节点)

//Netscape Communicator事件流：事件捕获(不太具体的节点更早接收到事件，而最具体的节点应该最后接收到事件)

//DOM事件流：事件捕获阶段(为截获事件提供机会) -> 处于目标阶段 -> 事件冒泡阶段(对事件作出响应)

/**
 * 事件处理程序
 *      HTML事件处理程序
 *      DOM0级事件处理程序
 *      DOM2级事件处理程序
 *      IE事件处理程序
 *      跨浏览器的事件处理程序
 * 事件对象
 * 事件类型
 * 内存和性能
 *      事件委托(处理事件处理程序过多的问题，节约内存)
 * 
 */

{
    // HTML事件处理程序:直接将事件绑定在具体的元素上
    /*
    <input type="button" value="Click ME" onclick="showMessage"/>
    function showMessage (){
        alert("Hello World")
    }
    */
    //  缺陷：1.时差问题 2.这样拓展事件处理程序的作用域链在不同的浏览器中会导致不同结果 3.HTML和JavaScript代码紧密耦合
}
{
    //DOM0级事件处理程序
    var btn = document.getElementById("myBtn");
    btn.onclick = function(){
        alert("Hello World")
    }
    btn.onclick = null
}
{
    //DOM2级事件处理程序:优势（可以添加多个事件处理程序）
    //addEventListener() / removeEventListener()
    var btn = document.getElementById("myBtn");
    btn.addEventListener("click",function(){
        alert(this.id)
    },false)
    //true:在捕获阶段调用事件处理函数，false：在冒泡阶段调用事件处理函数
    //通过addEventListener()添加的匿名函数无法被移除
}
{
    // IE事件处理程序:注意这种事件处理程序会在全局作用域中运行
    //attachEvent() / detachEvent()
    var btn = document.getElementById("myBtn");
    btn.attachEvent("onclick",function(){
        alert("Hello World")
    })
}
{

}