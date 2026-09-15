import Sidewalk from "./Sidewalk";
import { useEffect } from "react";
import Road from "./Road";
import BuildingCluster from "./BuildingCluster";

type AreaClusterProps = {
    iteration: number
}

export default function AreaCluster({ iteration }: AreaClusterProps) {

    useEffect(() => {
        
    }, [iteration]);

    return (
        <>
            <Road iteration={iteration}/>
            <Sidewalk iteration={iteration}/>
            <Road iteration={iteration + 1}/>
            <Sidewalk iteration={iteration + 1}/>
            <BuildingCluster iteration={iteration}/>
        </>
    );
}