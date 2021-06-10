import Vue, { difneVue } from "./vue/main";

// new Vue({
//     components: {
//         inputCom: {
//             /**
//              * 好麻烦 这里图省事直接声明需要使用父级的什么属性
//              */
//             props: ["workInput"],
//             render(h) {
//                 return h("input", {
//                     domProps: {
//                         value: this.workInput,
//                         placeholder: "输入内容~"
//                     },
//                     on: {
//                         input: (e: InputEvent) => {
//                             this.$emit("setText", (e.target as HTMLInputElement).value);
//                         },
//                         keydown: (e: KeyboardEvent) => {
//                             if (e.keyCode == 13) {
//                                 this.$emit("add");
//                                 this.$emit("setText", "");
//                             }
//                         }
//                     }
//                 })
//             },
//         },
//         listCom: {
//             props: ["workList"],
//             render(h) {
//                 return h("div", {}, this.workList.map((v, i) => h("h6", {}, [
//                     h("span", {
//                         domProps: {
//                             title: v.value
//                         },
//                         class: v.type ? ['undo', 'text'] : ['todo', 'text']
//                     }, v.value),
//                     h("button", {
//                         on: {
//                             click: () => {
//                                 this.$emit("splice",i);
//                                 console.log(this);
//                             }
//                         }
//                     }, "删除"),
//                     h("button", {
//                         on: {
//                             click: () => {
//                                 this.$emit("reverse",i,v);

//                             }
//                         }
//                     }, v.type ? '已完成' : '未完成'),
//                 ])))
//             }
//         }
//     },
//     render(h) {
//         return h("div", {}, [
//             h("h1", {}, "手写Vue已经完成的功能 TodoList"),
//             h("inputCom", {
//                 vueEvent: {
//                     setText: this.setText,
//                     add: this.add
//                 },
//                 componentsId: "child0",
//                 props: ["workInput"]
//             }, null),
//             h("listCom", {
//                 vueEvent: {
//                     splice: this.splice,
//                     reverse:this.reverse,
//                 },
//                 componentsId: "listCom0",
//                 props: ["workList"]
//             }, null),
//         ])
//     },
//     data() {
//         return {
//             workInput: "",
//             workList: [],
//         }
//     },
//     created() {
//         this.workList = JSON.parse(localStorage.getItem("work"))
//     },
//     methods: {
//         reverse(i,v){
//             this.workList[i].type = !v.type;
//         },
//         splice(i){
//             this.workList.splice(i, 1);
//         },
//         setText(v) {
//             this.workInput = v;
//         },
//         add() {
//             if (this.workInput) {
//                 this.workList.push({
//                     type: false,
//                     value: this.workInput
//                 });
//             }
//         }
//     }
// })


const code = `function render (h) {return <div>{this.a}</div>}`;

fetch(`http://localhost:8080/babel?code=${code}`).then(res => res.json())
    .then(response => {
        new Vue({
            data(){
                return {
                    a:1
                }
            },
            render: eval(response.code)
        })
    })