import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import { Typography } from "@mui/material";

export default function TimerDisplay() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { timer } = gameContext;

    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");

    useEffect(() => {
        const hourValue = Math.floor(timer / 3600) % 24;
        const minuteValue = Math.floor(timer / 60) % 60;
        const secondValue = timer % 60;
        setHour(hourValue >= 10 ? hourValue.toString() : `0${hourValue}`);
        setMinute(minuteValue >= 10 ? minuteValue.toString() : `0${minuteValue}`);
        setSecond(secondValue >= 10 ? secondValue.toString() : `0${secondValue}`);
    }, [timer]);

    return (
        <Typography className={`w-18 text-lg! text-center font-jura! font-semibold! text-zinc-100!`}>{hour}:{minute}:{second}</Typography>
    );
}