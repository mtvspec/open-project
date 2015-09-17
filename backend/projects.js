(function(){
  'use strict';

  var express = require('express');
  var projects = express.Router();
  var pg = require('pg');
  pg.defaults = {
    host: 'localhost',
    port: 5432,
    user: 'mtvspec',
    password: 'mtvspec',
    database: 'mtvspec'
  };

// /api/projects
  projects
    // Get all projects
    .get('/', function(req, res){
      pg.connect(function(err, client){
        client.query({
          text: "SELECT id, projectCustomerId, projectName, projectDescription, to_char(projectStartDate, \'DD-MM-YYYY\') as projectStartDate, to_char(projectEndDate, \'DD-MM-YYYY\') as projectEndDate, projectBudget, projectManagerId FROM e_projects ORDER BY id"
        }, function(err, result){
          if(err){
            console.error('Select all projects error:', err);
          }
          else {
            res.json(result.rows);
          }
        })
      })
    })
    // Get project by id
    .get('/:projectID', function(req, res){
      pg.connect(function(err, client){
        client.query({
          text: "SELECT id, projectCustomerId, projectName, projectDescription, to_char(projectStartDate, \'DD-MM-YYYY\') as projectStartDate, to_char(projectEndDate, \'DD-MM-YYYY\') as projectEndDate, projectBudget, projectManagerId FROM e_projects WHERE id = $1",
          values: [req.params.projectID]
        }, function(err, result){
          if(err){
            console.error('Select project by id error:', err);
          }
          else {
            res.json(result.rows);
          }
        })
      })
    })
    // Post new project
    .post('/', function(req, res){
      var project = {
        projectCustomerId: req.body.projectCustomerId,
        projectName: req.body.projectName,
        projectDescription: req.body.projectDescription,
        projectStartDate: req.body.projectStartDate,
        projectEndDate: req.body.projectEndDate,
        projectBudget: req.body.projectBudget,
        projectManagerId: req.body.projectManagerId
      };
      pg.connect(function(err, client){
        client.query({
          text: 'INSERT INTO e_projects(projectCustomerId, projectName, projectDescription, projectStartDate, projectEndDate, projectBudget, projectManagerId) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
          values: [
            project.projectCustomerId,
            project.projectName,
            project.projectDescription,
            project.projectStartDate,
            project.projectEndDate,
            project.projectBudget,
            project.projectManagerId
          ]
        }, function(err, result){
          if(err){
            console.log('Insert new project error', err);
          } else {
            res.json(result.rows);
          }
        })
      });
    })
    // Update project by id
    .put('/:projectID', function(req, res){
      var project = {
        projectId: req.params.projectID,
        projectCustomerId: req.body.projectCustomerId,
        projectName: req.body.projectName,
        projectDescription: req.body.projectDescription,
        projectStartDate: req.body.projectStartDate,
        projectEndDate: req.body.projectEndDate,
        projectBudget: req.body.projectBudget,
        projectManagerId: req.body.projectManagerId
      };
      pg.connect(function(err, client){
        client.query({
          text: 'UPDATE e_projects SET projectCustomerId = $2 and projectName = $3 and projectDescription = $4 and projectStartDate = $5 and projectEndDate = $6 and projectBudget = $7 and projectManagerId = $8 WHERE id = $1',
          values: [
            project.projectId,
            project.projectCustomerId,
            project.projectName,
            project.projectDescription,
            project.projectStartDate,
            project.projectEndDate,
            project.projectBudget,
            project.projectManagerId
          ]
        }, function(err, result){
          if(err){
            console.log('Update project error:', err);
          } else {
            res.json(result.rows);
          }
        })
      });
  })
    // Delete project by id
    .delete('/:projectID', function(req, res){
      var project = {
        id: req.params.projectId
      };
      pg.connect()
    });

  module.exports = projects;

})();