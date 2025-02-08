import gameproperties from "../blueprints/gameproperties";

export default function addKeyDown(caller, { keyCode, action }) {
    
    gameproperties._keyDowns[keyCode] = !gameproperties._keyDowns[keyCode] ? [] : gameproperties._keyDowns[keyCode];
    const existing = gameproperties._keyDowns[keyCode].filter(item => item.caller === caller.id)[0];
    if (existing) {
        existing.action.concat(action);
    } else {
        gameproperties._keyDowns[keyCode].push({ caller: caller.id, action: action });
    }
}