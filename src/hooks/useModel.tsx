import { useGLTF } from "@react-three/drei";
import { ModelPath } from "../enums/ModelPath";

export function useModel(model: ModelPath) {
    const { scene, nodes, materials, animations } = useGLTF(model.toString());
    return { scene, nodes, materials, animations };
}

useGLTF.preload(ModelPath.ROAD);
useGLTF.preload(ModelPath.BUILDINGS);
useGLTF.preload(ModelPath.SPACE_SHIP);