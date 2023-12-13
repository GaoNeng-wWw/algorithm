import { SafeAny } from "../shared";
import deepClone from "../shared/deep-clone";

export const copyLinkList = (linkList: LinkList<any>) => {
    let cur = linkList.getHead();
    const list = new LinkList(deepClone(cur.val));
    while (cur.next){
        cur = cur.next;
        list.append(deepClone(cur.val));
    }
    return list;
}

export class LinkListNode<T>{
    public val: T;
    public next: LinkListNode<T> | null;
    public prev: LinkListNode<T> | null;
    constructor(
        val: T,
        next: LinkListNode<T> | null = null,
        prev: LinkListNode<T> | null = null
    ){
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
    concat(linkList: LinkList<T>){
        if (!this.next){
            this.next = copyLinkList(linkList).getHead();
            return this;
        }
        const a = this;
        const b = linkList;
        const aNextNode = a.next;
        a.next = b.getHead();
        b.getTail().next = aNextNode;
        aNextNode.prev = b.getTail();
        return this;
    }
    toString(){
        let cur = this.next;
        const arr = [this.val];
        while (cur){
            arr.push(cur.val);
            cur = cur.next;
        }
        return arr.join('->');
    }
}

export class LinkList<T>{
    private head: LinkListNode<T>;
    private tail: LinkListNode<T>;
    constructor(val?:T){
        this.append(val);
    }
    append(val?: T){
        const node = val instanceof LinkListNode ? val : new LinkListNode(val, null, null)
        if (!this.head){
            this.head = node;
            this.tail = this.head;
            return this.head;
        }
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
        return this.head;
    }
    find(val?: T){
        let cur = this.head;
        while (cur && cur.val !== val){
            cur = cur.next;
        }
        return cur;
    }
    delete(
        node: LinkListNode<T>
    ){
        if (node === this.head){
            node.next.prev = null;
            this.head = node;
            return this.head;
        }
        if (!node.next){
            node.prev.next = null;
            if (this.tail === node){
                this.tail = node.prev;
            }
            return this.head;
        }
        node.prev.next = node.next;
        node.next.prev = node.prev;
        return this.head;
    }
    deleteByVal(val: T){
        const node = this.find(val);
        return this.delete(node);
    }
    getHead(){
        return this.head;
    }
    getTail(){
        return this.tail;
    }
    toString(){
        let cur = this.head
        const arr = [cur.val];
        while(cur){
            arr.push(cur.val);
            cur = cur.next
        }
        return arr.join('->');
    }
}