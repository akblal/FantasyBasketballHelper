const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const controller = require('./controller.js');

const path = require("path");
const app = express();

//middleware
app.use(cors());
app.use(express.static('client/dist'));
app.use(express.json());

const playerInjuries = 'https://www.espn.com/nba/injuries';


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const information = [];

axios(playerInjuries)
  .then (response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const playerName = $('.col-name.Table__TD');

    playerName.each((idx, ref) => {
      const name = $(ref);
      console.log(name.text())
    })

  })



app.listen(Number(process.env.PORT),()=>{
  console.log(`listening on port ${process.env.PORT}`);
})
