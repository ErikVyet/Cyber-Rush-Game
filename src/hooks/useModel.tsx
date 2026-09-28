import { useGLTF } from "@react-three/drei";
import { ModelPath } from "../enums/ModelPath";

export function useModel(model: ModelPath) {
    const { scene, nodes, materials, animations } = useGLTF(model.toString());
    return { scene, nodes, materials, animations };
}

useGLTF.preload(ModelPath.ROAD);
useGLTF.preload(ModelPath.BUILDINGS);
useGLTF.preload(ModelPath.SPACE_SHIP);
useGLTF.preload(ModelPath.DAMAGE_BOOST);
useGLTF.preload(ModelPath.INVISIBLE);
useGLTF.preload(ModelPath.MAGNET);
useGLTF.preload(ModelPath.PERFORMANCE_BOOST);
useGLTF.preload(ModelPath.REPAIR_KIT);