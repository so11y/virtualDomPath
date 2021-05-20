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
            }, this._data.a),
            _this._data.b == 1010 ? h("div", {}, _this._data.b) : h("span", {}, _this._data.b)
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