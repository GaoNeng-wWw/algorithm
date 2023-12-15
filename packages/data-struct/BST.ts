export class TreeNode<T> {
    public val: T;
    public left: TreeNode<T> | null;
    public right: TreeNode<T> | null;
    public parent: TreeNode<T> | null = null;
    constructor(
        val:T,
        left: TreeNode<T> | null = null,
        right: TreeNode<T> | null = null,
        parent: TreeNode<T> | null = null,
    ){
        this.val = val;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
    successors(){
        let node = this.right;
        if (node){
            while (node.left){
                node = node.left;
            }
            return node;
        } else {
            node = this;
            while (node.parent && node.parent.right === node){
                node = node.parent;
            }
            return node;
        }
    }
    pred(){
        let node = this.left        
        if (node !== null){
            while (node.right){
                node = node.right;
            }
            return node;
        } else {
            node = this;
            while (node.parent && node.parent.left === node){
                node = node.parent;
            }
            return node.parent;
        }
    }
    preorder(
        cb: (node: TreeNode<T>)=>void
    ){
        const traversal = (node: TreeNode<T> | null) => {
            if (!node){
                return;
            }
            cb(node);
            traversal(node.left);
            traversal(node.right);
        }
        traversal(this);
    }
    inorder(
        cb: (node: TreeNode<T>)=>void
    ){
        const traversal = (node: TreeNode<T> | null) => {
            if (!node){
                return;
            }
            traversal(node.left);
            cb(node);
            traversal(node.right);
        }
        traversal(this);
    }
    postorder(
        cb: (node: TreeNode<T>)=>void
    ){
        const traversal = (node: TreeNode<T> | null) => {
            if (!node){
                return;
            }
            traversal(node.left);
            traversal(node.right);
            cb(node);
        }
        traversal(this);
    }
    get isLeaf(){
        return this.left === null && this.right === null;
    }
}
export class BST<T> {
    private root: TreeNode<T> | null = null;
    constructor(
        val?: T
    ){
        if (val){
            this.append(val);
        }
    }
    append(val: T | T[]){
        if (Array.isArray(val)){
            for (const item of val){
                this.append(item);
            }
            return this.root;
        }
        const node = val instanceof TreeNode ? val : new TreeNode(val, null, null, null);
        if (!this.root){
            this.root = node;
            return this.root;
        }
        let cur:TreeNode<T> | null = this.root;
        let parent = this.root;
        while (cur){
            parent = cur;
            if (node.val > cur.val){
                cur = cur.right;
                continue;
            }
            cur = cur.left;
        }
        node.parent = parent;
        if (node.val > parent.val){
            parent.right = node;
        } else{
            parent.left = node;
        }
        return this.root;
    }
    findByVal(val:T): TreeNode<T> | null {
        let cur = this.root;
        while (cur){
            if (cur.val === val){
                return cur;
            }
            if (val > cur.val){
                cur = cur.right;
            } else {
                cur = cur.left;
            }
        }
        return cur;
    }
    del<E extends T>(val: E){
        const node = val instanceof TreeNode ? val : this.findByVal(val);
        if (node){
            if (node.isLeaf){
                if (node.parent && node.parent.left === node){
                    node.parent.left = null;
                } else {
                    node.parent && (node.parent.right = null);
                }
                return this.root;
            } else {
                if (node.left && node.right){
                    const successors = node.successors() as TreeNode<T>;
                    node.val = successors.val;
                    this.del(successors as T);
                    return this.root;
                } else if (node.left || node.right){
                    if (node.left){
                        if (node.parent?.right === node){
                            node.left.parent = node.parent;
                            node.parent.right = node.left;
                            return this.root;
                        }
                    } else {
                        if (node.parent?.right === node){
                            node.right && (node.right.parent = node.parent);
                            node.parent.right = node.right;
                            return this.root;
                        }
                    }
                }
            }
    }
    }
}