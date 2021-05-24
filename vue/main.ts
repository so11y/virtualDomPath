import { VueOptions, Vue } from "../types/vueOptions";
import { CreateVnode as h, render, CreateRootVnode as cr } from "../util";
import { createElement } from "./createElement";
import { defineReactive } from "./reactive";
import Watcher, { defineComputed, defineWatchOption } from "./Watcher";


type vueStatic = {
    id: number;
    (opt: VueOptions, cb?: Function): void
}


function mount(vm: Vue) {
    new Watcher(() => vm.$options.render.call(vm, createElement.bind(vm)), vm).run();
    vm.$vnode = vm._oldVnode;
    if (!vm.$id) {
        //创建虚拟dom 虚拟dom转真实node 并且添加到文档中
        document.body.append(render(vm.$vnode))
    }
}


function initMethods(vm: Vue) {
    Object.keys(vm.$options.methods).forEach(v => {
        if (!(v in vm)) {
            vm.$options.methods[v].bind(this);
        }
        Object.defineProperty(vm, v, {
            enumerable: true,
            get() {
                return vm.$options.methods[v].bind(vm)
            },
            set(value) {
                vm.$options.methods[v] = value;
            }
        })
    })
}

function initData(vm: Vue) {
    vm.$data = vm._data = vm.$options.data.call(vm);
    Object.keys(vm.$data).forEach(v => {
        Object.defineProperty(vm, v, {
            enumerable: true,
            get() {
                return vm.$data[v]
            },
            set(value) {
                vm.$data[v] = value;
            }
        })
    })
    defineReactive(vm._data);
}

function initOptions(vm: Vue) {
    if (vm.$options.data) {
        initData(vm);
    }
    if (vm.$options.methods) {
        initMethods(vm)
    }
    if (vm.$options.computed) {
        defineComputed(vm);
    }
    if (vm.$options.watch) {
        defineWatchOption(vm);
    }
}

function initVue(vm: Vue, opt: VueOptions) {
    vm.$options = opt;
    vm.$el = vm.$options.el;
    vm.beforeCreate && vm.beforeCreate();
    initOptions(vm);
    vm.$options.created && vm.$options.created.call(vm);
    mount(vm);
    if (!vm.$id) {
        vm.$options.mounted && vm.$options.mounted.call(vm)
    }
}


const vue: vueStatic = function (opt: VueOptions, cb?: Function) {
    this.$id = vue.id++;
    if (opt.el || opt.render) {
        // 这是hack 实现props的初始化
        if (cb) cb(this);
        initVue(this, opt);
    }
}

vue.id = 0;


export default vue;

