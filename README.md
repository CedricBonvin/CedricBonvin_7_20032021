******* GROUPOMANIA *******

Veuillez suivre les instructions suivantes pour lancer le projet



***** INSTALLATION DU PROJET *****

1.- Cloner le projet 

2.- Connectez-vous à MySql, puis créer une base de donnés

3.- aller dans le dossier frontends et installé les dépendances, < npm install > puis < npm run serve  >




***** VARIABLE D'ENVIRONNEMENT *******

1.- Dans le backend, créer un fichier < .env >

2.- Dans le backend aller dans le fichier .envExemple, renseigner tous les champs avec les données de votre environnement et coller le dans le fichier < .env > que vous venez de créer.

*** CREATION DES TABLES DE LA BASE DONNEEs ***

1.- Après avoir créer la base données veuillez créer les tables en exécutant les codes si dessous :


---- USERS ----

CREATE TABLE `users` (
idUser int(10) unsigned NOT NULL AUTO_INCREMENT, email varchar(100) DEFAULT NULL, password varchar(100) DEFAULT NULL, pseudo varchar(50) DEFAULT NULL, photo varchar(200) DEFAULT NULL, isAdmin tinyint(1) DEFAULT '0', PRIMARY KEY (idUser), UNIQUE KEY email (email), UNIQUE KEY pseudo (pseudo) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

---  MESSAGE -----

CREATE TABLE `message` (
idMESSAGES int(10) unsigned NOT NULL AUTO_INCREMENT, idUSERS int(11) DEFAULT NULL, message varchar(200) DEFAULT NULL, pseudoUser varchar(50) DEFAULT NULL, date varchar(50) DEFAULT NULL, image varchar(200) DEFAULT NULL, totalLike int(11) DEFAULT '0', totalDislike int(11) DEFAULT NULL, photoProfil varchar(200) DEFAULT NULL, PRIMARY KEY (idMESSAGES) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- LIKES --

CREATE TABLE `likes` (
id int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', idMessage int(11) NOT NULL, idUser int(11) DEFAULT NULL, totalLike int(11) DEFAULT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- DISLIKES --

CREATE TABLE dislikes ( id int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', idMessage int(11) NOT NULL, idUser int(11) DEFAULT NULL, totalLike int(11) DEFAULT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- COMMENTAIRES --

CREATE TABLE commentaires ( idCommentaire int(10) unsigned NOT NULL AUTO_INCREMENT, idUser int(11) DEFAULT NULL, idMessageBase int(11) DEFAULT NULL, message varchar(200) DEFAULT NULL, image varchar(200) DEFAULT NULL, pseudo varchar(50) DEFAULT NULL, date varchar(100) DEFAULT NULL, PRIMARY KEY (idCommentaire) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


Rendez-vous dans le dossier backend et lancer le serveur en faisant < nodemon >
