import { isObject } from "../util/type";
import Dep from "./Dep";

interface Observe {
    __ob__?: Dep
}

//添加响应式
export function defineReactive<T extends {}>(data: T) {
    Object.keys(data).forEach(v => walkDefineReactive(data, v))
}

//判断是否为响应式
function isReactive<T extends Observe>(data: T, dep: Dep) {
    if (data.__ob__) { return true }
    if (!data.__ob__ && isObject(data)) {
        Object.defineProperty(data, "__ob__", {
            value: dep,
            enumerable: false
        })
    }
}

function walkDefineReactive<T extends Observe>(data: T, key: string) {
    let ordValue = data[key];

    if (isObject(data))
        defineReactive(data[key])

    const dep = new Dep();

    if (isReactive(data, dep)) return;

    Object.defineProperty(data, key, {
        get() {
            if (Dep.target)
                dep.append();
            return ordValue;
        },
        set(newValue) {
            ordValue = newValue;
            dep.notify();
        }
    })
}