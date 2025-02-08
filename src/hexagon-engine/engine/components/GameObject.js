import createChildren from "../componentfunctions/createChildren";
import instantiateObject from "../componentfunctions/instantiateObject";
import ActionElement from "./functionalcomponents/ActionElement";
import "./CSS/GameObject.css";
import createTextures from "../componentfunctions/createTextures";

export default function GameObject({ id }) {
    const stats = instantiateObject(id);
    //const id = stats.id.val;
    const textures = stats.textures.val;
    const action = stats.action.val;

    const width = stats.width.val;
    const height = stats.height.val;
    //const children = stats._children.val;
    const x = stats.x.val;
    const y = stats.y.val;
    const z = stats.z.val;
    const centerpoint = stats.centerpoint.val;
    const rotation = stats.rotation.val;
    const direction = stats.direction.val;//which direction am I going
    const style = {
        "--width": width,
        "--height": height,
        "--x": x,
        "--y": y,
        "--z": z,
        "--cp": centerpoint,
        "--objectrotation":rotation,
        "--objectdirection":direction,
    };

    return (
        <div className={"gameobject "} style={style}>
            {/*ui.length > 0 ? createChildren(ui, id) : ""*/}
            {/*children.length > 0 ? createChildren(children, id) : ""*/}
            <ActionElement interactive={stats.interactive.val} action={action} id={id} />
            {textures/*.length > 0 ? createTextures(textures, id, action) : ""*/}
        </div>
    )
}