# React + Auth0

1. Create an account on https://auth0.com/ and:
 
    * On Clients: Get your Client ID
    * On Client settings:
       * Get your Domain (something like "<username>.eu.auth0.com")
       * Add allowed Callback URLs (http://localhost:8080 for dev)
       * Add allowed Origins (CORS): (http://localhost:8080 for dev)

2. Create an `.env` file containing your Client ID and Domain:

    AUTH0_CLIENT_ID=<my_auth0_id>
    AUTH0_DOMAIN=<my_auth0_domain>

3. Install dependencies and run dev server

   npm install
   npm run dev
   
4. Go to http://localhost:8080

5. Build for production using the command `NODE_ENV=production webpack`. Use the file `src/app.js`.