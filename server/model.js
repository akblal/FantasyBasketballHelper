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
  },

  setOriginalTeam(playersInTrade) {
    return new Promise ((resolve, reject) => {
      for (let i = 0; i < playersInTrade.length; i++) {
        let player = playersInTrade[i];
        const queryStatement = 'INSERT INTO originalteam (name, team) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING';
        const queryArguments = [player.name, player.team];
        pool.query(queryStatement, queryArguments, (err, result) => {
          if (err) {
            return reject (err)
          }
          resolve(result)
        })
      }
    })
  },

  swapTeams(team1, team2) {
    return new Promise ((resolve, reject) => {
      let teamOneName = team1[0];
      let playersToTeam1 = team1[1];
      let teamTwoName = team2[0];
      let playersToTeam2 = team2[1];
      let totalPlayers = [];
      for (let i = 0; i < playersToTeam1.length; i++) {
        let player = playersToTeam1[i];
        totalPlayers.push ([teamOneName, player.name])
      }
      for (let i = 0; i < playersToTeam2.length; i++) {
        let player = playersToTeam2[i];
        totalPlayers.push ([teamTwoName, player.name])
      }

      console.log(totalPlayers, 'total players')
      for (let i = 0; i < totalPlayers.length; i++) {
        let player = totalPlayers[i];
        let teamName = player[0];
        let playerName = player[1];
        const queryStatement = `UPDATE allplayers SET team = '${teamName}' WHERE name = '${playerName}';`
        pool.query(queryStatement, (err, result) => {
          if (err) {
            return reject (err)
          }
          resolve(result)
        })
      }

    })
  }
}