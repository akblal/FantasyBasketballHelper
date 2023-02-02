DROP TABLE IF EXISTS injury;
DROP TABLE IF EXISTS allPlayers;
DROP TABLE IF EXISTS salary;

CREATE TABLE injury (
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL,
  comment TEXT
);

CREATE TABLE allPlayers (
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  position TEXT NOT NULL,
  age TEXT NOT NULL,
  gamesPlayed TEXT,
  mpg TEXT,
  minPercent TEXT,
  usgPercent TEXT,
  toPercent TEXT,
  fta TEXT,
  ftPercent TEXT,
  twopa TEXT,
  twopPercent TEXT,
  threepa TEXT,
  threepPercent TEXT,
  efgPercent TEXT,
  tsPercent TEXT,
  ppg TEXT,
  rpg TEXT,
  trbPercent TEXT,
  apg TEXT,
  astPercent TEXT,
  spg TEXT,
  bpg TEXT,
  topg TEXT,
  vi TEXT,
  ortg TEXT,
  drtg TEXT
);

CREATE TABLE salary (
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  salary TEXT NOT NULL
);

\COPY injury FROM 'injuryList.csv' DELIMITERS ',' CSV HEADER;
\COPY allPlayers FROM 'playerStats.csv' DELIMITERS ',' CSV HEADER;
\COPY salary FROM 'playerSalary.csv' DELIMITERS ',' CSV HEADER;