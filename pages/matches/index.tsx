import {MatchI} from "../../interfaces/matches";
import {Box, Container, Paper, Typography, useTheme} from "@mui/material";
import MatchCard from "../../modules/matches/components/matchCard/matchCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import SeoTitle from "../../components/SeoTitle/SeoTitle";
import {getAllMatches} from "../../utils/api.util";


const Matches = () => {
    const today = new Date().toISOString()

    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1) //Add ISOString method to convert to iso format

    const yesterday = new Date()
    yesterday.setDate(new Date().getDate() - 1)


    const [todayMatches, setTodayMatches] = useState<MatchI[]>()
    const [tomorrowMatches, setTomorrowMatches] = useState<MatchI[]>()
    const [yesterdayMatches, setYesterdayMatches] = useState<MatchI[]>()
    const [loading, setLoading] = useState(true)
    const theme = useTheme()
    const todayElementRef = useRef<null | HTMLDivElement>(null)

    const getTodayMatches = async () => {
        return await getAllMatches(today.split('T')[0])
    }

    const getTomorrowMatches = async () => {
        return await getAllMatches(tomorrow.toISOString().split('T')[0])
    }

    const getYesterdayMatches = async () => {
        return await getAllMatches(yesterday.toISOString().split('T')[0])
    }

    useEffect(() => {
        if(!loading){
            todayElementRef.current?.scrollIntoView({ behavior: "smooth", block: "center"})
        }
    },[loading])

    useEffect(() => {
        if(todayMatches){
            const timer = setInterval(() => {
                getTodayMatches().then(res => setTodayMatches(res))
            }, 1000 * 60 * 5)
            return () => clearInterval(timer)
        }else{
            Promise.all([getTodayMatches(), getTomorrowMatches(), getYesterdayMatches()]).then(res => {
                setTodayMatches(res[0])
                setTomorrowMatches(res[1])
                setYesterdayMatches(res[2])
                setLoading(false)
            })
        }
    },[todayMatches])

    if (loading) {
        return (
            <LoadingOverlay/>
        )
    }

    return (
        <>
            <SeoTitle siteName={"Fifa world cup"}
                      title={`Matches`}/>
            <Paper
                elevation={0}
                sx={{backgroundColor: '#f5f5f5', minHeight: '90vh', py: '3rem'}}
            >
                <Container>
                    <Box display={'flex'}
                         justifyContent={'center'}
                         alignItems={'center'}>
                        <Image src={'/assets/images/logo.png'}
                               alt={'logo of world cup'}
                               width={50}
                               height={70}/>
                        <Typography textAlign={'center'}
                                    variant={'h5'}
                                    color={theme.palette.primary.main}>Qatar World Cup 2022 Matches</Typography>
                    </Box>
                    {
                        !!yesterdayMatches?.length && (
                            <Box my={'2rem'}>
                                <Typography variant={'h6'}
                                            color={theme.palette.primary.main}>Yesterday Matches</Typography>
                                <Grid2 container
                                       spacing={2}>
                                    {
                                        yesterdayMatches?.map((match: MatchI) => {
                                            return <Grid2 key={match.id}
                                                          xs={12}
                                                          md={6}>
                                                <MatchCard data={match}/>
                                            </Grid2>
                                        })
                                    }
                                </Grid2>
                            </Box>
                        )
                    }

                    <Box my={'2rem'} ref={todayElementRef}>
                        <Typography variant={'h6'}
                                    color={theme.palette.primary.main}>Today Matches</Typography>
                        <Grid2 container
                               spacing={2}>
                            {
                                todayMatches?.length ? todayMatches?.map((match: MatchI) => {
                                    return <Grid2 key={match.id}
                                                  xs={12}
                                                  md={6}>
                                        <MatchCard data={match}/>
                                    </Grid2>
                                }) : (
                                    <Typography variant={'h6'}>Today was a weekend for world cup!</Typography>
                                )
                            }
                        </Grid2>
                    </Box>
                    <Box my={'2rem'}>
                        <Typography variant={'h6'}
                                    color={theme.palette.primary.main}>Tomorrow Matches</Typography>
                        <Grid2 container
                               spacing={2}>
                            {
                                tomorrowMatches?.length ? tomorrowMatches?.map((match: MatchI) => {
                                    return <Grid2 key={match.id}
                                                  xs={12}
                                                  md={6}>
                                        <MatchCard data={match}/>
                                    </Grid2>
                                }) : (
                                    <Typography variant={'h6'}>Tomorrow is a good time to rest!</Typography>
                                )
                            }
                        </Grid2>
                    </Box>
                </Container>
            </Paper>
        </>

    );
};

export default Matches;