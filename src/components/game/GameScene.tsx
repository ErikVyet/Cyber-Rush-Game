import { PerspectiveCamera } from "@react-three/drei";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Euler, MathUtils, Quaternion } from "three";
import AreaCluster from "../common/AreaCluster";
import { ROAD_COUNT } from "../../constants/model";
import { Direction } from "../../enums/Direction";
import { GameContext } from "../../contexts/GameContext";
import Spaceship from "../common/Spaceship";

const MIN_X = -1;
const MAX_X = 1;
const LANE_WIDTH = 2;
const MAX_TRAVEL_SPEED = 15;
const ACCELERATE_SPEED = 2;
const ROLL_FACTOR = Math.PI / 12;
const LANE_LAMBDA = 2;
const ROLL_LAMBDA = 8;

export default function GameScene() {
    const shipRef = useRef<RapierRigidBody>(null!);
    const targetXRef = useRef(0);
    const currentZRef = useRef(0);
    const currentXRef = useRef(0);
    const currentSpeedRef = useRef(0);
    const currentRollRef = useRef(0);
    
    const [shipDirection] = useState<Direction>(Direction.NORTH);
    const [enableGenerateNextIteration, setEnableGenerateNextIteration] = useState(false);
    const [iteration, setIteration] = useState(0);
    
    useEffect(() => {
        const handleKeyDown = (_event: KeyboardEvent) => {
            const key = _event.key;
            if (key === "a") {
                targetXRef.current = Math.max(MIN_X, targetXRef.current - 1);
            }
            if (key === "d") {
                targetXRef.current = Math.min(MAX_X, targetXRef.current + 1);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => { window.removeEventListener("keydown", handleKeyDown); }
    }, []);

    useEffect(() => {
        if (enableGenerateNextIteration) {
            const timeout = setTimeout(() => {
                setIteration(prev => prev + 1);
                setEnableGenerateNextIteration(false);
            }, 1000);
            return () => { clearTimeout(timeout); }
        }
    }, [enableGenerateNextIteration]);

    useFrame((state, delta) => {
        const ship = shipRef.current;
        if (!ship) return;

        // Calculate the spaceship's current speed
        currentSpeedRef.current = MathUtils.damp(currentSpeedRef.current, MAX_TRAVEL_SPEED, ACCELERATE_SPEED, delta);
        
        // Calculate the shipship's current z position after speeding up
        currentZRef.current -= currentSpeedRef.current * delta;

        // Calculate the next spaceship's x position
        const targetX = targetXRef.current * LANE_WIDTH;
        currentXRef.current = MathUtils.damp(currentXRef.current, targetX, LANE_LAMBDA, delta);

        const distanceToTarget = targetX - currentXRef.current;
        const targetRoll = -distanceToTarget * ROLL_FACTOR;

        currentRollRef.current = MathUtils.damp(currentRollRef.current, targetRoll, ROLL_LAMBDA, delta);
        
        ship.setNextKinematicTranslation({ x: currentXRef.current, y: 0, z: currentZRef.current });
        ship.setNextKinematicRotation((new Quaternion()).setFromEuler(new Euler(0, 0, currentRollRef.current)));

        state.camera.position.set(0, 1, currentZRef.current + 4.5);
        state.camera.lookAt(0, 0, 0);
        
        if (currentZRef.current % (ROAD_COUNT * 4) < 0.5 - (ROAD_COUNT * 4)) {
            setEnableGenerateNextIteration(true);
        }
    });
    
    return (
        <GameContext.Provider value={{ shipDirection }}>
            <Physics gravity={[0, 0, 0]}>
                <RigidBody ref={shipRef} type={"kinematicPosition"} colliders={"hull"} enabledRotations={[false, true, true]}>
                    <Spaceship/>
                </RigidBody>
                <PerspectiveCamera position={[0, 1, 4.5]} lookAt={() => [0, 0, 0]} makeDefault/>
                <AreaCluster iteration={iteration}/>
            </Physics>
        </GameContext.Provider>
    );
}