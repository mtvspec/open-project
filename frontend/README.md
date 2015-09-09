Contacts
1. Клиент запрашивает приложение;
Запрос: приложение;
Ответ: приложение;
2. Бакэнд возвращает приложение и данные;
Запрос: приложение;
Ответ: приложение + данные;
3. Клиент изменяет и отправляет данные;
Запрос: текущие данные;
Ответ: изменные данные;
4. Бакэнд принимает и сохраняет данные.
Запрос: изменные данные;
Ответ: успех.

Клиент создает модель, сохраняет данные в модель и работает с данными модели.
Клиент изменил данные и отправил на сервер.
Если данные изменились, сервер сообщает об этом клиенту.
Клиент скачивает данные, обнавляет данные в модели и работает с обновленными данными.

Tasks - Задачи

Services:
var tasks.services = {
    get: {
      url: '/api/tasks',
      data: {
        id:   task.id,
        name: task.name
        }
      },
    post: {
      url: '/api/tasks',
      data: {
        name: task.name
        }
      },
    put: {
      url: '/api/tasks:id',
      data: {
        name: task.name
        }
      },
    delete: {
      url: '/api/tasks:id',
      data: {
        id: task.id
      }
  };

  Add task use case
  Success case:

  Input: [window: Task list]
  1. User click on Add task button
  Output: [button: Task add = {
    controller: {
      name: TasksCtrl,
      function: TasksCtrl: {
        function: {
          name: addTask,
          body: show modal: {
            name: Add task}
          }
        }
      }
    }
  ]
  Input: [show modal: {
    name: Add task}]
  2. App show Add task modal
  Output: [modal: {
    name: Task add,
    view: {
      templateUrl: 'TaskAddTmpl.html',
      controller: 'TaskAddCtrl'},
    scope: {
      name: task,
      data: {
        name: task,
        task: {
          task: taskName}}}
    ]
  Input: [modal: {
    name: Add task}
  ]
  3. User enter task name
  Output: [data: {
    task: taskName}
    ]
  Input: [data: taskName]
  4. App bind task name to scope
  Output: [scope:
    task: {
    task: taskName}
    ]
  Input: [modal: Add task]
  5. User click on Add task button
  Output: [button: Add task, scope: TaskName]
  Input: [button: Add task, scope: taskName]
  6. App:

  6.1. Check required field
  Output: [result: {
    true: [next step],
    false: [step: 3.]}
    ]
  Input: [data: All required fields  = true]
  6.2. Send task to backend
  Output: [next step]
  Input: [request: {
    task: taskName}
    ]
  8. Backend:
  8.1. Insert task name in DB
  Output: [row: {
    task: taskId}
    ]
  [Query: SELECT id, name FROM tasks ORDER by ID]
  8.2. Select updated task list from DB
  Output: [rows:
    tasks: {
      taskId,
      taskName}
    ]
  Input: [rows: tasks: {taskId, taskName}]
  8.3. Response with updated task list
  Output: [response:
    tasks: {
      taskId,
      taskName}
    ]
  Input: [next]
  9. App:
  9.1. Close modal
  Output: [window: Task list]
  Input: [response:
    tasks: {
      taskId,
      taskName
    }]
  9.2 Show user updated task list
  Output: [view:
    TasksList: {
      template,
      controller,
      response:
        {data: {
          tasks:{
            taskId,
            taskName}
        }
      }
    }]

  Alternate case:
  6.a
    1. App show user required field
    2. User enter task name
  Exceptions
  1. Required field
  2. No response from backend *