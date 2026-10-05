import { Box, List, ListItem, Tooltip, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { GameContext } from "../../contexts/GameContext";
import { LASER_BEAM_BASE_DAMAGE } from "../../constants/scene";

export default function PowerUpDurationsDisplay() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { isRunning, powerUpDurations, setPowerUpDurations, setLaserDamage } = gameContext;

    useEffect(() => {
        if (powerUpDurations.doublePoint > 0 && isRunning) {
            const doublePointTimeout = setTimeout(() => {
                setPowerUpDurations(prev => ({ ...prev, doublePoint: prev.doublePoint - 1 }));
            }, 1000);
            return () => { clearTimeout(doublePointTimeout); }
        }
    }, [powerUpDurations.doublePoint, isRunning]);

    useEffect(() => {
        if (powerUpDurations.damageBoost > 0 && isRunning) {
            const damageBoostTimeout = setTimeout(() => {
                setPowerUpDurations(prev => ({ ...prev, damageBoost: prev.damageBoost - 1 }));
            }, 1000);
            setLaserDamage(LASER_BEAM_BASE_DAMAGE * 2);
            return () => { clearTimeout(damageBoostTimeout); }
        }
        else {
            setLaserDamage(LASER_BEAM_BASE_DAMAGE);
        }
    }, [powerUpDurations.damageBoost, isRunning]);

    useEffect(() => {
        if (powerUpDurations.invisible > 0 && isRunning) {
            const invisibleTimeout = setTimeout(() => {
                setPowerUpDurations(prev => ({ ...prev, invisible: prev.invisible - 1 }));
            }, 1000);
            return () => { clearTimeout(invisibleTimeout); }
        }
    }, [powerUpDurations.invisible, isRunning]);

    useEffect(() => {
        if (powerUpDurations.magnet > 0 && isRunning) {
            const magnetTimeout = setTimeout(() => {
                setPowerUpDurations(prev => ({ ...prev, magnet: prev.magnet - 1 }));
            }, 1000);
            return () => { clearTimeout(magnetTimeout); }
        }
    }, [powerUpDurations.magnet, isRunning]);

    useEffect(() => {
        if (powerUpDurations.performanceBoost > 0 && isRunning) {
            const performanceBoostTimeout = setTimeout(() => {
                setPowerUpDurations(prev => ({ ...prev, performanceBoost: prev.performanceBoost - 1 }));
            }, 1000);
            return () => { clearTimeout(performanceBoostTimeout); }
        }
    }, [powerUpDurations.performanceBoost, isRunning]);

    return (
        <List className="w-fit! px-4!">
            {Object.keys(powerUpDurations).filter(key => powerUpDurations[key as keyof typeof powerUpDurations] > 0).map((key, index) => (
                <Tooltip title={key === "doublePoint" ? "Earn double point" : key === "damageBoost" ? "Damage Boost" : key === "invisible" ? "Immune to damage" : key === "magnet" ? "Increase item collection range" : "Increase speed"} placement={"right"} key={index}>
                    <ListItem className="gap-2" disableGutters>
                        <Box className="size-5" component={"img"} src={`/images/${key === "doublePoint" ? "double-point.png" : key === "damageBoost" ? "damage-boost.png" : key === "invisible" ? "invisible.png" : key === "magnet" ? "magnet.png" : "performance-boost.png"}`}/>
                        <Typography className={`text-center font-jura! font-semibold! text-zinc-100!`}>00:{powerUpDurations[key as keyof typeof powerUpDurations] >= 10 ? powerUpDurations[key as keyof typeof powerUpDurations] : `0${powerUpDurations[key as keyof typeof powerUpDurations]}`}</Typography>
                    </ListItem>
                </Tooltip>
            ))}
        </List>
    );
}