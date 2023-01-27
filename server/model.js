const pool = require ('./pool.js');

module.exports = {
  playersFromTeam (team) {
    return new Promise ((resolve, reject) => {
      const queryStatement = (`SELECT * FROM allplayers WHERE team = '${team.abbv}'`)
      pool.query(queryStatement, (err, result)=> {
        if (err) {
          return reject(err)
        }
        console.log(result.rows)
        resolve(result)
      })
    })
  }
}