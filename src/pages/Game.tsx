import { Container } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import GameScene from "../components/game/GameScene";
import { OrbitControls } from "@react-three/drei";

function Game() {

    return (
        <Container className="min-h-screen max-h-max" maxWidth={false} disableGutters>
            <Canvas className="h-screen!">
                <ambientLight intensity={2}/>
                <directionalLight intensity={6}/>
                <axesHelper args={[2]}/>
                <OrbitControls/>
                <GameScene/>
            </Canvas>
        </Container>
    );
}

export default Game;