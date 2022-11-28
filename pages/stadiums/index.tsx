import StadiumsCatalog from "../../modules/Stadiums/stadiumsCatalog";
import {stadiumImageData} from "../../data/stadiums/stadiumImage";
import {Box, Paper, Typography, useTheme} from "@mui/material";
import Image from "next/image";
import SeoTitle from "../../components/SeoTitle/SeoTitle";

const StadiumPage = () => {
    const theme = useTheme()
    return (
        <>
            <SeoTitle siteName={"Fifa world cup"}
                      title={`Stadiums`}/>
            <Paper sx={{backgroundColor: theme.palette.primary.main, py: '2rem' }}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mb={'2rem'}>
                    <Image src={'/assets/images/logo.png'} alt={'logo of world cup'} width={50} height={70} />
                    <Typography variant={'h5'} color={'white'}>Qatar World Cup 2022 Stadiums</Typography>
                </Box>
                <StadiumsCatalog imageList={stadiumImageData} />
            </Paper>
        </>
    );
};

export default StadiumPage;