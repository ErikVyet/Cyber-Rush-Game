import type { Mesh } from "three";
import { ModelPath } from "../../enums/ModelPath";
import { useModel } from "../../hooks/useModel";
import { EXPLOSIVE_BARRERL_MATERIAL, EXPLOSIVE_BARRERL_MESH, WALL_MATERIAL, WALL_MESH } from "../../constants/model";
import { RapierRigidBody, RigidBody, type IntersectionEnterPayload } from "@react-three/rapier";
import { useRef } from "react";
import { ActiveCollisionTypes } from "@dimforge/rapier3d-compat";
import HealthBar from "./HealthBar";
import { EXPLOSIVE_BARREL_MAX_HEALTH, WALL_MAX_HEALTH } from "../../constants/scene";

type ObstacleProps = {
    position: [x: number, y: number, z: number],
    health: number,
    onIntersectionEnter?: (payload: IntersectionEnterPayload) => void
}

export function ExplosiveBarrel({ position, health, onIntersectionEnter }: ObstacleProps) {
    const { nodes, materials } = useModel(ModelPath.EXPLOSIVE_BARREL);

    const explosiveBarrelRef = useRef<RapierRigidBody>(null!);

    return (
        <group>
            <HealthBar health={health} maxHealth={EXPLOSIVE_BARREL_MAX_HEALTH} position={[position[0], position[1] + 0.5, position[2]]}/>
            <RigidBody ref={explosiveBarrelRef} type={"fixed"} colliders={"cuboid"} activeCollisionTypes={ActiveCollisionTypes.KINEMATIC_FIXED} position={position} onIntersectionEnter={onIntersectionEnter}>
                <mesh geometry={(nodes[EXPLOSIVE_BARRERL_MESH] as Mesh).geometry} material={materials[EXPLOSIVE_BARRERL_MATERIAL]} scale={0.3}/>
            </RigidBody>
        </group>
    );
}

export function Wall({ position, health, onIntersectionEnter }: ObstacleProps) {
    const { nodes, materials } = useModel(ModelPath.WALL);

    const wallRef = useRef<RapierRigidBody>(null!);

    return (
        <group>
            <HealthBar health={health} maxHealth={WALL_MAX_HEALTH} size={"medium"} position={[position[0], position[1] + 2.3, position[2]]}/>
            <RigidBody ref={wallRef} type={"fixed"} colliders={"cuboid"} activeCollisionTypes={ActiveCollisionTypes.KINEMATIC_FIXED} rotation={[-Math.PI / 2, 0, 0]} position={position} onIntersectionEnter={onIntersectionEnter}>
                <mesh geometry={(nodes[WALL_MESH] as Mesh).geometry} material={materials[WALL_MATERIAL]} scale={0.8} />
            </RigidBody>
        </group>
    );
}

export function Obstacle(props: ObstacleProps & { variant: "explosive-barrel" | "wall" }) {
    if (props.variant === "explosive-barrel") {
        return <ExplosiveBarrel {...props} />;
    } 
    else {
        return <Wall {...props} />;
    }
}