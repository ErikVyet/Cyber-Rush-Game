import { useContext, useEffect, useState } from "react";
import { MathUtils } from "three";
import Coin from "./Coin";
import { randomCoinVariant, randomPowerUpVariant } from "../../functions/gameUtils";
import type { IntersectionEnterPayload } from "@react-three/rapier";
import { GameContext } from "../../contexts/GameContext";
import { OBJECT_CLUSTER_GAP, OBJECT_CLUSTER_SIZE, OBJECT_PATTERNS, OBJECT_X_GAP, OBJECT_Z_GAP } from "../../constants/scene";
import { PowerUp } from "./Powerups";

type ObjectClusterProps = {
    iteration: number
}

type ObjectDataProps = {
    id: string, 
    position: [x: number, y: number, z: number], 
    coinVariant?: "copper" | "silver" | "gold" | "diamond",
    powerUpVariant?: "double" | "damage" | "invisible" | "magnet" | "performance" | "repair"
    collected: boolean
}

export default function ObjectCluster({ iteration }: ObjectClusterProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { setShipHealth, setCoins, powerUpDurations, setPowerUpDurations, setScore, setLaserDamage } = gameContext;

    const [objects, setObjects] = useState<ObjectDataProps[]>([]);

    useEffect(() => {
        const newObjects: ObjectDataProps[] = [];
        const lastZ = objects[objects.length - 1]?.position[2] ?? 0;
        const finalClusterSize = Math.floor(OBJECT_CLUSTER_SIZE / (iteration > 0 ? 2 : 1) + iteration % 2);
        for (let i = 0; i < finalClusterSize; i++) {
            const pattern = OBJECT_PATTERNS[MathUtils.randInt(0, OBJECT_PATTERNS.length - 1)];
            for (let j = 0; j < pattern.length; j++) {
                for (let k = 0; k < pattern[j].length; k++) {
                    if (pattern[j][k] !== 0) {
                        const object: ObjectDataProps = {
                            id: MathUtils.generateUUID(),
                            position: [k - 1 + (k === 0 ? -OBJECT_X_GAP : k === 2 ? OBJECT_X_GAP : 0), -0.05, j * OBJECT_Z_GAP - ((i + 1) * OBJECT_CLUSTER_GAP - lastZ + 4)],
                            collected: false
                        };
                        switch (pattern[j][k]) {
                            case (1): {
                                object.coinVariant = randomCoinVariant();
                                break;
                            }
                            case (2): {
                                if (MathUtils.randInt(1, 100) <= 15) {
                                    object.powerUpVariant = randomPowerUpVariant();
                                }
                                else {
                                    object.coinVariant = randomCoinVariant();
                                }
                                break;
                            }
                            default: break;
                        }
                        newObjects.push(object);
                    }
                }
            }
        }
        setObjects(prev => {
            const baseObjects = iteration > 0 ? prev.slice(Math.floor(prev.length / 2.5)) : prev;
            return [...baseObjects, ...newObjects];
        });
    }, [iteration]);

    const handleCollectCoin = (payload: IntersectionEnterPayload, id: string, variant: "copper" | "silver" | "gold" | "diamond") => {
        const colliderName = payload.other.rigidBodyObject?.name;
        if (colliderName !== "player") return;

        setObjects(prev => {
            const targetCoin = prev.find(coin => coin.id === id);
            if (!targetCoin || targetCoin.collected) return prev;

            setCoins(prev => [
                variant === "copper" ? prev[0] + 1 : prev[0],
                variant === "silver" ? prev[1] + 1 : prev[1],
                variant === "gold" ? prev[2] + 1 : prev[2],
                variant === "diamond" ? prev[3] + 1 : prev[3]
            ]);
            setScore(prev => {
                switch (variant) {
                    case ("copper"): return prev + 1 * (powerUpDurations.doublePoint > 0 ? 2 : 1);
                    case ("silver"): return prev + 3 * (powerUpDurations.doublePoint > 0 ? 2 : 1);
                    case ("gold"): return prev + 10 * (powerUpDurations.doublePoint > 0 ? 2 : 1);
                    default: return prev + 100 * (powerUpDurations.doublePoint > 0 ? 2 : 1);
                }
            });
            return prev.map(object => object.id === id ? { ...object, collected: true } : object);
        });
    };

    const handleCollectPowerUp = (payload: IntersectionEnterPayload, id: string, variant: "double" | "damage" | "invisible" | "magnet" | "performance" | "repair") => {
        const colliderName = payload.other.rigidBodyObject?.name;
        if (colliderName !== "player") return;
        
        setObjects(prev => {
            const targetPowerUp = objects.find(object => object.id === id);
            if (!targetPowerUp || targetPowerUp.collected) return prev;

            if (variant === "repair") {
                setShipHealth(prev => Math.min(prev + 20, 100));
            }
            else {
                setPowerUpDurations(prev => {
                    switch (variant) {
                        case ("double"): return { ...prev, doublePoint: 10 } // 10 seconds
                        case ("damage"): {
                            setLaserDamage(50);
                            return { ...prev, damageBoost: 10 } // 10 seconds
                        }
                        case ("invisible"): return { ...prev, invisible: 5 } // 5 seconds
                        case ("magnet"): return { ...prev, magnet: 5 } // 5 seconds
                        case ("performance"): return { ...prev, performanceBoost: 12 } // 12 seconds
                        default: return prev;
                    }
                });
            }

            return prev.map(object => object.id === id ? { ...object, collected: true } : object);
        })
    };

    return (
        <group>
            {objects.filter(object => !object.collected).map(object => {
                if (object.coinVariant) {
                    return <Coin position={object.position} variant={object.coinVariant} key={object.id} onIntersectionEnter={(payload) => handleCollectCoin(payload, object.id, object.coinVariant!)} />
                }
                else if (object.powerUpVariant) {
                    return <PowerUp position={object.position} variant={object.powerUpVariant!} key={object.id} onIntersectionEnter={(payload) => handleCollectPowerUp(payload, object.id, object.powerUpVariant!)}/>
                }
            })}
        </group>
    );
}