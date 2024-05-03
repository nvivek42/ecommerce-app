const express = require('express')
const db = require('../db')
const crypto = require('crypto-js')
const mailer = require('../mailer')
const jwt = require('jsonwebtoken')
const config = require('../config')
const router = express.Router()

router.post('/user/signup',(request,response) =>{
    const { firstName, lastName, email, password } = request.body;
    
    const encryptedPassword = '' + crypto.SHA256(password)

    const statement = `insert into user ( firstName, lastName, email, password ) values ('${firstName}', '${lastName}', '${email}', '${encryptedPassword}')`

    db.execute(statement,(error,data) =>{    
        const result = {
            status: ''
        }
        if(error != null){
            result['status'] = 'error'
            result['error'] = error
            response.send(result)
        }
        else{
            result['status'] = 'success'
            result['data'] = data
            mailer.sendEmail('signup.html','welcome to ecommerce application', email, (error,info) => {
                response.send(result)
            })
        }
    })
})

router.post('/user/signin',(request,response) =>{
    const { email,password } = request.body

    const encryptedPassword = '' + crypto.SHA256(password)
    const statement = `select id, firstName, lastName, email, phone from user where email = '${email}' and password = '${encryptedPassword}'`

    db.execute(statement,(error,users) =>{    
        const result = {
            status: '',
        }

        if(error != null){
            result['status'] = 'error'
            result['error'] = error
        }else{
            if(users.length == 0){
                result['status'] = 'error'
                result['error'] = 'user does not exists'
            }else{
                const user = users[0]
                
                const payload = { id: user['id'] }
                const token = jwt.sign(payload, config.secret)

                result['status'] = 'success'
                result['data'] = {
                    token: token,
                    firstName: user['firstName'],
                    lastName: user['lastName'],
                    email: user['email'],
                    phone: user['phone']

                }
            }
            response.send(result)
        }
    })
    
})

router.get('/user/profile',(request,response) =>{
    
    const statement = `select firstName, lastName, email, phone from user where id = '${request.userId}' `

    db.execute(statement,(error,data) =>{    
    console.log('inside user.js --')

        const result = {
            status: '',
        }

        if(error != null){
            result['status'] = 'error'
            result['error'] = error
        }else{    
                result['status'] = 'success'
                result['data'] = data
                response.send(result)
        }
        
    })
})

module.exports = router