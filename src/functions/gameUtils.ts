import { MathUtils } from "three";

export function randomCoinVariant() {
    const chance = MathUtils.randInt(1, 100);
    if (chance <= 1) {
        return "diamond";
    }
    else if (chance <= 5) {
        return "gold";
    }
    else if (chance <= 10) {
        return "silver";
    }
    else {
        return "copper";
    }
}

export function randomPowerUpVariant() {
    const chance = MathUtils.randInt(1, 6);
    switch (chance) {
        case (1): return "double";
        case (2): return "damage";
        case (3): return "invisible";
        case (4): return "magnet";
        case (5): return "performance";
        default: return "repair";
    }
}