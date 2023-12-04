import {BinarySearchTree, TreeNode} from '../index';

describe('TreeNode', ()=>{
    it('create null', ()=>{
        expect(new TreeNode(null, null, null).left).toBeNull()
        expect(new TreeNode(null, new TreeNode(null), null).right).toBeNull()
        expect(new TreeNode(null, null, new TreeNode(null)).val).toBeNull()
    })
})

describe('BST', () =>{
    let tree: BinarySearchTree<number>;
    const valide = (root: BinarySearchTree<number>) => {
        let val;
        const visit = (root: TreeNode<number> | null)=>{
            if (root === null){
                return true;
            }
            let l = visit(root.left)
            if (root.val <= val ){
                return false;
            }
            val = root.val;
            let r = visit(root.right);
            return l&r;
        }
        return visit(root.root);
    }
    beforeEach(()=>{
        tree = new BinarySearchTree()
    })
    it('add', ()=>{
        const arr = [
            8,4,13,2,6,10,1,3,5,7,9,12,11
        ];
        arr.forEach(v => tree.add(v))
        expect(tree.root.val).toBe(8)
        expect(tree.root.left.right.val).toBe(6);
        expect(tree.root.left.right.parent.val).toBe(4);
        expect(tree.root.left.right.parent.right.val).toBe(tree.root.left.right.val);
        expect(tree.root.left.right.parent.right).toBe(tree.root.left.right);
    })
    it('add node', ()=>{
        const arr = [
            8,4,13,2,6,10,1,3,5,7,9,12,11
        ].map((v) => new TreeNode(v));
        arr.forEach(v => tree.add(v))
        expect(tree.root.val).toBe(8)
        expect(tree.root.left.right.val).toBe(6);
        expect(tree.root.left.right.parent.val).toBe(4);
        expect(tree.root.left.right.parent.right.val).toBe(tree.root.left.right.val);
        expect(tree.root.left.right.parent.right).toBe(tree.root.left.right);
    })
    describe('predecessor', ()=>{
        it('normal',()=>{
            const arr = [
                6,1,7,5,9,3,8,10,2,4
            ];
            arr.forEach(v => tree.add(v))
            expect(tree.root.left.right.predecessor().val).toBe(4)
        })
        it('left skewed', ()=>{
            const arr = [99,80,70,60,50,40,30,20,10];
            arr.forEach(v => tree.add(v))
            expect(
                tree.find(10).predecessor()
            ).toBeNull()
            expect(
                tree.find(20).predecessor().val
            ).toBe(10)
        })
        it('right skewed', ()=>{
            const arr = [10,20,30,40,50,60,70,80,90]
            arr.forEach(v => tree.add(v))
            expect(
                tree.find(90).predecessor().val
            ).toBe(80)
            expect(
                tree.find(10).predecessor()
            ).toBeNull()
        })
    })
    describe('successor', ()=>{
        it('normal', ()=>{
            const arr = [
                6,1,7,5,9,3,8,10,2,4
            ];
            arr.forEach(v => tree.add(v))
            expect(tree.root.left.right.successor().val).toBe(6)
        })
        it('left skewed', ()=>{
            const arr = [99,80,70,60,50,40,30,20,10];
            arr.forEach(v => tree.add(v))
            expect(
                tree.find(10).successor().val
            ).toBe(20)
        })
        it('right skewed', ()=>{
            const arr = [10,20,30,40,50,60,70,80,90]
            arr.forEach(v => tree.add(v))
            expect(
                tree.find(90).successor()
            ).toBeNull()
            expect(
                tree.find(10).successor().val
            ).toBe(20)
        })
    })
    it('find', ()=>{
        const arr = [
            6,1,7,5,9,3,8,10,2,4
        ];
        arr.forEach(v => tree.add(v))
        arr.forEach(v => expect(tree.find(v).val).toBe(v));
    })
    describe('delete', () => {
        it('have left and right',()=>{
            const arr = [
                6,1,7,5,9,3,8,10,2,4
            ];
            arr.forEach(v => tree.add(v))
            tree.delete(
                tree.find(9)
            );
            expect(
                valide(tree)
            ).toBeTruthy()
            expect(tree.find(100)).toBeNull()
            expect(tree.find(9)).toBeNull()
            expect(tree.find(10)).not.toBeNull()
            expect(tree.find(8)).not.toBeNull()
        })
        it('leaf', ()=>{
            const arr = [
                6,1,7,5,9,3,8,10,2,4
            ];
            arr.forEach(v => tree.add(v))
            tree.delete(
                tree.find(10)
            );
            tree.delete(
                tree.find(8)
            );
            expect(
                valide(tree)
            ).toBeTruthy()
            expect(tree.find(10)).toBeNull();
            expect(tree.find(8)).toBeNull();
            expect(tree.find(9).left).toBeNull();
            expect(tree.find(9).right).toBeNull();
        })
        it('have left but not right', () => {
            const arr = [
                6,1,7,5,9,3,8,10,2,4,0.5,-1
            ];
            arr.forEach(v => tree.add(v))
            expect(tree.find(0.5)).not.toBeNull();
            expect(tree.find(0.5).parent.val).toBe(1);
            expect(tree.delete(tree.find(0.5))).not.toBeNull();
            expect(
                valide(tree)
            ).toBeTruthy()
            expect(tree.find(0.5)).toBeNull();
            expect(tree.find(-1)).not.toBeNull();
            expect(tree.find(-1).parent.val).toBe(1);
        })
        it('have right but not left', () => {
            const arr = [
                6,1,7,5,9,3,8,10,2,4,0.5,-1,11,12
            ];
            arr.forEach(v => tree.add(v))
            expect(
                tree.delete(tree.find(11))
            ).toBeTruthy()
            expect(valide(tree))
        })
    })
})