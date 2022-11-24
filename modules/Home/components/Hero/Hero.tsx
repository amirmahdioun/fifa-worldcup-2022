import Image from "next/image";
import {Box, Typography} from "@mui/material";

type Props = {
    heroImageSrc: string,
    description?: string
}

const Hero = ({heroImageSrc, description}: Props) => {
    return (
            <Box sx={{width: '100%', height: '700px', position: 'relative', zIndex: -1 }}>
                <Image src={heroImageSrc}
                       fill
                       style={{zIndex: -1}}
                       alt={'hero background image'}/>
                {description && <Typography variant={'body1'} position={'absolute'} top={200} right={200} color={'white'}>{description}</Typography>}

            </Box>
    );
};

export default Hero;