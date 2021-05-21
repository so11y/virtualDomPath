import { isObject } from "../util/type";
import Dep from "./Dep";

interface Observe {
    __ob__?: Dep
}

const overRewrite = ["push"];

const ordArrayFun = overRewrite.map(key => Array.prototype[key])

overRewrite.forEach((key, index) => {
    Array.prototype[key] = function (arg: any) {
        ordArrayFun[index].call(this, arg);
        if (this.__ob__) {
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
         walkDefineReactive(ordValue as Observe,"toString");
    } else if (isObject(data)) {
        defineReactive(data[key])
    }

    const dep = new Dep();

    isReactive(data, dep);

    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.append();
                if (Array.isArray(ordValue)) {
                    (ordValue as Observe).__ob__.append();
                }
            }
            return ordValue;
        },
        set(newValue) {
            if (newValue != ordValue) {
                ordValue = newValue;
                dep.notify();
            }
        }
    })
}