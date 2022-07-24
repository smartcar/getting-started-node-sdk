'use strict';

const cors = require('cors');
const express = require('express');
const smartcar = require('smartcar');

const app = express()
  .use(cors());
const port = 8000;

const client = new smartcar.AuthClient({
  clientId: process.env.SMARTCAR_CLIENT_ID,
  clientSecret: process.env.SMARTCAR_CLIENT_SECRET,
  redirectUri: process.env.SMARTCAR_REDIRECT_URI,
  mode: "test",
});

// global variable to save our accessToken
let access;

app.get('/login', function(req, res) {
  const link = client.getAuthUrl(['required:read_vehicle_info']);
  res.redirect(link);
});

app.get('/exchange', async function(req, res) {
  const code = req.query.code;
  // in a production app you'll want to store this in some kind of persistent storage
  access = await client.exchangeCode(code)
  res.redirect('/vehicle');
});

app.get('/vehicle', async function(req, res) {
  // get the vehicle ids
  const vehicles = await smartcar.getVehicles(access.accessToken);
  // instantiate first vehicle in vehicle list
  const vehicle = new smartcar.Vehicle(vehicles.vehicles[0], access.accessToken);
  // get identifying information about a vehicle
  const attributes = await vehicle.attributes()
  console.log(attributes);
  // {
  //   "id": "36ab27d0-fd9d-4455-823a-ce30af709ffc",
  //   "make": "TESLA",
  //   "model": "Model S",
  //   "year": 2014
  //   "meta": {
  //     "requestId": "ada7207c-3c0a-4027-a47f-6215ce6f7b93"
  //   }
  // }
  res.json(attributes);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
