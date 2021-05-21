import { vnode } from "../util";

export interface Ievent {
    click: (...arg: any[]) => any;
    input: (...arg: any[]) => any;
    keydown:(...arg: any[]) => any;
}
export interface Ivnode {
    tag: string;
    id?: string;
    domProps?: {
        [key: string]: string | number | boolean;
    };
    realDom?: HTMLElement;
    style?: string;
    class?: string | Array<string>;
    on?: Partial<Ievent>;
    children?: Array<vnode> | string | number;
}

export function pathClass(ordVnode: vnode, newVnode: vnode) {
    let ordVnodeInstance = ordVnode.vnode;
    let newVnodeInstance = newVnode.vnode;
    ordVnodeInstance.class = newVnodeInstance.class;
    ordVnodeInstance.realDom.setAttribute("class",
        Array.isArray(ordVnodeInstance.class) ?
            ordVnodeInstance.class.join(" ") :
            ordVnodeInstance.class
    );
}

export function pathStyle(ordVnode: vnode, newVnode: vnode) {
    let ordVnodeInstance = ordVnode.vnode;
    let newVnodeInstance = newVnode.vnode;
    ordVnodeInstance.style = newVnodeInstance.style;
    ordVnodeInstance.realDom.style.cssText = ordVnodeInstance.style;
}

export function pathDomProps(ordVnode: vnode, newVnode: vnode) {
    let ordVnodeInstance = ordVnode.vnode;
    let newVnodeInstance = newVnode.vnode;

    Object.keys(newVnodeInstance.domProps).forEach(v => {
        if (!ordVnodeInstance.domProps[v] && newVnodeInstance.domProps[v]) {
            ordVnodeInstance.realDom.setAttribute(v, String(newVnodeInstance.domProps[v]))
        } else if (ordVnodeInstance.domProps[v] && !newVnodeInstance.domProps[v]) {
            ordVnodeInstance.realDom.removeAttribute(v)
        } else {
            ordVnodeInstance.realDom.setAttribute(v, String(newVnodeInstance.domProps[v]))
        }
    })
    ordVnodeInstance.domProps = newVnodeInstance.domProps;
}

export function isEqualParse(after: any, before: any, key: string): boolean {
    if (after[key] || before[key]) {
        return JSON.stringify(after[key]) != JSON.stringify(before[key]);
    }
    return false;
}

export function pathText(ordVnode: vnode, newVnode: vnode) {
    let ordVnodeInstance = ordVnode.vnode;
    let newVnodeInstance = newVnode.vnode;
    ordVnodeInstance.children = newVnodeInstance.children;
    ordVnodeInstance.realDom.innerText = ordVnodeInstance.children as string
}

export function isEqual(after: any, before: any, key: string): boolean {
    return after[key] != before[key];
}

export function isNoEqual(after: any, before: any, key: string): boolean {
    return after[key] == before[key];
}


export function isString(compare: any): compare is string {
    return typeof compare == "string"
}

export function isNumber(num: any): num is number {
    return typeof num == "number"
}

export function isArray<T>(arr: any): arr is Array<T> {
    return Array.isArray(arr);
}
