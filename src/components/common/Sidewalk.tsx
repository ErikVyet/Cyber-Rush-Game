import { useTexture } from "@react-three/drei";
import { ROAD_COUNT, ROAD_LENGTH } from "../../constants/model";
import { TexturePath } from "../../enums/TexturePath";
import { RepeatWrapping } from "three";

type SidewalkProps = {
    iteration: number
}

export default function Sidewalk({ iteration }: SidewalkProps) {
    const texture = useTexture(TexturePath.NEON_BLUE_GRID);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(100, 10);

    return (
        <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} receiveShadow>
            <mesh position={[-iteration * ROAD_COUNT * 4 - (2 * (ROAD_COUNT - 1)), 18.55, -0.465]} receiveShadow>
                <planeGeometry args={[ROAD_LENGTH * ROAD_COUNT / 2.5, 30, 1, 1]} />
                <meshStandardMaterial map={texture}/>
            </mesh>
            <mesh position={[-iteration * ROAD_COUNT * 4 - (2 * (ROAD_COUNT - 1)), -18.49, -0.465]} receiveShadow>
                <planeGeometry args={[ROAD_LENGTH * ROAD_COUNT / 2.5, 30, 1, 1]} />
                <meshStandardMaterial map={texture}/>
            </mesh>
        </group>
    );
}

useTexture.preload(TexturePath.NEON_BLUE_GRID);