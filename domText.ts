import { CreateVnode as h, render, CreateRootVnode as cr, diffVnodePath } from "./util";


let vnodeInstance = cr("div", {
    class: "content"
}, [
    h("div", {}, "谢谢你1"),
    h("div", {}, "谢谢你2"),
    h("div", {}, "谢谢你3"),
    h("div", {}, "谢谢你4"),
    h("div", {
        on:{
            click(){
                console.log("为什么哦");
            }
        }
    }, "谢谢你5"),
    h("div", {}, "谢谢你6"),
    h("div", {}, "谢谢你8"),
    h("div", {}, "谢谢你9"),
    h("div", {}, "谢谢你10"),
    h("div", {}, [
        h("span", {}, "谢谢你11span"),
        h("span", {}, "谢谢你12span"),
        h("span", {}, "谢谢你13span"),
        h("span", {}, "谢谢你14span"),
        h("span", {}, "谢谢你15span"),
        h("span", {}, "谢谢你16span"),
        h("span", {}, "谢谢你17span"),
        h("span", {}, "谢谢你18span"),
        h("span", {}, "谢谢你19span"),
    ]),
    h("div", {}, "谢谢你20"),
    h("div", {}, "谢谢你21"),
    h("div", {}, "谢谢你22"),
    h("div", {}, "谢谢你23"),
    h("div", {}, "谢谢你24"),
    h("div", {}, [
        h("div", {}, "谢谢你25"),
    ]),
    h("div", {}, "谢谢你26"),
])


console.log("render-->vnodeInstance");
console.log(vnodeInstance);

let newVnodeInstance = cr("div", {
    class: "content"
}, [
    h("div", {}, "谢谢你1"),
    h("div", {}, "谢谢你2"),
    h("div", {
        style: "color:blue"
    }, "谢谢你3"),
    h("div", {}, "谢谢你4"),
    h("div", {
        // on:{
        //     click(){
        //         console.log("为什么哦");
        //     }
        // }
    }, "谢谢你5"),
    h("div", {}, "谢谢你6"),
    h("div", {}, "谢谢你8"),
    h("div", {}, "谢谢你9"),
    h("div", {}, "谢谢你10"),
    h("div", {}, [
        h("span", {}, "谢谢你11span"),
        h("span", {}, "谢谢你12span"),
        h("span", {}, "谢谢你13span"),
        h("span", {}, "感谢你14span"),
        h("span", {}, "谢谢你15span"),
        h("strong", {
            class: "kkz"
        }, "谢谢你16strong"),
        h("span", {}, "谢谢你17span"),
        h("span", {}, "谢谢你18span"),
        h("span", {}, "谢谢你19span"),
    ]),
    h("div", {}, "谢谢你20"),
    // h("div", {}, "谢谢你21"),
    // h("div", {}, "谢谢你22"),
    // h("div", {}, "谢谢你23"),
    h("em", {}, "谢谢你24em"),
    h("div", {}, [
        h("div", {}, "谢谢你25"),
    ]),
    h("div", {}, "谢谢你26"),
    h("div", {}, [
        h("div", {}, "谢谢你27"),
        h("div", {}, [
            h("div", {}, "谢谢你28"),
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