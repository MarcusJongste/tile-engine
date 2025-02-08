import baseTemplateObject from "./baseTemplateObject";

export default class tileObjectTemplate extends baseTemplateObject {
    constructor(name, stats = {}, type = 'tile') {
        super(name, stats, type);
        this.setStat("z", this.getStat("height"));
    }

    addTexture(texture) {
        return this.addReference("_textures", texture);
    }
    addDepthTexture(texture) {
        return this.addReference("_depthTexture", texture);
    }
    
}