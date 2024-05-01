const express = require('express')

const router = express.Router()


router.get('/product',(request,response)=>{
    response.send('list of products')
})
router.post('/product',(request,response)=>{
    response.send('product created')
})
router.put('/product',(request,response)=>{
    response.send('product updated')
})
router.delete('/product',(request,response)=>{
    response.send('product deleted')
})
module.exports = router