import actionObjectTemplate from "../classes/actionObjectTemplate";
import levelObjectTemplate from "../classes/levelObjectTemplate";
import pathObjectTemplate from "../classes/pathObjectTemplate";
import templateObject from "../classes/templateObject";
import textureObjectTemplate from "../classes/textureObjectTemplate";
import tileObjectTemplate from "../classes/tileObjectTemplate";
import uiObjectTemplate from "../classes/uiObjectTemplate";

export function createGameobject(name, stats) {
    return new tileObjectTemplate(name, stats, "gameobject");
    //adds a new gameobject to gameobjects
}
export function createPath(name) {
    return new pathObjectTemplate(name);
}
export function createTile(name, stats) {
    return new tileObjectTemplate(name, stats);
    //adds a new tile to tiles
}
export function createLevel(name, layout,stats) {
    return new levelObjectTemplate(name, layout,stats)
}
export function createAction(name) {
    return new actionObjectTemplate(name);
    //adds to a function a custom action
}

export function createUserInterface(name, stats) {
    return new uiObjectTemplate(name, stats, "ui");
}
export function createIcon(name, stats) {
    return new uiObjectTemplate(name, stats, "icon");
}
export function createText(name, stats) {
    return new uiObjectTemplate(name, stats, "text");
}
export function createTexture(name, stats) {
    return new textureObjectTemplate(name, stats);
}