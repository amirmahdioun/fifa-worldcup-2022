import React from "react";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {useRouter} from "next/router";
import {useTheme} from "@mui/material";

type Props = {
    children: React.ReactElement,
    window?: Window;
}

const ScrollHandler = (props : Props) => {
    const router = useRouter()
    const theme = useTheme()

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
        target: props.window ? window: undefined
    });

    if(router.pathname !== '/'){
        return React.cloneElement(props.children, {
            style: {
                backgroundColor: trigger ? theme.palette.primary.main : theme.palette.primary.main,
                position: 'sticky',
                color: trigger ? "white" : "black",
                transition: trigger ? "0.3s" : "0.5s",
            }
        });
    }

    return React.cloneElement(props.children, {
        style: {
            backgroundColor: trigger ? theme.palette.primary.main : "transparent",
            // color: trigger ? "white" : "black",
            transition: trigger ? "0.3s" : "0.5s",
            boxShadow: "none",
        }
    });
};

const ScrollToColor = (props : Props)=> {
    return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor;
