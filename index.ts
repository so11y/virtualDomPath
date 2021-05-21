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
                        this.a = (e.target as HTMLInputElement).value;
                        this.b = (e.target as HTMLInputElement).value;
                    }
                }
            }),
            h("hr",{},null),
            h("h1", {}, "实现计算属性和监听属性"),
            h("h1", {}, "且监听属性支持监听计算属性"),
            h("div", {}, this.good),
        ])
    },
    computed: {
        good() {
            return this.a + "+谢谢你哦";
        }
    },
    watch: {
        good(newValue) {
            console.log(newValue, "小小监听一下计算属性");
        },
        b: {
            immediate: true,
            handle() {
                console.log("一开始就触发监听,我只监听B属性",this.b);
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