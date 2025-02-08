import baseTemplateObject from "./baseTemplateObject";
import simpleActionTemplate from "./simpleActionTemplate";

export default class actionObjectTemplate extends baseTemplateObject {
    constructor(name, stats = {}, type = 'action') {
        super(name, stats, type);
    }
    addSimpleAction(action, params = {}, target = { name: 'caller' }) {
        const name = this.getStat('name');
        const actions = this.getStat('actions');
        const simpleAction = typeof action === 'function' ? this.createSimpleAction(name+"_simpleAction_"+actions.length, action, params, target) : action;
        this.setStat("actions", simpleAction.name);
        return simpleAction;
    }
    createSimpleAction(name,f, params, target) {
        return new simpleActionTemplate(name, { f: f, params: params, target: target });
    }
}