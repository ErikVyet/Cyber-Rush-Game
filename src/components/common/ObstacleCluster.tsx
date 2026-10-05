import { useContext, useEffect, useState } from "react";
import { Obstacle } from "./Obstacles";
import { MathUtils } from "three";
import { EXPLOSIVE_BARREL_DAMAGE, EXPLOSIVE_BARREL_MAX_HEALTH, MAX_OBSTACLE_COUNT, OBSTACLE_Z_GAP, WALL_DAMAGE, WALL_MAX_HEALTH } from "../../constants/scene";
import { GameContext } from "../../contexts/GameContext";
import type { IntersectionEnterPayload } from "@react-three/rapier";

type ObstacleClusterProps = {
    iteration: number
}

type ObstacleDataProps = {
    id: string,
    position: [x: number, y: number, z: number],
    health: number,
    variant: "explosive-barrel" | "wall",
    destroyed: boolean
}

export default function ObstacleCluster({ iteration }: ObstacleClusterProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { laserDamage, setShipHealth } = gameContext;

    const [obstacles, setObstacles] = useState<ObstacleDataProps[]>([]);

    useEffect(() => {
        const newObstacles: ObstacleDataProps[] = [];
        for (let i = 0; i < MAX_OBSTACLE_COUNT; i++) {
            const id = MathUtils.generateUUID();
            const variant = MathUtils.randInt(0, 100) > 50 ? "explosive-barrel" : "wall";
            const position: [number, number, number] = [
                MathUtils.randInt(-1, 1) * 2,
                variant === "explosive-barrel" ? -0.2 : -0.6,
                (obstacles[obstacles.length - 1]?.position[2] ?? 0) - i * OBSTACLE_Z_GAP - 20
            ];
            const health = variant === "explosive-barrel" ? EXPLOSIVE_BARREL_MAX_HEALTH : WALL_MAX_HEALTH;
            
            newObstacles.push({ id, position, health, variant, destroyed: false });
        }
        setObstacles(prev => {
            const baseObstacles = prev.slice(Math.floor(prev.length / 3));
            return [...baseObstacles, ...newObstacles];
        });
    }, [iteration]);

    const handleIntersectionEnter = (payload: IntersectionEnterPayload, id: string) => {
        setObstacles(prev => prev.map(obstacle => {
            if (obstacle.id === id && payload.other.rigidBodyObject?.name === "laser") {
                const newHealth = Math.max(0, obstacle.health - laserDamage);
                return { ...obstacle, health: newHealth, destroyed: newHealth === 0 };
            }
            else if (obstacle.id === id && payload.other.colliderObject?.name === "spaceship") {
                const shipDamage = obstacle.variant === "explosive-barrel" ? EXPLOSIVE_BARREL_DAMAGE : WALL_DAMAGE;
                setShipHealth(prev => Math.max(0, prev - shipDamage));
                return { ...obstacle, destroyed: true };
            }
            console.log(payload.other.rigidBodyObject?.name);
            return obstacle;
        }));
    };

    return (
        <group>
            {obstacles.filter(obstacle => !obstacle.destroyed).map(obstacle => 
                <Obstacle key={obstacle.id} health={obstacle.health} position={obstacle.position} variant={obstacle.variant} onIntersectionEnter={(payload) => handleIntersectionEnter(payload, obstacle.id)}/>
            )}
        </group>
    );
}