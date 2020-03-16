const mysql = require('mysql');
const {promisify} = require('util');

require('dotenv').config()
const dbname = process.env.DBNAME;
const dbusr = process.env.DBUSR;
const dbpwd = process.env.DBPWD;
const host = process.env.HOST;

const connection = mysql.createPool({
  host: host,
  user: dbusr,
  password: dbpwd,
  database: dbname
});

connection.getConnection((err, connection) => {
  if(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      console.error('Database connection was closed');
    }
    if(err.code === 'ER_CON_COUNT_ERROR'){
      console.error('Database has too many connections');
    }
    if(err.code === 'ECONNREFUSED'){
      console.error('Database connection was refused');
    }
  }
  if(connection) connection.release();
  console.log('DB Connected');
  return;
});

//Promisify Pool queries
promisify(connection.query);

module.exports = connection;