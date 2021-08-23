import {useRouter} from "next/router";
import {useState} from "react";
import {
    Button,
    Card,
    CardContent, Link,
    makeStyles,
} from "@material-ui/core";
import * as React from "react";
import cookie from "js-cookie";
import Layout from "components/layout";
import NotifyAlert, {alertType} from "components/alert/alert";
import LoginForm from "components/form/login";
import {loginUser} from "store/actions";
import {useDispatch, useSelector} from "react-redux";
import {loginUserFetch} from "api/UsersAPI";
import {setJwtTokens} from "../utils/jwt";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2),
    },
    form: {
        margin: theme.spacing(4)
    },
    input: {
        marginBottom: theme.spacing(2),
    },
    registerCard: {
        width: "80%",
        textAlign: "center",
    }
}));

export default function Login({loginApiUrl}) {
    const router = useRouter();
    const classes = useStyles();

    const dispatch = useDispatch();
    const {loggedIn} = useSelector((state => state.loggedIn));

    if (typeof window !== 'undefined' && loggedIn) {
        router
            .push('/')
            .then();
    }

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleClose = (event, reason) => {
        setShowErrorAlert(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        loginUserFetch(loginApiUrl, user)
            .then(({access, refresh}) => {
                setJwtTokens(access, refresh);

                dispatch(loginUser({
                    username: e.target.username.value
                }));

                router.push({
                    pathname: '/',
                });
            })
            .catch(err => {
                setErrorMsg('При регистрации произошла ошибка: ' + err.message);
                setShowErrorAlert(true);
            });
    };

    return (
        <Layout siteTitle={"Войти"}>
            <NotifyAlert
                type={alertType.ERROR}
                text={errorMsg}
                open={showErrorAlert}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={6000}
            />
            <Card className={classes.registerCard}>
                <CardContent>
                    <Button onClick={() => {console.log(loggedIn);}}>
                    Click
                    </Button>
                    <LoginForm
                        onSubmit={handleSubmit}
                        classes={classes}
                    />
                    <Link
                        href={"/register"}
                    >
                        Зарегистрироваться
                    </Link>
                </CardContent>
            </Card>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {
            loginApiUrl: process.env.LOGIN_API_URL
        }
    }
}
