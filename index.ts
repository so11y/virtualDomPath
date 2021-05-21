import Vue from "./vue/main";


new Vue({
    render(h) {
        return h("div", {}, [
            h("h1", {}, "Todo List"),
            h("input", {
                domProps: {
                    value: this.workInput
                },
                on: {
                    input: (e: InputEvent) => {
                        this.workInput = (e.target as HTMLInputElement).value;
                    },
                    keydown: (e:KeyboardEvent) => {
                        if(e.keyCode == 13){
                            this.add();
                        }
                    }
                }
            }),
            ...this.workList.map(v=> h("h6", {}, v))
        ])
    },
    data() {
        return {
            workInput: "",
            workList: [],
        }
    },
    methods: {
        add(){
            this.workList.push(this.workInput);
        }
    }
})