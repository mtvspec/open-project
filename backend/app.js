(function(){
  'use strict';

  var express = require('express');
  var app = express();
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

  var projects = require('projects');
  var user = require('user');
  var persons = require('persons');
  var contacts = require('contacts');
  var tasks = require('tasks');
  var users = user;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Routers
  app.use('/api/projects', projects);
  app.use('/api/user', user);
  app.use('/api/users', users);
  app.use('/api/persons', persons);
  app.use('/api/persons/:personID/contacts', contacts);
  app.use('/api/tasks', tasks);
  app.use('/api/contacts', contacts);

  app.listen(3000);
})();
