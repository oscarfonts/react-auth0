import React, {PropTypes as T} from 'react'

import AuthService from '../auth/AuthService'

export default class Login extends React.Component {
    static propTypes = {
        location: T.object,
        auth: T.instanceOf(AuthService)
    }

    constructor(props) {
        super(props)
        this.state = {
            profile: this.props.auth.getProfile()
        }
        this.setProfile = this.setProfile.bind(this)
    }

    componentWillMount() {
        this.props.auth.on('logged_in', this.setProfile)
        this.props.auth.on('logged_out', this.setProfile)
    }

    componentWillUnmount() {
        this.props.auth.removeListener('logged_in', this.setProfile)
        this.props.auth.removeListener('logged_out', this.setProfile)
    }

    setProfile(profile = {}) {
        this.setState({profile})
    }

    render() {
        const {auth} = this.props
        const {name, picture} = this.state.profile
        return <div>
            <h2>{name ? `Welcome ${name}` : "Please log in"}</h2>
            <img src={picture}></img>
            <br/>
            <button onClick={auth.login}>Login</button>
            <button onClick={auth.logout}>Logout</button>
        </div>
    }
}
