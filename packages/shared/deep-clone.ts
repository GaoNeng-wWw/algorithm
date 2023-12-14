export const deepClone = <T extends Record<string,any> | any[]>(obj:T):T => {
    if (Array.isArray(obj)){
        let _ = [];
        for (let i=0;i<obj.length;i++){
            _.push(deepClone(obj[i]));
        }
        return _ as T;
    } else if (typeof obj ==='object') {
        let _ = {};
        for (const key of Object.keys(obj as Object)){
            if (obj[key] === null){
                (_ as Record<string,any>)[key] = null;
                continue;
            }
            (_ as Record<string,any>)[key] = deepClone(obj[key]);
        }
        return _ as T
    }
    return obj;
}
