import {LinkList, LinkListNode} from '../lib/data-struct/LinkList';
describe('LinkListNode', ()=>{
    it('create', ()=>{
        const node = new LinkListNode(1,new LinkListNode(2),null);
        expect(node).not.toBeUndefined();
        expect(node.val).toBe(1);
    })
    it('list', () => {
        const node = new LinkListNode(
            0,
            new LinkListNode(1)
        )
        expect(node.next).toBeDefined();
        expect(node.next.next).toBeDefined();
        expect(node.next.next?.next).toBeUndefined()
    })
})
describe('LinkList', ()=>{
    let list: LinkList<number>;
    beforeEach(()=>{
        list = new LinkList(0);
    })
    it('append', ()=>{
        expect(list.head.next).toBeNull();
        for (let i=1;i<=10;i++){
            list.append(i);
        }
        expect(list.head.next.next).toBeDefined();
    })
    it('toString', ()=>{
        for (let i=1;i<=10;i++){
            list.append(i);
        }
        expect(
            list.toString()
        ).toBe('head->0->1->2->3->4->5->6->7->8->9->10<-tail')
    })
    it('find', ()=>{
        for (let i=1;i<=10;i++){
            list.append(i);
        }
        expect(
            list.toString()
        ).toBe('head->0->1->2->3->4->5->6->7->8->9->10<-tail')
        expect(
            list.find(1).val
        ).toBe(1)
        expect(
            list.find(10).val
        ).toBe(10)
        expect(
            list.find(11)
        ).toBe(null)
        expect(
            list.find(-1)
        ).toBe(null)
    })
    it('insert', ()=>{
        for (let i=1;i<=10;i++){
            list.append(i);
        }
        expect(
            list.toString()
        ).toBe('head->0->1->2->3->4->5->6->7->8->9->10<-tail')
    })
    it('insert after', ()=>{
        for (let i=1;i<=10;i++){
            list.append(i);
        }
        const node = list.find(1);
        list.insertAfter(new LinkListNode(1.5),node)
        expect(
            list.toString()
        ).toBe('head->0->1->1.5->2->3->4->5->6->7->8->9->10<-tail')
    })
    it('insert before', ()=>{
        for (let i=1;i<=10;i++){
            list.append(i);
        }
        const node = list.find(1);
        list.insertBefore(new LinkListNode(0.5),node)
        expect(
            list.toString()
        ).toBe('head->0->0.5->1->2->3->4->5->6->7->8->9->10<-tail')
    })
    describe('delete', ()=>{
        it('keep', ()=>{
            for (let i=1;i<=10;i++){
                list.append(i);
            }
            let node = list.find(1);
            list.delete(node);
            expect(
                list.toString()
            ).toBe('head->0->2->3->4->5->6->7->8->9->10<-tail')
            node = list.find(10);
            list.delete(node);
            expect(
                list.toString()
            ).toBe('head->0->2->3->4->5->6->7->8->9<-tail')
        })
        it('not keep', ()=>{
            for (let i=1;i<=10;i++){
                list.append(i);
            }
            let node = list.find(1);
            list.delete(node, false);
            expect(
                list.toString()
            ).toBe('head->0<-tail')
        })
        it('not keep and delete last', () => {
            for (let i=1;i<=10;i++){
                list.append(i);
            }
            const node = list.find(10);
            list.delete(node, false);
            expect(
                list.toString()
            ).toBe('head->0->1->2->3->4->5->6->7->8->9<-tail')
        })
    })
    it('visitor', () => {
        const fn = jest.fn();
        for (let i=1;i<=10;i++){
            list.append(i);
        }
        list.visitor(fn);
        expect(fn).toHaveBeenCalledTimes(11)
    })
})