// here will be imported 3 functions which will generate gameobjects and tiles in their respective constants
// here will be imported 
import directionMove from './hexagon-engine/engine/simpleActions/directionMove';
import move from './hexagon-engine/engine/simpleActions/move';
import { changeStatValue, closeUi, createGameObject, createUi, addTexture, endMove, message, addAction, removeAction, pathMove, pauseMove, setCameraFocus, setGameProps, setLevel, startAnimation, validateStat, setPointer, removeTexture, triggerAction, startPath } from './hexagon-engine/engine/simpleActions/simpleActions';
import toggleFlying from './hexagon-engine/engine/simpleActions/toggleFlying';
import { bottomcentre, bottomleft, bottomright, centre, topcentre, topleft, topright } from './hexagon-engine/front/constants/positions';
import { createAction, createGameobject, createIcon, createLevel, createPath, createText, createTexture, createTile, createUserInterface } from './hexagon-engine/front/generalfunctions/createFunctions';


//createTextures


const whiteTexture = createTexture('white', {rotateTexture:true}).setTexture('white_floor.jpg');
const blackTexture = createTexture('black', { rotateTexture: true }).setTexture('black_floor.jpg');
const underBlackTexture = createTexture('underBlackTexture', { rotateTexture: false }).setTexture('underblack.webp');
const underWhiteTexture = createTexture('underWhiteTexture', { rotateTexture: false }).setTexture('underwhite.webp');

const markTexture = createTexture('markTexture', { rotateTexture: false }).setTexture('mark.webp');
const markedTexture = createTexture('markedTexture', { rotateTexture: false }).setTexture('marked.webp');

const rotateRightTexture = createTexture('rotRight',).setTexture('rotateRight.png', 'icons');
const rotateLeftTexture = createTexture('rotLeft',).setTexture('rotateLeft.png', 'icons');

const messageUiBg = createTexture('messageUiBg',).setTexture('messageUi2.png');
const closeMessageUiIcon = createTexture('closeMessageUiIcon',).setTexture('closeIcon.jpg', 'icons');

const foxTexture = createTexture('fox').setTexture('fox.png').setStep(4,-135);
const columnTexture = createTexture('columnT').setTexture('column.png');//step is how many degrees
const wallTexture = createTexture('wallT').setTexture('wall.webp').setStep(20,0);//step is how many degrees

//setAnimations
foxTexture.setAnimation('default', 10, 0, null, false, 0, 0.7);
//columnTexture.setAnimation('default', 1, 0, null, false, 0, 0);
markTexture.setAnimation('default', 20, 0, null, false, 0, 0.7);
markedTexture.setAnimation('default', 20, 0, null, false, 0, 0.7);

//create Tile types
const white = createTile("whiteTile", { height: 1 });
const quartarwhite = createTile("quartarwhite", { height: 1.5 });
const mediumwhite = createTile("mediumwhite", { height: 2 });
const threequartarwhite = createTile("3quartarwhite", { height: 2.5 });
const mediumblack = createTile("mediumblack", { height: 2 });
const black = createTile("blackTile", { height: 1 });
const highblack = createTile("highblack", {height:3});
const highwhite = createTile("highwhite", {height:3});

//create paths

//create gameobjects
const fox = createGameobject("fox", {  width: 0.45, height: 0.8,centerpoint:0.9,speed:5 });
const column = createGameobject("column", { width: 0.5, height: 3, centerpoint: 1 });
const wall = createGameobject("wall", { width: 1.8, height: 2.8, centerpoint: 1 });
const mark1 = createGameobject("mark1", { width: 0.3, height: 0.5, centerpoint: 0.8 });
const markrotate = createGameobject("markrotate", { width: 0.3, height: 0.5, centerpoint: 0.8 });
const markjump = createGameobject("markjump", { width: 0.3, height: 0.5, centerpoint: 0.8 });
const markother = createGameobject("markother", { width: 0.3, height: 0.5, centerpoint: 0.8 });
//create ui+ Icons
const overheadUi = createUserInterface("overheadUi", { pos: topcentre, _height: 50 });
const rotateLeft = createIcon("rotateleft", { pos: topleft, });
const rotateRight = createIcon("rotateRight", { pos: topright, });
const closeUiIcon = createIcon("closeUi", { pos: bottomright, });
const startMessageUi = createText('startMessageUi', {
    style: {left:85,top:10,width:350,height:130},
    text: `Hello and welcome to the tutorial level of the "tile-engine"
you can move around by using the WASD keys. 
Each tile with a questionmark on it will provide information regaring the tutorial.` })
const messsageIcon = createIcon("messageIcon", {
    pos: { width: 30, left: 50, top: 10 },});
const tutorialUi = createUserInterface("tutorial", { pos: "coord", _height: 250, _width: 500,x:4.5,y:10.5 });

//set Textures
white.addTexture(whiteTexture);
quartarwhite.addTexture(whiteTexture);
threequartarwhite.addTexture(whiteTexture);
highblack.addTexture(blackTexture);
mediumwhite.addTexture(whiteTexture);
black.addTexture(blackTexture);
mediumblack.addTexture(blackTexture);
highwhite.addTexture(whiteTexture);
white.addDepthTexture(underWhiteTexture);
black.addDepthTexture(underBlackTexture);
quartarwhite.addDepthTexture(underWhiteTexture);
threequartarwhite.addDepthTexture(underWhiteTexture);
mediumwhite.addDepthTexture(underWhiteTexture);
mediumblack.addDepthTexture(underBlackTexture);
highwhite.addDepthTexture(underWhiteTexture);
highblack.addDepthTexture(underBlackTexture);

tutorialUi.addTexture(messageUiBg);
rotateLeft.addTexture(rotateLeftTexture);
rotateRight.addTexture(rotateRightTexture);
closeUiIcon.addTexture(closeMessageUiIcon);
messsageIcon.addTexture(closeMessageUiIcon);
fox.addTexture(foxTexture);
column.addTexture(columnTexture);
wall.addTexture(wallTexture);

mark1.addTexture(markTexture);
markrotate.addTexture(markTexture);
markjump.addTexture(markTexture);
markother.addTexture(markTexture);

//-------------------------------create dependencies-------------------------------

//-------------------------------assign ui to objects-------------------------------
overheadUi.addUi(rotateLeft);
overheadUi.addUi(rotateRight);
tutorialUi.addUi(closeUiIcon);
tutorialUi.addUi(messsageIcon);
tutorialUi.addUi(startMessageUi);

const startLevel = createLevel('Start', [
    ["highwhite", "highblack", "highwhite", "highblack", "highwhite", "highblack", "highwhite", "highblack", "highwhite", "highblack", "highwhite", "highblack", "highwhite", "highblack"],
    ["highblack", "highwhite", "highblack", "highwhite", "highblack", "highwhite", "highblack", "highwhite", "highblack", "highwhite", "highblack", "highwhite", "highblack", "highwhite"],
    ["3quartarwhite", "mediumblack", "highwhite", null, null, "mediumblack", null, null, null, null, null, "highblack", "highwhite", "highblack"],
    ["highblack", "quartarwhite", "highblack", "whiteTile", "blackTile", "whiteTile", "blackTile", null, null, null, null, "highblack", "highwhite", "highblack"],
    ["whiteTile", "blackTile", "whiteTile", "blackTile", "whiteTile", "blackTile", "whiteTile", null, null, null, null, "highblack", "highwhite", "highblack"],
    ["blackTile", "whiteTile", "blackTile", "whiteTile", "blackTile", "whiteTile", "blackTile", null, null, null, null, "whiteTile", "highblack", "highwhite"],
    ["whiteTile", "blackTile", "whiteTile", "blackTile", "whiteTile", "blackTile", "whiteTile", null, null, null, null, "highblack", "highwhite", "highblack"],
    [null, null, null, null,"blackTile",],
    [null, null, null, null,"whiteTile",],
    [null, null, null, null,"blackTile",],
    [null,null,null,null,"whiteTile",],
    [null,null,null,null,"blackTile",],
    [null,null,null,null,"whiteTile",]], {
    size: 250,
    tile: 'square',
    rotation: 0,
    isometric:1,
    space: 0.5,
    cameraoffset: { x: 0, y: 20 },
    zoom: 1
});


startLevel.addObject(mark1, { x: 4.5, y: 9.5, z: 2 });//gameobjects and tiles
startLevel.addObject(markrotate, { x: 4.5, y: 7.5, z: 2 });//rotate around level
startLevel.addObject(markjump, { x: 5.5, y: 4.5, z: 2 });//enable jump
startLevel.addObject(markother, { x: 12.5, y: 2.5, z: 2 });//larger message
startLevel.addObject(column, { x: 14.5, y: 0.5, z: 0 });
startLevel.addObject(column, { x: 14.5, y: 2.5, z: 0 });
startLevel.addObject(column, { x: 14.5, y: 4.5, z: 0 });
startLevel.addObject(column, { x: 14.5, y: 6.5, z: 0 });
startLevel.addObject(column, { x: -0.5, y: 0.5,z:0 });
startLevel.addObject(column, { x: -0.5, y: 2.5, z: 0 });
startLevel.addObject(column, { x: -0.5, y: 4.5, z: 0 });
startLevel.addObject(column, { x: -0.5, y: 6.5, z: 0 });
startLevel.addObject(column, { x: 3.5, y: 12.5, z: 0 });
startLevel.addObject(column, { x: 3.5, y: 10.5, z: 0 });
startLevel.addObject(column, { x: 3.5, y: 8.5, z: 0 });
startLevel.addObject(column, { x: 5.5, y: 12.5, z: 0 });
startLevel.addObject(column, { x: 5.5, y: 10.5, z: 0 });
startLevel.addObject(column, { x: 5.5, y: 8., z: 0 });
startLevel.addObject(fox, { x: 4.5, y: 10.5,rotation:0 });
//-------------------------------create actions-------------------------------
const zoomIn = createAction("zoomIn");
const zoomOut = createAction("zoomOut");
const zoomFocus = createAction("zoomFocus");
const cameraFocus = createAction("cameraFocus");
const rotLeftAction = createAction("rotLeftAction");
const rotRightAction = createAction("rotRightAction");
const moveUp = createAction("moveUp");
const moveDown = createAction("moveDown");
const moveLeft = createAction("moveLeft");
const moveRight = createAction("moveRight");
const gameInit = createAction("gameinit");
const jump = createAction("jump");

const closeMessageUi = createAction("closeMessageUi");//open message block

const openMessage = createAction("openMessage");
const closeMessage = createAction("closeMessage");
const mark1MessageText = createAction("mark1MessageText");
const markrotateMessageText = createAction("markrotateMessageText");
const markjumpMessageText = createAction("markjumpMessageText");
const markotherMessageText = createAction("markotherMessageText");

//-------------------------------assign simple actions to actions-----------------------------------------

//camera left rotation
const leftRotSimpleAction = rotLeftAction.addSimpleAction(setGameProps, {}, { name: "caller" });
leftRotSimpleAction.addModifier('set', { name: 'rotation', source: 'level', sourceStat: 'rotation' });
leftRotSimpleAction.addModifier('calc', { name: 'target_rotation', a: 'rotation', b: 45, calc: 'subtract' });
leftRotSimpleAction.addModifier('transition', { v: { rotation: 'rotation' }, t: { rotation: 'target_rotation' }, steps: 45 });
//camera right rotation
const rotRightSimpleAction = rotRightAction.addSimpleAction(setGameProps, {}, { name: "game" });
rotRightSimpleAction.addModifier('set', { name: 'rotation', source: 'level', sourceStat: 'rotation' });
rotRightSimpleAction.addModifier('calc', { name: 'target_rotation', a: 'rotation', b: 45, calc: 'add' });
rotRightSimpleAction.addModifier('transition', { v: { rotation: 'rotation' }, t: { rotation: 'target_rotation' }, steps:  45  });
//zoom in
const zoomInSimpleAction = zoomIn.addSimpleAction(setGameProps, {}, { name: "caller" });
zoomInSimpleAction.addModifier('set', { name: 'zoom', source: 'level', sourceStat: 'zoom' });
zoomInSimpleAction.addModifier('calc', { name: 'zoom', a: 'zoom', b: 0.1, calc: 'add' });
zoomInSimpleAction.addModifier('limit', { name: 'zoom', v: 'zoom', min: 0.2, max: 1 });
//zoom out
const zoomOutSimpleAction = zoomOut.addSimpleAction(setGameProps, {}, { name: "caller" });
zoomOutSimpleAction.addModifier('set', { name: 'zoom', source: 'level', sourceStat: 'zoom' });
zoomOutSimpleAction.addModifier('calc', { name: 'zoom', a: 'zoom', b: 0.1, calc: 'subtract' });
zoomOutSimpleAction.addModifier('limit', { name: 'zoom', v: 'zoom', min: 0.2, max: 1 });

moveUp.addSimpleAction(directionMove, {direction:270,amount:0.1});
moveDown.addSimpleAction(directionMove, {direction:90,amount:0.1});
moveLeft.addSimpleAction(directionMove, {direction:180,amount:0.1});
moveRight.addSimpleAction(directionMove, {direction:0,amount:0.1});

//open tutorial messages
const openUiSA = openMessage.addSimpleAction(createUi, {uiName:''});
openUiSA.addModifier('set', { name: 'x', source: 'caller', sourceStat: 'x' });
openUiSA.addModifier('set', { name: 'y', source: 'caller', sourceStat: 'y' });
//close tutorial message
closeMessage.addSimpleAction(closeUi, { uiName: '' });
//jump
const jumpSimpleAction = jump.addSimpleAction(move);
jumpSimpleAction.addModifier('set', { name: 'z', source: 'caller', sourceStat: 'z' });
jumpSimpleAction.addModifier('calc', { name: 'targetz', a: 'z', b: 2, calc: 'add' });
jumpSimpleAction.addModifier('transition', { v: { z: 'z'}, t: { z: 'targetz'}, steps: 10 });//gravity will fight this


//game init things
cameraFocus.addSimpleAction(setCameraFocus, { source: { name: "fox" } });
gameInit.addSimpleAction(setLevel, { levelName: "Start" }, {name:'game'});
gameInit.addSimpleAction(createUi, { uiName: "overheadUi" }, { name: 'game' });
//gameInit.addSimpleAction(createUi, { uiName: "tutorial" }, { name: 'game' });
//close first tutorial message
closeMessageUi.addSimpleAction(closeUi, { uiName: "tutorial" });
//-------------------------------assign actions to objects-------------------------------
highblack.addAction(zoomIn, "mousewheelup");
highblack.addAction(zoomOut, "mousewheeldown");
highwhite.addAction(zoomIn, "mousewheelup");
highwhite.addAction(zoomOut, "mousewheeldown");
white.addAction(zoomIn, "mousewheelup");
black.addAction(zoomIn, "mousewheelup");
white.addAction(zoomOut, "mousewheeldown");
black.addAction(zoomOut, "mousewheeldown");
fox.addAction(zoomIn, "mousewheelup");
fox.addAction(zoomOut, "mousewheeldown");
fox.addKeyEvent(moveUp, 'keydown', 87);
fox.addKeyEvent(moveDown, 'keydown', 83);
fox.addKeyEvent(moveLeft, 'keydown', 65);
fox.addKeyEvent(moveRight, 'keydown', 68);
fox.addKeyEvent(jump, 'keypress', 32);
rotateLeft.addAction(rotLeftAction, "click");
rotateRight.addAction(rotRightAction, "click");
closeUiIcon.addAction(closeMessageUi, "click");
fox.addAction(cameraFocus, "oncreate");
fox.addAction(zoomFocus, "click");
