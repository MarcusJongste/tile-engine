import createUniqueObject from "../componentfunctions/createUniqueObject";
export default function createGameObject(caller, { templateName, stats = {} }) {//obj is parent
    const gameobj = createUniqueObject(templateName, "gameobject", Object.assign({ x: caller.x + 0.5, y: caller.y + 0.5,z:caller.z+0.2 }, stats));
    return [{
        target: { name:"game" },
        value: {
            stat: "_objects",
            newValue: gameobj,
        },
    }];
}