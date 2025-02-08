import baseTemplateObject from "./baseTemplateObject";

export default class textureObjectTemplate extends baseTemplateObject {
    constructor(name, stats = {},type='texture') {
        super(name, stats, type);
    }
    setTexture(fileName, src = "textures") {
        return this.setStat('fileName', fileName).setStat('path', './' + src + '/');
    }
    setStep(step, offset = null) {
        if (offset !== null) { this.setStat('orientationoffset', offset); }
        return this.setStat('orientationstep', step);
    }
    setAnimation(name, frames, top = this.animationNumber + 1, repeat = null, unbreakable = false,start = 0, speed = 1  ) {
        if (this.getStat('defaultAnimation') === null) { this.setStat('defaultAnimation', name); }//set as default animation if none exist
        if (this.getStat('animated') === false && speed !== 0) { this.setStat('animated', true); }//set as animated as true if false
        const totalAnimation = typeof top === 'object' ? this.animationNumber + Object.keys(top).length : this.animationNumber + 1;
        this.setStat('animationNumber', totalAnimation);//add to animationNumber
        return this.setStat("animations", {
            [name]: {
                name:name,
                start: start,
                top: top,
                max: frames,
                speed: speed,
                unbreakable: unbreakable,
                repeat: repeat
            }
        });
    }
    setDefaultAnimation(animationName) {
        if (!this.animations[animationName]) { throw new Error("Cannot set default animation when animation(" + animationName + ") does not exist."); }
        return this.setStat('defaultAnimation', animationName);
    }
}