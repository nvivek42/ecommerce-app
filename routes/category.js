const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/category',(request,response)=>{
    const statement = `select id,title,description from category`
    db.execute(statement, (error,data) => {
        response.send(data)
        console.log('list of categories')
    })
    
})

router.post('/category',(request,response)=>{
    const { title,description } = request.body
    const statement = `insert into category (title,description) values('${title}','${description}')`
    db.execute(statement,(error,data) =>{
        response.send(data)
    })
    
})

router.put('/category/:id',(request,response)=>{
    const { id } = request.params
    const { title,description } = request.body

    const statement = `update category set title ='${title}', description = '${description}' where id = '${id}'`
    db.execute(statement,(error,data) =>{
        response.send(data)
        console.log("category updated")
    })
   
})

router.delete('/category/:id',(request,response)=>{
    const { id } = request.params
    const statement = `delete from category where id = '${id}' `
    db.execute(statement,(error,data) =>{
        response.send(data)
        console.log('category deleted')
    })
})

module.exports = router