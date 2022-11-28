import Head from "next/head";

interface Props {
    title?: string,
    siteName: string,
    description?: string,
    author?: string,
    subject?: string,
    keywords?: string,
    lang?: string,
    children?: any

}

const SeoTitle = ({title, author, subject, lang, siteName, keywords, description, children}: Props) => {
    return (
        <Head>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0"/>
            {title ? <title>{`${siteName} - ${title}`}</title> : <title>{siteName}</title>}
            {keywords && <meta name="keywords"
                               content={keywords}/>}
            {description && <meta name="description"
                                  content={description}/>}
            {author ? <meta name="author"
                            content={author}/> : <meta name="author"
                                                       content="Amir hossein Mahdioun"/>}
            {subject && <meta name="subject"
                              content={subject}/>}
            {lang && <meta name="language"
                           content={lang}/>}
            <meta name="copyright"
                  content={siteName}/>
            {children && children}
        </Head>
    );
};

export default SeoTitle;