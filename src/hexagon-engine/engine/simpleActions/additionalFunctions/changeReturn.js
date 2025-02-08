export default function changeReturn(target, newValue,{f,params}) {
    return {
        target: target,
        value: {
            stat: 'ui',
            newValue: newValue,
            valueFunction: {
                f: f,
                params: params
            }
        },
    };
}