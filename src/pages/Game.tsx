import { Container } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import GameScene from "../components/game/GameScene";
import { GameContext } from "../contexts/GameContext";
import { useEffect, useState } from "react";
import { Direction } from "../enums/Direction";
import { TIME_MULTIPLIER } from "../constants/scene";
import PauseDialog from "../components/game/PauseDialog";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Game() {
    const [timer, setTimer] = useState(0);
    const [shipDirection, setShipDirection] = useState<Direction>(Direction.NORTH);
    const [iteration, setIteration] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [soundEffectVolumn, setSoundEffectVolumn] = useState(1);
    const [musicVolumn, setMusicVolumn] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRunning) {
                setTimer(prev => prev + 1);
            }
        }, 1000);

        const handleWindowBlurred = (_event: FocusEvent) => {
            setIsRunning(false);
        };

        window.addEventListener("blur", handleWindowBlurred);

        return () => {
            clearInterval(interval);
            window.removeEventListener("blur", handleWindowBlurred); 
        }
    }, []);

    return (
        <GameContext.Provider value={{ timeMultiplier: TIME_MULTIPLIER, timer, isRunning, setIsRunning, iteration, setIteration, shipDirection, setShipDirection, soundEffectVolumn, setSoundEffectVolumn, musicVolumn, setMusicVolumn }}>
            <Container className="min-h-screen max-h-max" maxWidth={false} disableGutters>
                <Canvas className="h-screen!" shadows>
                    <ambientLight intensity={1} />
                    <directionalLight intensity={4} castShadow />
                    <axesHelper args={[2]} />
                    <OrbitControls/>
                    <GameScene />
                    <EffectComposer>
                        <Bloom intensity={1} luminanceThreshold={4} luminanceSmoothing={2}/>
                    </EffectComposer>
                </Canvas>
            </Container>
            <PauseDialog/>
        </GameContext.Provider>
    );
}