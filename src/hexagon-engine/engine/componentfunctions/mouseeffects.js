//returns which mouseeffects are set based on interactive value

export default function mouseEffects(interactive) {
    switch (interactive) {
        case null:
            return "none";
        case true:
            return "clickable";
        case false:
            return "blocked";
        default:
            throw new Error("interactive incorrect format ("+interactive+")");
    }
}