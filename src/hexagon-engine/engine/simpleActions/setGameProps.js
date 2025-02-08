import cloneObj from "../generalfunctions/cloneObj";

export default function setGameProps(caller, params) {
    return [{
        target: { name: "game" },
        value: {
            stat: 'levelconstants',
            newValue: cloneObj(params)
        },
    },];
}
