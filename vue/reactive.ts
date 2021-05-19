import { Vue } from "../types/vueOptions";
import { CreateVnode as h, render, CreateRootVnode as cr, diffVnodePath } from "../util";

export function defineReactive<T extends {}>(data: T) {

    let keys = Object.keys(data);

    keys.forEach(v => {
        walkDefineReactive(data, v);
    })

}


export class Watcher {

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

    update() {
        const newValue = this.cb();
        diffVnodePath(this.vm.$vnode, cr("div", {}, newValue));
    }

    run() {
        this.vm._oldVnode = this.cb();
    }
}

class Dep {

    static target: Watcher;

    static DeptId: number = 0;

    id: number;

    subs: Watcher[] = [];

    constructor() {
        this.id = Dep.DeptId++;
    }

    append() {
        if (!this.subs.length) {
            this.subs.push(Dep.target);
        } else if (this.subs.some(v => v.id !== Dep.target.id)) {
            this.subs.push(Dep.target);
        }
    }

    notify() {
        this.subs.forEach(v => {
            v.update()
        })
    }

}

function walkDefineReactive<T extends {}>(data: T, key: string) {
    let ordValue = data[key];

    if (typeof ordValue == "object") {
        defineReactive(data[key]);
    }

    let dep = new Dep();

    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.append();
            }
            return ordValue;
        },
        set(newValue) {
            ordValue = newValue;
            dep.notify();
        }
    })
}