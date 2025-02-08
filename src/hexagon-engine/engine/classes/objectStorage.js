
import createChildren from '../componentfunctions/createChildren';
import createTextures from '../componentfunctions/createTextures';
import { event } from '../event/eventHandling';
import cloneObj from '../generalfunctions/cloneObj';

export default class objectStorage {
    objectArr = [];
    objectIndex = {
        name: {
            values: {},
            floor: false,
        },//name is a default index
    };
    dependencyArr = [];
    constructor(indexArr) {
        this.addIndex(indexArr);
    }
    translateTarget(target, caller) {
        if (!caller) { return target; }
        if (target.id) { return target; } // id searches should be good
        if (target.name) {
            if (target.name === 'caller') { return { id: caller.id }; }
            if (target.name === 'level') { return { id: caller.id }; }
            if (target.name === 'parent') {
                if (this.objectArr[caller._parentId]._type === 'ui') {//if parent is ui then get parent of the ui instead
                    return { id: this.objectArr[caller._parentId]._parentId }
                }
                return { id: caller._parentId };
            }
        }
        return target;
    }
    /*-----------------------------------------
                        getObjects
            input: (v)alue as number/string (i)dentifier as string, 
            output: obj or null if not found
    -----------------------------------------*/
    getObject({ name, id }) {
        var returnObj;
        if (id !== undefined) {
            returnObj = this.objectArr[id]
        }
        if (name !== undefined) {
            returnObj = this.findInIndex("name", name)[0];
        }
        return returnObj !== undefined ? returnObj : null;
    }
    /*-----------------------------------------
                       getObjects
           input: (v)alue can be string or array (i)dentifier can be array,object or string
           output: array of matching objects from storage
    -----------------------------------------*/
    getObjects(target,caller) {
        if (typeof target === 'object') {
            //if contains id only 1 option
            const translatedTarget = this.translateTarget(target, caller);
            if (translatedTarget.id !== undefined) { return [this.objectArr[translatedTarget.id]]; }
            //translate target to change caller/parent to correct values
            //1.search on each k of target, check if it's indexed, if yes then return corresponding values
            //2.then for each indexed array returned, check which ones are in all arrays
            //will return all objects which comply to all targeted indexes
            return this.limitArraysDuplicate(Object.keys(translatedTarget).map((k) =>
                this.objectIndex[k] !== undefined ? this.findInIndex(k, translatedTarget[k]) : null
            ).filter(Boolean));
        }
        throw new Error('search has to be done with object!')
    }

    /*-----------------------------------------
                        findInIndex
            input: (v)alue string (i)dentifier string
            output: array of matching objects from storage
    -----------------------------------------*/
    findInIndex(i, v) {
        if (v !== undefined && v!=null) {
            if (i === 'id') {
                const obj = this.objectArr[v]
                return obj ? [obj] : [];
            }
            if (this.objectIndex[i]) {
                v = this.objectIndex[i].floor ? Math.floor(v) : v;
                const objArr = !Array.isArray(v) ? this.objectIndex[i].values[v] : [];
                if (Array.isArray(v)) {
                    v.forEach((k) => {
                        if (this.objectIndex[i].values[k] !== undefined) {
                            objArr.push(this.objectIndex[i].values[k]);
                        }
                    })
                }
                return objArr ? objArr.map(index => this.objectArr[index]) : [];//no objects found with that value
            }
        }
    }
    /*-----------------------------------------
                    addIndex
        input: index string or array
        output: true on successfull add, false on failure
    -----------------------------------------*/
    addIndex(index) {//add index
        if (Array.isArray(index)) {
            return !index.map(s => this.addIndex(s)).includes(false);
        } 
        if (typeof index === 'string') {//add as default varchar
            return this.createIndex({ name: index });
        } 
        if (typeof index === 'object') {
            return this.createIndex(index);
        }
         throw new Error("cannot create index from anything other than string/array");
    }
    createIndex({ name, floor = false, values = {} }) {
        if (name && this.objectIndex[name] === undefined) {
            this.objectIndex[name] = {};
            this.objectIndex[name].floor = floor;
            this.objectIndex[name].values = values;
            return true;
        }
        return false;
    }
    /*-----------------------------------------
                removeIndexFromIndexes
    input: (obj)ect which needs to be removed
    output: true on successfull removal, false if it did not exist,
    -----------------------------------------*/
    removeIndexFromIndexes(obj) {
        return !Object.keys(this.objectIndex).map((k) => {
            if (Array.isArray(obj[k])) { return !obj[k].map(v => this.removeIndexFromValue(k,v,obj.id)).includes(false) }
            return this.removeIndexFromValue(k, obj[k], obj.id);
        }).includes(false);
    }
    /*-----------------------------------------
                    removeIndexFromValue
        input: (s)tatname,(v)alue,index
        output: true on successfull removal, false if it did not exist, null if wrong type (objects and functions don't get indexes)
    -----------------------------------------*/
    removeIndexFromValue(s, v, index) {//removes index from value array in the index
        if (v !== 'object') {
            if (this.objectIndex[s] && this.objectIndex[s].values[v] !== undefined) {
                for (let i = this.objectIndex[s].values[v].length; i > -1; i--) {
                    if (this.objectIndex[s].values[v][i] === index) {
                        this.objectIndex[s].values[v].splice(i, 1);
                        if (this.objectIndex[s].values[v].length === 0) { delete this.objectIndex[s].values[v]; }//remove empty stat values from index
                        return true;
                    }
                }
                return false;
            }
        }
        return null;
    }
    /*-----------------------------------------
                    addIndexToValue
        input: (s)tatname,(v)alue,index
        output: true on successfull insertion, false if it already existed, null if wrong type (objects and functions don't get indexes)
    -----------------------------------------*/
    addIndexToValue(s, v, index) {//add an object pointer to a value array for the defined index if pointer does not exist
        if (typeof v !== 'object') {
            if (v !== undefined && this.objectIndex[s]) {
                v = this.objectIndex[s].floor ? Math.floor(v) : v;
                this.objectIndex[s].values[v] = this.objectIndex[s].values[v] === undefined ? [] : this.objectIndex[s].values[v];
                for (let i = 0; i < this.objectIndex[s].values[v].length; i++) {//checks if index not already present
                    if (this.objectIndex[s].values[v][i] === index) {
                        return false;//exist
                    }
                }
                this.objectIndex[s].values[v].push(index);//added
                return true;
            }
            return false;//no 
        } else {
            if (Array.isArray(v)) {
                return !v.map(av => this.addIndexToValue(s, av, index)).includes(false);
            }
        }
        return null;
    }
    /*-----------------------------------------
                     updateIndexValue
         input: (s)tatname,(v)alue,(o)ld (v)alue,index
         output: true upon successfull removal and insertion, false if not
    -----------------------------------------*/
    updateIndexValue(s, v, ov, index) {
        const successfullUpdate = this.removeIndexFromValue(s, ov, index);
        return this.addIndexToValue(s, v, index) ? successfullUpdate : false;
    }
    /*-----------------------------------------
                     addObjects
         input: array of objects
         output: array of indexes
     -----------------------------------------*/
    addObjects(objArr) {//add multiple objects
        return objArr.map(o => this.addObject(o));
    }
    /*-----------------------------------------
                addObject**
    input: object 
    output: index where it was inserted
-----------------------------------------*/
    addObject(obj) {
        if (this.objectIndex.name.values[obj.name] && obj._unique) {
            //object already exists return id of existing obje
            return this.objectIndex.name.values[obj.name][0];
        }
        // grab index where object will live
        const arrIndex = this.objectArr.length;
        //add object details to index
        Object.keys(this.objectIndex).forEach((k) => {//each index
            this.addIndexToValue(k, obj[k], arrIndex);
        }); 
        if (obj._depthTexture) { obj.depthTexture = createTextures(obj._depthTexture, arrIndex, obj.action);}
        obj.textures = createTextures(obj._textures,arrIndex,obj.action);
        //return id
        return this.addToArray(obj, arrIndex);
    }
    /*-----------------------------------------
                    addToArray
        input: object and index where it needs to be inserted
        output: index where was inserted
    -----------------------------------------*/
    addToArray(obj, index) {//adds object to object arr and returns index
        this.objectArr[index] = obj;
        this.objectArr[index].id = index;
        return index;
    }
    /*-----------------------------------------
                resizeObjectArray
    input: index
    output: none
-----------------------------------------*/
    resizeObjectArray(index) {//resizes storage
        const oldArr = this.objectArr;
        this.objectArr = new Array(index).fill(null).map(i => oldArr[i] === undefined ? null : oldArr[i]);
    }
    /*-----------------------------------------
                    updateObjects
        input: update contains stat and newvalue,target is a object with id's to find the objs in the storage
        output: true when update attempted, false when failed
    -----------------------------------------*/
    updateObjects(target, update,caller) {//update needs to be an array so that it can contain multiple updates for 1 target saving resources
        const objects = this.getObjects(target, caller);//gets matching objects from storage
        if (objects.length > 0) {
            objects.forEach(obj => {
                this.updateObject(obj, update);
            });
        }
        return false;
    }
    /*-----------------------------------------
                    updateObject
        input: obj is obj to be updated, update contains stat and new value
        output: true when update attempted, false when failed
    -----------------------------------------*/
    updateObject(obj, update) {

        if (obj && obj.id !== null) {
            //multiple updates
            if (Array.isArray(update)) { return !update.map(u => this.updateObject(obj, u)).includes(false); }
            //if the update is delete
            if (update.delete) { return this.deleteObject(obj, update.delete); }
            //get old value and validate new value
            const oldValue = obj[update.stat];
            const validatedUpdate = { stat: update.stat, newValue: this.validateNewValue(obj, update) };
            //if the obj has a change function then trigger it
            if (update.stat === '_textures') { this.updateObject(obj, { stat: 'textures', newValue: createTextures(validatedUpdate.newValue) }); }
            if (update.stat === '_objects') { this.updateObject(obj, { stat: 'objects', newValue: createChildren(validatedUpdate.newValue) }); }
            if (update.stat === '_ui') { this.updateObject(obj, { stat: 'ui', newValue: createChildren(validatedUpdate.newValue) }); }
            obj[validatedUpdate.stat] = obj.change ? obj.change(validatedUpdate) : validatedUpdate.newValue;
           return this.updateIndexValue(validatedUpdate.stat, obj[validatedUpdate.stat], oldValue, obj.id);
            
        }
        throw new Error("invalid object passed " + obj);
    }
    validateNewValue(obj, { stat, newValue }) {
        if (newValue === null) { return null; }
        const oriV = obj[stat];
        const newV = newValue
        if (Array.isArray(oriV)) {
            if (!Array.isArray(newValue)) {
                return oriV.slice().concat(newValue);
            }
        } else {
            if (typeof newV === 'object') {
                if (oriV === null || oriV === undefined) { return newValue; }
                Object.keys(oriV).forEach(k => {
                    newValue[k] = newValue[k] === undefined ? oriV[k] : this.validateNewValue(oriV, { stat: k, newValue: newValue[k] });
                });
            }
        }
        return newV;// { stat:stat, newValue:newV };
    }
    deleteObject(o, update) {
        const obj = typeof o === 'object' ? o : this.getObject({ name: o });
        if (update.allChildren) {
            if (obj._objects) {
                this.updateObject(o, { stat: "_objects", newValue: [] });
                obj._objects.forEach(child => this.deleteObject(child, update));
            }
            if (obj._ui) {
                this.updateObject(o, { stat: "_ui", newValue: [] });
                obj._ui.forEach(child => this.deleteObject(child, update));
            }
        }

        this.removeObject(obj);
    }
    
    writeToTemplate(sv, template) {
        const returnObj = cloneObj(template);
        Object.keys(sv).forEach(k => { if (returnObj[k] !== undefined) { returnObj[k] = sv[k]; } });
        return returnObj;
    }
    /*-----------------------------------------
                    linkObject
        input: object containing id and change func
        output: true when linked, false when id does not exist
    -----------------------------------------*/
    linkObject({ id, change }) {//links the update function object in storage
        const obj = this.objectArr[id];
        if (obj) {
            obj.change = change;
            return true;
        }
        return false;
    }
    /*-----------------------------------------
                    onCreate
        input: id
        output: none (alters stored obj by setting onCreate as true)
    -----------------------------------------*/
    onCreate({ id }) {
        const obj = this.objectArr[id];
        if (obj && !obj.instantiated) {
            obj.instantiated = true;
            if (obj.action.oncreate) {event.call({ obj: obj, e: "oncreate", action: obj.action.oncreate });}
            return true;
        }
    }
    /*-----------------------------------------
                    onDestroy
        input: obj
        output: none 
    -----------------------------------------*/
    onDestroy(obj) {
        if (obj && obj.action.ondestroy) {
            event.call({ obj: obj, e: obj.action.ondestroy });
        }
    }
    /*-----------------------------------------
                    limitArraysDuplicate
        input: array of arrays containing id's
        output: array of id's contained in all arrays (so duplicate)
    -----------------------------------------*/
    limitArraysDuplicate(arr) {
        if (arr.length === 0) {return [] }
        const returnArr = arr[0].slice();
        //is returnArr undefined?
        if (returnArr) {
            //more than 1 arr(index) was searched?
            if (arr.length > 1) {
                for (let i = returnArr.length; i > -1; i--) {//for each id in first search
                    for (let c = 1; c < arr.length; c++) {//other index searches
                        if (arr[c] && !arr[c].includes(returnArr[i])) {//if index does not exist in other search remove it
                            returnArr.splice(i,1);
                            break;
                        }
                    }
                }
            }
            return returnArr;
        }
        return [];//no objects found
    }
    /*-----------------------------------------
                    removeObj
        input: target to find objects
        output: 
    -----------------------------------------*/
    removeObjects(target) {
        const objects = this.getObjects(target);
        objects.forEach((obj) => {
            this.removeObj(obj);
        });
    }
    removeObject(obj) {
        this.removeIndexFromIndexes(obj);
        this.onDestroy(obj);
        const game = this.getObject({ name: 'game' });
        if (obj._type === 'ui') {this.updateObject(game, { stat: '_ui', newValue: game._ui.filter(i => i.id !== obj.id) });}
        if (obj._type !== 'ui') {this.updateObject(game, { stat: '_objects', newValue: game._objects.filter(i => i.id !== obj.id) });}
        this.objectArr[obj.id] = undefined;
        this.clearEnd();
    }
    clearEnd() {
        for (let i = this.objectArr.length; i > -1; i--) {
            if (this.objectArr[i] !== undefined) {
                break;
            }
            this.objectArr.splice(i, 1);
        }
    }
}