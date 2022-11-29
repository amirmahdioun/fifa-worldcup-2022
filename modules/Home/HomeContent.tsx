import Hero from "./components/Hero/Hero";
import StadiumsCatalog from "../Stadiums/stadiumsCatalog";
import {stadiumImageData} from "../../data/stadiums/stadiumImage";
import {Box, Typography, useTheme} from "@mui/material";



const HomeContent = () => {
    const theme = useTheme()

    return (
        <Box>
            <Hero heroImageSrc={'/assets/images/header-background.jpg'}/>
            <Box my={'4rem'}>
                <Typography textAlign={'center'} mb={'2rem'} color={theme.palette.primary.main} textTransform={'uppercase'} fontWeight={700} variant={'h4'}>Stadiums in Qatar</Typography>
                <StadiumsCatalog imageList={stadiumImageData}/>
            </Box>
        </Box>
    );
};

export default HomeContent;