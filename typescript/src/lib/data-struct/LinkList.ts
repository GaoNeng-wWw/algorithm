export class LinkListNode<T extends any> {
    public val: T;
    public next?: LinkListNode<T> = null;
    public prev?: LinkListNode<T> = null;
    constructor(
        val: T,
        next?: LinkListNode<T>,
        prev?: LinkListNode<T>
    ){
        this.val = val
        this.next = next ?? null;
        this.prev = prev ?? null;
    }
}
export class LinkList<T extends string | number | boolean | object> {
    private _head:LinkListNode<T> | null = new LinkListNode(Symbol() as any, null, null);
    private _tail:LinkListNode<T> | null = new LinkListNode(Symbol() as any, null, null);
    constructor(
        val?: T
    ){
        if (val !== undefined){
            const node = val instanceof LinkListNode ? val : new LinkListNode<T>(val, null, null);
            this._head.next=node;
            this._tail.prev = this._head.next;
        }
    }
    public append(val: T){
        const node = val instanceof LinkListNode ? val : new LinkListNode<T>(val, null, null);
        if (this._tail.prev === null){
            this._head.next = node;
            this._tail.prev = this._head.next;
            return this._head;
        }
        this._tail.prev.next = node;
        this._tail.prev = this._tail.prev.next;
        return this._head;
    }
    public get head(){
        return this._head.next;
    }
    find(val: T){
        let cur = this.head;
        while (cur && cur.val !== val){
            cur = cur.next;
        }
        return cur;
    }
    findPre(node: LinkListNode<T>){
        let cur = this.head;
        while (cur && cur.next !== node){
            cur = cur.next;
        }
        return cur;
    }
    insertAfter(node: LinkListNode<T>, flag: LinkListNode<T>){
        if (flag === this._tail.prev){
            this._tail.prev.next = node;
            this._tail.prev = this._tail.prev.next;
            return this.head;
        }
        node.next = flag.next;
        flag.next = node;
        return this.head;
    }
    insertBefore(node: LinkListNode<T>, flag: LinkListNode<T>){
        const pre = this.findPre(flag);
        node.next = pre.next;
        pre.next = node;
        return this.head;
    }
    delete(node:LinkListNode<T>, keep: boolean = true){
        const pre = this.findPre(node);
        if (keep){
            if (node === this._tail.prev){
                this._tail.prev = pre;
            }
            pre.next = node.next;
            return this.head;
        }
        pre.next = null;
        this._tail.prev = pre;
        return this.head
    }
    visitor(
        cb: (node: LinkListNode<T>)=>void
    ){
        let cur = this.head;
        while (cur){
            cb(cur);
            cur = cur.next;
        }
        return;
    }
    public toString(conactChar='->'){
        let arr = ['head'];
        let cur = this._head.next;
        while (cur){
            arr.push(`${cur.val}`)
            cur = cur.next
        }
        let ret = arr.join(conactChar);
        ret += '<-tail';
        return ret;
    }
}

