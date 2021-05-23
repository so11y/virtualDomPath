import { Vue } from "../types/vueOptions";
import { CreateVnode as h, vnodeOptions, children } from "../util";
import Dep from "./Dep";
import vue from "./main";

export const componentsMap = new Map<string | number, Vue>();

class VueEvnet {
    eventMap = new Map<string, Array<Function>>();

    $on(eventName: string, cb: Function) {
        if (this.eventMap.has(eventName)) {
            this.eventMap.get(eventName).push(function () {
                try {
                    const error = cb();
                    if (error instanceof Promise) {
                        error.catch(() => {
                            console.warn("报错了。？？？？");
                        })
                    }
                } catch (error) {
                    console.warn(error, `错误来自$on,key==>${eventName}`)
                }
            });
        } else {
            this.eventMap.set(eventName, [cb]);
        }
    }

    $emit(eventName: string, ...arg: any[]) {
        if (this.eventMap.has(eventName)) {
            this.eventMap.get(eventName).forEach(v => v(...arg));
        }
    }

    $off(eventName: string, cb: Function) {
        if (this.eventMap.has(eventName)) {
            this.eventMap.get(eventName).filter(v => v != cb)
        }
    }
}

function initProps(props: Array<string>, parent: Vue, childVm: Vue) {
    props.forEach(v => {
        Object.defineProperty(childVm, v, {
            get() {
                return parent[v]
            },
            set() {
                console.error("不可以修改父级属性");
            }
        })
    })
}

function initEvent(vue: Vue, event: vnodeOptions["vueEvent"]) {
    const evnet = new VueEvnet();
    vue.$on = evnet.$on.bind(evnet);
    vue.$emit = evnet.$emit.bind(evnet);
    vue.$off = evnet.$off.bind(evnet);
    Object.keys(event).forEach(v => {
        vue.$on(v, event[v])
    })
}

export function createElement(this: Vue, tag: string, vnodeOptions: vnodeOptions = {}, children: children) {
    if (this.$options.components?.[tag]) {
        //每一个vue只控制自己的渲染如果需要更新将直接复用前一次渲染的实力
        if (!componentsMap.has(vnodeOptions.componentsId)) {
            //这里也是有问题,不能直接new就把实例赋值给compoents 也要来一个Vue.extends()方法;
            //或者有一个$mount()方法
            const component = new vue(this.$options.components[tag], (childVm: Vue) => {
                if (vnodeOptions.props) {
                    // 在这里暴力实现
                    initProps(this.$options.components[tag].props, this, childVm);
                }
            });
            componentsMap.set(vnodeOptions.componentsId, component);
            component.$parent = this;

            //这里也是给写坏了, 这里的工作应该在一开始初始化的时候就已经创建了这个对象
            if (!this.$childre) {
                this.$childre = [component]
            } else {
                this.$childre.push(component);
            }
            if (vnodeOptions.vueEvent) {
                initEvent(component, vnodeOptions.vueEvent);
            }
            this.$options.components[tag].mounted && this.$options.components[tag].mounted.call(component)
            Dep.target = component.$parent._watcher;
            return component.$vnode;
        }
        return componentsMap.get(vnodeOptions.componentsId).$vnode

    }
    return h(tag, vnodeOptions, children);
}