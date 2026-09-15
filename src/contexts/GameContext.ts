import { createContext } from "react";
import type { Direction } from "../enums/Direction";

export const GameContext = createContext<{
    shipDirection: Direction,
} | null>(null);