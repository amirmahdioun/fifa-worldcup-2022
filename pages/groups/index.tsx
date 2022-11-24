import {Box, Container, Paper, Typography} from "@mui/material";
import GroupsList from "../../modules/Groups/GroupsList";
import {GetServerSideProps, GetStaticProps} from "next";
import {getCookie} from "cookies-next";
import groupBy from 'lodash/groupBy'
import Image from "next/image";

const GroupsPage = ({groups} : {groups: Object}) => {
    return (
        <Paper style={{
            backgroundImage: `url(/assets/images/loading-background.jpg)`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            paddingTop: '2rem'
        }}>
            <Container maxWidth={'xl'}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Image src={'/assets/images/logo.png'} alt={'logo of world cup'} width={50} height={70} />
                    <Typography variant={'h5'} color={'white'}>Qatar World Cup 2022 Groups</Typography>
                </Box>
                <GroupsList groups={groups} />
            </Container>
        </Paper>

    );
};

export const getServerSideProps:GetServerSideProps = async ({req, res}) => {
    const token = getCookie('token', {req, res})
    const response = await fetch('http://api.cup2022.ir/api/v1/team', {
        headers:{
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    const {data} = await response.json()
    const groupedTeams = groupBy(data, (team) => {
        return team.groups
    })
    return {
        props: {
            groups: groupedTeams
        }
    }
}

// export const getStaticProps:GetStaticProps = async () => {
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdhOGQ4YWZkOWFhYzIyNjc2ZWY1MmUiLCJpYXQiOjE2NjkyNDE3MjQsImV4cCI6MTY2OTMyODEyNH0.xuTYg3WTD-YZZiLHpUO3_JJlHWHJCt8PpPFenwoj078'
//     console.log('token in static props: ', token)
//     const response = await fetch('http://api.cup2022.ir/api/v1/team', {
//         headers:{
//             'Authorization' : `Bearer ${token}`,
//             'Content-Type' : 'application/json'
//         }
//     })
//     const {data} = await response.json()
//     const groupedTeams = groupBy(data, (team) => {
//         return team.groups
//     })
//     return {
//         props: {
//             groups: groupedTeams
//         }
//     }
// }

export default GroupsPage;