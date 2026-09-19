import { MathUtils } from "three";

export function randomCoinVariant() {
    const chance = MathUtils.randFloat(0.1, 100);
    if (chance <= 1) {
        return "diamond";
    }
    else if (chance <= 10) {
        return "gold";
    }
    else if (chance <= 30) {
        return "silver";
    }
    else {
        return "copper";
    }
}