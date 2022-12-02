import StandingTable from "../../modules/Standings/components/standingTable/StandingTable";
import {Box, Container, Paper, Tab, Tabs, Typography, useTheme} from "@mui/material";
import {GetServerSideProps} from "next";
import {getStandings} from "../../utils/api.util";
import {StandingGroupI} from "../../interfaces/standingTable";
import {useRouter} from "next/router";
import SeoTitle from "../../components/SeoTitle/SeoTitle";
import React, {useState} from "react";
import PlayoffChart from "../../modules/matches/components/playoff/playoffChart";

type Props = {
    standingData: StandingGroupI[]
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Standings = ({standingData}: Props) => {
    const theme = useTheme()
    const router = useRouter()
    const [tab, setTab] = useState(0);
    const clickHandler = (code: string) => {
        router.push(`/groups/${code}`)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <>
            <SeoTitle siteName={"Fifa world cup"}
                      title={`Standings`}/>
            <Paper elevation={0}>
                <Container maxWidth={'xl'}>
                    <Box my={'2rem'}>
                        <Tabs value={tab}
                              onChange={handleChange}
                              centered>
                            <Tab label="Groups Stage" {...a11yProps(0)} />
                            <Tab label="Play-off" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tab}
                              index={0}>
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
                    </TabPanel>
                    <TabPanel index={tab} value={1}>
                        <PlayoffChart />
                    </TabPanel>

                </Container>
            </Paper>
        </>
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