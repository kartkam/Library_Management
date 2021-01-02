var express = require('express');
var populateDbService = require('../service/populatedb');
var router = express.Router();

router.post('/populate',function(req,res,next) {
    
    populateDbService.initData(function(){
        res.send("Init book data added successfully");
    });
    
})

module.exports = router;