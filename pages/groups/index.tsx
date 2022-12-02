import {Box, Container, Paper, Typography} from "@mui/material";
import GroupsList from "../../modules/Groups/GroupsList";
import groupBy from 'lodash/groupBy'
import Image from "next/image";
import SeoTitle from "../../components/SeoTitle/SeoTitle";
import {GroupsData} from "../../data/groups/groupsData";

const GroupsPage = () => {
    const groups = groupBy(GroupsData, (team) => {
        return team.groups
    })
    return (
        <>
            <SeoTitle siteName={"Fifa world cup"}
                      title={`Groups`}/>
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
        </>
    );
};

export default GroupsPage;