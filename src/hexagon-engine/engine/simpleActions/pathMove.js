import { paths } from "../blueprints/templates";
import move from "./move";

export default function pathMove(caller, { pathName,speed }) {
    const path = paths[pathName];
    if (path) {
        return move(caller, { path: path, speed });
    }
    throw new Error("requesting not existing path (" + pathName + ")");
}