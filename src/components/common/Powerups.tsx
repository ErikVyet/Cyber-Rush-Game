import { ActiveCollisionTypes } from "@dimforge/rapier3d-compat";
import { Center, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RapierRigidBody, RigidBody, type IntersectionEnterPayload } from "@react-three/rapier";
import { useContext, useRef } from "react";
import { Color, MathUtils, Mesh } from "three";
import { GameContext } from "../../contexts/GameContext";
import { OBJECT_LAMBDA } from "../../constants/scene";
import { useModel } from "../../hooks/useModel";
import { ModelPath } from "../../enums/ModelPath";
import { DAMAGE_BOOST_MATERIAL, DAMAGE_BOOST_MESH, INVISIBLE_MATERIAL, INVISIBLE_MESH, MAGNET_MATERIAL, MAGNET_MESH, PERFORMANCE_BOOST_MATERIALS, PERFORMANCE_BOOST_MESHES, REPAIR_KIT_MATERIAL, REPAIR_KIT_MESH } from "../../constants/model";

type CommonPowerUpProps = {
    position: [x: number, y: number, z: number],
    onIntersectionEnter?: (payload: IntersectionEnterPayload) => void
}

type PowerUpProps = CommonPowerUpProps & {
    variant: "double" | "damage" | "invisible" | "magnet" | "performance" | "repair"
}

// Double point power up
export function DoublePoint({ position, onIntersectionEnter }: CommonPowerUpProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { timeMultiplier } = gameContext;

    const doublePointRef = useRef<RapierRigidBody>(null!);
    const currentYRef = useRef(position[1]);

    useFrame((state, delta) => {
        const doublePoint = doublePointRef.current;
        if (!doublePoint) return;

        currentYRef.current = MathUtils.damp(currentYRef.current, Math.sin(state.clock.elapsedTime) / 6, OBJECT_LAMBDA * timeMultiplier, delta);

        doublePoint.setNextKinematicTranslation({ x: position[0], y: currentYRef.current, z: position[2] });
    });

    return (
        <RigidBody ref={doublePointRef} position={position} type={"kinematicPosition"} colliders={"cuboid"} activeCollisionTypes={ActiveCollisionTypes.ALL} sensor onIntersectionEnter={onIntersectionEnter}>
            <Center>
                <Text3D font={"/fonts/Jura_SemiBold.json"} size={0.25} height={0.02} curveSegments={12} bevelEnabled bevelThickness={0.01} bevelSize={0.01} bevelOffset={0} bevelSegments={5} castShadow receiveShadow>
                    2x
                    <meshStandardMaterial color={Color.NAMES.gold} metalness={0.5} roughness={0.1}/>
                </Text3D>
            </Center>
        </RigidBody>
    );
}

// Damage boost power up
export function DamageBoost({ position, onIntersectionEnter }: CommonPowerUpProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { timeMultiplier } = gameContext;

    const { nodes, materials } = useModel(ModelPath.DAMAGE_BOOST);

    const damageBoostRef = useRef<RapierRigidBody>(null!);
    const currentYRef = useRef(position[1]);

    useFrame((state, delta) => {
        const damageBoost = damageBoostRef.current;
        if (!damageBoost) return;

        currentYRef.current = MathUtils.damp(currentYRef.current, Math.sin(state.clock.elapsedTime) / 6, OBJECT_LAMBDA * timeMultiplier, delta);

        damageBoost.setNextKinematicTranslation({ x: position[0], y: currentYRef.current, z: position[2] });
    });

    return (
        <RigidBody ref={damageBoostRef} position={position} type={"kinematicPosition"} colliders={"cuboid"} activeCollisionTypes={ActiveCollisionTypes.ALL} sensor onIntersectionEnter={onIntersectionEnter}>
            <mesh geometry={(nodes[DAMAGE_BOOST_MESH] as Mesh).geometry} material={materials[DAMAGE_BOOST_MATERIAL]} scale={0.04} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow/>
        </RigidBody>
    );
}

// Invisible power up
export function Invisible({ position, onIntersectionEnter }: CommonPowerUpProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { timeMultiplier } = gameContext;

    const { nodes, materials } = useModel(ModelPath.INVISIBLE);

    const invisibleRef = useRef<RapierRigidBody>(null!);
    const currentYRef = useRef(position[1]);

    useFrame((state, delta) => {
        const invisible = invisibleRef.current;
        if (!invisible) return;

        currentYRef.current = MathUtils.damp(currentYRef.current, Math.sin(state.clock.elapsedTime) / 6, OBJECT_LAMBDA * timeMultiplier, delta);

        invisible.setNextKinematicTranslation({ x: position[0], y: currentYRef.current, z: position[2] });
    });

    return (
        <RigidBody ref={invisibleRef} position={position} type={"kinematicPosition"} colliders={"cuboid"} activeCollisionTypes={ActiveCollisionTypes.ALL} sensor onIntersectionEnter={onIntersectionEnter}>
            <mesh geometry={(nodes[INVISIBLE_MESH] as Mesh).geometry} material={materials[INVISIBLE_MATERIAL]} scale={0.04} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow/>
        </RigidBody>
    );
}

// Magnet power up
export function Magnet({ position, onIntersectionEnter }: CommonPowerUpProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { timeMultiplier } = gameContext;

    const { nodes, materials } = useModel(ModelPath.MAGNET);

    const magnetRef = useRef<RapierRigidBody>(null!);
    const currentYRef = useRef(position[1]);

    useFrame((state, delta) => {
        const magnet = magnetRef.current;
        if (!magnet) return;

        currentYRef.current = MathUtils.damp(currentYRef.current, Math.sin(state.clock.elapsedTime) / 6, OBJECT_LAMBDA * timeMultiplier, delta);

        magnet.setNextKinematicTranslation({ x: position[0], y: currentYRef.current, z: position[2] });
    });

    return (
        <RigidBody ref={magnetRef} position={position} type={"kinematicPosition"} colliders={"cuboid"} activeCollisionTypes={ActiveCollisionTypes.ALL} sensor onIntersectionEnter={onIntersectionEnter}>
            <mesh geometry={(nodes[MAGNET_MESH] as Mesh).geometry} material={materials[MAGNET_MATERIAL]} scale={0.15} rotation={[Math.PI / 2, Math.PI / 2, 0]} castShadow receiveShadow/>
        </RigidBody>
    );
}

// Performance boost power up
export function PerformanceBoost({ position, onIntersectionEnter }: CommonPowerUpProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { timeMultiplier } = gameContext;

    const { nodes, materials } = useModel(ModelPath.PERFORMANCE_BOOST);

    const performanceBoostRef = useRef<RapierRigidBody>(null!);
    const currentYRef = useRef(position[1]);

    useFrame((state, delta) => {
        const performanceBoost = performanceBoostRef.current;
        if (!performanceBoost) return;

        currentYRef.current = MathUtils.damp(currentYRef.current, Math.sin(state.clock.elapsedTime) / 6, OBJECT_LAMBDA * timeMultiplier, delta);

        performanceBoost.setNextKinematicTranslation({ x: position[0], y: currentYRef.current, z: position[2] });
    });

    return (
        <RigidBody ref={performanceBoostRef} position={position} type={"kinematicPosition"} colliders={false} activeCollisionTypes={ActiveCollisionTypes.ALL}>
            <CuboidCollider args={[0.125, 0.25, 0.04]} sensor onIntersectionEnter={onIntersectionEnter}/>
            <group scale={0.0005}>
                {PERFORMANCE_BOOST_MESHES.map((mesh, index) =>
                    <mesh geometry={(nodes[mesh] as Mesh).geometry} material={materials[PERFORMANCE_BOOST_MATERIALS[index]]} key={index}/>
                )}
            </group>
        </RigidBody>
    );
}

// Repair kit power up
export function RepairKit({ position, onIntersectionEnter }: CommonPowerUpProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { timeMultiplier } = gameContext;

    const { nodes, materials } = useModel(ModelPath.REPAIR_KIT);

    const repairKitRef = useRef<RapierRigidBody>(null!);
    const currentYRef = useRef(position[1]);

    useFrame((state, delta) => {
        const repairKit = repairKitRef.current;
        if (!repairKit) return;

        currentYRef.current = MathUtils.damp(currentYRef.current, Math.sin(state.clock.elapsedTime) / 6, OBJECT_LAMBDA * timeMultiplier, delta);

        repairKit.setNextKinematicTranslation({ x: position[0], y: currentYRef.current, z: position[2] });
    });

    return (
        <RigidBody ref={repairKitRef} position={position} type={"kinematicPosition"} colliders={"cuboid"} activeCollisionTypes={ActiveCollisionTypes.ALL} sensor onIntersectionEnter={onIntersectionEnter}>
            <mesh geometry={(nodes[REPAIR_KIT_MESH] as Mesh).geometry} material={materials[REPAIR_KIT_MATERIAL]} scale={0.3} rotation={[Math.PI / 2, Math.PI / 4, 0]} castShadow receiveShadow/>
        </RigidBody>
    );
}

export function PowerUp(props: PowerUpProps) {
    return (
        props.variant === "double" ? (
            <DoublePoint {...props}/>
        ) : props.variant === "damage" ? (
            <DamageBoost {...props}/>
        ) : props.variant === "invisible" ? (
            <Invisible {...props}/>
        ) : props.variant === "magnet" ? (
            <Magnet {...props}/>
        ) : props.variant === "performance" ? (
            <PerformanceBoost {...props}/>
        ) : (
            <RepairKit {...props}/>
        )
    );
}