-- Chargement avec psql depuis le dossier des ressources
SET search_path TO formation_sql, public;
\copy regions FROM 'regions.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
\copy produits FROM 'produits.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
\copy clients FROM 'clients.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
\copy ventes FROM 'ventes.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
\copy objectifs FROM 'objectifs.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
