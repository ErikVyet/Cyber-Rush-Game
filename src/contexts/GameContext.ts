import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Direction } from "../enums/Direction";

export const GameContext = createContext<{
    timeMultiplier: number,
    timer: number,
    isRunning: boolean,
    setIsRunning: Dispatch<SetStateAction<boolean>>,
    iteration: number,
    setIteration: Dispatch<SetStateAction<number>>,
    shipDirection: Direction,
    setShipDirection: Dispatch<SetStateAction<Direction>>,
    soundEffectVolumn: number,
    setSoundEffectVolumn: Dispatch<SetStateAction<number>>,
    musicVolumn: number,
    setMusicVolumn: Dispatch<SetStateAction<number>>
} | null>(null);