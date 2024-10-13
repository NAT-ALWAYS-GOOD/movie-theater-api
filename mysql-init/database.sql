-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql-db
-- Généré le : dim. 12 mai 2024 à 02:33
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `database`
--

-- --------------------------------------------------------

--
-- Structure de la table `account`
--

CREATE TABLE `account` (
  `id` int NOT NULL,
  `balance` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `account`
--

INSERT INTO `account` (`id`, `balance`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `cinema_room`
--

CREATE TABLE `cinema_room` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `images` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  `accessibility` tinyint NOT NULL DEFAULT '0',
  `inMaintenance` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cinema_room`
--

INSERT INTO `cinema_room` (`id`, `name`, `description`, `images`, `type`, `capacity`, `accessibility`, `inMaintenance`) VALUES
(1, 'Room 1', 'A spacious room.', 'image2.jpg', '3DMAX', 30, 1, 0),
(2, 'Room 2', 'A gracious room.', 'image2.jpg', 'IMAX', 20, 1, 0),
(3, 'Room 3', 'A gracious room.', 'image2.jpg', 'STANDARD', 25, 0, 0),
(4, 'Room 4', 'A spacious room.', 'image2.jpg', 'IMAX', 28, 0, 0),
(5, 'Room 5', 'A spacious room.', 'image2.jpg', 'IMAX', 30, 1, 0),
(6, 'Room 6', 'A spacious room.', 'image2.jpg', '3DMAX', 27, 0, 0),
(7, 'Room 7', 'A spacious room.', 'image2.jpg', '3DMAX', 29, 1, 0),
(8, 'Room 8', 'A little room.', 'image2.jpg', '3DMAX', 16, 1, 0),
(9, 'Room 9', 'A little room.', 'image2.jpg', 'STANDARD', 15, 0, 0),
(10, 'Room 10', 'A big room.', 'image2.jpg', '3DMAX', 22, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `movie`
--

CREATE TABLE `movie` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  `releaseDate` datetime NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `movie`
--

INSERT INTO `movie` (`id`, `title`, `duration`, `releaseDate`, `isActive`) VALUES
(1, 'Titanic', 194, '1998-01-07 00:00:00', 1),
(2, 'Bienvenue chez les Ch\'tis', 106, '2008-02-20 00:00:00', 1),
(3, 'Intouchables', 112, '2011-11-02 00:00:00', 1),
(4, 'La Grande Vadrouille', 132, '1966-12-08 00:00:00', 1),
(5, 'Avatar', 162, '2009-12-16 00:00:00', 1),
(6, 'Les Visiteurs', 105, '1993-01-27 00:00:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `session`
--

CREATE TABLE `session` (
  `id` int NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `movieId` int DEFAULT NULL,
  `roomId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `session`
--

INSERT INTO `session` (`id`, `startTime`, `endTime`, `movieId`, `roomId`) VALUES
(1, '2024-05-15 09:00:00', '2024-05-13 12:44:00', 2, 1),
(2, '2024-05-15 12:30:00', '2024-05-13 12:44:00', 2, 2),
(3, '2024-05-15 15:30:00', '2024-05-13 12:44:00', 2, 6),
(4, '2024-05-13 09:00:00', '2024-05-13 12:44:00', 1, 1),
(5, '2024-05-20 09:00:00', '2024-05-20 12:44:00', 1, 1),
(6, '2024-05-27 09:00:00', '2024-05-27 12:44:00', 1, 1),
(7, '2024-06-03 09:00:00', '2024-06-03 12:44:00', 1, 1),
(8, '2024-06-03 13:00:00', '2024-06-03 15:16:00', 2, 1),
(9, '2024-05-27 13:00:00', '2024-05-27 15:16:00', 2, 1),
(10, '2024-05-20 13:00:00', '2024-05-20 15:16:00', 2, 1),
(11, '2024-05-13 13:00:00', '2024-05-13 15:16:00', 2, 1),
(12, '2024-05-13 15:30:00', '2024-05-13 17:52:00', 3, 1),
(13, '2024-05-20 15:30:00', '2024-05-20 17:52:00', 3, 1),
(14, '2024-05-27 15:30:00', '2024-05-27 17:52:00', 3, 1),
(15, '2024-06-03 15:30:00', '2024-06-03 17:52:00', 3, 1),
(16, '2024-05-13 09:00:00', '2024-05-13 11:42:00', 4, 2),
(17, '2024-05-13 12:00:00', '2024-05-13 15:12:00', 5, 2),
(18, '2024-05-13 15:30:00', '2024-05-13 17:46:00', 2, 2),
(19, '2024-05-14 15:30:00', '2024-05-14 17:46:00', 2, 2),
(20, '2024-05-14 09:30:00', '2024-05-14 13:14:00', 1, 3),
(21, '2024-05-15 09:30:00', '2024-05-15 11:45:00', 6, 3);

-- --------------------------------------------------------

--
-- Structure de la table `super_ticket`
--

CREATE TABLE `super_ticket` (
  `id` int NOT NULL,
  `remainingUses` int NOT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `super_ticket_usage`
--

CREATE TABLE `super_ticket_usage` (
  `id` int NOT NULL,
  `usedAt` datetime NOT NULL,
  `superTicketId` int DEFAULT NULL,
  `sessionId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ticket`
--

CREATE TABLE `ticket` (
  `id` int NOT NULL,
  `used` tinyint NOT NULL DEFAULT '0',
  `sessionId` int DEFAULT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transaction`
--

CREATE TABLE `transaction` (
  `id` int NOT NULL,
  `type` enum('deposit','withdrawal','purchase') NOT NULL DEFAULT 'purchase',
  `amount` decimal(10,2) NOT NULL,
  `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `accountId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `accountId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `isActive`, `accountId`) VALUES
(1, 'inclinus', '$2b$12$nP9VxGBn0lgIoM.cFUrlZ.SP197qIOz/pzyEF2uq5Lb.p/9Hm5F2a', 'admin', 1, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cinema_room`
--
ALTER TABLE `cinema_room`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f056a463749c7b7b6700511bed7` (`movieId`),
  ADD KEY `FK_6bfcd8b79900d13de31fc4098f2` (`roomId`);

--
-- Index pour la table `super_ticket`
--
ALTER TABLE `super_ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_552cde975b6a5aabdfbceaa349d` (`userId`);

--
-- Index pour la table `super_ticket_usage`
--
ALTER TABLE `super_ticket_usage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_0b9b1c35f1be888162eac0e8b8e` (`superTicketId`),
  ADD KEY `FK_72486e21a9e52cc22780435ee1a` (`sessionId`);

--
-- Index pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f899125e17b829a124a3d66e4a6` (`sessionId`),
  ADD KEY `FK_0e01a7c92f008418bad6bad5919` (`userId`);

--
-- Index pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3d6e89b14baa44a71870450d14d` (`accountId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  ADD UNIQUE KEY `REL_68d3c22dbd95449360fdbf7a3f` (`accountId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `account`
--
ALTER TABLE `account`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `cinema_room`
--
ALTER TABLE `cinema_room`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `session`
--
ALTER TABLE `session`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `super_ticket`
--
ALTER TABLE `super_ticket`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `super_ticket_usage`
--
ALTER TABLE `super_ticket_usage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `FK_6bfcd8b79900d13de31fc4098f2` FOREIGN KEY (`roomId`) REFERENCES `cinema_room` (`id`),
  ADD CONSTRAINT `FK_f056a463749c7b7b6700511bed7` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`);

--
-- Contraintes pour la table `super_ticket`
--
ALTER TABLE `super_ticket`
  ADD CONSTRAINT `FK_552cde975b6a5aabdfbceaa349d` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `super_ticket_usage`
--
ALTER TABLE `super_ticket_usage`
  ADD CONSTRAINT `FK_0b9b1c35f1be888162eac0e8b8e` FOREIGN KEY (`superTicketId`) REFERENCES `super_ticket` (`id`),
  ADD CONSTRAINT `FK_72486e21a9e52cc22780435ee1a` FOREIGN KEY (`sessionId`) REFERENCES `session` (`id`);

--
-- Contraintes pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `FK_0e01a7c92f008418bad6bad5919` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_f899125e17b829a124a3d66e4a6` FOREIGN KEY (`sessionId`) REFERENCES `session` (`id`);

--
-- Contraintes pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `FK_3d6e89b14baa44a71870450d14d` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_68d3c22dbd95449360fdbf7a3f1` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
