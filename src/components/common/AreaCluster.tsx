import Sidewalk from "./Sidewalk";
import { useContext, useEffect } from "react";
import Road from "./Road";
import BuildingCluster from "./BuildingCluster";
import { GameContext } from "../../contexts/GameContext";
import CoinCluster from "./CoinCluster";

export default function AreaCluster() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { iteration } = gameContext;
    
    useEffect(() => {
        
    }, [iteration]);

    return (
        <group>
            <Road iteration={iteration}/>
            <Sidewalk iteration={iteration}/>
            <Road iteration={iteration + 1}/>
            <Sidewalk iteration={iteration + 1}/>
            <BuildingCluster iteration={iteration}/>
            <CoinCluster iteration={iteration}/>
        </group>
    );
}