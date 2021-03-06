'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Requires JSON where data about package are stored
const packageJson = require ('../package.json');



//Small page to create a new user
Route.on('/signup').render("signup")


//Small render to test login client side
Route.on('/api/v1/login').render("login")

/**
 * @params username mail password
 * @return id, username, email, password, created_at, updated_at
 */
Route.post('/signup', 'UserController.create')

/**
 * @params NULL
 * @returns backend name and version data
 */
Route.get('/', () => {
    //create object
    return {name: packageJson.name, version: packageJson.version}
})

/**
 * @params email, password
 * @returns code, user_id, access_token
 */
Route.post('/api/v1/login', 'UserController.login')

/**
 * @params @null bearer token required
 * @returns id, username, email, password, created_at, updated_at
 */
Route.get('/api/v1/user/:userId', 'UserController.userData').middleware('auth')

