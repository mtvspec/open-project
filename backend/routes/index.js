'use strict';

var express = require('express');
var router = express.Router();
var pg = require('pg');
var conStr = 'postgres://localhost:5432/mtvspec';

// GET home page
router.get('/', function(request, response){
  response.end();
});

var selectAllProjectsQuery = {
  fields: {
    project: 'projectName',
    description: 'projectDescription',
    startDate: 'to_char(projectStartDate, \'DD-MM-YYYY\') as projectStartDate',
    endDate: 'to_char(projectEndDate, \'DD-MM-YYYY\') as projectEndDate',
    budget: 'projectBudget'
  },
  tables: {
    projects: 'e_projects'
  }
};

var selectAllPersonsQuery = {
  fields: {
    iin: 'iin',
    lastName: 'lastName',
    firstName: 'firstName',
    middleName: 'middleName',
    dob: 'to_char(dob, \'DD-MM-YYYY\') as dob',
    sex: 'sex'
  },
  tables: {
    persons: 'e_persons'
  }
};

var extractFields = function(query){
  var fields = '';
  var field;

  for(field in query.fields){

    fields += query.fields[field] + ', ';
  }
  return fields.substring(0, fields.length - 2);
};

var extractTables = function(query){
  var tables = '';
  var table;

  for(table in query.tables){

    tables += query.tables[table] + ', '
  }
  return tables.substring(0, tables.length - 2);
};

var selectFieldsFromTables = function(query){

  var select, from, result;

  select = 'SELECT '+ extractFields(query);

  from = ' FROM '+ extractTables(query);

  result = select + from;

  return result;
};

// GET all contacts
router.get('/api/contacts', function(request, response){
  var results = [];

  pg.connect(conStr, function(err, client){
    var query = client.query("SELECT * FROM contacts ORDER BY id ASC");
    query.on('row', function(row){
      results.push(row);
    });
    query.on('end', function(){
      client.end();
      return response.json(results);
    });
    if(err){
      console.log('GET all contacts error:', err);
    }
  });
});

// GET all projects
router.get('/api/projects', function(request, response){
  var results = [];

  pg.connect(conStr, function(err, client){
    var query = client.query(selectFieldsFromTables(selectAllProjectsQuery));
    query.on('row', function(row){
      results.push(row);
    });
    query.on('end', function(){
      client.end();
      return response.json(results);
    });
    if(err){
      console.log('GET all projects error:', err);
    }
  });
});

// GET all persons
router.get('/api/persons', function(request, response){
  var results = [];

  pg.connect(conStr, function(err, client){
    var query = client.query(selectFieldsFromTables(selectAllPersonsQuery));
    query.on('row', function(row){
      results.push(row);
    });
    query.on('end', function(){
      client.end();
      return response.json(results);
    });
    if(err){
      console.log('GET all persons error:', err);
    }
  });
});

// POST new person
router.post('/api/persons', function(request, response){

  var results = [];

  // Grab data from http request
  var data = {iin: request.body.iin, lastName: request.body.lastName, firstName: request.body.firstName, middleName: request.body.middleName, dob: request.body.dob, sex: request.body.sex};

  // Get a Postgres client from the connection pool
  pg.connect(conStr, function(err, client) {

    // SQL Query > Insert Data
    client.query("INSERT INTO e_persons(iin, lastName, firstName, middleName, dob, sex) values($1, $2, $3, $4, $5, $6)", [data.iin, data.lastName, data.firstName, data.middleName, data.dob, data.sex]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM e_persons ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return response.json(results);
    });

    // Handle Errors
    if(err) {
      console.log('POST new person error: ', err);
    }

  });
});

module.exports = function(){
  this.post
};

module.exports = router;