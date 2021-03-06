'use strict'

const User = use ('App/Models/User')
const { validate } = use('Validator')

class UserController {

    //Creates and saves a new user in the DB
    async create ({ request, response, auth}) {
        const {email, username} = request.all()
        //Rules to test request values sent by client
        const rules = {
            username: 'required',
            email: 'required|email',
            password: 'required'
        }
    
        const validation = await validate(request.all(), rules)
    
        //If validation fails, return error message with info about error
        if (validation.fails()) {    
            return validation.messages()
        }
        //else, create the user and return values saved

        if(!await User.findBy('email', email) && !await User.findBy('username', username)){
            const user = await User.create(request.only(['username', 'email', 'password']))
            await auth.generate(user)
            return user;
        }
        return {code: "failed", msg: "User can not be created."}
    }

    //Logs in a user
    async login ({ request, response, auth}) {
        const {email, password} = request.all()
        
        //Rules to test request values sent by client
        const rules = {
            email: 'required',
            password: 'required'
        }
    
        const validation = await validate(request.all(), rules)
    
        //If validation fails, return error message with info about error
        if (validation.fails()) {    
            return {code: "failed", user_id: -1, access_token: null}
        }
        //else try to login using email and password
        try {
            //generates token, get the user from DB and sent response
            const token = await auth.attempt(email, password)
            const user = await User.findBy('email', email)
            return {code: "success", user_id: user.id, access_token: token}
        }
        catch (err) {
            //if login fails, notify client without information about what is wrong!
            return {code: "failed", user_id: -1, access_token: null}
        }
    }

    //Returns data saved into DB for a specific userID
    async userData ({ request, response, auth, params}) {
        //Search for the user in the DB
        const user = await User.findBy("id", params.userId);
        //if exists, return it
        if (user)
            return user
        //else return an error message
        return {code: "failed", msg: "User does not exists."}
    }
}

module.exports = UserController
