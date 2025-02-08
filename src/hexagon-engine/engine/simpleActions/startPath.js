import { paths } from "../blueprints/templates";
import cloneObj from "../generalfunctions/cloneObj";
import move from "./move";

export default function startPath(caller, { pathName, eventType }) {
    console.log(paths);
    const path = cloneObj(paths[pathName]);
    return move(caller, { path: path, eventType: eventType });
}