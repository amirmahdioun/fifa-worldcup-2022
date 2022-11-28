import {Typography, useMediaQuery, useTheme} from "@mui/material";
import Image from "next/image";
import {GroupCardItemI} from "../../../../interfaces/groupCardItem";
import Grid2 from "@mui/material/Unstable_Grid2";


const GroupCardItem = ({order, logoUrl, teamName} : GroupCardItemI) => {
    const theme = useTheme()
    const xlarge = useMediaQuery(theme.breakpoints.up('xl'))

    const imageLoader = ({ src, width, quality }: any) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
            <Grid2 container
                   sx={{backgroundColor: '#640f2b', color: 'white', borderRadius: '10px', padding: '0.2rem 0.4rem'}}
                   alignItems={'center'}
                   alignContent={'center'}
                   mb={'1rem'}
                   padding={0.3}
                   spacing={1}
            >

                <Grid2
                    xs={2}
                    md={2}><Typography variant={'caption'}
                                       fontFamily={'Poppins'}>{order}</Typography></Grid2>
                <Grid2
                    xs={2}
                    md={2}>
                    <Image src={logoUrl}
                           alt={`${teamName} logo`}
                           style={{display: 'flex'}}
                           loader={imageLoader}
                           width={30}
                           height={20}/>
                </Grid2>
                <Grid2
                    xs={8}
                    md={8}><Typography variant={xlarge ? 'h6' : 'subtitle1'}>{teamName}</Typography></Grid2>
            </Grid2>

    );
};

export default GroupCardItem;