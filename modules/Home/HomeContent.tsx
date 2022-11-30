import Hero from "./components/Hero/Hero";
import StadiumsCatalog from "../Stadiums/stadiumsCatalog";
import {stadiumImageData} from "../../data/stadiums/stadiumImage";
import {Box, Button, Container, Skeleton, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {MatchI} from "../../interfaces/matches";
import {getTodayMatches} from "../../utils/api.util";
import MatchCard from "../matches/components/matchCard/matchCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import NextLink from "next/link";

type todayMatches = {
    loading: boolean,
    data: MatchI[] | undefined
}

const HomeContent = () => {
    const theme = useTheme()
    const [todayMatches, setTodayMatches] = useState<todayMatches>({
        loading: true,
        data: undefined
    })

    useEffect(() => {
        if(todayMatches.data){
            const timer = setInterval(()=> {
                getTodayMatches('scheduled').then(res => {
                    setTodayMatches({data: res.slice(0,2), loading: false})
                })
            }, 1000 * 60 * 10)
            return () => clearInterval(timer)
        }else{
            getTodayMatches('scheduled').then(res => {
                setTodayMatches({data: res.slice(0,2), loading: false})
            })
        }
    }, [todayMatches.data?.length])



    return (
        <Box>
            <Hero heroImageSrc={'/assets/images/header-background.jpg'}/>
            <Box my={'4rem'}>
                <Typography textAlign={'center'} mb={'2rem'} color={theme.palette.primary.main} textTransform={'uppercase'} fontWeight={700} variant={'h4'}>Stadiums in Qatar</Typography>
                <StadiumsCatalog imageList={stadiumImageData}/>
            </Box>
            <Box my={'4rem'}>
                <Typography textAlign={'center'} mb={'2rem'} color={theme.palette.primary.main} textTransform={'uppercase'} fontWeight={700} variant={'h4'}>Don't lose next matches!</Typography>
                <Container maxWidth={'lg'}>
                    {
                        (!todayMatches.loading && todayMatches.data?.length === 0) ? (
                            <Typography variant={'h5'} color={theme.palette.primary.main} textAlign={'center'}>There is no any upcoming match for today!</Typography>
                        ) : (
                            <Grid2 container spacing={2}>
                                <Grid2 color={theme.palette.primary.main} xs={12} md={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <Typography variant={'h5'}>Later on today!</Typography>
                                </Grid2>
                                {
                                    todayMatches.loading && (
                                        <>
                                            <Grid2 xs={12} md={6}>
                                                <Skeleton variant="rounded" width={500} height={120} />
                                            </Grid2>
                                            <Grid2 xs={12} md={6}>
                                                <Skeleton variant="rounded" width={500} height={120} />
                                            </Grid2>
                                        </>

                                    )
                                }
                                {
                                    !todayMatches.loading && todayMatches.data?.map(todayMatch => {
                                        return (
                                            <Grid2 xs={12} md={6} key={todayMatch.id}>
                                                <MatchCard data={todayMatch} key={todayMatch.id} />
                                            </Grid2>
                                        )
                                    })
                                }
                                <Grid2 color={theme.palette.primary.main} xs={12} md={4} display={{md: 'flex', xs: 'none'}} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                                    <Typography variant={'h5'} textAlign={'center'}>Track your team stats online!</Typography>
                                    <Typography variant={'h5'} fontFamily={'QatarWorldCupAr'}>قطر 2022</Typography>
                                </Grid2>
                            </Grid2>
                        )
                    }
                </Container>
            </Box>
            <Box mt={'4rem'}>
                <Box sx={{backgroundColor: theme.palette.primary.main, opacity: '0.8', position: 'relative', width: '100%', height: {xs: '250px', sm: '350px' ,md:'500px'}}}>
                    <Image src={'/assets/images/worldcup1986.jpg'} alt={'world cup 1986 banner'} fill style={{filter: 'brightness(106%) saturate(177%) contrast(117%)'}} />
                    <Box sx={{position: 'absolute', top: 0, width: '100%', height: '100%', backgroundColor: '#5f0523', opacity: 0.6}}/>
                    <Container maxWidth={'lg'}>
                        <Box color={'white'} display={'flex'} flexDirection={'column'} position={'absolute'} top={120}>
                            <Typography variant={'h3'} fontFamily={'Poppins'} fontWeight={800}>1986</Typography>
                            <Typography variant={'h6'} fontFamily={'Poppins'} fontWeight={700} textTransform={'uppercase'}>argentina</Typography>
                            <Typography variant={'h4'} fontFamily={'Poppins'} fontWeight={800} textTransform={'uppercase'}>Maradona</Typography>
                        </Box>
                    </Container>
                </Box>
            </Box>
            <Box my={'4rem'}>
                <Typography textAlign={'center'} mb={'2rem'} color={theme.palette.primary.main} textTransform={'uppercase'} fontWeight={700} variant={'h4'}>live match stats!</Typography>
                <Grid2 container flexDirection={{xs: 'column-reverse', md: 'unset'}}>
                    <Grid2 xs={12} md={4} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Typography color={theme.palette.primary.main} fontWeight={700} variant={'h6'}>What happens in the match?</Typography>
                        <Typography color={theme.palette.primary.main} fontWeight={700} variant={'subtitle1'} textAlign={'center'}>I'm interested like you! Let's watch online stats of teams</Typography>
                        <Button variant={'contained'} component={NextLink} href={'/matches/live'} sx={{mt: '1rem'}}>Live Stats</Button>
                    </Grid2>
                    <Grid2 xs={12} md={7}>
                        <Box position={"relative"} width={'100%'} height={{xs: '250px', sm: '300px' ,md: '400px'}} borderRadius={'2rem'} overflow={'hidden'}>
                            <Image src={'/assets/images/worldcupball.jpg'} alt={'wolrd cup ball image'} fill />
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
            <Box my={'4rem'}>
                <Typography textAlign={'center'} mb={'2rem'} color={theme.palette.primary.main} textTransform={'uppercase'} fontWeight={700} variant={'h4'}>Did you miss the match?</Typography>
                <Grid2 container justifyContent={'flex-end'}>
                    <Grid2 xs={12} md={7}>
                        <Box position={"relative"} width={'100%'} height={{xs: '250px', sm: '300px' ,md: '400px'}} borderRadius={'2rem'} overflow={'hidden'}>
                            <Image src={'/assets/images/football-world-cup.jpg'} alt={'wolrd cup ball image'} fill />
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} md={4} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Typography color={theme.palette.primary.main} fontWeight={700} variant={'h6'}>Don't worry</Typography>
                        <Typography color={theme.palette.primary.main} fontWeight={700} variant={'subtitle1'} textAlign={'center'}>You can check the missed matches' statistics every time.</Typography>
                        <Button variant={'contained'} component={NextLink} href={'/matches'} sx={{mt: '1rem'}}>Today's matches</Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};

export default HomeContent;