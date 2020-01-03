import * as React from 'react';
import Head from 'next/head';

import "./Layout.module.scss";

type Props = {
    title?: string
}

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = 'fatalerrorcoded.eu',
}) => (
    <div className="main-wrapper">
        <div className="main-content">
            <Head>
                <title>{title}</title>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header className="main-header">
                <h2><code>fatalerrorcoded.eu</code></h2>
            </header>
            <main>
                {children}
            </main>
        </div>
    </div>
);

export default Layout;
