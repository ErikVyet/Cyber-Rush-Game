import { useGLTF } from "@react-three/drei";
import { ModelPath } from "../enums/ModelPath";

export function useModel(model: ModelPath) {
    const { nodes, materials, animations } = useGLTF(model.toString());
    return { nodes, materials, animations };
}

useGLTF.preload(ModelPath.ROAD);
useGLTF.preload(ModelPath.BUILDINGS);
useGLTF.preload(ModelPath.SPACE_SHIP);