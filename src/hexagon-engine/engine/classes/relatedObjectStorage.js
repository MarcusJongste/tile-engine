import cloneObj from "../generalfunctions/cloneObj";
import objectStorage from "./objectStorage";

export default class relatedObjectStorage extends objectStorage {
    relationsList = [];
    getObjects(target, caller) {
        if (typeof target === 'object') {
            if (target.range) { return this.getRangeTarget(target,caller); }
        }
        return super.getObjects(target, caller);
    }
    //returns a 
    getRangeTarget(targetSearch, caller) {
        const ts = cloneObj(targetSearch);
        delete ts.range;
        const objs = this.getObjects(ts, caller);
        if (objs.length !== 0) {
            if (targetSearch.range.distance) {
                //return this.createDistanceArr(targetSearch.range.distance, caller).filter(Boolean);
                return this.limitArraysDuplicate([objs, this.createDistanceArr(targetSearch.range.distance, caller).filter(Boolean)]) }
        }
        return [];//nothing found
    }
    createDistanceArr(dist, caller) {
        const returnArr = [];
        let y = dist * -1;
        for (y; y <= dist; y++) {
            let x = dist * -1;
            for (x; x <= dist; x++) {
                if (x + y <= dist && x + y >= dist * -1 && !(x === 0 && y === 0)) {//exclude diagonal tiles and center
                    returnArr.push(this.getObjects({ x: Math.floor(caller.x) + x, y: Math.floor(caller.y) + y })[0]);
                }
            }

        }
        return returnArr;
    }
    // update updateObject to include relationship
    updateObject(obj, update) {
        if (obj.relation_id !== null) { this.checkDependency(obj, update); }
        return super.updateObject(obj, update);
    }
    //checks if there is going to be a dependency on another stat
    checkDependency({ relation_id, id }, { stat, newValue }) {
        if (this.relationsList[relation_id] !== undefined && this.relationsList[relation_id][stat] !== undefined) {
            if (this.relationsList[relation_id].source === id) {
                Object.keys(this.relationsList[relation_id][stat]).forEach((targetid) => {
                    const targetStat = this.relationsList[relation_id][stat][targetid];
                    this.updateObject(this.getObject({ id: targetid }), { stat: targetStat, newValue: newValue });
                });
                return true;
            }
        }
        return false;
    }
    //set dependency of source to target
    setRelationship(source, target, sourceStat, targetStat) {
        if (source.relation_id === null) {
            source.relation_id = this.relationsList.length;
            this.relationsList.push({source:source.id});
        }
        if (!this.relationsList[source.relation_id][sourceStat]) {
            this.relationsList[source.relation_id][sourceStat] = {}
        }
        if (!this.relationsList[source.relation_id][sourceStat][target.id]) {
            this.relationsList[source.relation_id][sourceStat][target.id] = targetStat;
        }
        this.checkDependency(source, { stat: sourceStat, newValue: source[sourceStat] });
    }
    searchObjects(andConditions = [], orConditions = []) {

    }
}