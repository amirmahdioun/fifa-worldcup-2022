import StandingTable from "../../modules/Standings/components/standingTable/StandingTable";
import {Box, Container, Paper, Typography, useTheme} from "@mui/material";
import {GetServerSideProps} from "next";
import {getStandings} from "../../utils/api.util";
import {StandingGroupI} from "../../interfaces/standingTable";

type Props = {
    standingData: StandingGroupI[]
}
const Standings = ({standingData}: Props) => {
    const theme = useTheme()

    return (
        <Paper elevation={0}>
            <Container maxWidth={'xl'}>
                {
                    standingData.map((group: StandingGroupI) => {
                        return <Box my={'4rem'} key={group.id}>
                            <Typography variant={'h4'}
                                        mb={'1rem'}
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