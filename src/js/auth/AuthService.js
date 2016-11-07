import {EventEmitter} from 'events'
import Auth0Lock from 'auth0-lock'

export default class AuthService extends EventEmitter {
    options = {
        allowedConnections: ['google-oauth2', 'Username-Password-Authentication'],
        language: 'ca',
        languageDictionary: {
            title: "Go GeoPortal Go!",
            emailInputPlaceholder: "usuari@tmb.cat"
        },
        theme: {
            logo: 'https://avatars0.githubusercontent.com/u/9860321?v=3&s=58',
            primaryColor: '#CC0018'
        }
    }

    constructor(clientId, domain) {
        super()
        // Configure Auth0
        this.lock = new Auth0Lock(clientId, domain, this.options)
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this))
        // binds login functions to keep this context
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    _doAuthentication(authResult) {
        // Saves the user token
        this.setToken(authResult.idToken)
        // Async loads the user profile data
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error)
            } else {
                this.setProfile(profile)
            }
            this.emit('logged_in', profile)
        })
    }

    login() {
        // Call the show method to display the widget.
        this.lock.show()
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        return !!this.getToken()
    }

    setProfile(profile) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('profile')
        localStorage.removeItem('id_token')
        this.emit('logged_out')
    }
}
