import {MatchI} from "../../interfaces/matches";
import {Box, Container, Paper, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import MatchCard from "../../modules/matches/components/matchCard/matchCard";
import {useRouter} from "next/router";
import UniqBy from 'lodash/uniqBy'
import Image from "next/image";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import SeoTitle from "../../components/SeoTitle/SeoTitle";


const GroupMatches = () => {
    const [matches, setMatches] = useState<MatchI[]>()
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const theme = useTheme()
    const groupId = router.query.gid!!.toString().toUpperCase()

    const getMatches = async () => {
        let allMatches: any[] = []
        const response = await fetch('https://copa22.medeiro.tech/groups')
        const data = await response.json()
        const groupData = data.find((item: any) => item.code === groupId)
        groupData.teams.map((team: any) => {
            allMatches.push(...team.matches)
        })
        allMatches = allMatches.sort((a, b) => (b.date < a.date) ? 1 : (b.date > a.date) ? -1 : 0)
        allMatches = UniqBy(allMatches, 'id')
        setMatches(allMatches)
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
                      title={`Group ${groupId}`}/>
            <Paper
                sx={{minHeight: '80vh', backgroundColor: '#f5f5f5', py: '3rem'}}
                elevation={0}
            >
                <Container>
                    <Box display={'flex'}
                         justifyContent={'center'}
                         alignItems={'center'}>
                        <Image src={'/assets/images/logo.png'}
                               alt={'logo of world cup'}
                               width={50}
                               height={70}/>
                        <Typography variant={'h5'}
                                    color={theme.palette.primary.main}>Qatar World Cup 2022 Groups</Typography>
                    </Box>
                    <Box my={'2rem'}>
                        <Typography variant={'h6'}
                                    color={theme.palette.primary.main}>Group {groupId} Matches</Typography>
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

export default GroupMatches;