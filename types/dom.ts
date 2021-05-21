import { Ievent, Ivnode } from "./vnode";

export const HtmlAttributeTagList = ["style", "class", "on", "domProps"];

export interface HtmlAttribute extends Partial<Pick<Ivnode, "style" | "class" | "on" | "domProps">> { }

export function CreateRealDom(tag: string, readHtmlAttribute: HtmlAttribute): HTMLElement {
    const dom = document.createElement(tag);
    Object.keys(readHtmlAttribute).forEach(attribute => {
        switch (attribute) {
            case "class":
                if (Array.isArray(readHtmlAttribute[attribute]))
                    dom.classList.add(...readHtmlAttribute[attribute]);
                else
                    dom.classList.add(readHtmlAttribute[attribute] as string);
                break;
            case "style":
                dom.style.cssText = readHtmlAttribute[attribute];
                break;
            case "on":
                addEventListener(readHtmlAttribute.on, dom);
                break;
            case "domProps":
                if (readHtmlAttribute[attribute]) {
                    Object.keys(readHtmlAttribute[attribute]).forEach(v => {
                        dom.setAttribute(v, String(readHtmlAttribute[attribute][v]));
                    })
                }
        }

    })
    return dom;
}

export function addEventListener(event: Partial<Ievent>, dom: HTMLElement) {
    Object.keys(event).forEach((eventName) => {
        dom.addEventListener(eventName, event[eventName])
    })
}

function removeAddEventListener(event: Partial<Ievent>, dom: HTMLElement) {
    Object.keys(event).forEach((eventName) => {
        dom.removeEventListener(eventName, event[eventName])
    })
}

export function updateAddEventListener(ordVnode: Ivnode, newVnode: Ivnode, dom: HTMLElement) {
    //老vnode没有事件,新vnode有事件
    if (!ordVnode.on && newVnode.on) {
        ordVnode.on = newVnode.on;
        addEventListener(newVnode.on, dom);
    }
    //老vnode存在,新vnode也存在 先删除事件 在创建事件
    else if (ordVnode.on && newVnode.on) {
        removeAddEventListener(ordVnode.on, dom);
        addEventListener(newVnode.on, dom);
        ordVnode.on = newVnode.on;
    }
    //老vnode事件存在 新vnode存在
    else if (ordVnode.on && !newVnode.on) {
        removeAddEventListener(ordVnode.on, dom);
        ordVnode.on = null;
    }
}

export function CreateRealTextDom(parentDom: HTMLElement, text: string) {
    parentDom.appendChild(document.createTextNode(text));
}


export function hasEvent(options: Ivnode) {
    return options.hasOwnProperty("on")
}