import { PerspectiveCamera, useAnimations } from "@react-three/drei";
import { ModelPath } from "../../enums/ModelPath";
import { useContext, useEffect, useRef, useState } from "react";
import { Euler, MathUtils, Quaternion, type Group } from "three";
import type { Mesh } from "three";
import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { GameContext } from "../../contexts/GameContext";
import { useFrame } from "@react-three/fiber";
import { ACCELERATE_SPEED, LANE_LAMBDA, LANE_WIDTH, MAX_TRAVEL_SPEED, MAX_X, MIN_X, ROLL_FACTOR, ROLL_LAMBDA } from "../../constants/scene";
import { ROAD_COUNT } from "../../constants/model";
import { useModel } from "../../hooks/useModel";
import LaserBeam from "./LaserBeam";

export default function Spaceship() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { setIteration, timeMultiplier } = gameContext;

    const gamePad = navigator.getGamepads()?.[1];

    const { scene, animations } = useModel(ModelPath.SPACE_SHIP);

    const touchStartXRef = useRef<number | null>(0);
    const touchEndXRef = useRef<number | null>(0);
    const groupRef = useRef<Group>(null!);
    const shipRef = useRef<RapierRigidBody>(null!);
    const targetXRef = useRef(0);
    const currentZRef = useRef(0);
    const currentXRef = useRef(0);
    const currentSpeedRef = useRef(0);
    const currentRollRef = useRef(0);
    const currentRotEulerRef = useRef(new Euler());
    const currentRotQuaternionRef = useRef(new Quaternion());

    const { actions, names } = useAnimations(animations, groupRef);

    const [enableGenerateNextIteration, setEnableGenerateNextIteration] = useState(false);

    useEffect(() => {
        const action = actions[names[0]];
        if (action) {
            action.fadeIn(0.5).play();
            return () => { action.fadeOut(0.5); }
        }
    }, [actions, names]);

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as Mesh).isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    // Control left and right for keyboard and touch screen
    useEffect(() => {
        const handleKeyDown = (_event: KeyboardEvent) => {
            const key = _event.key;
            if (key === "a") {
                targetXRef.current = Math.max(MIN_X, targetXRef.current - 1);
            }
            if (key === "d") {
                targetXRef.current = Math.min(MAX_X, targetXRef.current + 1);
            }
        };
        const handleTouchStart = (_event: TouchEvent) => {
            _event.preventDefault();
            _event.stopPropagation();
            touchStartXRef.current = _event.touches[0].clientX;
        };
        const handleTouchEnd = (_event: TouchEvent) => {
            _event.preventDefault();
            _event.stopPropagation();
            touchEndXRef.current = _event.changedTouches[0].clientX;
            if (!touchStartXRef.current || !touchEndXRef.current) return;

            const distance = touchEndXRef.current - touchStartXRef.current;
            if (distance < 50) {
                targetXRef.current = targetXRef.current = Math.max(MIN_X, targetXRef.current - 1);
            }
            else if (distance > 50) {
                targetXRef.current = Math.min(MAX_X, targetXRef.current + 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);

        return () => { 
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchmove", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        }
    }, []);

    // Control left and right for gamepad/controller
    useEffect(() => {
        if (gamePad) {
            const xVal = gamePad.axes?.[0];
            if (xVal <= -1) {
                targetXRef.current = Math.max(MIN_X, targetXRef.current - 1);
            }
            else if (xVal >= 1) {
                targetXRef.current = Math.min(MAX_X, targetXRef.current + 1);
            }
        }
    }, [gamePad?.axes[0]]);

    useEffect(() => {
        if (enableGenerateNextIteration) {
            const timeout = setTimeout(() => {
                setIteration(prev => prev + 1);
                setEnableGenerateNextIteration(false);
            }, 1000);
            return () => { clearTimeout(timeout); }
        }
    }, [enableGenerateNextIteration]);

    useFrame((_, delta) => {
        const ship = shipRef.current;
        if (!ship) return;

        // Calculate the spaceship's current speed
        currentSpeedRef.current = MathUtils.damp(currentSpeedRef.current, MAX_TRAVEL_SPEED, ACCELERATE_SPEED * timeMultiplier, delta);

        // Calculate the shipship's current z position after speeding up
        currentZRef.current -= currentSpeedRef.current * delta * timeMultiplier;

        // Calculate the next spaceship's x position
        const targetX = targetXRef.current * LANE_WIDTH;
        currentXRef.current = MathUtils.damp(currentXRef.current, targetX, LANE_LAMBDA * timeMultiplier, delta);

        const distanceToTarget = targetX - currentXRef.current;
        const targetRoll = -distanceToTarget * ROLL_FACTOR;

        currentRollRef.current = MathUtils.damp(currentRollRef.current, targetRoll, ROLL_LAMBDA * timeMultiplier, delta);
        currentRotEulerRef.current.set(0, 0, currentRollRef.current);

        ship.setNextKinematicTranslation({ x: currentXRef.current, y: 0, z: currentZRef.current });
        ship.setNextKinematicRotation(currentRotQuaternionRef.current.setFromEuler(currentRotEulerRef.current));

        if (currentZRef.current % (ROAD_COUNT * 4) < 0.5 - (ROAD_COUNT * 4)) {
            setEnableGenerateNextIteration(true);
        }
    });

    return (
        <>
            <RigidBody ref={shipRef} name={"player"} type={"kinematicPosition"} colliders={"hull"} enabledRotations={[false, true, true]}>
                <group ref={groupRef} position={[0, 0, 0]} scale={0.03} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
                    <primitive object={scene} />
                </group>
                <PerspectiveCamera position={[0, 1, 4.5]} lookAt={() => [0, 0, 0]} makeDefault />
            </RigidBody>
            <LaserBeam currentShipXRef={currentXRef} currentShipZRef={currentZRef}/>
        </>
    );
}