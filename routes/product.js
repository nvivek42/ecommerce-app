const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/product',(request,response)=>{
    const statement = `select id,title,description from product`
    db.execute(statement, (error,data) => {
       response.send(utils.createResult(error,data))
        console.log('list of products')
    })
    
})

router.post('/product',(request,response)=>{
    const { title,description } = request.body
    const statement = `insert into product (title,description) values('${title}','${description}')`
    db.execute(statement,(error,data) =>{
        response.send(utils.createResult(error,data))
    })
    
})

router.put('/product/:id',(request,response)=>{
    const { id } = request.params
    const { title,description } = request.body

    const statement = `update product set title ='${title}', description = '${description}' where id = '${id}'`
    db.execute(statement,(error,data) =>{
        response.send(utils.createResult(error,data))
        console.log("product updated")
    })
   
})

router.delete('/product/:id',(request,response)=>{
    const { id } = request.params
    const statement = `delete from product where id = '${id}' `
    db.execute(statement,(error,data) =>{
        response.send(utils.createResult(error,data))
        console.log('product deleted')
    })
})

module.exports = router