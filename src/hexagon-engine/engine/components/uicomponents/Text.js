import instantiateObject from "../../componentfunctions/instantiateObject";
import getPosition from "../../componentfunctions/setPosition";

export default function Text({ id }) {
    const stats = instantiateObject(id);

    const pos = stats.pos.val;
    const text = stats.text.val;
    const style = getPosition(pos, this);
    return <div style={style }>
        {text.split("\n").map(t => <p>{t}</p>) }
    </div>
}