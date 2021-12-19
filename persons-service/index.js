const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const persons = [
  { id: 1, name: 'Hovard' },
  { id: 2, name: 'Lesley' },
  { id: 3, name: 'Sheldon' },
  { id: 4, name: 'Leo' },
  { id: 5, name: 'Raja' }
]

app.get('/person/:id', (req, res) => {
  res.send(persons.find((e) => e.id == req.params.id));
});

app.get('/persons', (req, res) => {
  res.send(persons);
});

app.listen(7001, () => {
  console.log('listening on 7001');
});