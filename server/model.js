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
      pool.query(queryStatement, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result.rows);
      })
    })
  },

  draftPicks(team) {
    return new Promise ((resolve, reject) => {
      if (team.name === 'Philadelphia 76ers') {
        team.name = 'Philadelphia Sixers';
      }
      const queryStatement = `SELECT * FROM draftpicks WHERE team = '${team.name}'`
      pool.query(queryStatement, (err, result) => {
        if (err) {
          return reject (err)
        }
        resolve(result.rows);
      })
    })
  },
  getInjuryUpdate (player)  {
    return new Promise ((resolve, reject) => {
      if ((player.name).includes("'")) {
        let index = (player.name).indexOf("'");
        player.name = (player.name).slice (0,index) + "'" + (player.name).slice(index);
      }
      const queryStatement = `SELECT * FROM injury WHERE name = '${player.name}';`;
      pool.query(queryStatement, (err, result) => {
        if (err) {
          return reject (err)
        }
        resolve (result.rows)
      })
    })
  }
}