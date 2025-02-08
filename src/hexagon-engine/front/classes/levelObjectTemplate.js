import baseTemplateObject from "./baseTemplateObject";

export default class levelObjectTemplate extends baseTemplateObject {
    constructor(name, layout = [], stats) {
        super(name, stats, 'level');
        this.setLayout(layout);
    }

    setLayout(layout) {
        if (Array.isArray(layout)) {
            return this.setStat('layout', layout.map(y => y.map(x => typeof x === 'object' && x !== null ? x.name : x)));
        }
        throw new Error("layout needs to be an array");
    }

    addObject(obj, pos) {
        pos = typeof pos === 'object' ? pos : {};
        const defaultPos = {
            x: pos.x ===undefined?0:pos.x,
            y: pos.y ===undefined?0:pos.y,
            z: pos.z ===undefined?0:pos.z,
            rotation: pos.rotation === undefined ? 0 : pos.rotation,
        };

        return this.setStat('_objects', { name: obj.name, stats: defaultPos });
    }
}