import { VueOptions, Vue } from "../types/vueOptions";
import { CreateVnode as h, render, CreateRootVnode as cr } from "../util";
import { defineReactive } from "./reactive";
import Watcher, { defineComputed, defineWatchOption } from "./Watcher";


function mount(vm: Vue) {
    new Watcher(() => vm.$options.render.call(vm, h), vm).run();

    //创建虚拟dom
    vm.$vnode = vm._oldVnode;

    //虚拟dom转真实node 并且添加到文档中
    document.body.append(render(vm.$vnode))
}



// function shallowDefineObserve<T extends Vue, G extends keyof VueOptions>(obj: T, key: G, ckey: string) {
//     Object.defineProperty(obj, ckey, {
//         enumerable: true,
//         get() {
//             return obj[key][ckey]
//         },
//         set(value) {
//             obj[key][ckey] = value;
//         }
//     })
// }

function initMethods(vm: Vue) {
    Object.keys(vm.$options.methods).forEach(v => {
        if (!(v in vm)) {
            vm.$options.methods[v].bind(this);
        }
        Object.defineProperty(vm, v, {
            enumerable: true,
            get() {
                return vm.$options.methods[v]
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
    vm.$options.mounted && vm.$options.mounted.call(vm)
}


function Vue(opt: VueOptions) {
    if (opt.el || opt.render) {
        initVue(this, opt);
    }
}


export default Vue;