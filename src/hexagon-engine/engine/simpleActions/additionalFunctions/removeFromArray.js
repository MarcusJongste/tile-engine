export default function removeFromArray(stat, val) {
    if (Array.isArray(stat)) {
        const returnVal = stat.slice();
        for (let i = returnVal.length - 1; i > -1; i--) {
            if (val.stat) {//in case it's an object
                if (returnVal[i][val.stat]) {
                    if (returnVal[i][val.stat] === val.value) {
                        returnVal.splice(i, 1);
                    }
                }
            } else {//in case it's an array with values
                if (returnVal[i] === val.value) {
                    returnVal.splice(i, 1);
                }
            }
        }
        return returnVal;
    }
    return stat;
}