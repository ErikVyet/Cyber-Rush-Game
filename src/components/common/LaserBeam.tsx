import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useContext, useRef, type RefObject } from "react";
import { Color } from "three";
import { LASER_BEAM_DEPTH, LASER_BEAM_HEIGHT, LASER_BEAM_MAX_TRAVEL_DISTANCE, LASER_BEAM_TRAVEL_SPEED, LASER_BEAM_WIDTH } from "../../constants/scene";
import { useFrame } from "@react-three/fiber";
import { GameContext } from "../../contexts/GameContext";

type LaserBeamProps = {
    currentShipXRef: RefObject<number>,
    currentShipYRef: RefObject<number>,
    currentShipZRef: RefObject<number>
}

export default function LaserBeam({ currentShipXRef, currentShipYRef, currentShipZRef }: LaserBeamProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { timeMultiplier } = gameContext;

    const laserBeamRef = useRef<RapierRigidBody>(null!);
    const currentXRef = useRef(currentShipXRef.current);
    const currentYRef = useRef(currentShipYRef.current);
    const currentZRef = useRef(currentShipZRef.current - 0.6);

    useFrame((_, delta) => {
        const laserBeam = laserBeamRef.current;
        if (!laserBeam) return;

        if (Math.abs(currentZRef.current) - Math.abs(currentShipZRef.current) > LASER_BEAM_MAX_TRAVEL_DISTANCE) {
            currentXRef.current = currentShipXRef.current;
            currentYRef.current = currentShipYRef.current;
            currentZRef.current = currentShipZRef.current - 0.6;
        }
        else {
            currentZRef.current -= LASER_BEAM_TRAVEL_SPEED * delta * timeMultiplier;
        }

        laserBeam.setNextKinematicTranslation({ x: currentXRef.current, y: -0.07 + currentYRef.current, z: currentZRef.current });
    });

    return (
        <RigidBody ref={laserBeamRef} type={"kinematicPosition"} colliders={"hull"}>
            <mesh>
                <boxGeometry args={[LASER_BEAM_WIDTH, LASER_BEAM_HEIGHT, LASER_BEAM_DEPTH]}/>
                <meshStandardMaterial emissiveIntensity={6} emissive={Color.NAMES.yellow}/>
            </mesh>
        </RigidBody>
    );
}