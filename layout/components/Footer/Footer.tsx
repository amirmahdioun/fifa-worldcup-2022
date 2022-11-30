import {Box, Link, Typography} from "@mui/material";

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <Box sx={{backgroundColor: (theme) => theme.palette.primary.main, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: '1rem'}}>
            <Typography variant={'subtitle2'}>Amir hossein Mahdioun</Typography>
            <Link underline={'hover'} href={'mailto:amir.mahdioun@gmail.com'} target={"_blank"} color={'white'} rel="noreferrer">Contact me</Link>
            <Typography variant={'subtitle1'}>All right reserved. Copyright &copy; {year}</Typography>
        </Box>
    );
};

export default Footer;