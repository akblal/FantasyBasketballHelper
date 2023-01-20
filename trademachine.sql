DROP TABLE IF EXISTS injury;

CREATE TABLE injury (
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL,
  comment TEXT
);

\COPY injury FROM 'injuryList.csv' DELIMITERS ',' CSV;