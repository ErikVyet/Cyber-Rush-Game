import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import HealthBar from "../common/HealthBar";
import TimerDisplay from "../common/TimerDisplay";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import CoinDisplay from "../common/CoinDisplay";
import PowerUpDurationsDisplay from "../common/PowerUpDurationsDisplay";

export default function Header() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { isRunning, setIsRunning, score } = gameContext;

    const handlePauseClick = () => setIsRunning(false);

    return (
        <Stack className="w-full absolute top-0 left-0 z-10 justify-center">
            <Stack className="w-full px-4 pt-2 items-center justify-between" direction={"row"}>
                <HealthBar/>
                <Typography className="font-jura! text-lg! text-zinc-100">Score: {score}</Typography>
                <Stack className="items-center justify-center gap-6" direction={"row"}>
                    <CoinDisplay/>
                    <TimerDisplay/>
                    <Tooltip title={isRunning ? "Pause" : "Resume"}>
                        <IconButton disableRipple onClick={handlePauseClick}>
                            {isRunning ? <Pause className="text-zinc-100"/> : <PlayArrow className="text-zinc-100"/>}
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
            <PowerUpDurationsDisplay/>
        </Stack>
    )
}