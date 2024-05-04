const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/cart',( request, response ) => {
    const userId = request.userId;
    const statement = `select c.id as cartid, c.product as productId,c.user as userId, c.quantity, p.title as productTitle, p.price from cart c inner join product p on c.product = p.id where c.user = '${request.userId}'`
    db.execute(statement, (error,data) => {
       response.send(utils.createResult( error, data ))
        console.log('list of products')
    })
    
})

router.post('/cart',( request, response )=>{
    const { product, quantity, price } = request.body
    const statement = `insert into cart (user,product, quantity, price) values('${request.userId}','${product}','${quantity}','${price}')`
    db.execute(statement,(error,data) =>{
        response.send(utils.createResult(error,data))
    })
    
})

router.put('/cart/quantity/:id',(request,response)=>{
    const { id } = request.params
    const { quantity } = request.body

    const statement = `update cart set 
    quantity ='${quantity}'
    where id = '${id}'`
    db.execute(statement,(error,data) =>{
        response.send(utils.createResult(error,data))
        console.log("cart updated")
    })
   
})

router.delete('/cart/:id',(request,response)=>{
    const { id } = request.params
    const statement = `delete from cart where id = '${id}' `
    db.execute(statement,(error,data) =>{
        response.send(utils.createResult(error,data))
        console.log('cart item deleted')
    })
})

module.exports = router