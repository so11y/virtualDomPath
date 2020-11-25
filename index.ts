import { CreateVnode as h, render, CreateRootVnode as cr, diffVnodePath } from "./util";


let vnodeInstance = cr("div", {
    class: "content"
}, [
    h("div", {},"sfsf"),
    h("p", {}, [
        h("p", {}, "谢谢他41"),
        h("p", {}, "谢谢他511"),
    ]),
    h("p", {}, "谢谢他4"),
    h("p", {}, "谢谢他5"),
    h("span", {}, "谢谢我6"),
    h("p", {}, "谢谢他7"),
    h("span", {}, "谢谢我8"),
    h("p", {}, "谢谢他9"),
    h("span", {}, [
        h("div", {}, "谢谢你10"),
        h("div", {}, "谢谢你11")
    ])
])


console.log("render-->vnodeInstance");
console.log(vnodeInstance);

let newVnodeInstance = cr("div", {
    class: "content"
}, [
    h("div", {}, [
        h("div", {
            on:{
                click(){
                    console.log("为什么哦");
                }
            }
        }, "谢谢你11"),
        h("div", {}, "谢谢你22")
    ]),
    h("p", {}, "谢谢他33"),
    h("p", {}, "谢谢他44"),
    h("div", {}, [
        h("p", {}, "谢谢他51"),
        h("p", {}, "谢谢他52"),
        h("p", {}, "谢谢他53"),
        h("p", {}, "谢谢他54"),
    ]),
    h("span", {}, "谢谢我66"),
    h("p", {}, "谢谢他77"),
    h("span", {
        class: "kkz"
    }, "谢谢我88"),
    h("p", {}, "谢谢他99"),
    h("span", {}, [
        h("div", {}, "谢谢你101"),
        h("div", {}, "谢谢你122")
    ])
])

// let newNewVnodeInstance = cr("ul", {
//     class: "content"
// }, [
//     h("span", {}, "不,胃神磨啊"),
//     h("div", {}, "不,谢谢你1"),
//     h("strong", {}, "不,胃神磨啊2"),
//     h("div", {}, "不,谢谢你3"),
//     h("p", {}, "不,谢谢他4"),
//     h("strong", {}, "不,谢谢我5"),
//     h("div", {}, "不,谢谢你6"),
//     h("p", {}, "不,谢谢他7"),
//     h("strong", {}, "不,谢谢我8"),
//     h("strong", {}, "不,谢谢我9"),
//     h("strong", {}, "不,谢谢我10"),
//     h("strong", {}, "不,谢谢我11"),
// ])


setTimeout(() => {
    diffVnodePath(vnodeInstance, newVnodeInstance);
    console.log("pathVnodeEnd-->vnodeInstance");
    console.log(vnodeInstance);

    // setTimeout(()=>{
    //     diffVnodePath(vnodeInstance, newNewVnodeInstance);
    // },2000)
}, 3000)

document.querySelector("#app").replaceWith(render(vnodeInstance))