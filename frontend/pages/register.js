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

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleClose = (event, reason) => {
        setShowErrorAlert(false);
    };

    const registerUser = async (e) => {
        e.preventDefault();
        fetch(
            registerApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullname: e.target.fullname.value,
                    username: e.target.username.value,
                    password: e.target.password.value,
                    password2: e.target.password2.value,
                }),
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status ? 'некорректные данные' : 'неизвестная ошибка');
                }
                return res.json()
            })
            .then(data => {
                if (data.refresh && data.access) {
                    cookie.set('jwt_access', data.access);
                    cookie.set('jwt_refresh', data.refresh);

                    setShowSuccessAlert(true);

                    router.push({
                        pathname: '/',
                    })
                }
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
            <NotifyAlert
                type={alertType.SUCCESS}
                text={"Регистрация прошла успешно!"}
                open={showSuccessAlert}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={6000}
            />
            <Card className={classes.registerCard}>
                <CardContent>
                    <RegisterForm
                        onSubmit={registerUser}
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
