import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import "./Layout.module.scss";

type Props = {
    title?: string,
    isBlog?: boolean,
    canonical?: string,
}

const Layout: React.FunctionComponent<Props> = ({
    children,
    isBlog = false,
    title = isBlog ? "FatalErrorCoded's Blog" : "fatalerrorcoded.eu",
    canonical,
}) => (
    <div className="main-wrapper">
        <div className="main-content">
            <Head>
                <title>{title}</title>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* OPENGRAPH */}
                <meta key="pagetitle" property="og:title" content={title} />
                <meta property="og:type" content="website" />
                {canonical && <meta property="og:url" content={`https://fatalerrorcoded.eu${canonical}`} />}
                <meta property="og:site_name" content="fatalerrorcoded.eu" />
                <meta property="og:locale" content="en_US" />
            </Head>
            <header className="main-header">
                <h2><code>{isBlog ? "FatalErrorCoded's Blog" : "fatalerrorcoded.eu"}</code></h2>
                <div className="navigation">
                    <code>{isBlog
                        ? <Link href="/"><a>portfolio</a></Link>
                        : <Link href="/blog"><a>blog</a></Link>
                    }</code>
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    </div>
);

export default Layout;
