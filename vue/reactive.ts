import { isObject } from "../util/type";
import Dep from "./Dep";

interface Observe {
    __ob__?: Dep
}

const overRewrite = ["push", "splice"];

const ordArrayFun = overRewrite.map(key => Array.prototype[key])

overRewrite.forEach((key, index) => {
    Array.prototype[key] = function (...arg: any) {
        ordArrayFun[index].apply(this, arg);
        if (this.__ob__) {
            if (index == 0) {
                if (Array.isArray(arg))
                    defineReactive(arg[0]);
                Dep.target = this.__ob__.subs.find(v => v.renderWatcher);
                if (Array.isArray(arg))
                    arg[0].__ob__.append();
                else
                    arg.__ob__.append();
                Dep.target = null;
            }
            this.__ob__.notify();
        }
    }
})



//添加响应式
export function defineReactive<T extends {}>(data: T) {
    Object.keys(data).forEach(v => walkDefineReactive(data, v))
}

//判断是否为响应式
function isReactive<T extends Observe>(data: T, dep: Dep) {
    if (data.__ob__) return;
    if (!data.__ob__ && isObject(data)) {
        Object.defineProperty(data, "__ob__", {
            value: dep,
            enumerable: false
        })
    }
}

function walkDefineReactive<T extends Observe>(data: T, key: string) {
    let ordValue = data[key];

    if (Array.isArray(ordValue)) {
        if (!ordValue.length) {
            walkDefineReactive(ordValue as Observe, "toString");
        } else {
            defineReactive(ordValue)
        }
    } else if (isObject(ordValue)) {
        defineReactive(ordValue)
    }

    const dep = new Dep();

    isReactive(data, dep);

    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.append();
                if (Array.isArray(ordValue) && (ordValue as Observe).__ob__) {
                    (ordValue as Observe).__ob__.append();
                }
            }
            return ordValue;
        },
        set(newValue) {
            if (newValue != ordValue) {
                ordValue = newValue;
                if (isObject(ordValue)) {
                    defineReactive(ordValue)
                }
                dep.notify();
            }
        }
    })
}