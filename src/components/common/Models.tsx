import { Instance, Instances, useAnimations, useGLTF, type InstancesProps } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Euler, Group, Mesh, Vector3 } from "three";

const ROAD_LENGTH = 10;

type ModelProps = {
    position?: Vector3 | [x: number, y: number, z: number],
    rotation?: Euler | [x: number, y: number, z: number]
}

export function Road({ position, rotation }: ModelProps) {
    const { scene } = useGLTF("/models/road.glb");

    return (
        <group position={position} scale={0.4} rotation={rotation}>
            <primitive object={scene}/>
        </group>
    );
}

export function RoadCluster({ limit, size, iteration }: InstancesProps & { size: number, iteration: number }) {
    const { nodes, materials } = useGLTF("/models/road.glb");

    return (
        <Instances geometry={(nodes.Road_Road_0 as Mesh).geometry} material={materials.Road} limit={limit} position={[0, 0, -iteration * (ROAD_LENGTH + size * 2 - 10)]} scale={0.4} rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}>
            {Array.from({ length: size }).map((_, index) =>
                <Instance position={[-index * ROAD_LENGTH, 0.09, -1.5]} key={index}/>
            )}
        </Instances>
    );
}

export function Spaceship() {
    const { scene, animations } = useGLTF("/models/spaceship.glb");

    const groupRef = useRef<Group>(null!);

    const { actions, names } = useAnimations(animations, groupRef);

    useEffect(() => {
        const action = actions[names[0]];
        if (action) {
            action.fadeIn(0.5).play();
            return () => { action.fadeOut(0.5); }
        }
    }, [actions, names]);
    
    return (
        <group ref={groupRef} position={[0, 0, 0]} scale={0.03} rotation={[0, Math.PI / 2, 0]}>
            <primitive object={scene}/>
        </group>
    );
}

useGLTF.preload("/models/road.glb");
useGLTF.preload("/models/spaceship.glb");