export class TreeNode<T> {
    public val: T;
    public left?: TreeNode<T> | null = null;
    public right?: TreeNode<T> | null = null;
    public parent?: TreeNode<T> | null = null;
    constructor(val:T, left?: TreeNode<T>, right?: TreeNode<T>, parent?: TreeNode<T>){
        this.val = val;
        this.left = left ?? null;
        this.right = right ?? null;
        this.parent = parent;
    }
    predecessor():TreeNode<T> | null{
        const node = this;
        let p = node.left;
        if (p){
            while (p.right){
                p = p.right
            }
            return p;
        }
        p = node;
        while (p.parent && p === p.parent.left){
            p = p.parent;
        }
        return p.parent ?? null;
    }
    successor(): TreeNode<T> | null{
        const node = this;
        let n = node.right;
        if (n){
            while (n.left){
                n = n.left;
            }
            return n;
        }
        n = node;
        while (n.parent && n === n.parent.right){
            n = n.parent;
        }
        return n.parent ?? null;
    }
}

export class BinarySearchTree<T> {
    public root: TreeNode<T>;
    constructor(
        node?: TreeNode<T>
    ){
        this.root = node;
    }
    isLeaf(node: TreeNode<T>){
        return node.left === null && node.right === null;
    }
    add(val: T | TreeNode<T>){
        const node = val instanceof TreeNode ? val : new TreeNode(val);
        if (!this.root){
            this.root = node;
            return this.root;
        }
        let cur = this.root;
        let parent = this.root;
        while (cur){
            parent = cur;
            if (node.val > cur.val){
                cur = cur.right;
            } else {
                cur = cur.left;
            }
        }
        node.parent = parent;
        if (node.val > parent.val){
            parent.right = node;
        } else {
            parent.left = node;
        }
        return this.root;
    }
    delete(node: TreeNode<T>){
        if (this.isLeaf(node)){
            const p =node.parent;
            if (p.left === node){
                p.left = null;
                node.parent = null;
                return true;
            }
            if (p.right === node){
                p.right = null;
                node.parent = null;
                return true;
            }
        }
        if (node.left && !node.right){
            node.left.parent = node.parent;
            if (node.parent.left === node){
                node.parent.left = node.left;
            }
            return true;
        }
        if (node.right && !node.left){
            node.right.parent = node.parent;
            if (node.parent.right === node){
                node.parent.right = node.right;
            }
            node.parent = null;
            return true;
        }
        if (node.right && node.left){
            const n = node.successor();
            node.val = n.val;
            this.delete(n);
            return true;
        }
        return false;
    }
    find(val:T): TreeNode<T> | null{
        let cur = this.root;
        while (cur && cur.val !== val){
            if (val < cur.val){
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        return cur;
    }
}