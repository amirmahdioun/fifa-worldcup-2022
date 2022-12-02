import {useTheme} from "@mui/material";
import {getMatchesByStage} from "../../../../utils/api.util";
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
                    <SeedTeam style={{backgroundColor: '#9a1132', borderBottom: '1px solid white'}}>
                        {
                            seed.teams[0]?.flag && (
                                <Image
                                    src={`/assets/images/standingLogos/${seed.teams[0]?.flag}.png`}
                                    width={35}
                                    height={20}
                                    alt={seed.teams[0]?.name!!}/>
                            )
                        }
                        {seed.teams[0]?.name || 'TBD'}
                    </SeedTeam>
                    <SeedTeam style={{backgroundColor: '#9a1132'}}>
                        {
                            seed.teams[1]?.flag && (
                                <Image
                                    src={`/assets/images/standingLogos/${seed.teams[1]?.flag}.png`}
                                    width={35}
                                    height={20}
                                    alt={seed.teams[1]?.name!!}/>
                            )
                        }
                        {seed.teams[1]?.name || 'TBD'}
                    </SeedTeam>
                </div>
            </SeedItem>
        </Seed>
    );
};

const PlayoffChart = () => {
    const theme = useTheme()
    const [roundMatches, setRoundMatches] = useState<ISeedProps[]>([])
    const [quarterMatches, setQuarterMatches] = useState<ISeedProps[]>([])
    const [semiFinalMatches, setSemiFinalMatches] = useState<ISeedProps[]>([])
    const [finalMatch, setFinalMatch] = useState<ISeedProps[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        Promise.all([getMatchesByStage('Round of 16'),getMatchesByStage('Quarter-final'),getMatchesByStage('Semi-final'),getMatchesByStage('Final')]).then(res => {
            res.map((stage,index) => {
                const teams = stage.map((match: MatchI): ISeedProps => {
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
                                teams: [{name: match.homeTeam.name, flag: match.homeTeam.country}, {name: match.awayTeam.name, flag: match.awayTeam.country}],
                            }
                })
                if(index === 0){
                    setRoundMatches([...teams])
                }else if(index === 1){
                    setQuarterMatches([...teams])
                }else if(index === 2){
                    setSemiFinalMatches([...teams])
                }else {
                    setFinalMatch([...teams])
                }
                setLoading(false)
            })
        })
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