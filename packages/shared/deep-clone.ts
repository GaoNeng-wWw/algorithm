const deepClone = <T>(obj:T):T => {
    if (Array.isArray(obj)){
        let _ = [];
        for (let i=0;i<obj.length;i++){
            _.push(deepClone(obj[i]));
        }
        return _ as T;
    } else if (typeof obj ==='object') {
        let _ = {};
        for (const key of Object.keys(obj)){
            _[key] = deepClone(obj[key]);
        }
        return _ as T
    }
    return obj;
}

export default deepClone;