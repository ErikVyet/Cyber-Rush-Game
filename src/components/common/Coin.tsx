import { RapierRigidBody, RigidBody, type IntersectionEnterPayload } from "@react-three/rapier";
import { Euler, MathUtils, type Mesh } from "three";
import { useModel } from "../../hooks/useModel";
import { ModelPath } from "../../enums/ModelPath";
import { COIN_MATERIAL, COIN_MESHES, COIN_VARIANT_COLORS } from "../../constants/model";
import { useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { COIN_LAMBDA, COIN_SPIN_SPEED } from "../../constants/scene";
import { GameContext } from "../../contexts/GameContext";
import { ActiveCollisionTypes } from "@dimforge/rapier3d-compat";

type CoinProps = {
    position: [x: number, y: number, z: number],
    variant?: "copper" | "silver" | "gold" | "diamond",
    onIntersectionEnter?: (payload: IntersectionEnterPayload) => void
}

export default function Coin({ position, variant = "copper", onIntersectionEnter }: CoinProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { timeMultiplier } = gameContext;

    const { nodes, materials } = useModel(ModelPath.COIN);

    const meshRef = useRef<Mesh>(null!);
    const coinRef = useRef<RapierRigidBody>(null!);
    const currentYRef = useRef<number>(position[1]);
    const currentRotYRef = useRef(0);
    const currentRotRef = useRef(new Euler());

    useFrame((state, delta) => {
        const mesh = meshRef.current;
        const coin = coinRef.current;
        if (!mesh || !coin) return;

        currentYRef.current = MathUtils.damp(currentYRef.current, Math.sin(state.clock.elapsedTime) / 6, COIN_LAMBDA * timeMultiplier, delta);
        currentRotYRef.current += COIN_SPIN_SPEED * timeMultiplier;
        currentRotRef.current.set(Math.PI / 2, 0, currentRotYRef.current);

        mesh.setRotationFromEuler(currentRotRef.current);
        coin.setNextKinematicTranslation({ x: position[0], y: currentYRef.current, z: position[2] });
    });

    return (
        <RigidBody ref={coinRef} type={"kinematicPosition"} colliders={"cuboid"} position={position} activeCollisionTypes={ActiveCollisionTypes.ALL} sensor onIntersectionEnter={onIntersectionEnter}>
            <mesh ref={meshRef} geometry={(nodes[COIN_MESHES[0]] as Mesh).geometry} material={materials[COIN_MATERIAL]} rotation={[Math.PI / 2, 0, 0]} scale={10} castShadow receiveShadow>
                <meshStandardMaterial emissiveIntensity={2} color={variant === "copper" ? COIN_VARIANT_COLORS[0] : variant === "silver" ? COIN_VARIANT_COLORS[1] : variant === "gold" ? COIN_VARIANT_COLORS[2] : COIN_VARIANT_COLORS[3]}/>
            </mesh>
        </RigidBody>
    );
}