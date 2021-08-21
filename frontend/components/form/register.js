import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import {Send} from "@material-ui/icons";
import {Form} from "react-bootstrap";
import * as React from "react";

export default function RegisterForm(props) {
    const {onSubmit, classes} = props;
    return (
        <Form onSubmit={onSubmit} className={classes.form}>
            <Typography gutterBottom variant={"h5"} component={"h2"}>
                Введите данные
            </Typography>
            <TextField
                label={"Полное имя с Gitlab"}
                id={"fullname"}
                name={"fullname"}
                type={"text"}
            /><br/>
            <TextField
                label={"Имя"}
                id={"username"}
                name={"username"}
                type={"text"}
            /><br/>
            <TextField
                label={"Пароль"}
                id={"password"}
                name={"password"}
                type={"password"}
            /><br/>
            <TextField
                label={"Повторите пароль"}
                id={"password2"}
                name={"password2"}
                type={"password"}
                className={classes.input}
            /><br/>
            <Button
                type={"submit"}
                variant="contained"
                color="primary"
                endIcon={<Send/>}
            >
                Зарегистрироваться
            </Button>
        </Form>
    )
}
