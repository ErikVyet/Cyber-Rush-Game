import { useContext, useEffect, useState } from "react";
import { COIN_CLUSTER_GAP, COIN_CLUSTER_SIZE, COIN_PATTERNS, COIN_X_GAP } from "../../constants/scene";
import { MathUtils } from "three";
import Coin from "./Coin";
import { randomCoinVariant } from "../../functions/model";
import type { IntersectionEnterPayload } from "@react-three/rapier";
import { GameContext } from "../../contexts/GameContext";

type CoinClusterProps = {
    iteration: number
}

type CoinDataProps = {
    id: string, 
    position: [x: number, y: number, z: number], 
    variant: "copper" | "silver" | "gold" | "diamond", 
    collected: boolean
}

export default function CoinCluster({ iteration }: CoinClusterProps) {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { setCoins: setPoints } = gameContext;

    const [coins, setCoins] = useState<CoinDataProps[]>([]);

    useEffect(() => {
        const newCoins: CoinDataProps[] = [];
        const lastZ = coins?.[coins.length - 1]?.position[2] ?? 0;
        const finalClusterSize = Math.floor(COIN_CLUSTER_SIZE / (iteration > 0 ? 2 : 1) + iteration % 2);
        for (let i = 0; i < finalClusterSize; i++) {
            const pattern = COIN_PATTERNS[MathUtils.randInt(0, COIN_PATTERNS.length - 1)];
            for (let j = 0; j < pattern.length; j++) {
                for (let k = 0; k < pattern[j].length; k++) {
                    if (pattern[j][k] === 1) {
                        newCoins.push({
                            id: MathUtils.generateUUID(),
                            position: [k - 1 + (k === 0 ? -COIN_X_GAP : k === 2 ? COIN_X_GAP : 0), -0.05, j - ((i + 1) * COIN_CLUSTER_GAP - lastZ + 4)],
                            variant: randomCoinVariant(),
                            collected: false
                        });
                    }
                }
            }
        }
        setCoins(prev => {
            const baseCoins = iteration > 0 ? prev.slice(Math.floor(prev.length / 2.5)) : prev;
            return [...baseCoins, ...newCoins];
        });
    }, [iteration]);

    const handleCollectCoin = (payload: IntersectionEnterPayload, id: string, variant: "copper" | "silver" | "gold" | "diamond") => {
        const colliderName = payload.other.rigidBodyObject?.name;
        if (colliderName !== "player") return;

        setCoins(prev => {
            const targetCoin = prev.find((coin) => coin.id === id);
            if (!targetCoin || targetCoin.collected) return prev;

            setPoints(prev =>[
                variant === "copper" ? prev[0] + 1 : prev[0],
                variant === "silver" ? prev[1] + 1 : prev[1],
                variant === "gold" ? prev[2] + 1 : prev[2],
                variant === "diamond" ? prev[3] + 1 : prev[3]
            ]);

            return prev.map(coin => coin.id === id ? { ...coin, collected: true } : coin);
        });
    };

    return (
        <group>
            {coins.filter(coin => !coin.collected).map(coin =>
                <Coin position={coin.position} variant={coin.variant} key={coin.id} onIntersectionEnter={(payload) => handleCollectCoin(payload, coin.id, coin.variant)} />
            )}
        </group>
    );
}