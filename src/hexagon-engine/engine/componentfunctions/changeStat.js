export default function changeStat(e) {//needs work needs object from object storage as well

    if (this[e.stat] !== undefined) {
        this[e.stat].f.call(null, e.newValue);
        return e.newValue;
    }
    return null;
}
