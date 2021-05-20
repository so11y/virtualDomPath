export function isObject(obj: any): obj is {} {
    return Object.prototype.toString.call(obj) == "[object Object]";
}