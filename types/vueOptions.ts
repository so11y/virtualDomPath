import { CreateVnode, vnode } from "../util/index";
import Watcher from "../vue/Watcher";


interface VueDataFun {
    (vm?: any): object //这个object这样写有问题
}

interface hookFun {
    (): void;
}

export interface Vue {
    $options: VueOptions;
    $el: VueOptions["el"];
    $vnode: vnode;
    _data: any;
    _oldVnode: vnode;
    _watcher: Watcher;
    _watchers: Watcher[];
    [k: string]: any
}

interface renderFun {
    (h: typeof CreateVnode): vnode | Array<vnode>;
}

interface computedFun {
    [K: string]: () => void;
}

export interface VueOptions {
    readonly el?: String | HTMLElement;
    render?: renderFun;
    data?: VueDataFun;
    computed?: computedFun;
    beforeCreate?: hookFun;
    created?: hookFun;
    mounted?: hookFun;
    beforeUpdate?: hookFun;
    updated?: hookFun;
    beforeDestroy?: hookFun;
    destroyed?: hookFun;
}