import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import {wrapper} from '../components/store'
import Typography from "@material-ui/core/Typography";
import {useRouter} from "next/router";

const App = ({Component, pageProps}) => {
    // const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>My page</title>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(App);
