import { storage } from "../event/eventHandling";

export function checkDependency(obj) {
    if (obj._dependency.length > 0) {
        const dep = obj._dependency;
        if (dep.type === 'create') { return createDependency() }
        if (dep.type === 'direct') { return storage.setDependent(dep.target, dep.sourceStat,dep.stat, obj.id); }
        return false;
    }
    return false;
}

function createDependency() {

}
