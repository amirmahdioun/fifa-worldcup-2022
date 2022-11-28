import type {AppProps} from 'next/app'
import '../assets/fonts/qatarWorldCup/css/worldcup.css';
import '../assets/fonts/poppins/css/poppins.css'
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {lightTheme} from "../assets/theme/lightTheme";
import {useEffect, useState} from "react";
import {motion} from 'framer-motion';
import {SplitText} from "../components/AnimatedText/AnimatedText";
import MainLayout from "../layout/MainLayout";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {GetServerSideProps} from "next";
import SeoTitle from "../components/SeoTitle/SeoTitle";


export default function App({Component, pageProps}: AppProps) {
    const [loading, setLoading] = useState<Boolean>(true)
    const getToken = async () => {
        return await fetch('/api/user/login')
    }


    useEffect(() => {
        getToken().then(res => {
            if (res.status === 200) {
                const loadingTimer = setTimeout(() => {
                    setLoading(false)
                }, 3000)
                return () => clearTimeout(loadingTimer)
            } else {
                toast.error('There is an error to load the app!. Please refresh and try again', {
                    autoClose: 6000,
                })
            }
        }).catch(e => {
            toast.error('There is an error to load the app!. Please refresh and try again')
        })

    }, [])


    if (loading) {
        return (
            <>
                <CssBaseline/>

                <Box style={{
                    backgroundImage: `url(/assets/images/loading-background.jpg)`,
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <motion.div
                        initial={{opacity: 1}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        style={{textAlign: 'center'}}
                    >
                        <SplitText
                            initial={{y: '100%'}}
                            animate="visible"
                            variants={{
                                visible: (i: number) => ({
                                    y: 0,
                                    transition: {
                                        delay: i * 0.3
                                    },
                                    color: 'white'
                                })
                            }}
                        >
                            Qatar World Cup 2022
                        </SplitText>
                    </motion.div>
                    <ToastContainer
                        position="bottom-left"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </Box>
            </>
        )
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <MainLayout>
                <CssBaseline/>
                <SeoTitle siteName={"Fifa world cup"}
                          keywords={"fifa, fifa world cup 2022, qatar, doha, world cup 2022"}
                          author={'Amir hossein Mahdioun'}/>
                <Component {...pageProps} />
                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </MainLayout>
        </ThemeProvider>
    )
}
