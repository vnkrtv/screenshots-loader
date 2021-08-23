import {useRouter} from "next/router";
import {useState} from "react";
import {
    Card,
    CardContent,
    makeStyles,
} from "@material-ui/core";
import * as React from "react";
import cookie from "js-cookie";
import Layout from "components/layout";
import NotifyAlert, {alertType} from "components/alert/alert";
import RegisterForm from "components/form/register";
import {initializeStore} from "../store/store";
import {loginUser, userFetch} from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {setJwtTokens} from "../utils/jwt";
import {loginUserFetch} from "../api/UsersAPI";

const useStyles = makeStyles((theme) => ({
    button: {
        // marginTop: theme.spacing(2),
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
        justifyItems: "center",
    }
}));

export default function Register({registerApiUrl}) {
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

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const registerUser = {
            fullname: e.target.fullname.value,
            username: e.target.username.value,
            password: e.target.password.value,
            password2: e.target.password2.value,
        };
        loginUserFetch(registerApiUrl, registerUser)
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
        <Layout siteTitle={"Зарегистрироваться"}>
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
                    <RegisterForm
                        onSubmit={handleRegisterSubmit}
                        classes={classes}
                    />
                </CardContent>
            </Card>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {
            registerApiUrl: process.env.REGISTER_API_URL
        }
    }
}
