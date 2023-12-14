import { expect, it } from "vitest";
import {deepClone} from "../deep-clone";

it('deep clone', ()=>{
    const obj = {
        a: 1,
        b: '',
        c: true,
        d: {
            a:1,
            b:2,
            c: false,
        },
        e: [
            true,
            false,
            1,
            ''
        ]
    }
    expect(Object.is(deepClone(obj), obj)).toBe(false);
})