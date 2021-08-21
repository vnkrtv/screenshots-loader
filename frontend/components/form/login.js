import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import {Send} from "@material-ui/icons";
import {Form} from "react-bootstrap";
import * as React from "react";

export default function LoginForm(props) {
    const {onSubmit, classes} = props;
    return (
        <Form onSubmit={onSubmit} className={classes.form}>
            <Typography gutterBottom variant={"h5"} component={"h2"}>
                Войти в систему
            </Typography>
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
            <Button
                type={"submit"}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Send/>}
            >
                Войти
            </Button>
        </Form>
    )
}
