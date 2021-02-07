import { CreateVnode as h, render, CreateRootVnode as cr, diffVnodePath } from "./util";


let vnodeInstance = cr("div", {
    class: "content"
}, [
    h("div", {
        class: "head"
    }, [
        h("div",{},"24235")
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