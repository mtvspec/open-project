var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(request, response){
  response.end();
});

module.exports = router;