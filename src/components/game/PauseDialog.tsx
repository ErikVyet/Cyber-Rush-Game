import { useContext, useMemo } from "react";
import { GameContext } from "../../contexts/GameContext";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { TEXT_COLOR_MUTUAL } from "../../constants/style";

export default function PauseDialog() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { isRunning, setIsRunning } = gameContext;

    const clickAudio = useMemo(() => new Audio("/sounds/button-click.mp3"), []);

    const handlePlayClickrAudio = () => {
        clickAudio.volume = 1;
        clickAudio.play();
    };
    const handleCloseDialog = () => {
        handlePlayClickrAudio();
        setIsRunning(true);
    };

    return (
        <Dialog open={!isRunning} slotProps={{ paper: { className: "bg-transparent! shadow-none!" } }}>
            <Stack className="w-sm p-6 items-center justify-center gap-8 bg-transparent rounded-2xl! border-6 border-blue-400 border-double!">
                <Typography className={`text-5xl! font-jura! font-bold! ${TEXT_COLOR_MUTUAL}`}>PAUSED</Typography>
                <Stack className="items-center justify-center gap-1">
                    <Button className={`text-3xl! font-normal! font-jura! ${TEXT_COLOR_MUTUAL} hover:outline-2! bg-transparent!`} disableRipple onClick={handleCloseDialog}>RESUME</Button>
                    <Button className={`text-3xl! font-normal! font-jura! ${TEXT_COLOR_MUTUAL} hover:outline-2! bg-transparent!`} disableRipple>SETTINGS</Button>
                    <Button className={`text-3xl! font-normal! font-jura! ${TEXT_COLOR_MUTUAL} hover:outline-2! bg-transparent!`} disableRipple>MAIN MENU</Button>
                </Stack>
            </Stack>
        </Dialog>
    );
}