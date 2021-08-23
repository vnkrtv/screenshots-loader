import Head from 'next/head'
import useSWR from 'swr'
import Layout, {siteTitle} from 'components/layout'
import Header from 'components/header'
import {Box, Card, CardContent, CardMedia, Grid, Link, makeStyles} from "@material-ui/core"
import utilStyles from 'styles/utils.module.css'
import * as React from "react";
import {useSelector} from "react-redux";
import {fetchAllUsers} from "api/UsersAPI";
import {fetchAllSubjects} from "api/SubjectsAPI"
import {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {fetchAllLessons} from "../api/LessonsAPI";
import {fetchAllScreenshots} from "../api/ScreenshotsAPI";

const useStyles = makeStyles((theme) => ({
    example: {
        color: "#000",
    }
}));

export default function Home({screenshots, lecturers}) {
    const classes = useStyles();
    const {currentUser} = useSelector((state => state));

    const [users, setUsers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [screenshots, setScreenshots] = useState([]);

    fetchAllUsers()
        .then(data => setUsers(data.users))
    ;
    fetchAllSubjects()
        .then(data => setSubjects(data.subjects))
    ;
    fetchAllLessons()
        .then(data => setLessons(data.lessons))
    ;
    fetchAllScreenshots()
        .then(data => setScreenshots(data.screenshots))
    ;
    return (
        <>
            <Header user={currentUser}/>
            <Layout home>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <section className={utilStyles.headingMd}>
                    <div className={classes.example}>
                    </div>
                    <div>
                        {users ? users.map((user) => (
                            <Link href={"http://localhost:3000"}>
                                <Grid>
                                    <Card>
                                        <CardMedia/>
                                        <CardContent>
                                            <Typography gutterBottom component="p">
                                                {user.username}
                                            </Typography>
                                            <Box component="p" fontSize={16} fontStyle={900}>
                                                {user.group}
                                                {user.fullname}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Link>
                        )): ""}
                    </div>
                </section>
            </Layout>
        </>
    )
}
