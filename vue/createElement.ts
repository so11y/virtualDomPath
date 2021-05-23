import { Vue } from "../types/vueOptions";
import { CreateVnode as h, vnodeOptions, children } from "../util";
import Dep from "./Dep";
import vue from "./main";

export const componentsMap = new Map<string | number, Vue>();


function initProps(props: Array<string>, parent: Vue, childVm: Vue) {
    props.forEach(v => {
        Object.defineProperty(childVm, v, {
            get() {
                return parent[v]
            },
            set() {
                console.log("不可以修改父级属性");
            }
        })
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
            Dep.target = component.$parent._watcher;
            return component.$vnode;
        }
        return componentsMap.get(vnodeOptions.componentsId).$vnode

    }
    return h(tag, vnodeOptions, children);
}