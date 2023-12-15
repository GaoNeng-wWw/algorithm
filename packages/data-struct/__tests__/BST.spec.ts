import { beforeEach,it,expect, describe } from "vitest";
import { BST } from "../BST";
let root: BST<number>;
beforeEach(()=>{
    root = new BST()
})

it('find', ()=>{
    expect(root.findByVal(123)).toBe(null);
})

it('add', ()=>{
    for (let i=100;i>0;i-=10){
        root.append(i);
    }
    for (let i=100;i>0;i-=10){
        expect(root.findByVal(i)?.val).toBe(i)
    }
})
describe('delete', ()=>{
    it('delete leaf', ()=>{
        root.append(1)
        root.append(2)
        root.del(2);
        expect(root.findByVal(2)).toBeNull();
        expect(root.findByVal(1)?.right).toBeNull()
    })
    it('only left',()=>{
        root.append(1)
        root.append(2)
        root.append(1.5)
        root.del(2);
        expect(root.findByVal(2)).toBeNull();
        expect(root.findByVal(1.5)?.parent).toBe(root.findByVal(1));
        expect(root.findByVal(1)?.right).toBe(root.findByVal(1.5));
    })
    it('only right', ()=>{
        root.append(1)
        root.append(2)
        root.append(2.5)
        root.del(2);
        expect(root.findByVal(2)).toBeNull();
        expect(root.findByVal(2.5)?.parent).toBe(root.findByVal(1));
        expect(root.findByVal(1)?.right).toBe(root.findByVal(2.5));
    })
    it('left and right', () => {
        const arr = [16,8,4,2,6,12,10,14,24,20,18,22,28,26,30]
        for (const item of arr){
            root.append(item);
        }
        const p = root.findByVal(24)?.parent;
        root.del(24)
        expect(root.findByVal(24)).toBeNull()
        expect(p?.right).toBe(root.findByVal(26))
    })
})

describe('successors', ()=>{
    it('left-skewed', ()=>{
        const data = [10,5,15,3,8,9,20]
        root.append(data);
        expect(root.findByVal(20)?.successors().val).toBe(10)
    })
    it('right-skewed', ()=>{
        const data = [10,20,30,40,50,60,70,80,90,100]
        root.append(data);
        expect(root.findByVal(10)?.successors().val).toBe(20)
    })
})
describe('pred', ()=>{
    it('left-skewed', ()=>{
        const data = [10,5,15,3,8,9,20]
        root.append(data);
        expect(root.findByVal(10)?.pred?.()?.val).toBe(9)
    })
    it('right-skewed', ()=>{
        const data = [10,5,15,3,8,9,20,7];
        root.append(data);
        expect(root.findByVal(9)?.pred?.()?.val).toBe(8)
    })
})

describe('traversal', ()=>{
    const data = [10,5,15,3,8,9,20,7];
    it('preorder', ()=>{
        root.append(data);
        const ans:number[] = [];
        root.findByVal(10)?.preorder((node) => {
            ans.push(node.val);
        })
        expect(ans).toStrictEqual([10,5,3,8,7,9,15,20]);
    })    
    it('inorder', ()=>{
        root.append(data);
        const ans:number[] = [];
        root.findByVal(10)?.inorder((node) => {
            ans.push(node.val);
        })
        expect(ans).toStrictEqual([3,5,7,8,9,10,15,20]);
    })
    it('postorder', ()=>{
        root.append(data);
        const ans:number[] = [];
        root.findByVal(10)?.postorder((node) => {
            ans.push(node.val);
        })
        expect(ans).toStrictEqual([3,7,9,8,5,20,15,10]);
    })
})