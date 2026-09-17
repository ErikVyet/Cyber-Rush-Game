import { Instance, Instances } from "@react-three/drei";
import { ModelPath } from "../../enums/ModelPath";
import { useModel } from "../../hooks/useModel";
import type { Mesh } from "three";
import { ROAD_COUNT, ROAD_LENGTH } from "../../constants/model";
import { Color, MeshStandardMaterial } from "three";
import { useMemo } from "react";

type RoadProps = {
    iteration: number
}

export default function Road({ iteration }: RoadProps) {
    const { nodes: roadNodes } = useModel(ModelPath.ROAD);

    // const hueRef = useRef(0);

    const material = useMemo(() => new MeshStandardMaterial({ color: new Color(Color.NAMES.royalblue) }), []);

    // useFrame((_, delta) => {
    //     hueRef.current = (hueRef.current + delta * 0.1) % 1;
    //     material.color.setHSL(hueRef.current, 1.0, 0.5);
    // });

    return (
        <Instances geometry={(roadNodes.Road_Road_0 as Mesh).geometry} material={material} position={[0, 0, -iteration * ROAD_COUNT * 4]} scale={0.4} rotation={[Math.PI / 2, Math.PI, Math.PI / 2]} receiveShadow>
            {Array.from({ length: ROAD_COUNT }).map((_, index) =>
                <Instance position={[-index * ROAD_LENGTH, 0.09, -1.5]} key={index} receiveShadow/>
            )}
        </Instances>
    );
}