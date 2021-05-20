import Watcher from "./Watcher";

export default class Dep {

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