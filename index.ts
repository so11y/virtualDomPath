import Vue from "./vue/main";


new Vue({
    render(h) {
        return h("div", {}, [
            h("h1", {}, "简简单单实现一个双向"),
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
            h("h1", {}, "简简单单一个计算属性 并且 监听属性监听计算属性"),
            h("div", {}, this.good),
        ])
    },
    computed: {
        good() {
            return this.a + "1谢谢你哦";
        }
    },
    watch: {
        good(newValue, ordValue) {
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