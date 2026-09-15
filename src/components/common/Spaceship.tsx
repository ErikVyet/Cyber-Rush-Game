import { useAnimations, useGLTF } from "@react-three/drei";
import { ModelPath } from "../../enums/ModelPath";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import type { Mesh } from "three";

export default function Spaceship() {
    const { scene, animations } = useGLTF(ModelPath.SPACE_SHIP);

    const groupRef = useRef<Group>(null!);

    const { actions, names } = useAnimations(animations, groupRef);

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

    return (
        <group ref={groupRef} position={[0, 0, 0]} scale={0.03} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
            <primitive object={scene} />
        </group>
    );
}