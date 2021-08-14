import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import Header from '../components/header'
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    FormControl, FormHelperText,
    Grid,
    Input,
    InputLabel,
    Link,
    makeStyles
} from "@material-ui/core"
import utilStyles from '../styles/utils.module.css'
import Typography from "@material-ui/core/Typography";
import {useRouter} from "next/router";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
    example: {
        color: "#000",
    }
}));

function Home({books, page}) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const registerUser = (event) => {
        event.preventDefault() // don't redirect the page
        // where we'll add our form logic
    }

    const classes = useStyles();

    return (
        <>
            <Header/>
            <Layout home>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <section className={utilStyles.headingMd}>
                    <div className={classes.example}>
                        Hello
                    </div>
                    <p className={utilStyles.textCenter}>Please login to access</p>
                    <form onSubmit={registerUser}>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" autoComplete="name" required/>
                        <button type="submit">Register</button>
                    </form>
                    <div>
                        {books.map((book) => (
                            <Link href={"http://localhost:3000"}>
                                <Grid>
                                    <Card>
                                        <CardMedia></CardMedia>
                                        <CardContent>
                                            <Typography gutterBottom component="p">
                                                {book.title}
                                            </Typography>
                                            <Box component="p" fontSize={16} fontStyle={900}>
                                                {book.author.firstname}
                                                {book.author.lastname}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Link>
                        ))}
                    </div>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text"/>
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text"/>
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                    <html dangerouslySetInnerHTML={{__html: page}}/>
                </section>
            </Layout>
        </>
    )
}

export async function getStaticProps(context) {
    const res = await fetch(
        process.env.API_URL + 'users',
        {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    const books = await res.json();

    // const resPage = await fetch(
    //     "http://localhost:5555/",
    //     {
    //         headers: {
    //             'Content-Type': 'text/html'
    //         }
    //     });
    // const page = await resPage.text();
    const page = "<div>Hello!</div>";
    return {
        props: {
            books,
            page
        }
    };
}

export default Home;
