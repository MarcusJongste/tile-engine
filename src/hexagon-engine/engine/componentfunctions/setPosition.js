import levelconstants from "../constants/levelconstant";

//mostly used for special positioning, say the ui ned top right corner, or needs to be generated in a circle
export function getCirclePos(rad, angle) {
    const px = Math.cos(angle * (Math.PI / 180)) * rad;
    const py = Math.sin(angle * (Math.PI / 180)) * rad;
    return { x: roundLoc(px), y: roundLoc(py) };
}
export function roundLoc(v) {
    return Math.round(v * 1000) / 1000;
}
export default function getPosition(pos, obj) {
    const { cameraoffset } = levelconstants;
    if (typeof pos === 'object') { return pos; }
    switch (pos) {
        case 'free':return { transform: "translate(-50%,-50%)"}
        case 'bottomcentre':return { left: "50%", bottom: "0%" }
        case 'bottomleft':return { left: "0%", bottom: "0%" } 
        case 'bottomright': return { right: "0%", bottom: "0%"}; 
        case 'centre': return { left: "50%", top: "50%", transform: "translate(-50%, -50%)" }
        case 'centreleft': return { left: "0%", top: "50%", transform: "translate(0, -50%)" };
        case 'centreright': return { right: "0%", top: "50%", transform: "translate(0%, -50%)" }; 
        case 'topcentre': return { left: "50%", top: "0%", transform:"translate(-50%, 0)" } 
        case 'topright': return {right:"0%",top:"0%"} 
        case 'topleft': return { left: "0%", top: "0%" }
        case 'coord':
            const x = obj.x !== null ? obj.x : cameraoffset.x;
            const y = obj.y !== null ? obj.y : cameraoffset.y;
            return { transform: "translate(-50%,-50%)", '--x': x, '--y': y };
            //in progress
        default:
            //in progress

    }
}
