import instantiateObject from "../componentfunctions/instantiateObject";
import "./CSS/Tile.css";
import ActionElement from "./functionalcomponents/ActionElement";
import Undertile from "./Undertile.js";
export default function Tile({ id }) {
    const stats = instantiateObject(id);
    const textures = stats.textures.val;
    const depthTextures = stats.depthTexture.val;
    const action = stats.action.val;
    const y = stats.y.val;
    const x = stats.x.val;
    const z = stats.z.val;
    const rotation = stats.rotation.val;
    const direction = stats.direction.val;
    const style = {
        "--x": x,
        "--y": y,
        "--z": 'calc(var(--isometric) * '+z+')',
        "--objectrotation": rotation,
        "--objectdirection": direction,
    };
    return (
        <div className="tile" style={style}>
            <ActionElement interactive={stats.interactive.val} action={action} id={id} />
            {textures/*textures.length > 0 ? createTextures(textures, id, action) : ""*/}
            <Undertile id={id} action={action} textures={depthTextures} height={z}></Undertile>
        </div>
    );
}