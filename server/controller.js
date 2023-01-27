const model = require ('./model.js');

module.exports = {
  playersFromTeam(req, res) {
    const team = JSON.parse(req.query.team)
    console.log(team, 'in controller')
    model.playersFromTeam(team)
      .then((results) => {
        res.status(200)
        res.send(results)
      })

  }
}