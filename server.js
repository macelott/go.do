//When testing on node, replace "ng serve" with "node server.js" on "start" in json
const express = require('express');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const {
  Client
} = require('pg');

const {
  DATABASE_URL
} = process.env;

const client = new Client({
  host: 'ec2-107-21-224-61.compute-1.amazonaws.com',
  user: 'ylgvthobpvpwbc',
  password: '571eac3ed89bb2e930163361e41576310d285989918cf4803320e77135acda96',
  database: 'd8g6lap4mdahch',
  //connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();

app.use(bodyParser.text());
app.use(bodyParser.json());

app.get("/api/todos", function (req, res) {
  client.query('SELECT * FROM todos ORDER BY display_order DESC', (err, todos) => {
    res.end(JSON.stringify(todos.rows));
    //res.end(JSON.stringify(post))
    //client.end()
  });
});

app.put("/api/todos", function (req, res) {
  var todo = req.body;
  var id = todo.id;
  var title = todo.title;
  var done = todo.done;
  var display_order = todo.display_order;
  var due_todo = todo.due_todo;
  var values = [id, title, done, display_order, due_todo];
  var query = 'UPDATE todos SET (title, done, display_order, due_todo) = ($2, $3, $4, $5) WHERE id = $1;';
  var query2 = 'SELECT * FROM todos ORDER BY display_order DESC';

  console.log('Update title: ' + title + ', id: ' + id);

  client.query(query, values, function (err, result) {
    if (err) {
      console.error('Error during update - ' + err.stack);
      res.status(500).end('There was an error updating todo with id: ' + id);
    }
    client.query(query2, (err, todos) => {
      if (err) {
        console.log(err);
      }
      //console.log(JSON.stringify(todos.rows));
      res.end(JSON.stringify(todos.rows));
    });

  });
});


app.put("/api/move", function (req, res) {
  console.log('Move called');
  var todo = req.body;
  var id = todo.id;
  var newPos = todo.display_order;
  var values1 = [id]
  var values4 = [id, newPos];
  var query1 = 'SELECT display_order FROM todos WHERE id = $1;';
  var query2 = 'UPDATE todos SET display_order = display_order + 1 WHERE display_order BETWEEN $2 AND $1-1;';
  var query3 = 'UPDATE todos SET display_order = display_order - 1 WHERE display_order BETWEEN $1+1 AND $2;';
  var query4 = 'UPDATE todos SET display_order = $2 WHERE id = $1;';
  var query5 = 'SELECT * FROM todos ORDER BY display_order DESC';

  client.query(query1, values1, function (err, result) {
    if (err) {
      console.error('Error during Move - ' + err.stack);
      res.status(500).end('There was an error moving todo with id: ' + id);
    }
    var oldPos = result.rows[0].display_order;
    var values = [oldPos, newPos];
    console.log(oldPos);
    console.log(newPos);
    if (oldPos > newPos) {

      console.log("down");
      // Going down
      // Shift elements >= new and <old (+ 1)
      // Update pos
      client.query(query2, values, function (err, result) {
        if (err) {
          console.error('Error during Move - ' + err.stack);
          res.status(500).end('There was an error moving todo with id: ' + id);
        }

        client.query(query4, values4, function (err, result) {
          if (err) {
            console.error('Error during Move - ' + err.stack);
            res.status(500).end('There was an error moving todo with id: ' + id);
          }

          client.query(query5, (err, todos) => {
            if (err) {
              console.log(err);
            }
            //console.log(JSON.stringify(todos.rows));
            res.end(JSON.stringify(todos.rows));
          });

        });

      });
    } else {
      // Going up
      // Shift elements > old and <=new (-1)
      // Update pos
      console.log("up");
      client.query(query3, values, function (err, result) {
        if (err) {
          console.error('Error during Move - ' + err.stack);
          res.status(500).end('There was an error moving todo with id: ' + id);
        }

        client.query(query4, values4, function (err, result) {
          if (err) {
            console.error('Error during Move - ' + err.stack);
            res.status(500).end('There was an error moving todo with id: ' + id);
          }
          client.query(query5, (err, todos) => {
            if (err) {
              console.log(err);
            }
            //console.log(JSON.stringify(todos.rows));
            res.end(JSON.stringify(todos.rows));
          });

        });

      });
    }
  });
});

//Delete
app.put("/api/todos/delete", function (req, res) {
  console.log("Delete called")
  var todo = req.body;
  var id = todo.id;
  var title = todo.title;
  var values = [id];
  var query_get_pos = 'SELECT display_order FROM todos WHERE id = $1;';
  var query = 'DELETE FROM todos WHERE id = $1;';
  var query_shift = 'UPDATE todos SET display_order = display_order-1 WHERE display_order > $1;';
  var query2 = 'SELECT * FROM todos ORDER BY display_order DESC';

  console.log('Delete title: ' + title + ', id: ' + id);

  client.query(query_get_pos, values, function (err, result) {
    if (err) {
      console.error('Error during Delete - ' + err.stack);
      res.status(500).end('There was an error Deleting todo with id: ' + id);
    }

    var posValues = [result.rows[0].display_order];

    client.query(query, values, function (err, result) {
      if (err) {
        console.error('Error during Delete - ' + err.stack);
        res.status(500).end('There was an error Deleting todo with id: ' + id);
      }

      client.query(query_shift, posValues, function (err, result) {
        if (err) {
          console.error('Error during Delete - ' + err.stack);
          res.status(500).end('There was an error Deleting todo with id: ' + id);
        }

        client.query(query2, (err, todos) => {
          if (err) {
            console.log(err);
          }
          //console.log(JSON.stringify(todos.rows));
          res.end(JSON.stringify(todos.rows));
        });
      });
    });
  });
});


app.post("/api/todos", function (req, res) {
  var todo = JSON.parse(req.body);
  var tText = todo.title;
  var dPos = todo.display_order;
  var tDue = todo.due_todo;

  console.log('title: ' + tText);

  var values = [tText, dPos, tDue];
  var query = 'INSERT INTO todos(title, display_order, timestamp, due_todo) VALUES ($1, $2, now(), $3);';
  var query2 = 'SELECT * FROM todos ORDER BY display_order DESC';

  client.query(query, values, (err, tRes) => {
    if (err) {
      console.log(err);
    }

    client.query(query2, (err, todos) => {
      if (err) {
        console.log(err);
      }
      res.end(JSON.stringify(todos.rows));
    });
  });
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/fp'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/fp/index.html'))
});

app.get('/list', function (req, res) {
  res.sendFile(path.resolve('dist/fp/index.html'))
});

app.get('/calendar', function (req, res) {
  res.sendFile(path.resolve('dist/fp/index.html'))
});

/*
app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/<name-of-app>/index.html'));
});*/

// Start the app by listening on the default Heroku port
//app.listen((process.env.PORT || port));
app.listen((process.env.PORT || port), () => console.log('listening!'))
