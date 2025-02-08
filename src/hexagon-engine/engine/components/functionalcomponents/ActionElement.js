import "./CSS/ActionElement.css";
import {  mouseEvents } from "../../event/eventHandling"
import mouseEffects from "../../componentfunctions/mouseeffects";
export default function ActionElement({ interactive, id }) {
    const mouseeffects = mouseEffects(interactive);
    const pointerEvent = !interactive ? "none" : "auto";
    return <div className={"actionelement " + mouseeffects} style={{}}
        onMouseDown={mouseEvents.bind({ id: id, e:"click"})}
        onMouseUp={mouseEvents.bind({ id: id, e:"mouseup"})}
        onMouseLeave = {mouseEvents.bind({ id: id,e:"mouseleave"  })}
        onMouseOver = { mouseEvents.bind({ id: id,e:"mouseover" })} 
        onWheel = { mouseEvents.bind({ id: id,e:"mousewheel" })} >
    </div>
}