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
        console.log(err)
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
        console.log(err)
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
      console.log(err)
      res.status(500)
    })
  }
}