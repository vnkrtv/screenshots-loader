import Head from 'next/head'
import styles from './layout.module.css'
import * as React from "react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

function Layout({children, siteTitle}) {
    const {loggedIn} = useSelector(state => state);
    const router = useRouter();

    if (typeof window !== 'undefined' && !loggedIn && window.location.pathname !== '/register') {
        router
            .push('/login')
            .then()
        ;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{siteTitle}</title>
                <meta name="og:title" content={siteTitle}/>
            </Head>
            {children}
        </div>
    )
}

export default Layout;
