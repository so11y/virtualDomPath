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
                        _this._data.a = 1010;
                    }
                }
            }, this._data.a),
            this._data.b == 1010 ? h("div", {}, 1) : null
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