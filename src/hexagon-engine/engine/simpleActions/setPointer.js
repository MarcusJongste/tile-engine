import cloneObj from "../generalfunctions/cloneObj";

export default function setPointer(caller, { pointer = true }) {
    //validate pointer options when I make pointer options...
    return [{
        target: { id: caller.id },
        value: {
            stat: "interactive",
            newValue: pointer,
        }
    },];
}