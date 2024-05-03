const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')

const routerCategories = require('./routes/category')
const routerCompanies = require('./routes/company')
const routerProducts = require('./routes/product')
const routerUser = require('./routes/user')



const app = express()

app.use(bodyParser.json())

app.use((request,response,next) =>{

    if(request.url == '/user/signin' || request.url == '/user/signup' ){
        next()
    } else {
        const token = request.headers['token']
        console.log('inside server.js --')
        try{
            const payload = jwt.verify(token, config.secret)
            request.userId = payload['id']
            next()
        }catch(ex){
            response.send({
                status: 'error',
                error: 'unauthorized access'
            })
        }
    }
})

app.use(routerCategories)
app.use(routerCompanies)
app.use(routerProducts)
app.use(routerUser)

app.get('/',(request,response)=>{
    response.send('welcome to server application')
})

app.listen(3000,'0.0.0.0',()=>{
    console.log('server started on port 3000')
})