import { useEffect, useState } from "react";
import { ModelPath } from "../../enums/ModelPath"
import { useModel } from "../../hooks/useModel"
import { MathUtils, Vector3, type Mesh } from "three";
import { BUILDING_COUNT, BUILDING_GAP, BUILDING_MATERIALS, BUILDING_MESHES, ROAD_LENGTH } from "../../constants/model";

type BuildingClusterProps = {
    iteration: number
}

export default function BuildingCluster({ iteration }: BuildingClusterProps) {
    const { nodes, materials } = useModel(ModelPath.BUILDINGS);

    const [buildings, setBuildings] = useState<{ mesh: string, material: string, position: Vector3 }[]>([]);

    useEffect(() => {
        const timeout = setTimeout(() => setBuildings(prev => {
            let collection = [...prev];
            for (let i = 0; i < BUILDING_COUNT / (iteration > 0 ? 4 : 2); i++) {
                collection.push(...[
                    {
                        mesh: BUILDING_MESHES[MathUtils.randInt(0, BUILDING_MESHES.length - 1)],
                        material: BUILDING_MATERIALS[MathUtils.randInt(0, BUILDING_MATERIALS.length - 1)],
                        position: new Vector3(-4, i * BUILDING_GAP + (prev[prev.length - 1] ? prev[prev.length - 1].position.y + BUILDING_GAP : 0), 0)
                    },
                    {
                        mesh: BUILDING_MESHES[MathUtils.randInt(0, BUILDING_MESHES.length - 1)],
                        material: BUILDING_MATERIALS[MathUtils.randInt(0, BUILDING_MATERIALS.length - 1)],
                        position: new Vector3(-8, i * BUILDING_GAP + (prev[prev.length - 1] ? prev[prev.length - 1].position.y + BUILDING_GAP : 0), 0)
                    },
                    {
                        mesh: BUILDING_MESHES[MathUtils.randInt(0, BUILDING_MESHES.length - 1)],
                        material: BUILDING_MATERIALS[MathUtils.randInt(0, BUILDING_MATERIALS.length - 1)],
                        position: new Vector3(4, i * BUILDING_GAP + (prev[prev.length - 1] ? prev[prev.length - 1].position.y + BUILDING_GAP : 0), 0)
                    },
                    {
                        mesh: BUILDING_MESHES[MathUtils.randInt(0, BUILDING_MESHES.length - 1)],
                        material: BUILDING_MATERIALS[MathUtils.randInt(0, BUILDING_MATERIALS.length - 1)],
                        position: new Vector3(8, i * BUILDING_GAP + (prev[prev.length - 1] ? prev[prev.length - 1].position.y + BUILDING_GAP : 0), 0)
                    }
                ]);
            }
            return collection.splice(iteration > 0 ? 4 * (ROAD_LENGTH + 4) : 0);
        }), 100);
        return () => { clearTimeout(timeout); }
    }, [iteration]);

    useEffect(() => {
        console.log(buildings.length);
    }, [buildings]);

    return (
        <group position={[0, 2.5, -1]} rotation={[-Math.PI / 2, 0, 0]} scale={3}>
            {buildings.map((building, index) =>
                <mesh geometry={(nodes[building.mesh] as Mesh).geometry} material={materials[building.material]} position={building.position} key={index} castShadow receiveShadow />
            )}
        </group>
    );
}