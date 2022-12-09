import {Typography, useTheme} from "@mui/material";
import {MatchI} from "../../../../interfaces/matches";
import React, {useEffect, useState} from "react";
import {
    Bracket,
    Seed,
    SeedItem,
    SeedTeam,
    IRenderSeedProps,
    ISeedProps, IRoundProps
} from 'react-brackets';
import Image from "next/image";
import {useRouter} from "next/router";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";


const CustomSeed = ({seed, breakpoint}: IRenderSeedProps) => {
    const router = useRouter()
    const clickHandler = (id: string) => {
        if(seed.teams[0].name){
            router.push(`/matches/live/${id}`)
        }
    }
    return (
        <Seed mobileBreakpoint={breakpoint}
              style={{fontSize: 12}}>
            <SeedItem>
                <div onClick={() => clickHandler(seed?.id as string)} style={{cursor: "pointer"}}>
                    <SeedTeam style={{backgroundColor: seed.winner === seed.teams[0].name ? '#1a7c14' : '#9a1132', borderBottom: '1px solid white'}}>
                        {
                            seed.teams[0]?.flag && (
                                <Image
                                    src={`/assets/images/standingLogos/${seed.teams[0]?.flag}.png`}
                                    width={35}
                                    height={20}
                                    alt={seed.teams[0]?.name!!}/>
                            )
                        }
                        <Typography variant={'subtitle2'}>
                            {seed.teams[0]?.name || 'TBD'}
                        </Typography>
                        {seed.status === 'completed' && seed.teams[0]?.score}
                        {!!seed.teams[0]?.penalty && <Typography variant={'subtitle2'}>
                            ( {seed.teams[0]?.penalty} )
                        </Typography>}
                    </SeedTeam>
                    <SeedTeam style={{backgroundColor: seed.winner === seed.teams[1].name ? '#1a7c14' : '#9a1132',}}>
                        {
                            seed.teams[1]?.flag && (
                                <Image
                                    src={`/assets/images/standingLogos/${seed.teams[1]?.flag}.png`}
                                    width={35}
                                    height={20}
                                    alt={seed.teams[1]?.name!!}/>
                            )
                        }
                        <Typography variant={'subtitle2'}>
                            {seed.teams[1]?.name || 'TBD'}
                        </Typography>
                        {seed.status === 'completed' && seed.teams[1]?.score}
                        {!!seed.teams[0]?.penalty && <Typography variant={'subtitle2'}>
                            ( {seed.teams[1]?.penalty} )
                        </Typography>}
                    </SeedTeam>
                </div>
                <div>{seed.date}</div>
            </SeedItem>
        </Seed>
    );
};

type Stages = {
    name: string,
    matches: MatchI[]
}

const PlayoffChart = () => {
    const theme = useTheme()
    const [roundMatches, setRoundMatches] = useState<ISeedProps[]>([])
    const [quarterMatches, setQuarterMatches] = useState<ISeedProps[]>([])
    const [semiFinalMatches, setSemiFinalMatches] = useState<ISeedProps[]>([])
    const [finalMatch, setFinalMatch] = useState<ISeedProps[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const getMatches = async () => {
        const response = await fetch('https://copa22.medeiro.tech/brackets')
        return await response.json()
    }

    useEffect(() => {
        getMatches().then((res: Stages[]) => {
            // console.log('res is : ', res)
            const roundMatches = [res[0].matches.slice(0,4), res[0].matches.slice(4, res[0].matches.length)]
            for (let i = 0; i < roundMatches.length; i++) {
                roundMatches[i].slice(0,2).map(match => {
                    const data = {
                        id: match.id,
                        date: new Date(match.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            day: '2-digit',
                            month: 'short',
                            hour: 'numeric',
                            minute: '2-digit',
                            timeZoneName: 'longGeneric'
                        }),
                        status: match.status,
                        winner: match.status === 'completed' ? match.winner : false,
                        teams: [{name: match.homeTeam.name, flag: match.homeTeam.country, score: match.homeTeam.goals,penalty: match.homeTeam.penalties}, {name: match.awayTeam.name, flag: match.awayTeam.country, score: match.awayTeam.goals, penalty: match.awayTeam.penalties}],
                    }
                    setRoundMatches(prevState => {
                        return [...prevState, data]
                    })
                })
            }
            for (let i = 0; i < roundMatches.length; i++) {
                roundMatches[i].slice(2,5).map(match => {
                    const data = {
                        id: match.id,
                        date: new Date(match.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            day: '2-digit',
                            month: 'short',
                            hour: 'numeric',
                            minute: '2-digit',
                            timeZoneName: 'longGeneric'
                        }),
                        status: match.status,
                        winner: match.status === 'completed' ? match.winner : false,
                        teams: [{name: match.homeTeam.name, flag: match.homeTeam.country, score: match.homeTeam.goals,penalty: match.homeTeam.penalties}, {name: match.awayTeam.name, flag: match.awayTeam.country, score: match.awayTeam.goals,penalty: match.awayTeam.penalties}],
                    }
                    setRoundMatches(prevState => {
                        return [...prevState, data]
                    })
                })
            }
            // const roundTeams1 = roundMatches[0].slice(0,2).map(match => {
            //     const data = {
            //         id: match.id,
            //         date: new Date(match.date).toLocaleDateString('en-US', {
            //             weekday: 'short',
            //             day: '2-digit',
            //             month: 'short',
            //             hour: 'numeric',
            //             minute: '2-digit',
            //             timeZoneName: 'longGeneric'
            //         }),
            //         teams: [{name: match.homeTeam.name, flag: match.homeTeam.country}, {name: match.awayTeam.name, flag: match.awayTeam.country}],
            //     }
            //     setRoundMatches(prevState => {
            //         return [...prevState, data]
            //     })
            // })
            //
            // const roundTeams2 = roundMatches[1].slice(0,2).map(match => {
            //     const data = {
            //         id: match.id,
            //         date: new Date(match.date).toLocaleDateString('en-US', {
            //             weekday: 'short',
            //             day: '2-digit',
            //             month: 'short',
            //             hour: 'numeric',
            //             minute: '2-digit',
            //             timeZoneName: 'longGeneric'
            //         }),
            //         teams: [{name: match.homeTeam.name, flag: match.homeTeam.country}, {name: match.awayTeam.name, flag: match.awayTeam.country}],
            //     }
            //     setRoundMatches(prevState => {
            //         return [...prevState, data]
            //     })
            // })

            // const roundTeams3 = roundMatches[0].slice(2,5).map(match => {
            //     const data = {
            //         id: match.id,
            //         date: new Date(match.date).toLocaleDateString('en-US', {
            //             weekday: 'short',
            //             day: '2-digit',
            //             month: 'short',
            //             hour: 'numeric',
            //             minute: '2-digit',
            //             timeZoneName: 'longGeneric'
            //         }),
            //         teams: [{name: match.homeTeam.name, flag: match.homeTeam.country}, {name: match.awayTeam.name, flag: match.awayTeam.country}],
            //     }
            //     setRoundMatches(prevState => {
            //         return [...prevState, data]
            //     })
            // })

            // const roundTeams4 = roundMatches[1].slice(2,5).map(match => {
            //     const data = {
            //         id: match.id,
            //         date: new Date(match.date).toLocaleDateString('en-US', {
            //             weekday: 'short',
            //             day: '2-digit',
            //             month: 'short',
            //             hour: 'numeric',
            //             minute: '2-digit',
            //             timeZoneName: 'longGeneric'
            //         }),
            //         teams: [{name: match.homeTeam.name, flag: match.homeTeam.country}, {name: match.awayTeam.name, flag: match.awayTeam.country}],
            //     }
            //     setRoundMatches(prevState => {
            //         return [...prevState, data]
            //     })
            // })


            res.map((stage,index) => {
                const teams = stage.matches.sort((a, b) => (b.matchNumber!! < a.matchNumber!!) ? 1 : (b.matchNumber!! > a.matchNumber!!) ? -1 : 0).map((match: MatchI): ISeedProps => {
                    return {
                        id: match.id,
                        date: new Date(match.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            day: '2-digit',
                            month: 'short',
                            hour: 'numeric',
                            minute: '2-digit',
                            timeZoneName: 'longGeneric'
                        }),
                        winner: match.status === 'completed' ? match.winner : false,
                        status: match.status,
                        teams: [{name: match.homeTeam.name, flag: match.homeTeam.country, score: match.homeTeam.goals,penalty: match.homeTeam.penalties}, {name: match.awayTeam.name, flag: match.awayTeam.country, score: match.awayTeam.goals,penalty: match.awayTeam.penalties}],
                    }
                })
                // if(index === 0){
                //     setRoundMatches([...teams])
                // }else
                if(index === 1){
                    setQuarterMatches([...teams])
                }else if(index === 2){
                    setSemiFinalMatches([...teams])
                }else if(index === 3) {
                    setFinalMatch([...teams])
                }
                setLoading(false)
            })
        })
        // Promise.all([getMatchesByStage('Round of 16'),getMatchesByStage('Quarter-final'),getMatchesByStage('Semi-final'),getMatchesByStage('Final')]).then(res => {
        //     res.map((stage,index) => {
        //         const teams = stage.map((match: MatchI): ISeedProps => {
        //                     return {
        //                         id: match.id,
        //                         date: new Date(match.date).toLocaleDateString('en-US', {
        //                             weekday: 'short',
        //                             day: '2-digit',
        //                             month: 'short',
        //                             hour: 'numeric',
        //                             minute: '2-digit',
        //                             timeZoneName: 'longGeneric'
        //                         }),
        //                         teams: [{name: match.homeTeam.name, flag: match.homeTeam.country}, {name: match.awayTeam.name, flag: match.awayTeam.country}],
        //                     }
        //         })
        //         if(index === 0){
        //             setRoundMatches([...teams])
        //         }else if(index === 1){
        //             setQuarterMatches([...teams])
        //         }else if(index === 2){
        //             setSemiFinalMatches([...teams])
        //         }else {
        //             setFinalMatch([...teams])
        //         }
        //         setLoading(false)
        //     })
        // })
    }, [])


    const chartData: IRoundProps[] = [
        {
            title: 'Round of 16',
            seeds: [...roundMatches]
        },
        {
            title: 'Quarter final',
            seeds: [...quarterMatches]
        },
        {
            title: 'Semi-final',
            seeds: [...semiFinalMatches]
        },
        {
            title: 'Final',
            seeds: [...finalMatch]
        }
    ]

    if(loading){
        return <LoadingOverlay />
    }

    return (
        <Bracket
            rounds={chartData}
            renderSeedComponent={CustomSeed}
            mobileBreakpoint={994}
            roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
                return <div style={{
                    marginRight: '1rem',
                    textAlign: 'center',
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    borderRadius: '0.2rem'
                }}>{title}</div>;
            }}
        />
    );
};

export default PlayoffChart;