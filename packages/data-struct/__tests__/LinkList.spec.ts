import {it, expect} from 'vitest';
import { LinkList, copyLinkList } from ".."

it('append', ()=>{
    const linklist = new LinkList(1);
    for (let i=2;i<=10;i++){
        linklist.append(i);
    }
    for (let i=10;i>1;i--){
        expect(linklist.find(i).prev.val).toBe(i-1);
    }
    expect(linklist.find(1).prev).toBe(null);
})
it('delete', ()=>{
    const linklist = new LinkList(1);
    linklist.append(2);
    linklist.append(3);
    linklist.append(4);
    linklist.append(5);
    linklist.delete(
        linklist.find(5)
    );
    expect(linklist.find(5)).toBeNull();
    expect(linklist.find(4).next).toBeNull();
    linklist.append(5);
    expect(linklist.find(5)).not.toBeNull();
    expect(linklist.find(4).next).not.toBeNull();
    linklist.delete(
        linklist.find(3)
    );
    expect(linklist.find(3)).toBeNull();
    expect(linklist.find(2).next.val).toBe(4);
    expect(linklist.find(4).prev.val).toBe(2);
    linklist.delete(linklist.find(1))
    expect(linklist.find(2).prev).toBeNull();
    expect(linklist.find(2).next.val).toBe(4);
})
it('delete by val', ()=>{
    const linklist = new LinkList(1);
    linklist.append(2);
    linklist.append(3);
    linklist.append(4);
    linklist.append(5);
    linklist.deleteByVal(5);
    expect(linklist.find(5)).toBeNull();
    expect(linklist.find(4).next).toBeNull();
    linklist.append(5);
    expect(linklist.find(5)).not.toBeNull();
    expect(linklist.find(4).next).not.toBeNull();
    linklist.deleteByVal(
        3
    );
    expect(linklist.find(3)).toBeNull();
    expect(linklist.find(2).next.val).toBe(4);
    expect(linklist.find(4).prev.val).toBe(2);
    linklist.deleteByVal(1);
    expect(linklist.find(2).prev).toBeNull();
    expect(linklist.find(2).next.val).toBe(4);
})
it('copy', ()=>{
    const l1 = new LinkList(1);
    l1.append(2);
    l1.append(3);
    l1.append(4);
    l1.append(5);
    const l2 = copyLinkList(l1);
    expect(l2.find(2)).not.eq(l1.find(2));
    l2.deleteByVal(2)
    expect(l1.find(2)).not.toBeNull();
})
it('concat',()=>{
    const l1 = new LinkList('l1');
    const l2 = new LinkList('l2');
    l2.append('l2-1');

    l1.append(`l1-2`);
    l1.append(`l1-3`);
    l1.append(`l1-4`);
    l1.append(`l1-5`);
    expect(l2.getHead().concat(l1).next.val).toBe('l1')
    expect(l2.getTail().prev.val).toBe('l1-5');
})
