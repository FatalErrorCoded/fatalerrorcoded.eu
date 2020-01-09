import { useEffect } from "react";

import { AppProps } from "next/app";
import { useRouter } from "next/router";

const SiteApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
    let router = useRouter();
    useEffect(() => {
        router.events.on("routeChangeComplete", (url) => {
            if (window && (window as any)._paq) {
                setTimeout(() => {
                    (window as any)._paq.push(["setCustomUrl", url]);
                    (window as any)._paq.push(["setDocumentTitle", document.title]);
                    (window as any)._paq.push(["trackPageView"]);
                }, 150);
            }
        });

        router.events.on("routeChangeError", (err, url) => {
            if (window && (window as any)._paq) {
                (window as any)._paq.push(["trackEvent", "error", url, err]);
            }
        });

        // MATOMO CODE
        var _paq = (window as any)._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
            var u=process.env.MATOMO_URI;
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', process.env.MATOMO_ID]);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; (s.parentNode as any).insertBefore(g,s);
        })();
        (window as any)._paq = _paq;
    }, []);

    return <Component {...pageProps} />
}

export default SiteApp;
