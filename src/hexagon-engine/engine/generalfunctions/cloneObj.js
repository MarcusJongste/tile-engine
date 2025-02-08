
export default function cloneObj(obj = null) {
    if (obj !== null) {
        if (typeof obj === 'object') {
            if (Array.isArray(obj)) { return cloneArray(obj); }
            const newObj = {};
            Object.keys(obj).forEach(k => {
                if (obj[k] != null && typeof obj[k] === 'object') {
                    newObj[k] = Array.isArray(obj[k]) ? cloneArray(obj[k]) : cloneObj(obj[k]);
                } else {
                    newObj[k] = obj[k];
                }
            });
            return newObj;
        }
        return obj;
    } else {
        return null;
    }
}

function cloneArray(arr) {
    return arr.length !== 0?arr.map(a => typeof a === 'object' ? cloneObj(a) : a):[];
}