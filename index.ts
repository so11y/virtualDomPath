import { CreateVnode as h, render, CreateRootVnode as cr, diffVnodePath } from "./util";


let vnodeInstance = cr("div", {
    class: "content"
}, [
    h("div", {
        class: "head"
    }, [
        h("div", {
            class: "title"
        }, "我是标题"),
        h("div", {}, "我是日期"),
        h("div", {}, [
            h("span", {}, "姓名："),
            h("span", {}, "郑然")
        ])
    ]),

])


console.log("render-->vnodeInstance");
console.log(vnodeInstance);

let newVnodeInstance = cr("div", {
    class: "content"
}, [
    h("div", {
        class: "head"
    }, [
        h("div", {},[
            h("div", {},"12"),
         ]),
        h("div", {},""),
        h("div", {},[
           h("div", {},"11"),
        ]),
        h("div", {
            class: "title"
        }, "我是标题"),
        h("div", {}, [
            h("span", {}, [
                h("div", {}, "姓"),
                h("div", {}, "名"),
                h("div", {}, ":"),
            ]),
            h("span", {}, "张三")
        ])
    ]),
])


setTimeout(() => {
    console.time("updatePathVnodeEnd-time");
    diffVnodePath(vnodeInstance, newVnodeInstance);
    console.timeEnd("updatePathVnodeEnd-time");
    // console.log("pathVnodeEnd-->vnodeInstance");
    console.log(vnodeInstance);

    // setTimeout(()=>{
    //     diffVnodePath(vnodeInstance, newNewVnodeInstance);
    // },2000)
}, 2000)

console.time("render-end");
const renderDom = render(vnodeInstance)
console.timeEnd("render-end");

document.querySelector("#app").replaceWith(renderDom)