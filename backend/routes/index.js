var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(request, response) {
  response.render('index', { title: 'Express' });
});

module.exports = router;