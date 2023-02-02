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
const allPlayerStatsURL = 'https://www.nbastuffer.com/2022-2023-nba-player-stats/';
const allPlayerSalary = 'http://www.espn.com/nba/salaries/_/page/';

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
        playerInjuryInfo[injuryTableLabel[childIdx]] = info;
      })
      allPlayerInjuryList.push(playerInjuryInfo)
    })

    let injuryCSV = new ObjectsToCsv(allPlayerInjuryList);
    injuryCSV.toDisk('./injuryList.csv')
  })
  .catch ((err) => {
    console.log(err, 'with all player injuries')
  })

axios(allPlayerStatsURL)
  .then((response) => {
    let html = response.data;
    let $ = cheerio.load(html)

    let playerData = $('.row-hover')
    let allPlayerData = []
    let player = {};
    $(playerData).each((parentIdx, parentElem) => {
      const playerStats = [
        'name',
        'team',
        'position',
        'age',
        'gamesPlayed',
        'mpg',
        'min%',
        'usg%',
        'to%',
        'fta',
        'ft%',
        '2pa',
        '2p%',
        '3pa',
        '3p%',
        'efg%',
        'ts%',
        'ppg',
        'rpg',
        'trb%',
        'apg',
        'ast%',
        'spg',
        'bpg',
        'topg',
        'vi',
        'ortg',
        'drtg'
      ];
      let index = 0;
      $(playerData).children().children().each((grandChildIdx, grandChildElem) => {
        if ($(grandChildElem).text() != '' && grandChildIdx >=1) {
          player[playerStats[index]] = $(grandChildElem).text();
          if (index === 27) {
            allPlayerData.push(player)
            player = {}
          }
          index++
        } else if (index <= 27 && grandChildIdx >1){
          player[playerStats[index]] = 'N/A';
          if (index === 27) {
            allPlayerData.push(player)
            player = {}
          }
          index++
        } else {
          index = 0;
          }
      })
    })
    let allPlayerStatsCSV = new ObjectsToCsv(allPlayerData);
    allPlayerStatsCSV.toDisk('./playerStats.csv')
  })
  .catch ((err) => {
    console.log (err, 'with all player stats')
  })

let count = 1;
let url = allPlayerSalary + (count.toString())
let allPlayerSalaryList = [];
const getSalary = async (url) => {
  try {
    axios(url)
      .then ((response) => {
        const html = response.data
        const $ = cheerio.load(html);

        let playerSalary = [
          'name',
          'team',
          'salary'
        ]

        const playerSalaryInfo = '#my-players-table > div > div.mod-content > table > tbody > tr'
        $(playerSalaryInfo).each((parentIdx, parentElem) => {
            let player = {}
            $(parentElem).children().each((childIdx, childElem) => {
              if ($(childElem).text() != 'RK' && $(childElem).text() != 'NAME' && $(childElem).text() != 'TEAM' && $(childElem).text() != 'SALARY') {
                if (childIdx === 1) {
                  let namePosition = $(childElem).text();
                  let indexComma = namePosition.indexOf(',')
                  let name = namePosition.substring(0, indexComma)
                  player[playerSalary[childIdx - 1]] = name;
                } else if (childIdx > 1) {
                  player[playerSalary[childIdx - 1]] = $(childElem).text();
                }
              }
            })
            if (Object.keys(player).length) {
              allPlayerSalaryList.push(player)
            }
        })

      })
      .then (() => {
        console.log(allPlayerSalaryList, allPlayerSalaryList.length)
        let allPlayerStatsCSV = new ObjectsToCsv(allPlayerSalaryList);
        allPlayerStatsCSV.toDisk('./playerSalary.csv')
      })
      .catch ((err) => {
        console.log(err, 'with all player injuries')
      })
      if (count === 13) {
        return false;
      } else {
        count++
        url = allPlayerSalary + (count.toString());
        getSalary(url)
      }
  }
  catch (err){
    console.log (err)
  }
}



getSalary(url)


app.get('/playersFromTeam', controller.playersFromTeam)
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
