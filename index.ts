import Vue from "./vue/main";


new Vue({
    components: {
        "child": {
            /**
             * 好麻烦 这里图省事直接声明需要使用父级的什么属性
             */
            props: ["workInput"],
            render(h) {
                return h("div", {}, [
                    h("div", {}, "我是子组件"+(this.workInput)),
                ])
            },
            mounted() {
                console.log("子组件挂载", this);
                setTimeout(() => {
                    this.$parent.$emit("click", 6666);
                },2000)
            }
        }
    },
    render(h) {
        return h("div", {}, [
            h("h1", {}, "手写Vue已经完成的功能 TodoList"),
            h("child", {
                vueEvent: {
                    click: (v) => {
                        this.workInput = v;
                    }
                },
                componentsId: "child0",
                props: ["workInput"]
            }, null),
            h("input", {
                domProps: {
                    value: this.workInput,
                    placeholder: "更新父子级"
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