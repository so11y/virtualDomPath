import Vue from "./vue/main";


new Vue({
    components: {
        "child": {
            /**
             * 好麻烦 这里图省事直接声明需要使用父级的什么属性
             */
            props: ["workInput"],
            components: {
                "childChild": {
                    render(h) {
                        return h("div", {}, "我是孙组件")
                    },
                    mounted() {
                        console.log("孙组件挂载");
                    }
                }
            },
            render(h) {
                return h("div", {}, [
                      h("div", {}, "我是子组件" + (this.workInput)),
                    h("childChild", {
                        componentsId:"childChild0",
                    }, null)
                ])
            },
            mounted() {
                console.log("子组件挂载", this);
            }
        }
    },
    render(h) {
        return h("div", {}, [
            h("h1", {}, "手写Vue已经完成的功能 TodoList"),
            h("child", {
                componentsId:"child0",
                props: ["workInput"]
            }, null),
            h("h1", {}, this.workInput),
            h("input", {
                domProps: {
                    value: this.workInput
                },
                on: {
                    input: (e: InputEvent) => {
                        this.workInput = (e.target as HTMLInputElement).value;
                    },
                    keydown: (e: KeyboardEvent) => {
                        if (e.keyCode == 13) {
                            this.add();
                            this.workInput = "";
                        }
                    }
                }
            }),
            ...this.workList.map((v, i) => h("h6", {}, [
                h("span", {
                    domProps: {
                        title: v.value
                    },
                    class: v.type ? ['undo', 'text'] : ['todo', 'text']
                }, v.value),
                h("button", {
                    on: {
                        click: () => {
                            this.workList.splice(i, 1);
                        }
                    }
                }, "删除"),
                h("button", {
                    on: {
                        click: () => {
                            this.workList[i].type = !v.type;
                        }
                    }
                }, v.type ? '已完成' : '未完成'),
            ]))
        ])
    },
    mounted() {
        console.log("父组件挂载", this);
    },
    data() {
        return {
            workInput: "",
            workList: [],
        }
    },
    created() {
        this.workList = JSON.parse(localStorage.getItem("work"))
    },
    methods: {
        add() {
            if (this.workInput) {
                this.workList.push({
                    type: false,
                    value: this.workInput
                });
            }
        }
    }
})