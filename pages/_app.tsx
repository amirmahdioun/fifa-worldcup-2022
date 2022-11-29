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
                          author={'Amir hossein Mahdioun'}>
                    <meta name="application-name" content="WCUP2022" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="WCUP2022" />
                    <meta name="description" content="All data and information about Fifa world cup 2022 Qatar" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                    <meta name="msapplication-TileColor" content="#9a1132" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="theme-color" content="#9a1132" />

                    <link rel="apple-touch-icon" href="/assets/images/icon.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/icon.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/icon.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="/assets/images/icon.png" />

                    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/icon.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/icon.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="mask-icon" href="/assets/images/icon.png" color="#5bbad5" />
                    <link rel="shortcut icon" href="/assets/images/icon.png" />


                    <meta name="twitter:url" content="https://wcup2022.tk" />
                    <meta name="twitter:title" content="WCUP2022" />
                    <meta name="twitter:description" content="All data and information about Fifa world cup 2022 Qatar" />
                    <meta name="twitter:image" content="https://wcup2022.tk/assets/images/icon.png" />
                    <meta name="twitter:creator" content="@amir_spain" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="WCUP2022" />
                    <meta property="og:description" content="All data and information about Fifa world cup 2022 Qatar" />
                    <meta property="og:site_name" content="WCUP2022" />
                    <meta property="og:url" content="https://wcup2022.tk" />
                    <meta property="og:image" content="https://wcup2022.tk/assets/images/icon.png" />
                </SeoTitle>
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
