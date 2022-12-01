import Image from "next/image";
import {Box, Button, Paper, Tab, Tabs, Typography, useMediaQuery, useTheme} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
// import PossessionChart from "../PossessionChart/PossessionChart";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import {TimelineOppositeContent} from "@mui/lab";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import NextLink from "next/link";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";
import {MatchI} from "../../../../interfaces/matches";
import {useRouter} from "next/router";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import React, {useEffect, useState} from "react";
import SeoTitle from "../../../../components/SeoTitle/SeoTitle";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    }
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    backgroundColor: '#eeeee4',
    '&:last-child td, &:last-child th': {
        border: 0,
    }

}));

type Props = {
    currentLive?: boolean
}

const LiveMatchContent = ({currentLive}: Props) => {
    const theme = useTheme()
    const [match, setMatch] = useState<MatchI>();
    const router = useRouter()
    const [loading, setLoading] = useState<Boolean>(true)
    const [tab, setTab] = useState(0);
    const medium = useMediaQuery(theme.breakpoints.up("md"));
    const small = useMediaQuery(theme.breakpoints.up("sm"));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const getMatchData = async () => {
        let response;
        if (currentLive) {
            response = await fetch('https://copa22.medeiro.tech/matches/current')
        } else {
            response = await fetch(`https://copa22.medeiro.tech/matches/${router.query.mid}`)
        }
        if (response.status === 200) {
            const data = await response.json()
            if (!currentLive) {
                setMatch(data)
            } else {
                setMatch(data[0])
            }
        }
    }

    useEffect(() => {
        getMatchData().then(res => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (match?.status !== 'completed') {
            const dataInterval = setInterval(() => {
                getMatchData().then(res => {
                    setLoading(false)
                })
            }, 1000 * 30)
            return () => clearInterval(dataInterval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match])

    const substitutions = match?.homeTeam.substitutions.concat(match?.awayTeam.substitutions).sort((a, b) => (b.minute < a.minute) ? 1 : (b.minute > a.minute) ? -1 : 0)

    if (loading) {
        return (
            <LoadingOverlay/>
        )
    }

    if (!match) {
        return (
            <>
                <SeoTitle siteName={"Fifa world cup"}
                          title={`Live`}/>
                <Box display={'flex'}
                     alignItems={'center'}
                     justifyContent={'center'}
                     textAlign={'center'}
                     minHeight={'70vh'}
                     flexDirection={'column'}>
                    <Typography variant={'h4'}>There is no any live match now!</Typography>
                    <Button href={'/matches'}
                            component={NextLink}
                            variant={'contained'}
                            sx={{mt: '2rem'}}>Back To Matches</Button>
                </Box>
            </>
        )
    }

    const chartData = [{
        name: match?.homeTeam.name,
        data: [Math.round(match?.homeTeam.statistics.ballPossession!!)],
    }, {
        name: match?.awayTeam.name,
        data: [Math.round(match?.awayTeam.statistics.ballPossession!!)],
    }]

    return (
        <>
            <SeoTitle siteName={"Fifa world cup"}
                      title={`Live`}/>
            <Box display={'flex'}
                 justifyContent={'center'}
                 alignItems={'center'}>
                <Image src={'/assets/images/logo.png'}
                       alt={'logo of world cup'}
                       width={50}
                       height={70}/>
                <Typography textAlign={'center'}
                            variant={'h5'}
                            color={theme.palette.primary.main}>Qatar World Cup 2022 Live Stats</Typography>
            </Box>

            <Box py={'3rem'}>
                <Grid2 container
                       spacing={2}
                       alignItems={'center'}>
                    <Grid2 xs={5}
                           md={4}
                           display={'flex'}
                           alignItems={'center'}>
                        <Typography variant={small ? 'subtitle1' : medium ? 'h6' : 'subtitle2'}
                                    fontWeight={700}>{match?.homeTeam.name!!.toUpperCase()}</Typography>
                        <Box sx={{width: {xs: 40, md: 90}, height: {xs: 25, md: 50}, position: 'relative'}}>
                            <Image style={{
                                verticalAlign: 'text-top',
                                marginLeft: small ? '0.5rem' : medium ? '2rem' : '0.1rem'
                            }}
                                   src={`/assets/images/standingLogos/${match?.homeTeam?.country}.png`}
                                   fill
                                   alt={match?.homeTeam?.name!!}/>
                        </Box>

                    </Grid2>
                    <Grid2 xs={3}
                           md={4}
                           display={'flex'}
                           justifyContent={'center'}>
                        <Typography fontWeight={700}
                                    variant={small ? 'subtitle1' : medium ? 'h6' : 'subtitle2'}>{match?.homeTeam.goals!!}</Typography>
                        <Typography fontWeight={700}
                                    variant={small ? 'subtitle1' : medium ? 'h6' : 'subtitle2'}
                                    mx={small ? '0.5rem' : medium ? '2rem' : '0.2rem'}>-</Typography>
                        <Typography fontWeight={700}
                                    variant={small ? 'subtitle1' : medium ? 'h6' : 'subtitle2'}>{match?.awayTeam.goals!!}</Typography>
                    </Grid2>
                    <Grid2 xs={4}
                           display={'flex'}
                           justifyContent={'flex-end'}
                           alignItems={'center'}>
                        <Box sx={{width: {xs: 40, md: 90}, height: {xs: 25, md: 50}, position: 'relative'}}>
                            <Image style={{verticalAlign: 'text-top', marginRight: '2rem'}}
                                   src={`/assets/images/standingLogos/${match?.awayTeam?.country}.png`}
                                   fill
                                   alt={match?.awayTeam?.name!!}/>
                        </Box>

                        <Typography variant={small ? 'subtitle1' : medium ? 'h6' : 'subtitle2'}
                                    fontWeight={700}>{match?.awayTeam?.name!!.toUpperCase()}</Typography>
                    </Grid2>
                </Grid2>
            </Box>

            <Box display={'flex'}
                 justifyContent={'center'}
                 alignItems={'center'}>
                <Typography variant={'subtitle1'}
                            sx={{
                                backgroundColor: 'rgb(85, 0, 101)',
                                padding: '3px 15px',
                                color: 'white',
                                borderRadius: '20px'
                            }}>
                    {match?.status === 'completed' ? 'Full time' : match?.status === 'scheduled' ? 'Match not started yet!' : match?.time}
                </Typography>
            </Box>

            <Box my={'2rem'}>
                <Tabs value={tab}
                      onChange={handleChange}
                      centered>
                    <Tab label="Stats" {...a11yProps(0)} />
                    <Tab label="Line up" {...a11yProps(1)} />
                    <Tab label="Players" {...a11yProps(2)} />
                    <Tab label="Referee info" {...a11yProps(3)} />
                </Tabs>
            </Box>

            <TabPanel value={tab}
                      index={0}>
                <Paper elevation={3}
                       sx={{backgroundColor: 'white', borderRadius: '1rem', padding: '1rem'}}>
                    <Box my={'1rem'}>
                        <Typography textAlign={'center'}
                                    variant={'h6'}
                                    my={'1rem'}
                                    color={theme.palette.primary.main}
                                    fontWeight={700}>Ball Possession</Typography>
                        {/*<PossessionChart chartData={chartData}/>*/}
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{Math.round(match?.homeTeam.statistics.ballPossession)} %</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Total</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{Math.round(match?.awayTeam.statistics.ballPossession)} %</Grid2>
                        </Grid2>
                    </Box>
                    <Box my={'2rem'}>
                        <Typography textAlign={'center'}
                                    variant={'h6'}
                                    fontWeight={700}
                                    my={'1rem'}
                                    color={theme.palette.primary.main}>Goal</Typography>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.goals}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Total</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.goals}</Grid2>
                        </Grid2>
                    </Box>
                    <Box my={'2rem'}>
                        <Typography textAlign={'center'}
                                    variant={'h6'}
                                    fontWeight={700}
                                    my={'1rem'}
                                    color={theme.palette.primary.main}>Discipline</Typography>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.yellowCards}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Yellow Cards</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.yellowCards}</Grid2>
                        </Grid2>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.redCards}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Red Cards</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.redCards}</Grid2>
                        </Grid2>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.foulsCommited}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Fouls Against</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.foulsCommited}</Grid2>
                        </Grid2>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.offsides}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Offsides</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.offsides}</Grid2>
                        </Grid2>
                    </Box>
                    <Box my={'2rem'}>
                        <Typography textAlign={'center'}
                                    variant={'h6'}
                                    fontWeight={700}
                                    my={'1rem'}
                                    color={theme.palette.primary.main}>Distribution</Typography>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.passes}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Passes</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.passes}</Grid2>
                        </Grid2>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.passesCompleted}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Passes Completed</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.passesCompleted}</Grid2>
                        </Grid2>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.crosses}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Crosses</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.crosses}</Grid2>
                        </Grid2>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.crossesCompleted}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Crosses Completed</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.crossesCompleted}</Grid2>
                        </Grid2>
                    </Box>
                    <Box my={'2rem'}>
                        <Typography textAlign={'center'}
                                    variant={'h6'}
                                    fontWeight={700}
                                    my={'1rem'}
                                    color={theme.palette.primary.main}>Set Plays</Typography>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.corners}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Corners</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.corners}</Grid2>
                        </Grid2>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.statistics.freeKicks}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Free Kicks</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.statistics.freeKicks}</Grid2>
                        </Grid2>
                        <Grid2 container
                               spacing={3}>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.homeTeam.penalties}</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>Penalties Scored</Grid2>
                            <Grid2 textAlign={'center'}
                                   xs={4}>{match?.awayTeam.penalties}</Grid2>
                        </Grid2>
                    </Box>
                </Paper>
            </TabPanel>
            <TabPanel value={tab}
                      index={1}>
                <Grid2 container>
                    <Grid2 xs={6}
                           display={'flex'}
                           flexDirection={'column'}
                           justifyContent={'center'}>
                        <Image
                            src={`/assets/images/standingLogos/${match?.homeTeam?.country}.png`}
                            width={50}
                            height={30}
                            alt={match?.homeTeam?.name!!}/>
                        <Typography variant={'subtitle1'}
                                    mt={'1rem'}>
                            {match?.homeTeam.statistics.tactics}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={6}
                           display={'flex'}
                           flexDirection={'column'}
                           justifyContent={'center'}
                           alignItems={'flex-end'}>
                        <Image
                            src={`/assets/images/standingLogos/${match?.awayTeam?.country}.png`}
                            width={50}
                            height={30}
                            alt={match?.awayTeam?.name!!}/>
                        <Typography variant={'subtitle1'}
                                    mt={'1rem'}>
                            {match?.awayTeam.statistics.tactics}
                        </Typography>
                    </Grid2>
                </Grid2>
                <Box my={'2rem'}>
                    <Typography mb={'1rem'}
                                variant={'h6'}
                                fontWeight={700}>Substitutions Timeline</Typography>
                    <Timeline>
                        {
                            substitutions?.map((item, index) => {
                                const foundPlayerInHomeTeam = match?.homeTeam.startingPlayers.find((player) => player.name === item.playerOut.name)
                                if (foundPlayerInHomeTeam) {
                                    return <TimelineItem key={index}>
                                        <TimelineOppositeContent>
                                            <Typography variant={'subtitle2'}
                                                        color={theme.palette.success.main}><ArrowDropUpIcon/>{item.playerIn.name}
                                            </Typography>
                                            <Typography variant={'subtitle2'}
                                                        color={theme.palette.error.main}><ArrowDropDownIcon/>{item.playerOut.name}
                                            </Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot/>
                                            <TimelineConnector/>
                                        </TimelineSeparator>
                                        <TimelineContent color="text.secondary">{item.minute}</TimelineContent>
                                    </TimelineItem>
                                } else {
                                    return <TimelineItem key={index}>
                                        <TimelineOppositeContent color="text.secondary">
                                            {item.minute}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot/>
                                            <TimelineConnector/>
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Typography variant={'subtitle2'}
                                                        color={theme.palette.success.main}>{item.playerIn.name}<ArrowDropUpIcon/></Typography>
                                            <Typography variant={'subtitle2'}
                                                        color={theme.palette.error.main}>{item.playerOut.name}<ArrowDropDownIcon/></Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                }
                            })
                        }
                    </Timeline>
                </Box>
            </TabPanel>

            <TabPanel index={2}
                      value={tab}>
                <Typography variant={'h5'} color={theme.palette.primary.main} mb={'1rem'}>{match?.homeTeam.name} players</Typography>
                <TableContainer elevation={5}
                                component={Paper}
                                sx={{
                                    borderRadius: '1rem',
                                    width: {xs: 300, sm: 500, md: 700, lg: 900},
                                    marginX: 'auto'
                                }}>
                    <Table sx={{minWidth: 700}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{width: {xs: '40px', sm: '100px'}}}>Number</StyledTableCell>
                                <StyledTableCell sx={{
                                    position: 'sticky',
                                    left: '0',
                                    boxShadow: "5px 2px 5px grey",
                                    width: {xs: '80px', md: '400px'}
                                }}>Name</StyledTableCell>
                                <StyledTableCell align="center">Position</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {match?.homeTeam.startingPlayers.map((player, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th"
                                                     scope="row" sx={{width: {xs: '40px', sm: '100px'}}}>
                                        <Typography variant={'subtitle1'}>{player.number}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell component="th"
                                                     scope="row"
                                                     sx={{
                                                         position: 'sticky',
                                                         left: '0',
                                                         boxShadow: "5px 2px 5px grey",
                                                         backgroundColor: '#eeeee4',
                                                         width: {xs: '80px', md: '400px'}
                                                     }}>
                                        {player.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{player.position}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant={'h5'} color={theme.palette.primary.main} mt={'3rem'} mb={'1rem'}>{match?.awayTeam.name} players</Typography>
                <TableContainer elevation={5}
                                component={Paper}
                                sx={{
                                    borderRadius: '1rem',
                                    width: {xs: 300, sm: 500, md: 700, lg: 900},
                                    marginX: 'auto'
                                }}>
                    <Table sx={{minWidth: 700}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{width: {xs: '40px', sm: '100px'}}}>Number</StyledTableCell>
                                <StyledTableCell sx={{
                                    position: 'sticky',
                                    left: '0',
                                    boxShadow: "5px 2px 5px grey",
                                    width: {xs: '80px', md: '400px'}
                                }}>Name</StyledTableCell>
                                <StyledTableCell align="center">Position</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {match?.awayTeam.startingPlayers.map((player, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th"
                                                     scope="row" sx={{width: {xs: '40px', sm: '100px'}}}>
                                        <Typography variant={'subtitle1'}>{player.number}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell component="th"
                                                     scope="row"
                                                     sx={{
                                                         position: 'sticky',
                                                         left: '0',
                                                         boxShadow: "5px 2px 5px grey",
                                                         backgroundColor: '#eeeee4',
                                                         width: {xs: '80px', md: '400px'}
                                                     }}>
                                        {player.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{player.position}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            <TabPanel index={3}
                      value={tab}>
                <TableContainer elevation={5}
                                component={Paper}
                                sx={{
                                    borderRadius: '1rem',
                                    width: {xs: 300, sm: 500, md: 700, lg: 900},
                                    marginX: 'auto'
                                }}>
                    <Table sx={{minWidth: 700}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell sx={{
                                    position: 'sticky',
                                    left: '0',
                                    boxShadow: "5px 2px 5px grey",
                                    width: {xs: '80px', md: '400px'}
                                }}>Role</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Country</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {match?.officials.map((official, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th"
                                                     scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell component="th"
                                                     scope="row"
                                                     sx={{
                                                         position: 'sticky',
                                                         left: '0',
                                                         boxShadow: "5px 2px 5px grey",
                                                         backgroundColor: '#eeeee4',
                                                         width: {xs: '140px', md: '400px'}
                                                     }}>
                                        {official.role}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{official.name}</StyledTableCell>
                                    <StyledTableCell align="center">{official.country}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>


        </>
    );
};

export default LiveMatchContent;