const http = require('http');
const fs = require('fs');
const cors = require('cors');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express')
const app = express()

var dataset;
fs.readFile('./diamonds.csv', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  //console.log(data);
  dataset = data;
});



app.get('/', (req, res) => {
  res.send(dataset)
})

app.use(cors({credentials: true, origin: true}));

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`)
})