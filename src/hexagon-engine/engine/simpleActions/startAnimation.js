import { playerEvents } from "../event/eventHandling";

export default function startAnimation(caller, { animation, texture,eventType }) {

    //set new animation
    let cont = true;
    const textures = caller._textures.map(t => {
        if (t.name === texture) {
            //check if current animation is unbreakable
            const unbreakable = t.animation && t.repeat !==null ? t.animations[t.animation].unbreakable : false;
            if (unbreakable && playerEvents.includes(eventType)) { cont = false; console.log("unbreakable"); }
            t.animation = animation ? animation : t.defaultAnimation;
        }
        return t;
    });
    return cont?[{
        target: { id: caller.id },
        value: {
            stat: "_textures",
            newValue: textures,
        }
    },] : [{continue:cont}];
}