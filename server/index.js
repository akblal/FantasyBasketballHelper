const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');
const ObjectsToCsv = require('objects-to-csv');

require('dotenv').config();
const controller = require('./controller.js');

const path = require("path");
const app = express();

//middleware
app.use(cors());
app.use(express.static('client/dist'));
app.use(express.json());

const playerInjuriesURL = 'https://www.espn.com/nba/injuries';

axios(playerInjuriesURL)
  .then ((response) => {
    const html = response.data
    const $ = cheerio.load(html);

    const injuryTableLabel = [
      'name',
      'position',
      'date',
      'status',
      'comment'
    ]

    const allPlayerInjuryList = [];

    const playerInjuryInfo = $('.Table__TR.Table__TR--sm.Table__even')
    playerInjuryInfo.each((parentIdx, parentElem) => {
      const playerInjuryInfo = {}
      $(parentElem).children().each((childIdx, childElem) => {
        let info = $(childElem).text();
        // if (info === '') {
        //   info = 'N/A'
        // }
        playerInjuryInfo[injuryTableLabel[childIdx]] = info;
      })
      allPlayerInjuryList.push(playerInjuryInfo)
    })

    let injuryCSV = new ObjectsToCsv(allPlayerInjuryList);
    injuryCSV.toDisk('./injuryList.csv')
  })
  .catch ((err) => {
    console.log(err)
  })



app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(Number(process.env.PORT),()=>{
  console.log(`listening on port ${process.env.PORT}`);
})
