import  createUniqueObject  from "../componentfunctions/createUniqueObject";
export default function createUi(caller, { uiName }) {//obj is parent
    const ui = createUniqueObject(uiName, "ui");
    
    return [{
        target: { id: caller.id },
        value: [{
            stat: "_ui",
            newValue: ui,
        }, {
            stat: "uiOpen",
            newValue:ui.id,
        }]
    }];
}