import Vue from "./vue/main";


new Vue({
    render(h) {
        return h("div", {}, [
            h("div", {}, this.c.cc),
            ...this.g.map(v => h("div", {}, v)),
            h("div", {}, this.good.toString()),
        ])
    },
    computed: {
        good() {
            return this.g;
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
            this.g.push(77);
            // this._watcher.update();
        }, 2000)
    }
})