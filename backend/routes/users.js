var express = require('express');
var router = express.Router();

// GET users listing
router.get('/', function(request, response) {
  response.send('respond with a resource');
});

module.exports = router;