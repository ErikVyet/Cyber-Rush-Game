import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

export default function CoinDisplay() {
    const gameContext = useContext(GameContext);
    if (!gameContext) return null;
    const { coins } = gameContext;

    const images = [
        { src: "/images/copper-coin.png", alt: "Copper" },
        { src: "/images/silver-coin.png", alt: "Silver" },
        { src: "/images/golden-coin.png", alt: "Golden" },
        { src: "/images/diamond-coin.png", alt: "Diamond" }
    ];

    return (
        <Stack className={"px-2 py-0.5 outline outline-zinc-300 rounded-sm"} direction={"row"} divider={<Divider className="border-zinc-300!" orientation={"vertical"} variant={"middle"} flexItem/>} spacing={1}>
            {images.map((image, index) =>
                <Stack className={"items-center justify-center gap-2"} direction={"row"} key={index}>
                    <Tooltip title={`${image.alt} Coin`}>
                        <Box className="size-5" component={"img"} src={image.src} alt={image.alt}/>
                    </Tooltip>
                    <Typography className="text-lg! text-zinc-100 font-jura! font-semibold!">{coins[index]}</Typography>
                </Stack>
            )}
        </Stack>
    );
}