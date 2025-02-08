import baseTemplateObject from "./baseTemplateObject";

export default class pathObjectTemplate extends baseTemplateObject{
    constructor(name) {
        super(name, {}, 'path');
        return this;
    }
    addStop(x, y, z) {
        this.setStat('coords', { x: x, y: y, z: z } );
        return this;
    }
}