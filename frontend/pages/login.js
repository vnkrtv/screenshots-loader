import {useState} from 'react'
import {useRouter} from 'next/router'
import cookie from "js-cookie"

import Head from 'next/head'

import Layout from '../components/layout'
import {Button, Card, Container, FormControl, Input, InputLabel} from "@material-ui/core";
import * as React from "react";
import {Image} from "@material-ui/icons";
import utilStyles from "../styles/utils.module.css";


fetch("http://localhost:5555/api/token/", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "vnkrtv",
        password: "vnkrtv"
    })
})
    .then(r => r.json())
    .then(r => console.log(r))

fetch("http://localhost:5555/api/users/", {
    method: "GET",
    headers: {'Authorization': 'JWT ' + cookie.get('jwt_token')},
})
    .then(r => r.json())
    .then(r => console.log(r))

export default function Login({req, res}) {

    if(!res.body) {
        res.statusCode = 404;
        res.end('Error');
        return;
    }

    req.headers.get('')

    cookie.get('')

    const {username, password} = req.body;

    // console.log(resJ);
    const router = useRouter();
    const [query, setQuery] = useState('');

    // const handleSubmit = preventDefault(() => {
    //     router.push({
    //         pathname: action,
    //         query: {q: query},
    //     })
    // })

    const registerUser = async (e) => {
        e.preventDefault();
        const res = await fetch(
            "http://localhost:5555/login/", {
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSFRToken': resJ.csrftoken
                },
                method: 'POST',
                // credentials: "include"
            });

        await router.push({
            pathname: '/',
            // query: {q: query},
        })
    };

    return (
        <Card>
            <form onSubmit={registerUser}>
                <FormControl>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id={"username"} name={"username"} type={"text"}/>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id={"password"} name={"password"} type={"password"}/><br/>
                </FormControl><br/>
                <button className="">Sign In</button>
            </form>
        </Card>
    )
}

// export async function getStaticProps(context) {
//     // const res = await fetch("http://localhost:5555/login/");
//     const resJ = '';
//     return {
//         props: {
//             resJ
//         }
//     }
// }
