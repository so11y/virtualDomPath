import Vue from "./vue/main";


new Vue({
    render(h) {
        return h("div", {}, [
            h("h1",{},"简简单单实现一个双向"),
            h("div", {}, this.a),
            h("input", {
                domProps: {
                    value: this.a
                },
                on: {
                    input: (e: InputEvent) => {
                        this.a = (e.target as HTMLInputElement).value
                    }
                }
            }),
            ...this.g.map(v => h("div", {}, v)),
            // h("div", {}, this.good.toString()),
        ])
    },
    computed: {
        good() {
            return this.g;
        }
    },
    watch: {
        a(newValue, ordValue) {
            console.log(newValue, ordValue);
        },
        b: {
            immediate: true,
            handle() {
                console.log("gogo", this.b);
            }
        }
    },
    data() {
        return {
            a: 33,
            b: 666,
            g: [1, 2, 3, 4],
            c: {
                cc: 1
            }
        }
    },
    mounted() {
        console.log(this);
        setTimeout(() => {
            this.a = 666;
            // this._watcher.update();
        }, 2000)
    }
})