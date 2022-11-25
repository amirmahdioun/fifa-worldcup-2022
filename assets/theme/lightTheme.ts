import {createTheme} from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#9a1132'
        }
    },
    typography: {
        fontFamily: 'QatarWorldCup',
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#9a1132'
                }
            }
        }
    }
})