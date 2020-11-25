import { Ievent, Ivnode } from "./vnode";

export const HtmlAttributeTagList = ["style", "class", "on"];

export interface HtmlAttribute extends Partial<Pick<Ivnode, "style" | "class" | "on">> { }

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
                Object.keys(readHtmlAttribute.on).forEach((eventName) => {
                    dom.addEventListener(eventName, readHtmlAttribute.on[eventName])
                })
                break;
        }

    })
    return dom;
}

export function CreateRealTextDom(parentDom: HTMLElement, text: string) {
    parentDom.appendChild(document.createTextNode(text));
}


export function hasEvent(options: Ivnode) {
    return options.hasOwnProperty("on")
}