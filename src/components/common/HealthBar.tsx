import { Box } from "@mui/material";
import { amber, green, red } from "@mui/material/colors";
import { Html } from "@react-three/drei";
import { motion } from "motion/react";
import { useMemo } from "react";

type HealthBarProps = {
    position: [x: number, y: number, z: number],
    health: number,
    maxHealth: number,
    size?: "small" | "medium"
}

export default function HealthBar({ position, health, maxHealth, size = "small" }: HealthBarProps) {
    const healthBarColor = useMemo(() => {
        const percentage = health / maxHealth * 100;
        if (percentage >= 70) {
            return green[500];
        }
        else if (percentage >= 30) {
            return amber[500];
        }
        else {
            return red[500];
        }
    }, [health]);

    return (
        <Html position={position} distanceFactor={4} center sprite>
            <Box className={`${size === "small" ? "w-2xs" : "w-md"} h-5 outline-2 outline-zinc-100 rounded-full overflow-hidden`}>
                <Box className="h-full opacity-90" component={motion.div} initial={{ width: "100%", backgroundColor: green[500] }} animate={{ width: `${health / maxHealth * 100}%`, backgroundColor: healthBarColor }}/>
            </Box>
        </Html>
    );
}