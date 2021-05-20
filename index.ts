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
                        console.log(22);
                        _this._data.a = 1010;
                        console.log(22);
                    }
                }
            }, this._data.a),
            h("div", {}, _this._data.b == 1010 ? 1 : 2)
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