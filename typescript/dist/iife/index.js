var algorithm = (function (exports) {
    'use strict';

    class LinkListNode {
        constructor(val, next, prev) {
            this.next = null;
            this.prev = null;
            this.val = val;
            this.next = next !== null && next !== void 0 ? next : null;
            this.prev = prev !== null && prev !== void 0 ? prev : null;
        }
    }
    class LinkList {
        constructor(val) {
            this._head = new LinkListNode(Symbol(), null, null);
            this._tail = new LinkListNode(Symbol(), null, null);
            if (val !== undefined) {
                const node = val instanceof LinkListNode ? val : new LinkListNode(val, null, null);
                this._head.next = node;
                this._tail.prev = this._head.next;
            }
        }
        append(val) {
            const node = val instanceof LinkListNode ? val : new LinkListNode(val, null, null);
            if (this._tail.prev === null) {
                this._head.next = node;
                this._tail.prev = this._head.next;
                return this._head;
            }
            this._tail.prev.next = node;
            this._tail.prev = this._tail.prev.next;
            return this._head;
        }
        get head() {
            return this._head.next;
        }
        find(val) {
            let cur = this.head;
            while (cur && cur.val !== val) {
                cur = cur.next;
            }
            return cur;
        }
        findPre(node) {
            let cur = this.head;
            while (cur && cur.next !== node) {
                cur = cur.next;
            }
            return cur;
        }
        insertAfter(node, flag) {
            if (flag === this._tail.prev) {
                this._tail.prev.next = node;
                this._tail.prev = this._tail.prev.next;
                return this.head;
            }
            node.next = flag.next;
            flag.next = node;
            return this.head;
        }
        insertBefore(node, flag) {
            const pre = this.findPre(flag);
            node.next = pre.next;
            pre.next = node;
            return this.head;
        }
        delete(node, keep = true) {
            const pre = this.findPre(node);
            if (keep) {
                if (node === this._tail.prev) {
                    this._tail.prev = pre;
                }
                pre.next = node.next;
                return this.head;
            }
            pre.next = null;
            this._tail.prev = pre;
            return this.head;
        }
        visitor(cb) {
            let cur = this.head;
            while (cur) {
                cb(cur);
                cur = cur.next;
            }
            return;
        }
        toString(conactChar = '->') {
            let arr = ['head'];
            let cur = this._head.next;
            while (cur) {
                arr.push(`${cur.val}`);
                cur = cur.next;
            }
            let ret = arr.join(conactChar);
            ret += '<-tail';
            return ret;
        }
    }

    exports.LinkList = LinkList;
    exports.LinkListNode = LinkListNode;

    return exports;

})({});
