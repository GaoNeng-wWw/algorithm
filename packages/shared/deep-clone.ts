const deepClone = <T>(obj:T):T => {
    if (Array.isArray(obj)){
        let _ = [];
        for (let i=0;i<obj.length;i++){
            _.push(deepClone(obj[i]));
        }
    } else if (typeof obj ==='object') {
        let _ = {};
        for (const key of Object.keys(obj)){
            _[key] = deepClone(key);
        }
        return _ as T
    }
    return obj;
}

export default deepClone;