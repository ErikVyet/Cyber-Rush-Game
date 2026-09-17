import { PerspectiveCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import AreaCluster from "../common/AreaCluster";
import { GameContext } from "../../contexts/GameContext";
import Spaceship from "../common/Spaceship";
import { useFrame } from "@react-three/fiber";
import { useContext } from "react";

export default function GameScene() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { isRunning } = gameContext;

    useFrame((state) => {
        if (isRunning && !state.clock.running) {
            state.clock.start();
        }
        else if (!isRunning && state.clock.running) {
            state.clock.stop();
        }
    });

    return (
        <Physics gravity={[0, 0, 0]} debug>
            <Spaceship />
            <PerspectiveCamera position={[0, 1, 4.5]} lookAt={() => [0, 0, 0]} makeDefault />
            <AreaCluster />
        </Physics>
    );
}