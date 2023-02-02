const pool = require ('./pool.js');

module.exports = {
  playersFromTeam (team) {
    return new Promise ((resolve, reject) => {
      const queryStatement = (`SELECT * FROM (
        SELECT a.team, a.name, a.position, s.salary FROM
        allplayers as a
        INNER JOIN salary as s
        ON a.name = s.name
        ) T
        WHERE T.team = '${team.abbv}';`)
      pool.query(queryStatement, (err, result)=> {
        if (err) {
          return reject(err)
        }
        console.log(result.rows)
        resolve(result.rows)
      })
    })
  }
}