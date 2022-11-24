import Document, {Head, Html, Main, NextScript} from "next/document";
import {ReactElement} from "react";
import {ToastContainer} from "react-toastify";

class MyDocument extends Document {
    render(): ReactElement {
        return (
            <Html lang={'en'}>
                <Head/>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument