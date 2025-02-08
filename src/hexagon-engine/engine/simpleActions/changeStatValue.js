export default function changeStatValue(obj, { stat, type, value }) {
    switch (type) {
        case "add":
            const addedValue = Array.isArray(obj[stat]) ? obj[stat].slice().concat(value) : obj[stat] + value;
            return [{ target: { id:obj.id}, value: { stat: stat, newValue: addedValue } }];
        case "subtract":
            const subtractedValue = Array.isArray(obj[stat]) ? obj[stat].filter(item => item !== value) : obj[stat] - value;
            return [{ target: { id: obj.id }, value: { stat: stat, newValue: subtractedValue } }];
        case "overwrite":
            return [{ target: { id: obj.id }, value: { stat: stat, newValue: value } }];
        default:
            throw new Error("incorrect type for changeStat (" + type + ")");
    }
}