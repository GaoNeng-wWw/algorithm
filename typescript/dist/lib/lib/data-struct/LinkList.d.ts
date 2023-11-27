export declare class LinkListNode<T extends any> {
    val: T;
    next?: LinkListNode<T>;
    prev?: LinkListNode<T>;
    constructor(val: T, next?: LinkListNode<T>, prev?: LinkListNode<T>);
}
export declare class LinkList<T extends string | number | boolean | object> {
    private _head;
    private _tail;
    constructor(val?: T);
    append(val: T): LinkListNode<T>;
    get head(): LinkListNode<T>;
    find(val: T): LinkListNode<T>;
    findPre(node: LinkListNode<T>): LinkListNode<T>;
    insertAfter(node: LinkListNode<T>, flag: LinkListNode<T>): LinkListNode<T>;
    insertBefore(node: LinkListNode<T>, flag: LinkListNode<T>): LinkListNode<T>;
    delete(node: LinkListNode<T>, keep?: boolean): LinkListNode<T>;
    visitor(cb: (node: LinkListNode<T>) => void): void;
    toString(conactChar?: string): string;
}
