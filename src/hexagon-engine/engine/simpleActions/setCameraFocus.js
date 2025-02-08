import setRelation from "./setRelation";

export default function setCameraFocus(caller, { source }) {
    if (source === undefined) { return []; }
    setRelation(source, {source:source, target: { name: "game" }, sourceStat: "x", targetStat: "x" });
    setRelation(source, { source:source,target: { name: "game" }, sourceStat: "y", targetStat: "y" });
    setRelation(source, { source:source,target: { name: "game" }, sourceStat: "z", targetStat: "z" });

}