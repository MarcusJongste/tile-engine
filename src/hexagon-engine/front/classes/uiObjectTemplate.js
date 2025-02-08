import { createUi } from '../../engine/simpleActions/simpleActions';//hexagon-engine/engine/simpleActions/simpleActions
import { createAction } from "../generalfunctions/createFunctions";
import tileObjectTemplate from "./tileObjectTemplate";

export default class uiObjectTemplate extends tileObjectTemplate {
    constructor(name, stats = {}, type = 'ui') {
        super(name, stats, type);
    }
    addUi(obj) {
        if (!(obj instanceof uiObjectTemplate)) { throw new Error("Incorrect ui passed"); }
        const a = createAction("create_" + obj.name + "_" + this.name);
        a.addSimpleAction(createUi, { uiName: obj.name });
        return this.addAction(a,'oncreate');
    }
}