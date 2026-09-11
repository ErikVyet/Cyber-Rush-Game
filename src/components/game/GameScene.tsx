import { PerspectiveCamera } from "@react-three/drei";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Euler, MathUtils, Quaternion } from "three";
import { RoadCluster, Spaceship } from "../common/Models";

const MIN_X = -1;
const MAX_X = 1;
const LANE_WIDTH = 2;
const MAX_TRAVEL_SPEED = 15;
const ACCELERATE_SPEED = 2;
const ROLL_FACTOR = Math.PI / 12;
const LANE_LAMBDA = 2;
const ROLL_LAMBDA = 8;
const ROAD_CLUSTER_SPAWN_SIZE = 100;

type GameSceneProps = {
    
}

export default function GameScene({ }: GameSceneProps) {
    const shipRef = useRef<RapierRigidBody>(null!);
    const targetXRef = useRef(0);
    const currentZRef = useRef(0);
    const currentXRef = useRef(0);
    const currentSpeedRef = useRef(0);
    const currentRollRef = useRef(0);
    const roadClusterIterationRef = useRef(1);
    
    const [enableGenerateNextIteration, setEnableGenerateNextIteration] = useState(false);
    const [roadClusters, setRoadClusters] = useState([
        { id: 0, iteration: 0 },
        { id: 1, iteration: 1 }
    ]);
    
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
                const nextIteration = ++roadClusterIterationRef.current;
                setRoadClusters((prev) => {
                    return [...prev.slice(1), { id: nextIteration, iteration: nextIteration }];
                });
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

        if (currentZRef.current % (ROAD_CLUSTER_SPAWN_SIZE * 2) < (0.5 - ROAD_CLUSTER_SPAWN_SIZE) * 2) {
            setEnableGenerateNextIteration(true);
        }
    });
    
    return (
        <>
            <Physics gravity={[0, 0, 0]}>
                <RigidBody ref={shipRef} type={"kinematicPosition"} colliders={"hull"} enabledRotations={[false, true, true]}>
                    <Spaceship/>
                </RigidBody>
                <PerspectiveCamera position={[0, 1, 4.5]} lookAt={() => [0, 0, 0]} makeDefault/>
                {roadClusters.map((road) => 
                    <Fragment key={road.id}>
                        <RoadCluster size={ROAD_CLUSTER_SPAWN_SIZE} iteration={road.iteration}/>
                    </Fragment>
                )}
            </Physics>
        </>
    );
}