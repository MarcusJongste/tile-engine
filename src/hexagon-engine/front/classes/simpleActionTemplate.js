import baseTemplateObject from "./baseTemplateObject";

export default class simpleActionTemplate extends baseTemplateObject {
    constructor(name, stats = {}, type = 'simpleaction') {
        super(name, stats, type);
    }
    addTargetModifier(type, params) {
        return this.setModifier('target', type, params);
    }
    addModifier(type, params) {
        return this.setModifier('params', type, params);
    }
    setModifier(t, type, params) {
        const modifiers = this.getStat('modifiers');
        modifiers[t].push(Object.assign({ type: type, }, params));
        return this.setStat('modifiers', modifiers);
    }
}