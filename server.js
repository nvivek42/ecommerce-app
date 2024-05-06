const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')
const cors = require('cors')

const routerCategories = require('./routes/category')
const routerCompanies = require('./routes/company')
const routerProducts = require('./routes/product')
const routerUser = require('./routes/user')
const routerCart = require('./routes/cart')
const routerOrder = require('./routes/order')


const app = express()

app.use(cors('*'))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use((request,response,next) =>{
 
    if(request.url == '/user/signin' || 
    request.url == '/user/signup' || 
    request.url.startsWith('/user/verify' ) ||
    request.url.startsWith('/user/status' )
){    
    next()
    } else {
        
        const token = request.headers['token']
        
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
app.use('/product', routerProducts)
app.use(routerCart)
app.use(routerUser)
app.use(routerOrder)



app.get('/',(request,response)=>{
    response.send('welcome to server application')
})

app.listen(3000,'0.0.0.0',()=>{
    console.log('server started on port 3000')
})