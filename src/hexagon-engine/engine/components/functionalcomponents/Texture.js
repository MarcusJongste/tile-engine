import { event } from '../../event/eventHandling';
import './CSS/Texture.css';
export default function Texture({ fileName, orientationoffset, orientationstep,path, animations, animated, animationNumber, defaultAnimation, animation, id, action }) {
    const imgUrl = "url(" + path + fileName + ")";
    const currAnimation = getAnimation(animation, defaultAnimation, animations);
    const { start, speed, max, top, repeat } = currAnimation !== null ? currAnimation : { start: 1, speed: 100, max: 1, top: 1, repeat: null };
    //convert speed (100%) to seconds based on each frame will every 50ms
    const s = speed === 0?0:((max * 0.05) / speed  );//0.5 ms
    const rep = repeat === null ? "infinite" : repeat;
    const style = {
        backgroundImage: imgUrl,
        "--animateEnd": max * 100 + "%",
        "--speed":"calc("+s+"s / var(--gamespeed))",
        backgroundSize: max * 100 + "% " + (animationNumber ? animationNumber : 1) * orientationstep *100+"%",
        "--top": top+1,
        "--step": orientationstep,
        "--orientationoffset": orientationoffset,
        animation: !animated ? "" :"animate var(--speed) steps(" + (max - 1) + ") -" + (s * start) + "s " + rep,
    }

    function animationEnd() {
        if (action.animationend !== undefined) { event.call({ id: id, e: "animationend", action: action.animationend }); }
    }
    function animationStart() {
        if (action.animationstart !== undefined) { event.call({ id: id, e: "animationstart", action: action.animationstart }); }
    }
    function getAnimation(a = null, d, amations) {
        if (a) {
            animationStart();
            return amations[a];
        } 
        if (d) {
            animationStart();
            return amations[d];
        }
        return null;
    }
    return (
        <div className={'texture'}>
            <div onAnimationEnd={animationEnd} className={'textureframe '} style={style}></div>
        </div>
    )
}
    