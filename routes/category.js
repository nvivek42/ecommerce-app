const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/category',(request,response)=>{
    const statement = `select id,title,description from category`
    db.execute(statement,(error,data)=>{
        response.send(data)
        response.send('list of categories')
    })
    
})
router.post('/category',(request,response)=>{
    const { title,description } = request.body
    const statement = `insert into category (title,description) values('${title}','${description}')`
    db.execute(statement,(error,data) =>{
        response.send(data)
        response.send('category created')
    })
    
})
router.put('/category',(request,response)=>{
    response.send('category updated')
})
router.delete('/category',(request,response)=>{
    response.send('category deleted')
})

module.exports = router