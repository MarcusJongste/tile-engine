import { useState } from 'react';
//this function is the usestate for blueprint stats
export function useStat(s) {
    const [stat, setStat] = useState(s);
    function change(s) {
        setStat(s);
    }
    return { val: stat, f: change };
}