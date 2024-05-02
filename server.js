const express = require('express')
const bodyParser = require('body-parser')

const routerCategories = require('./routes/category')
const routerCompanies = require('./routes/company')
const routerProducts = require('./routes/product')
const routerUser = require('./routes/user')


const app = express()

app.use(bodyParser.json())

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