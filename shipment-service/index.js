const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const axios = require('axios');
const { response } = require('express');

const app = express();

app.use(cors());

const shipments = [
  { id: 1, date: '2022-15-12', price: 15654, personID : 2 },
  { id: 2, date: '2022-15-11', price: 15654, personID :4 },
  { id: 3, date: '2022-15-10', price: 15654, personID : 5 },
  { id: 4, date: '2022-15-09', price: 15654, personID : 1 },
  { id: 5, date: '2022-15-08', price: 15654, personID : 3 }
];

app.get('/shipment/:id', (req, res) => {
  const shipmentIndex = shipments.findIndex((e) => e.id == req.params.id)
  
  if(shipmentIndex != -1){
    axios.get(`http://persons:7001/person/${shipments[shipmentIndex].personID}`).then(response => {
      personDetails = response.data
      res.send({date:shipments[shipmentIndex].date, price:shipments[shipmentIndex].price, reciever:personDetails.name});
    })

  }else{
    res.send({id:-1})
  }
});

app.get('/shipments', (req, res) => {
  res.send(shipments);
});

app.listen(7000, () => {
  console.log('listening on 7000');
});
