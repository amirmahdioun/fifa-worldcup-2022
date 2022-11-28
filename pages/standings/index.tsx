import StandingTable from "../../modules/Standings/components/standingTable/StandingTable";
import {Box, Container, Paper, Typography, useTheme} from "@mui/material";
import {GetServerSideProps} from "next";
import {getStandings} from "../../utils/api.util";
import {StandingGroupI} from "../../interfaces/standingTable";
import {useRouter} from "next/router";

type Props = {
    standingData: StandingGroupI[]
}
const Standings = ({standingData}: Props) => {
    const theme = useTheme()
    const router = useRouter()
    const clickHandler = (code: string) => {
        router.push(`/groups/${code}`)
    }

    return (
        <Paper elevation={0}>
            <Container maxWidth={'xl'}>
                {
                    standingData.map((group: StandingGroupI) => {
                        return <Box my={'4rem'}
                                    key={group.id}>
                            <Typography variant={'h4'}
                                        mb={'1rem'}
                                        sx={{cursor: 'pointer'}}
                                        onClick={() => clickHandler(group.code)}
                                        textAlign={'center'}
                                        color={theme.palette.primary.main}>Group {group.code}</Typography>
                            <StandingTable rowData={group.teams}/>
                        </Box>
                    })
                }
            </Container>
        </Paper>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await getStandings()
    return {
        props: {
            standingData: data
        }
    }
}

export default Standings;