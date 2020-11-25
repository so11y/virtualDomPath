import { vnode } from "../util";

export interface Ievent {
    click: (...arg: any[]) => any
}
export interface Ivnode {
    tag: string;
    id?: string;
    realDom?: HTMLElement;
    style?: string;
    class?: string | Array<string>;
    on?: Partial<Ievent>;
    children?: Array<vnode> | string;
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
    ordVnodeInstance.realDom.style.cssText =  ordVnodeInstance.style;
}


export function pathText(ordVnode: vnode, newVnode: vnode) {
    let ordVnodeInstance = ordVnode.vnode;
    let newVnodeInstance = newVnode.vnode;
    ordVnodeInstance.children = newVnodeInstance.children;
    ordVnodeInstance.realDom.innerText = ordVnodeInstance.children as string
}

export function isEqual(after:any,before:any,key:string):boolean{
    return after[key] != before[key];
}


export function isNoEqual(after:any,before:any,key:string):boolean{
    return after[key] == before[key];
}


export function isString(compare:any):compare is string{
    return typeof compare  == "string"
}

export function isArray<T>(arr:any):arr is Array<T>{
    return Array.isArray(arr);
}
