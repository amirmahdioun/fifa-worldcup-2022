import {Container, Paper} from "@mui/material";
import React from "react";
import LiveMatchContent from "../../../modules/matches/components/LiveMatch/LiveMatchContent";

const Live = () => {
    return (
        <Paper elevation={0}
               sx={{backgroundColor: '#f5f5f5', minHeight: '100vh', py: '3rem'}}>
            <Container maxWidth={'lg'}>
                <LiveMatchContent currentLive={true}/>
            </Container>
        </Paper>
    );
};

export default Live;