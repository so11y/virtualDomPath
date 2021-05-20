import { Vue } from "../types/vueOptions";
import { CreateRootVnode as cr, diffVnodePath } from "../util";
import Dep from "./Dep";


const workQueue: Watcher[] = [];

function updateQuene() {
    Promise.resolve().then(() => {
        while (workQueue.length) {
            console.time("updatePathVnodeEnd-time");
            workQueue.pop().updateDiff();
            console.timeEnd("updatePathVnodeEnd-time");
        }
    })
}
export default class Watcher {

    cb: Function;
    vm: Vue;
    id: number = 0;
    static WatcherId: number = 0;

    constructor(cb: Function, vm: Vue) {
        this.cb = cb;
        this.vm = vm;
        this.id = Watcher.WatcherId++;
        Dep.target = this;
    }

    updateDiff() {
        diffVnodePath(this.vm.$vnode, cr("div", {}, this.cb()))
    }

    update() {
        if (!workQueue.length || workQueue.every(v => v.id != this.id)) {
            workQueue.push(this);
        }
        updateQuene();
    }

    run() {
        this.vm._oldVnode = this.cb();
    }
}