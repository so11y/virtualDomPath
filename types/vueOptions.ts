import { CreateVnode, vnode } from "../util/index";


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
    [k: string]: any
}

interface renderFun {
    (h: typeof CreateVnode): vnode | Array<vnode>;
}

export interface VueOptions {
    readonly el?: String | HTMLElement;
    render?: renderFun;
    data?: VueDataFun;
    beforeCreate?: hookFun;
    created?: hookFun;
    mounted?: hookFun;
    beforeUpdate?: hookFun;
    updated?: hookFun;
    beforeDestroy?: hookFun;
    destroyed?: hookFun;
}