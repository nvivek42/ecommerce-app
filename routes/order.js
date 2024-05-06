const express = require('express')
const db = require('../db')
const utils = require('../utils')
const moment = require('moment')
const mysql2 = require('mysql2/promise')
const pool = mysql2.createPool({
        host:'localhost',
        port: 3306,
        user: 'root',
        password: 'admin123',
        database: 'ecommerce',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
})

const router = express.Router()

router.get('/order', (request, response) => {

})
router.post('/order', (request, response) => {
    
    (async () => {

        const statementCart = 
        `select 
            c.id as cartId,
            p.id as productId,
            p.price as price,
            c.quantity as quantity
        from cart c 
            inner join product p on c.product = p.id
            where user = ${request.userId} `

        const [items] = await pool.execute(statementCart)
        // console.log(items)
        
        let total = 0
        for (const item of items){
            total+= item['quantity'] * item['price']
        }

        const date = moment().format('DD/MM/YYYY')

        const statementOrder = 
        ` insert into 
            userorder ( user, totalPrice, orderDate, paidAmount, orderStatus )
          values
            (${request.userId}, ${total}, '${date}', ${total}, 0) `

            const [order] = await pool.execute(statementOrder)
            
            const orderId = order['insertId']
            for (const item of items){
                const statementOrderDetails = 
                ` insert into 
                    orderDetails ( orderId, product, price, quantity )
                  values
                    (${orderId}, ${item['productId']}, '${item['price']}', ${item['quantity']}) `

            await pool.execute(statementOrderDetails)

            }

        const statementCartDeleteItems = `delete from cart where user = ${request.userId}`
        await pool.execute(statementCartDeleteItems)

        response.send({status: 'success'})
    }) ()
})

module.exports = router