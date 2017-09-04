const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const dbConfig = {
  host: '/var/run/postgresql',
  port: 5433  
};

const pg = new (require('pg').Pool)(dbConfig);

const sequelize = new (require('sequelize'))(Object.assign({
  dialect: 'postgres'
}, dbConfig));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(cors());

app.get('/', function (req, res, next) {
  res.json({message: 'root'});
});

app.get('/users', function (req, res, next) {
  res.json({
	    users: [
	      {id: 1, name: 'bob'},
	      {id: 2, name: 'dave'},
	      {id: 3, name: 'hannah'}
	    ]});
});

const { PORT = 3000 } = process.env;

server.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

io.on('connection', (socket) => {
  pg.connect().then((client) => {
    client.query('SELECT current_catalog;')
      .then(res => console.log(`database: ${res.rows[0].current_database}`))
      .catch(console.error);
    client.release();
  });

  console.log(pg.totalCount);

  socket.on('disconnect', (reason) => {
    console.log('reason', reason);
  });
});
