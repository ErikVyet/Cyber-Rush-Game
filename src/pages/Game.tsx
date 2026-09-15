import { Container } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import GameScene from "../components/game/GameScene";
// import { OrbitControls } from "@react-three/drei";

function Game() {

    return (
        <Container className="min-h-screen max-h-max" maxWidth={false} disableGutters>
            <Canvas className="h-screen!" shadows>
                <ambientLight intensity={1}/>
                <directionalLight intensity={4} castShadow/>
                <axesHelper args={[2]}/>
                {/* <OrbitControls/> */}
                <GameScene/>
            </Canvas>
        </Container>
    );
}

export default Game;