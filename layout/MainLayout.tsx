import Header from "./components/Header/Header";
import {PropsWithChildren} from "react";
import {Box} from "@mui/material";
import {menuItems} from "../data/menu/menuItems";
import Footer from "./components/Footer/Footer";

const MainLayout = ({children}: PropsWithChildren) => {
    return (
        <>
            <Box component={'header'}
                 sx={{position: 'sticky', top: 0, transition: 'ease', zIndex: 999}}
            >
                <Header title={'FiFa world cup 2022'}
                        menuItems={menuItems}/>
            </Box>

            <Box component={'main'}>
                {children}
            </Box>

            <Box component={'footer'}>
                <Footer />
            </Box>
        </>
    );
};

export default MainLayout;