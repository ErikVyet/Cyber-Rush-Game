import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/GameContext";

export default function HealthBar() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { shipHealth } = gameContext;

    const [healthColor, setHealthColor] = useState("bg-green-500/90");
    const [textColor, setTextColor] = useState("text-green-500");

    useEffect(() => {
        if (shipHealth >= 70) {
            setHealthColor("from-green-500/70 to-green-400/70");
            setTextColor("text-green-500");
        }
        else if (shipHealth >= 30) {
            setHealthColor("from-amber-500/70 to-amber-400/70");
            setTextColor("text-amber-500");
        }
        else {
            setHealthColor("from-red-500/70 to-red-400/70");
            setTextColor("text-red-500");
        }
    }, [shipHealth]);

    return (
        <Stack className="items-center justify-center gap-3" direction={"row"}>
            <Box className="h-4 w-sm outline-2 outline-white rounded-full">
                <Box className={`h-full bg-linear-to-r ${healthColor} rounded-full transition-[width] duration-300`} sx={{ width: `${shipHealth}%` }}/>
            </Box>
            <Typography className={`text-lg! font-jura! font-semibold! ${textColor}`}>{shipHealth}%</Typography>
        </Stack>
    );
}