import {MatchI} from "../../interfaces/matches";
import {Box, Container, Paper, Typography, useTheme} from "@mui/material";
import MatchCard from "../../modules/matches/components/matchCard/matchCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useEffect, useState} from "react";
import Image from "next/image";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import SeoTitle from "../../components/SeoTitle/SeoTitle";


const Matches = () => {
    // const now = new Date().toISOString().slice(0, 10);
    // const serverDate = '2022-11-27T16:00:00.000Z'
    // const yesterday = new Date();
    // yesterday.setDate(yesterday.getDate() - 1);
    //
    // console.log(yesterday.toISOString().slice(0, 10)); // 👉️ "Thu Jan 13 2022"
    // console.log('now is: ', now)
    // console.log('server date is: ', serverDate)
    //
    // console.log(serverDate.includes(now))
    const [matches, setMatches] = useState<MatchI[]>()
    const [loading, setLoading] = useState(true)
    const theme = useTheme()

    const getMatches = async () => {
        const response = await fetch('https://copa22.medeiro.tech/matches/today')
        const data = await response.json()
        setMatches(data)
    }

    useEffect(() => {
        getMatches().then(res => setLoading(false))
    }, [])

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
                    <Box my={'2rem'}>
                        <Typography variant={'h6'}
                                    color={theme.palette.primary.main}>Today Matches</Typography>
                        <Grid2 container
                               spacing={2}>
                            {
                                matches?.map((match: MatchI) => {
                                    return <Grid2 key={match.id}
                                                  xs={12}
                                                  md={6}>
                                        <MatchCard data={match}/>
                                    </Grid2>
                                })
                            }
                        </Grid2>
                    </Box>
                </Container>
            </Paper>
        </>

    );
};

export default Matches;