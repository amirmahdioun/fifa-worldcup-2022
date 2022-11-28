import Header from "./components/Header/Header";
import {PropsWithChildren} from "react";
import {Box} from "@mui/material";

const MainLayout = ({children}: PropsWithChildren) => {
    return (
        <>
            <Box component={'header'}
                 sx={{position: 'sticky', top: 0, transition: 'ease', zIndex: 999}}
            >
                <Header title={'FiFa world cup 2022'}
                        menuItems={[
                            {menuTitle: 'Home', link: '/'},
                            {menuTitle: 'live', link: '/matches/live'},
                            {menuTitle: 'Groups', link: '/groups'},
                            {menuTitle: 'standing', link: '/standings'},
                            {menuTitle: 'matches', link: '/matches'},
                            {menuTitle: 'stadiums', link: '/stadiums'}
                        ]}/>
            </Box>

            <Box component={'main'}>
                {children}
            </Box>
        </>
    );
};

export default MainLayout;