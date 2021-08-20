import {useRouter} from "next/router";
import {useState} from "react";
import {Card, FormControl, Input, InputLabel, makeStyles, Snackbar} from "@material-ui/core";
import * as React from "react";
import MuiAlert from '@material-ui/lab/Alert';
import cookie from "js-cookie";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Register({registerApiUrl}) {
    const router = useRouter();

    const [showErrorAlert, setShowErrorAlert] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState("");

    const handleClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        setShowErrorAlert(false);
    };

    const registerUser = async (e) => {
        e.preventDefault();
        fetch(
            registerApiUrl, {
                method: 'POST',
                // credentials: 'include',
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
            .catch(err =>{
                setErrorMsg('При регистрации произошла ошибка: ' + err.message);
                setShowErrorAlert(true);
            });
    };

    return (
        <Card>

            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={showErrorAlert}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={showSuccessAlert}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    Регистрация прошла успешно!
                </Alert>
            </Snackbar>

            <form onSubmit={registerUser}>
                <FormControl>
                    <InputLabel htmlFor={"fullname"}>Полное имя с Gitlab</InputLabel>
                    <Input id={"fullname"} name={"fullname"} type={"text"}/>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor={"username"}>Имя</InputLabel>
                    <Input id={"username"} name={"username"} type={"username"}/><br/>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor={"password"}>Пароль</InputLabel>
                    <Input id={"password"} name={"password"} type={"password"}/><br/>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor={"password2"}>Повторите пароль</InputLabel>
                    <Input id={"password2"} name={"password2"} type={"password"}/><br/>
                </FormControl>
                <br/>
                <button className="">Зарегистрироваться</button>
            </form>
        </Card>
    )
}

export async function getStaticProps() {
    return {
        props: {
            registerApiUrl: process.env.REGISTER_API_URL
        }
    }
}

export default Register;
