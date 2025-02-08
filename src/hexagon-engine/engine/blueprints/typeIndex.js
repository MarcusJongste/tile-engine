import { tiles, gameobjects, userinterfaces, levels, actions, textures, paths, simpleactions, texts } from "../blueprints/templates";
import gameproperties from "../blueprints/gameproperties";
//blueprints
import { icon, tile, gameobject, userinterface, level, engine, action, texture, path, simpleAction, text } from "../blueprints/blueprints";
const typeIndex = {
    tile: {
        templates:tiles,
        blueprint: tile,
    },
    simpleaction: {
        templates: simpleactions,
        blueprint: simpleAction,
    },
    gameobject: {
        templates: gameobjects,
        blueprint: gameobject,
    },
    text: {
        templates: texts,
        blueprint: text,
    },
    icon: {
        templates: userinterfaces,
        blueprint: icon,
    },
    level: {
        templates:levels,
        blueprint: level,
    },
    ui: {
        templates: userinterfaces,
        blueprint: userinterface,
    },
    action: {
        templates: actions,
        blueprint: action,
    },
    game: {
        templates: { "game": gameproperties },
        blueprint:engine,
    },
    texture: {
        templates: textures,
        blueprint: texture,
    },
    path: {
        templates: paths,
        blueprint: path
    }
}
export default typeIndex;