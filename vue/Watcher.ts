import { Vue } from "../types/vueOptions";
import { CreateRootVnode as cr, diffVnodePath } from "../util";
import Dep, { ComputedDep } from "./Dep";


const workQueue: Watcher[] = [];

function updateQuene() {
    Promise.resolve().then(() => {
        if (workQueue.length) {
            console.log("当前需要执行的异步更新队列长度", workQueue.length);
            console.time("执行当前所有队列watch时间");
            while (workQueue.length) {
                const watch = workQueue.shift();
                if (watch.renderWatcher) {
                    watch.updateDiff()
                } else {
                    watch.updateOther();
                }
            }
            console.timeEnd("执行当前所有队列watch时间");
        }
    })
}
export default class Watcher {

    cb: Function;
    vm: Vue;
    id: number = 0;
    deps: Dep[] = [];
    static WatcherId: number = 0;
    renderWatcher: boolean;

    constructor(cb: Function, vm: Vue, isRenderWatcher = true) {
        this.cb = cb;
        this.vm = vm;
        this.id = Watcher.WatcherId++;
        this.renderWatcher = isRenderWatcher;
    }
    updateOther() { }

    updateDiff() {
        diffVnodePath(this.vm.$vnode, this.cb())
    }

    update() {
        if (!workQueue.length || workQueue.every(v => v.id != this.id)) {
            workQueue.push(this);
            workQueue.sort((p, v) => p.id - v.id);
        }
        updateQuene();
    }

    run() {
        this.renderWatcher && (this.vm._watcher = this);
        Dep.target = this;
        this.vm._oldVnode = this.cb();
        Dep.target = null;
        if (!this.vm._watchers)
            this.vm._watchers = [this]
        else
            this.vm._watchers.push(this);
    }
}

class ComputedWatcher extends Watcher {
    value: any;
    dirty = true;//是否被变成过 true 初始为true
    depRef: ComputedDep;
    frist = true;
    constructor(cb: Function, vm: Vue, depRef?: ComputedDep) {
        super(cb, vm);
        this.renderWatcher = false;
        this.depRef = depRef;
    }
    updateOther() {
        this.dirty = true;
        if (this.depRef) {
            this.depRef.notify();
        }
    }

    run() {
        Dep.target = this;
        this.value = this.cb();
        this.dirty = false;
        Dep.target = null;
    }
}
export function defineComputed(vm: Vue) {
    Object.keys(vm.$options.computed).forEach(v => {
        if (!(v in vm)) {

            const depRef = new ComputedDep();

            const watch = new ComputedWatcher(vm.$options.computed[v].bind(vm), vm, depRef);

            if (!vm._watchers) vm._watchers = [watch]

            else vm._watchers.push(watch);

            Object.defineProperty(vm, v, {
                enumerable: true,
                get() {
                    if (watch.frist) {
                        depRef.append();
                        watch.frist = false;
                    }
                    if (watch.dirty) {
                        watch.run();
                        if (watch.vm._watcher) {
                            Dep.target = watch.vm._watcher;
                            watch.deps.forEach(w => w.append());
                        }
                    }
                    return watch.value
                },
                set(){
                    console.warn("计算属性暂不支持set");
                }
            })
        } else {
            console.warn(`计算属性key与vm实例重复${v}`)
        }
    })
}


class WatchOption extends ComputedWatcher {
    layz = false;
    key: string;
    constructor(cb: Function, vm: Vue, key: string) {
        super(cb, vm);
        this.renderWatcher = false;
        this.key = key;
    }
    updateOther() {
        this.cb(this.vm[this.key], 2);
    }
}

export function defineWatchOption(vm: Vue) {
    Object.keys(vm.$options.watch).forEach(v => {
        const watchOption = vm.$options.watch[v];
        let watch: Watcher;
        if (typeof watchOption == "function") {
            watch = new WatchOption(watchOption.bind(vm), vm, v);
            Dep.target = watch;
            vm[v];
            Dep.target = null;
        } else {
            watch = new WatchOption(watchOption.handle.bind(vm), vm, v);
            if (watchOption.immediate) {
                watch.run();
                Dep.target = watch.vm._watcher;
            }
        }

        if (!vm._watchers) vm._watchers = [watch]
        else vm._watchers.push(watch);

    })
}
