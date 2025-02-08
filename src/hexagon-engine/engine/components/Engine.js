import instantiateObject from "../componentfunctions/instantiateObject";
import "./CSS/positioning.css";
import "./CSS/depth.css";
import "./CSS/shapedrawing.css";
//import additional-code 

import './CSS/default.css';
import { id } from  '../generalfunctions/gameInit';
import createChildren from "../componentfunctions/createChildren";
import createTextures from "../componentfunctions/createTextures";
import levelconstants, { updatelevelconstant } from "../constants/levelconstant";
import cloneObj from "../generalfunctions/cloneObj";
import { level } from "../blueprints/blueprints";
import ActionElement from "./functionalcomponents/ActionElement";
import { fps } from "../event/engineTick";
//import levelconstants from "../constants/levelconstant";

export default function Engine({gameId=id }) {
    //start loading
    const stats = instantiateObject(gameId);//instantiate gameproperties

    const action = stats.action.val;
    const textures = stats.textures.val;
    const ui = stats.ui.val;
    const left = stats.left.val;
    const top = stats.top.val;
    const objects = stats.objects.val;

    const leveldetails = Object.keys(stats.levelconstants.val).length > 0 ? stats.levelconstants.val : cloneObj(level);

    if (leveldetails !== levelconstants) { updatelevelconstant(leveldetails); }
    //load level details
    const { size, space, isometric, rotation, zoom, gamespeed, tile, cameraoffset } = leveldetails;
    const { twidth, theight, rot, maprotation, shapedeviation } = getTileParams(tile, isometric, rotation);// size * 1.06 : size;
const x = stats.x.val;
    const y = stats.y.val;

    function getTileParams(shape,isometric,rotation) {
        switch (shape) {
            case 'hexagon':
                return {
                    twidth: 1 + (isometric * 0.06),
                    theight: 1 - (isometric * 0.37),
                    rot: reduceRotation(rotation, 60),
                    maprotation: 60,
                    shapedeviation:0.8667,
                }
            case 'square':
                return {
                    twidth:  1 + (isometric * 0.06),
                    theight:  1 - (isometric * 0.37),
                    rot: reduceRotation(rotation, 90),
                    maprotation: 90,
                    shapedeviation: 0.71,
                };
            default:
                throw new Error("missing shape ("+shape+")")
        }
    }
    // reduces/increases rotation to a 0>60
    function reduceRotation(rot,angle) {
        if (rot < 0) { return reduceRotation(rot + angle,angle) }
        return rot > angle ? reduceRotation(rot - angle,angle) : rot;
    }
    return (
        <div className={"game " + tile} style={{
            "--isometric": isometric,
            "--shapedeviation": shapedeviation,
            "--tilesize": size + "px",
            "--tilewidth":twidth,
            "--tileheight":theight,
            "--numrotation": rotation,
            "--rotation": rotation + "deg",
            "--tilerotation": rot + "deg",
            "--rowrotation": maprotation+"deg",
            "--gamespeed": gamespeed,
            "--space": space ? space + "px" :0+"px",
            "--zoom": zoom,
            "--camxoffset": cameraoffset.x+50+"%",
            "--camyoffset": cameraoffset.y + 50 + "%",
            "--zindex":0,
            left: left,
            top: top, 
        }}>
            <div className="uicontainer">{ui/*.length > 0 ? createChildren(ui, id) : ""*/}</div>
            <div className="objectcontainer" style={{
                "--x": x,
                "--y": y,
                "--z": 0,
                "--height": "var(--tilesize)",
                "--width": "var(--tilesize)"
            }}>{objects}
            </div>
            <div style={{position:'absolute', width: '100px', height: '100px', right:'0px',zIndex:10000,pointerEvents:'none' }} >{fps}fps</div>
            {textures/*.length > 0 ? createTextures(textures, id, action) : ""*/}
        </div>
    )
}