const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.get('/company',(request,response)=>{
    const statement = `select id,title,description from company`
    db.execute(statement, (error,data) => {
        response.send(utils.createResult(error,data))
        console.log('list of comapnies')
    })
    
})

router.post('/company',(request,response)=>{
    const { title,description } = request.body
    const statement = `insert into company (title,description) values('${title}','${description}')`
    db.execute(statement,(error,data) =>{
        response.send(utils.createResult(error,data))

    })
    
})

router.put('/company/:id',(request,response)=>{
    const { id } = request.params
    const { title,description } = request.body

    const statement = `update company set title ='${title}', description = '${description}' where id = '${id}'`
    db.execute(statement,(error,data) =>{
        response.send(utils.createResult(error,data))
        console.log("company updated")
    })
   
})

router.delete('/company/:id',(request,response)=>{
    const { id } = request.params
    const statement = `delete from company where id = '${id}' `
    db.execute(statement,(error,data) =>{
        response.send(utils.createResult(error,data))
        console.log('company deleted')
    })
})

module.exports = router