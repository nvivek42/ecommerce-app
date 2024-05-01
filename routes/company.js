
const express = require('express')

const router = express.Router()

router.get('/company',(request,response)=>{
    response.send('lsit of companies')
})
router.post('/company',(request,response)=>{
    response.send('comapny created')
})
router.put('/company',(request,response)=>{
    response.send('comapny updated')
})
router.delete('/company',(request,response)=>{
    response.send('company deleted')
})

module.exports = router