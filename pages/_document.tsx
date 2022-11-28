import Document, {Head, Html, Main, NextScript} from "next/document";
import {ReactElement} from "react";
import {ToastContainer} from "react-toastify";

class MyDocument extends Document {
    render(): ReactElement {
        return (
            <Html lang={'en'}>
                <Head>
                    <link rel="shortcut icon"
                          href="/assets/images/logo.png"
                          type="image/x-icon" />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument