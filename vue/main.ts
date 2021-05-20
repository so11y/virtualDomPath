import { VueOptions, Vue } from "../types/vueOptions";
import { CreateVnode as h, render, CreateRootVnode as cr } from "../util";
import { defineReactive } from "./reactive";
import Watcher from "./Watcher";


function mount(vm: Vue) {
    new Watcher(() => {
        return vm.$options.render.call(vm, h);
    }, vm).run();

    //创建虚拟dom
    vm.$vnode = vm._oldVnode;// cr("div", {}, []);

    //虚拟dom转真实node 并且添加到文档中
    document.body.append(render(vm.$vnode))
}

function initData(vm: Vue) {
    vm._data = vm.$options.data.call(vm);
    defineReactive(vm._data);
}


function initOptions(vm: Vue) {
    if (vm.$options.data) {
        initData(vm);
    }
}

function initVue(vm: Vue, opt: VueOptions) {
    vm.$options = opt;
    vm.$el = vm.$options.el;
    vm.beforeCreate && vm.beforeCreate();
    initOptions(vm);
    vm.$options.created && vm.$options.created.call(vm);
    mount(vm);
    vm.$options.mounted && vm.$options.mounted.call(vm)
}


function Vue(opt: VueOptions) {
    if (opt.el || opt.render) {
        initVue(this, opt);
    }
}


export default Vue;