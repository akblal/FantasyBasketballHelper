const model = require ('./model.js');

module.exports = {
  playersFromTeam(req, res) {
    const team = JSON.parse(req.query.team)
    model.playersFromTeam(team)
      .then((results) => {
        res.send(results)
        res.status(200)
      })
      .catch((err) => {
        console.log(err, 'playersFromTeam in controller')
        res.status(500)
      })
  },
  draftPicks (req, res) {
    const team = JSON.parse(req.query.team)
    model.draftPicks(team)
      .then((results) => {
        res.send(results)
        res.status(200)
      })
      .catch((err) => {
        res.status(500)
        console.log(err, 'draftPicks in controller')
      })
  },

  getInjuryUpdate(req,res) {
    const player = JSON.parse(req.query.player)
    model.getInjuryUpdate(player)
    .then((results) => {
      res.send(results);
      res.status(200);
    })
    .catch ((err) => {
      console.log(err, 'getInjuryUpdate in controller')
      res.status(500)
    })
  },

  setOriginalTeam(req, res) {
    let playersInTrade = req.body.playersInTrade;
    model.setOriginalTeam(playersInTrade)
    .then((results) => {
      res.status(200)
      res.send('success entry into original team!')
    })
    .catch((err) => {
      console.log(err, 'setOriginalTeam in controller')
      res.send(500)
    })
  },

  swapTeams(req, res) {
    let team1 = req.body.team1;
    let team2 = req.body.team2;
    console.log (team1, team2, 'traded players')
    model.swapTeams(team1, team2)
    .then((results) => {
      res.status(201)
      res.send('successful swap!')
    })
    .catch((err) => {
      console.log(err, 'swapTeams in controller')
      res.send(500)
    })
  }
}