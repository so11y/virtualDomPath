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
                        _this._data.b = 10101;
                        _this._data.b = 10102;
                        _this._data.b = 10103;
                        _this._data.a = 1010;
                    }
                }
            }, this._data.a),
            _this._data.b == 1010 ? h("span", {
                style:"color:blue"
            }, '11') : h("span", {}, '11'),
        ])
    },
    computed: {
        good() {
            return this._data.b + 101 + "我是计算属性--~";
        }
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