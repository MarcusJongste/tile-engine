import { storage } from "../event/eventHandling";

export default function setRelation(caller, {source, target, sourceStat, targetStat }) {
    const sourceObj =  source._type !== undefined ? source : storage.getObject(source);
    const targetObj = target._type !== undefined ? target : storage.getObject(target);
    storage.setRelationship(sourceObj, targetObj, sourceStat, targetStat);
}