export default function addToArray(stat, val) {
    if (Array.isArray(stat)) {
        const returnStat = stat.slice();
        returnStat.push(val.value);
        return returnStat;
    }
    return stat;
}