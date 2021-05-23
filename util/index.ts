import { CreateRealDom, CreateRealTextDom, HtmlAttribute, HtmlAttributeTagList, addEventListener, updateAddEventListener } from "../types/dom";
import { isEqual, isNoEqual, isString, Ivnode, pathClass, pathStyle, pathText, isArray, isNumber, pathDomProps, isEqualParse } from "../types/vnode";
export type children = Pick<Ivnode, "children">["children"];
export type domTag = Pick<Ivnode, "tag">["tag"];
export type vnodeOptions = Omit<Ivnode, "tag" | "children"> & {
    componentsId?: string | number;
    vueEvent?: {
        [key: string]: (...arg: any[]) => any;
    };
    props?: {
        [key: string]: any
    }
}


export class vnode {
    public vnode: Ivnode;
    public _isRoot: boolean = false;
    public _parent: vnode;
    constructor(tag: domTag, vnodeOptions: vnodeOptions = {}, children: children) {
        if (!Array.isArray(children) && !isString(children) && !isNumber(children)) {
            children = [children];
        } else if (isNumber(children)) {
            children = String(children);
        }

        this.vnode = {
            tag,
            ...vnodeOptions,
            children
        };
    }
}

export function CreateVnode(tag: domTag, vnodeOptions: vnodeOptions = {}, children: children = "") {
    return new vnode(tag, vnodeOptions, children);
}

/**
 * @example:遍历需要传递的真实属性
 */
function walkAttribute(vnode: Ivnode): HtmlAttribute {
    let attribute: HtmlAttribute = {};
    Object.keys(vnode).forEach(element => {
        if (HtmlAttributeTagList.includes(element)) {
            attribute[element] = vnode[element]
        }
    });
    return attribute;
}

export function render(vnodeInstance: vnode) {

    let { vnode } = vnodeInstance;

    let readHtmlAttribute: HtmlAttribute = walkAttribute(vnode);

    vnode.realDom = CreateRealDom(vnode.tag, readHtmlAttribute);

    if (vnode.children && Array.isArray(vnode.children)) {
        for (let i = 0, length = vnode.children.length; i < length; i++) {
            //过滤掉null
            if (!vnode.children[i]) {
                vnode.children.splice(i, 1);
            } else {
                vnode.children[i]._parent = vnodeInstance;
                let childDom = render(vnode.children[i]);
                vnode.realDom.appendChild(childDom);
            }
        }
    } else {
        if (isString(vnode.children))
            CreateRealTextDom(vnode.realDom, vnode.children);

    }
    return vnode.realDom;
}

export function CreateRootVnode(tag: domTag, vnodeOptions: vnodeOptions = {}, children: children) {

    let rootVnode = new vnode(tag, vnodeOptions, children);
    rootVnode._isRoot = true;
    return rootVnode;
}



export function diffVnodePath(ordVnode: vnode, newVnode: vnode) {
    walkPath(ordVnode, newVnode);
}


function walkPath(ordVnode: vnode, newVnode: vnode) {

    let ordVnodeInstance = ordVnode.vnode;
    let newVnodeInstance = newVnode.vnode;

    if (isArray(ordVnodeInstance.children) && isArray(newVnodeInstance.children)) {
        //如果子节点都替换了,就直接结束
        if (elementEqualTagPath(ordVnode, newVnode)) return
        //取新旧vnode当前children最长度 vnode数组在path过程中会变化,需要重新计算
        //let length = Math.max(newVnodeInstance.children.length, ordVnodeInstance.children.length);
        for (let i = 0; i <= Math.max(newVnodeInstance.children.length, ordVnodeInstance.children.length); i++) {
            //老vnode不存在 新vnode存在 等于添加
            if (!ordVnodeInstance.children[i] && newVnodeInstance.children[i]) {
                ordVnodeInstance.children[i] = newVnodeInstance.children[i];
                ordVnodeInstance.children[i]._parent = ordVnode;
                ordVnodeInstance.children[i]._parent.vnode.realDom.append(render(ordVnodeInstance.children[i]));
            }
            else if (ordVnodeInstance.children[i] && !newVnodeInstance.children[i]) {//老vnode存在 新vnode不存在
                //父级释放子引用
                releaseChild(ordVnodeInstance, i);
                //删除后长度数组发生变化
                //会直接跳过下一个每次必定只删除一个。
                //需要把当前下标前移一位,防止直接跳过
                i - 1 === 0 ? i = 0 : i -= 1;
            }
            else if (!ordVnodeInstance.children[i] && !newVnodeInstance.children[i]) {
                //新旧vnode实例都不存在
                let removeIndex = i;
                while (
                    removeIndex-- && ordVnodeInstance.children[removeIndex] &&
                    i !== newVnodeInstance.children.length
                ) {
                    releaseChild(ordVnodeInstance, removeIndex);
                }
            }
            else {
                walkPath(ordVnodeInstance.children[i], newVnodeInstance.children[i]);
            }
        }
    } else
        elementEqualTagPath(ordVnode, newVnode);
}

/**
 * @example:释放子vnode引用,删除真实dom
 */
function releaseChild(instance: Ivnode, removeIndex: number) {
    let instanceVnode = (instance.children as Array<vnode>);
    instanceVnode[removeIndex].vnode.realDom.remove();
    let childrenList = instanceVnode[removeIndex]._parent.vnode;
    if (isArray(childrenList.children)) {
        childrenList.children =
            childrenList.children
                .filter(childrenItem => childrenItem !== instanceVnode[removeIndex]);
    }
}

function elementEqualTagPath(ordVnode: vnode, newVnode: vnode): boolean {
    let ordVnodeInstance = ordVnode.vnode;
    let newVnodeInstance = newVnode.vnode;
    //标签相同
    if (isNoEqual(ordVnodeInstance, newVnodeInstance, "tag")) {
        //class打补丁
        if (isEqual(ordVnodeInstance, newVnodeInstance, "class")) pathClass(ordVnode, newVnode);
        //style打补丁
        if (isEqual(ordVnodeInstance, newVnodeInstance, "style")) pathStyle(ordVnode, newVnode);
        //domProps补丁 简单点直接转stringfy
        if (isEqualParse(ordVnodeInstance, newVnodeInstance, "domProps")) pathDomProps(ordVnode, newVnode);

        //event必定要判断一次
        updateAddEventListener(ordVnode.vnode, newVnode.vnode, ordVnode.vnode.realDom);

        //新vnode是数组
        if (isEqual(ordVnodeInstance, newVnodeInstance, "children") && isString(newVnodeInstance.children)) pathText(ordVnode, newVnode)
        //老vnode是string 新vnode是数组
        else if (isString(ordVnodeInstance.children) && isArray(newVnodeInstance.children)) {
            ordVnode.vnode = newVnode.vnode;
            ordVnodeInstance.realDom.replaceWith(render(ordVnode));
        }
    } else {
        //元素tag不同 直接替换
        ordVnode.vnode = newVnode.vnode;
        ordVnodeInstance.realDom.replaceWith(render(ordVnode));
        return true;
    }
    return false;
}