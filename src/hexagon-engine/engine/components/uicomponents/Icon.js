import createTextures from "../../componentfunctions/createTextures";
import instantiateObject from "../../componentfunctions/instantiateObject";
import getPosition from "../../componentfunctions/setPosition";
import ActionElement from "../functionalcomponents/ActionElement";

import './CSS/Icon.css';
export default function Icon({ id }) {
    const stats = instantiateObject(id);
    //const id = stats.id.val;
    const textures = stats.textures.val;
    const action = stats.action.val;
    const size = stats.size.val;
    const pos = stats.pos.val;
    const text = stats.text.val;
    const displayText = stats.displayText.val;
    const textpos = stats.textPos.val;
    const iconWidth = displayText && (textpos.includes("left") || textpos.includes("right")) ? size * 2.2 : size;
    const iconHeight = displayText &&(textpos.includes("top") || textpos.includes("bottom")) ? size * 2.2 : size;
    const shape = stats.shape.val;
    const style = Object.assign({
        "--iconsize": size+"px",
        width: iconWidth,
        heigth: iconHeight
    }, getPosition(pos,this));

    return (
        <div className={" icon "} style={style}>
            <ActionElement interactive={stats.interactive.val} shape={shape} action={action} id={id} />
            {textures/*.length > 0 ? createTextures(textures, id, action, shape) : ""*/}
            {displayText ? <span className={"icontext " + textpos} >{text.split("\n").map(t => <p>{t}</p>)}</span> : ""}

        </div>
    )
}