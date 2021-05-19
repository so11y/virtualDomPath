import Vue from "./vue/main";


new Vue({
    render(h) {
        let _this = this;
        return h("div", {}, [
            h("div", {
                style: "color:red",
                on: {
                    click() {
                        _this._data.b = 1010;
                    }
                }
            }, String(this._data.a)),
            h("div", {}, String(_this._data.b == 1010 ? 1 : 2))
        ])
    },
    data() {
        return {
            a: 33,
            b: 666,
            c: {
                cc: 1
            }
        }
    },
    mounted() {
        console.log(this);
    }
})