import React from "react"
import ReactDOM from "react-dom"

import AuthService from "./auth/AuthService"
import Login from "./components/Login"

const { AUTH0_CLIENT_ID, AUTH0_DOMAIN } = process.env
const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN)

const app = document.getElementById('app')
ReactDOM.render(<Login auth={auth}/>, app)
