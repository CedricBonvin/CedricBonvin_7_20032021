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
  `idUser` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `pseudo` varchar(50) DEFAULT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `pseudo` (`pseudo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

---  MESSAGE -----

CREATE TABLE `message` (
  `idMESSAGES` int unsigned NOT NULL AUTO_INCREMENT,
  `idUSERS` int unsigned DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `pseudoUser` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `totalLike` int DEFAULT '0',
  `totalDislike` int DEFAULT NULL,
  `photoProfil` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idMESSAGES`),
  KEY `fk_id_User` (`idUSERS`),
  CONSTRAINT `fk_id_User` FOREIGN KEY (`idUSERS`) REFERENCES `users` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- LIKES --

CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `idMessage` int unsigned NOT NULL,
  `idUser` int unsigned NOT NULL,
  `totalLike` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_likes_users` (`idUser`),
  KEY `fk_likes_message` (`idMessage`),
  CONSTRAINT `fk_likes_message` FOREIGN KEY (`idMessage`) REFERENCES `message` (`idMESSAGES`) ON DELETE CASCADE,
  CONSTRAINT `fk_likes_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- DISLIKES --

CREATE TABLE `dislikes` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `idMessage` int unsigned NOT NULL,
  `idUser` int unsigned NOT NULL,
  `totalLike` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dislikes_users` (`idUser`),
  KEY `fk_dislikes_message` (`idMessage`),
  CONSTRAINT `fk_dislikes_message` FOREIGN KEY (`idMessage`) REFERENCES `message` (`idMESSAGES`) ON DELETE CASCADE,
  CONSTRAINT `fk_dislikes_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- COMMENTAIRES --

CREATE TABLE `commentaires` (
  `idCommentaire` int unsigned NOT NULL AUTO_INCREMENT,
  `idUser` int unsigned NOT NULL,
  `idMessageBase` int unsigned NOT NULL,
  `message` varchar(200) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `pseudo` varchar(50) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idCommentaire`),
  KEY `fk_commentaires_users` (`idUser`),
  KEY `fk_commentaires_message` (`idMessageBase`),
  CONSTRAINT `fk_commentaires_message` FOREIGN KEY (`idMessageBase`) REFERENCES `message` (`idMESSAGES`) ON DELETE CASCADE,
  CONSTRAINT `fk_commentaires_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;


Rendez-vous dans le dossier backend et lancer le serveur en faisant < nodemon >