(function(){
  'use strict';

  var express = require('express');
  var app = express();
  var router = express.Router();
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var pg = require('pg');
  pg.defaults = {
    host: 'localhost',
    port: 5432,
    user: 'mtvspec',
    password: 'mtvspec',
    database: 'mtvspec'
  };
  var projects = require('./projects.js');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Routers
  var projectMemberRouter = express.Router({mergeParams: true});

  projectMemberRouter.route('/')
    .get(function(req, res){
      pg.connect(function(err, client){
        client.query({
          text: "SELECT * FROM e_persons WHERE project_id = $1 ORDER BY id",
          values: [req.params.projectID]
        }, function(err, result){
          if(err){
            console.error('GET all projects: ', err);
          }
          else {
            res.json(result.rows);
          }
        })
      })
    });

  projectMemberRouter.route('/:memberID')
    .get(function(req, res){
      pg.connect(function(err, client){
        client.query({
          text: "SELECT * FROM e_persons WHERE id = $1"
        }, function(err, result){
          if(err){
            console.error('GET all projects: ', err);
          }
          else {
            res.json(result.rows);
          }
        })
      })
    });

  // Queries

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

  var insertDataInTable = function(query){
    var insert, result;
    insert = 'INSERT INTO '+ extractTables(query) + '('+ extractFields(query)+')';
    result = insert;
    return result;
  };

  // Routes for tasks
  app.route('/api/tasks')
    // GET all tasks
    .get(function(req, res){
      var tasks = [];
      pg.connect(function(err, client){
        var query = client.query({
          text: "SELECT id, taskName FROM tasks ORDER BY id ASC"
        });
        if(err){
          console.log('GET all persons error:', err);
        }
        else {
          query.on('row', function(row){
            tasks.push(row);
          });
          query.on('end', function(){
            client.end();
            return res.json(tasks);
          });
        }
      });
    })

    // POST new task
    .post(function(req, res){
      console.log("POST new task");
      var results = [];
      var data = {taskName: req.body.taskName};
      pg.connect(function(err, client){
        client.query({
          text: "INSERT INTO tasks(id, taskName) VALUES(DEFAULT, $1) RETURNING id",
          values: [data.taskName]
        }, function(err, result){
          if(err){
            if(+err.code === 23505){
              var duplicateKeyError = {
                error: 'duplicate key'};
              console.log(duplicateKeyError);
              client.end();
              return res.json(duplicateKeyError);
            } else if(err) {
              console.log('POST new task:', err);
            }
            else {
              results.push(result);
              console.log('Result:', result);
              client.end();
              return res.writeHead(200);
            }
          }
        });
      });
    });

    // Update task
    app.put('/api/tasks/:taskID', function(req, res) {
      var id = req.params.taskID;
      var data = {taskName: req.body.taskName};
      pg.connect(function (err, client) {
        client.query({
          text: "UPDATE tasks SET taskName=$1 WHERE id=$2",
          values: [data.taskName, id]
        }, function(err){
          if(err.code === '22P02'){
            console.log('required taskID');
          }
          else {
            client.end();
            return res.sendStatus(200);
          }
        });
      });
    });

    // Delete task by id
    app.delete('/api/tasks/:taskID', function(req, res) {
      var results = [];
      var id = req.params.taskID;
      var selectAllTasksQuery = {
        fields: {
          id: 'id',
          taskName: 'taskName'
        },
        tables: {
          projects: 'tasks'
        }
      };
      pg.connect(function(err, client){
        client.query("DELETE FROM tasks WHERE id=($1)", [id]);
        var query = client.query(selectFieldsFromTables(selectAllTasksQuery));
        query.on('row', function(row) {
          results.push(row);
        });
        query.on('end', function() {
          client.end();
          return res.json(results);
        });
        if(err) {
          console.log(err);
        }
      });
    });

  // Routes for persons
  app.route('/api/persons')

    // Get all persons
    .get(function(request, response){
      var results = [];
      var selectAllPersonsQuery = {
        fields: {
          id: 'id',
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
    })

    // Save new person
    .post(function(req, res){
      var results = [];
      var selectAllPersonsQuery = {
        fields: {
          id: 'id',
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
      var data = {
        iin: req.body.iin,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        dob: req.body.dob,
        sex: req.body.sex
      };
      pg.connect(conStr, function(err, client){
        client.query("INSERT INTO e_persons(iin, lastName, firstName, middleName, dob, sex) VALUES($1, $2, $3, $4, $5, $6)", [
          data.iin,
          data.lastName,
          data.firstName,
          data.middleName,
          data.dob,
          data.sex
        ]);
        var query = client.query(selectFieldsFromTables(selectAllPersonsQuery));
        query.on('row', function(row) {
          results.push(row);
        });
        query.on('end', function() {
          client.end();
          return res.json(results);
        });
        if(err) {
          console.log('POST new person error:', err);
        }
      });
    });

  // Routes for contacts
  app.route('/api/contacts')

    // GET all contacts
    .get(function(request, response){
      var results = [];
      var selectAllContactsQuery = {
        fields: {
          id: 'id',
          project: 'project',
          organizationName: 'organization',
          roleName: 'role',
          lastName: 'surname',
          firstName: 'name',
          middleName: 'patronemic',
          workTel: 'tel_work',
          mobileTel: 'tel_mobile',
          email: 'email'
        },
        tables: {
          projects: 'contacts'
        }
      };
      pg.connect(function(err, client){
        var query = client.query(selectFieldsFromTables(selectAllContactsQuery));
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
    })

    // POST new contact
    .post(function(req, res) {
      var results = [];
      var data = {project: req.body.project, organization: req.body.organization, role: req.body.role, lastname: req.body.surname, firstname: req.body.name, middlename: req.body.patronemic, tel_work: req.body.tel_work, tel_mobile: req.body.tel_mobile, email: req.body.email};
      var selectAllContactsQuery = {
        fields: {
          id: 'id',
          projectName: 'project',
          organizationName: 'organization',
          roleName: 'role',
          lastName: 'surname',
          firstName: 'name',
          middleName: 'patronemic',
          workTel: 'tel_work',
          mobileTel: 'tel_mobile',
          email: 'email'
        },
        tables: {
          projects: 'contacts'
        }
      };
      pg.connect(function(err, client){
        client.query("INSERT INTO contacts(project, organization, role, surname, name, patronemic, tel_work, tel_mobile, email) values($1, $2, $3, $4, $5, $6, $7, $8, $9)", [data.project, data.organization, data.role, data.lastname, data.firstname, data.middlename, data.tel_work, data.tel_mobile, data.email]);
        var query = client.query(selectFieldsFromTables(selectAllContactsQuery));
        query.on('row', function(row){
          results.push(row);
        });
        query.on('end', function() {
          client.end();
          return res.json(results);
        });
        if(err) {
          console.log('POST new contact error:', err);
        }
      });
    });

    // Delete person by id
    app.delete('/api/persons/:personID', function(req, res) {
      var results = [];
      var id = req.params.personID;
      var selectAllPersonsQuery = {
        fields: {
          id: 'id',
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
      pg.connect(conStr, function(err, client){
        client.query("DELETE FROM e_persons WHERE id=($1)", [id]);
        var query = client.query(selectFieldsFromTables(selectAllPersonsQuery));
        query.on('row', function(row) {
          results.push(row);
        });
        query.on('end', function() {
          client.end();
          return res.json(results);
        });
        if(err) {
          console.log(err);
        }
      });
    });

    // Delete contact by id
    app.delete('/api/contacts/:contact_id', function(req, res){
      var results = [];
      var selectAllContactsQuery = {
        fields: {
          id: 'id',
          project: 'project',
          organizationName: 'organization',
          roleName: 'role',
          lastName: 'surname',
          firstName: 'name',
          middleName: 'patronemic',
          workTel: 'tel_work',
          mobileTel: 'tel_mobile',
          email: 'email'
        },
        tables: {
          projects: 'contacts'
        }
      };
      var id = req.params.contact_id;
      pg.connect(conStr, function(err, client){
        client.query("DELETE FROM contacts WHERE id=($1)", [id]);
        var query = client.query(selectFieldsFromTables(selectAllContactsQuery));
        query.on('row', function(row) {
          results.push(row);
        });
        query.on('end', function() {
          client.end();
          return res.json(results);
        });
        if(err) {
          console.log(err);
        }
      });
    });

  app.use('/api/projects', projects);
  app.listen(3000);
})();
