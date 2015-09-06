var selectAllProjectsQuery = {
  fields: {
    project: 'projectName',
    description: 'projectDescription',
    startDate: 'to_char(projectStartDate, "DD-MM-YYYY") as projectStartDate',
    endDate: 'to_char(projectEndDate, "DD-MM-YYYY") as projectEndDate',
    budget: 'projectBudget'
  },
  tables: {
    projects: 'e_projects'
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

module.exports = selectAllProjectsQuery;
module.exports = selectFieldsFromTables(selectAllProjectsQuery);