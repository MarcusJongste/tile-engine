import instantiateObject from "../componentfunctions/instantiateObject";
import './CSS/UserInterface.css';
import getPosition from "../componentfunctions/setPosition";
export default function UserInterface({id}) {
    const stats = instantiateObject(id);

    const pos = stats.pos.val;
    const ui = stats.ui.val;
    const textures = stats.textures.val;
    const width = stats._width.val;
    const height = stats._height.val;
    const x = stats.x.val;
    const y = stats.y.val;
    const style = Object.assign({
        width: width === null? "100%":width,
        height: height === null? "100%":height,
    }, getPosition( pos,{x:x,y:y}));
    return (
        <div className={"ui "} style={style }>
            {ui/*.length > 0 ? createChildren(ui) : ""*/}
            {textures}
        </div>
    )
}