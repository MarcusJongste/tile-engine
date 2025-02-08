export const basic = {
    id: null,
    action: {},
    _textures: [],
    textures: [],
    direction: 0,//deg where the object orientated
    rotation:0,
    interactive: null,
    _unique: false,
    pos:"",
    relation_id: null,//which stats are dependent on who(to be configured)
};
export const simpleAction = {
    _type: 'simpleaction',
    f: null,
    params: {},
    target: null,
    modifiers: {
        target: [], params: []
    }
}
export const tile = {
    _type: 'tile',
    x: null,
    y: null,
    z: 0.5,
    height: 0.5,
    _depthTexture: [],
    depthTexture: [],
    direction: 0,//deg where the object is going
    rotation: 0,
    orientation: null,
};
export const gameobject = {
    _type: 'gameobject',
    targetDestination: null,
    _objects: [],
    moving: false,
    width: 0.01,
    height: 0.01,
    x: null,
    y: null,
    z: 0,
    flying: false,
    gravity: 0,
    gravityAffected: false,
    falling: false,
    outofbounds:false,
    ground:0,
    rotation: 0,
    orientation: null,
    direction: 0,//deg where the object is going
    centerpoint: 1,//percentage of height
};
export const userinterface = {
    _type: 'ui',
    pos: "topleft",
    _ui: [],
    ui: [],
    uiOpen:[],
    x: null,
    y: null,
    _width: null,
    _height:null,
};
export const level = {
    _type: 'level',
    size: 50,
    space: 0,
    isometric: 1,
    rotation: 0,
    offRow: 1,
    zoom: 0.5,
    zigzag: true,
    animate: true,
    cameraFocus: null,
    cameraLevelEdge: false,
    gamespeed: 1,
    _gamespeed: 1,
    layout: [],
    _objects:[],
    cameraoffset: { x: 0, y: 0 },
    pause: false,
    tile: 'square',
    gravity: 0.98,//realistic ;)
};
export const engine = {
    _type: 'game',
    left:0,
    top: 0,
    x: 12,
    y:6,
    startLevel: "",
    _objects: [],
    objects: [],
    _ui: [],
    ui:[],
    levelconstants: {},
};
export const text = {
    _type: 'text',
    text: "",
    pos: "",
}
export const icon = {
    _type: 'icon',
    text: "",
    displayText: false,
    pos:"",
    size: 40,
    textPos: "right",
    shape:'circleshape',
    _parentId: null,
    _unique:true,
};
export const action = {
    _type: 'action',
    actions:[],
};
export const texture = {
    _type: 'texture',
    url: "",
    path: "./textures/",
    animated: false,
    animation: null,
    defaultAnimation:null,
    animationNumber: 0,
    orientationstep: 1,//for each animation how many steps there all
    orientationoffset:0,
    animations: {},
    rotateTexture:false,
}
export const phase = {
    _type: 'phase',
    action: [],
    enabledObjects :[],
}
export const path = {
    _type: 'path',
    coords: [],
    temporary:false,
}
