
import Icon from "../components/uicomponents/Icon";
import Text from "../components/uicomponents/Text";
import GameObject from "../components/GameObject";
import UserInterface from "../components/UserInterface";
import Tile from "../components/Tile";

export default function createChildren(children) {
    return children.map((child, i) => createChild(child,i));
}
function createChild(obj, i) {
    switch (obj._type) {
        case 'text':
            return <Text key={obj.name + "_" + i} id={obj.id}></Text>;
        case 'icon':
            return <Icon key={obj.name + "_" + i} id={obj.id}></Icon>;
        case 'gameobject':
            return <GameObject key={obj.name + "_" + i} id={obj.id }></GameObject>
        case 'ui':
            return <UserInterface key={obj.name + "_" + i} id={obj.id}></UserInterface>
        case 'tile':
            return <Tile key={obj.name + "_" + i} id={obj.id}></Tile>

        default:
            console.log("unknown type ");// throw new Error("cannot create child of unknown type {" + obj._type + ")");
    }
}