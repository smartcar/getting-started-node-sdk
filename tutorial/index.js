'use strict';

const cors = require('cors');
const express = require('express');
const smartcar = require('smartcar');

const app = express()
  .use(cors());
const port = 8000;

// TODO: Authorization Step 1a: Launch Smartcar authentication dialog

// global variable to save our accessToken
let access;

app.get('/login', function(req, res) {
  // TODO: Authorization Step 1b: Launch Smartcar authentication dialog
});

app.get('/exchange', function(req, res) {
  // TODO: Authorization Step 3: Handle Smartcar response

  // TODO: Request Step 1: Obtain an access token
});

app.get('/vehicle', function(req, res) {
  // TODO: Request Step 2: Get vehicle ids

  // TODO: Request Step 3: Create a vehicle

  // TODO: Request Step 4: Make a request to Smartcar API
});

app.listen(port, () => console.log(`Listening on port ${port}`));
