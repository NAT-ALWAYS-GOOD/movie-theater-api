-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql-db
-- Généré le : mer. 23 oct. 2024 à 14:26
-- Version du serveur : 9.0.1
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
-- Structure de la table `cinema_room`
--

CREATE TABLE `cinema_room` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `capacity` int NOT NULL DEFAULT '50',
  `accessibility` tinyint NOT NULL DEFAULT '0',
  `theaterId` int DEFAULT NULL,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cinema_room`
--

INSERT INTO `cinema_room` (`name`, `description`, `type`, `capacity`, `accessibility`, `theaterId`, `id`) VALUES
('Salle 1', 'Salle IMAX pour une immersion totale.', 'IMAX', 50, 1, 1, 1),
('Salle 2', 'Salle 3D pour des projections en relief.', '3D', 50, 1, 1, 2),
('Salle 3', 'Salle SENSE avec technologie sensorielle avancée.', 'SENSE', 50, 1, 1, 3),
('Salle 4', 'Salle IMAX pour une expérience cinématographique unique.', 'IMAX', 50, 1, 1, 4),
('Salle 5', 'Salle 3D offrant des images en trois dimensions.', '3D', 50, 1, 1, 5),
('Salle 6', 'Salle SENSE pour une immersion sonore exceptionnelle.', 'SENSE', 50, 1, 1, 6),
('Salle 7', 'Salle IMAX avec écran géant.', 'IMAX', 50, 1, 1, 7),
('Salle 8', 'Salle 3D pour des sensations fortes.', '3D', 50, 1, 1, 8),
('Salle 9', 'Salle SENSE avec sièges interactifs.', 'SENSE', 50, 1, 1, 9),
('Salle 1', 'Salle IMAX pour des images ultra-réalistes.', 'IMAX', 50, 1, 2, 10),
('Salle 2', 'Salle 3D avec technologie de pointe.', '3D', 50, 1, 2, 11),
('Salle 3', 'Salle SENSE pour une expérience multisensorielle.', 'SENSE', 50, 1, 2, 12),
('Salle 4', 'Salle IMAX avec son surround.', 'IMAX', 50, 1, 2, 13),
('Salle 5', 'Salle 3D pour une profondeur d\'image incroyable.', '3D', 50, 1, 2, 14),
('Salle 6', 'Salle SENSE avec effets spéciaux intégrés.', 'SENSE', 50, 1, 2, 15),
('Salle 7', 'Salle IMAX pour une clarté visuelle optimale.', 'IMAX', 50, 1, 2, 16),
('Salle 8', 'Salle 3D pour des films d\'action spectaculaires.', '3D', 50, 1, 2, 17),
('Salle 9', 'Salle SENSE offrant une expérience immersive totale.', 'SENSE', 50, 1, 2, 18),
('Salle 1', 'Salle IMAX pour des projections grandioses.', 'IMAX', 50, 1, 3, 19),
('Salle 2', 'Salle 3D avec images en haute définition.', '3D', 50, 1, 3, 20),
('Salle 3', 'Salle SENSE pour une expérience unique.', 'SENSE', 50, 1, 3, 21),
('Salle 4', 'Salle IMAX avec technologie laser.', 'IMAX', 50, 1, 3, 22),
('Salle 5', 'Salle 3D pour une immersion totale.', '3D', 50, 1, 3, 23),
('Salle 6', 'Salle SENSE avec son Dolby Atmos.', 'SENSE', 50, 1, 3, 24),
('Salle 7', 'Salle IMAX pour des couleurs éclatantes.', 'IMAX', 50, 1, 3, 25),
('Salle 8', 'Salle 3D pour vivre le film autrement.', '3D', 50, 1, 3, 26),
('Salle 9', 'Salle SENSE avec effets environnementaux.', 'SENSE', 50, 1, 3, 27),
('Salle 1', 'Salle IMAX pour des sensations fortes.', 'IMAX', 50, 1, 4, 28),
('Salle 2', 'Salle 3D avec technologie innovante.', '3D', 50, 1, 4, 29),
('Salle 3', 'Salle SENSE pour une expérience cinématographique sensorielle.', 'SENSE', 50, 1, 4, 30),
('Salle 4', 'Salle IMAX avec écran panoramique.', 'IMAX', 50, 1, 4, 31),
('Salle 5', 'Salle 3D pour une visualisation réaliste.', '3D', 50, 1, 4, 32),
('Salle 6', 'Salle SENSE avec vibrations synchronisées.', 'SENSE', 50, 1, 4, 33),
('Salle 7', 'Salle IMAX pour une qualité d\'image exceptionnelle.', 'IMAX', 50, 1, 4, 34),
('Salle 8', 'Salle 3D pour des films plus vivants.', '3D', 50, 1, 4, 35),
('Salle 9', 'Salle SENSE avec ambiance immersive.', 'SENSE', 50, 1, 4, 36),
('Salle 1', 'Salle IMAX pour vivre le cinéma autrement.', 'IMAX', 50, 1, 5, 37),
('Salle 2', 'Salle 3D avec projection numérique.', '3D', 50, 1, 5, 38),
('Salle 3', 'Salle SENSE pour une immersion complète.', 'SENSE', 50, 1, 5, 39),
('Salle 4', 'Salle IMAX avec son haute fidélité.', 'IMAX', 50, 1, 5, 40),
('Salle 5', 'Salle 3D pour des images saisissantes.', '3D', 50, 1, 5, 41),
('Salle 6', 'Salle SENSE avec technologie 4D.', 'SENSE', 50, 1, 5, 42),
('Salle 7', 'Salle IMAX pour des émotions intenses.', 'IMAX', 50, 1, 5, 43),
('Salle 8', 'Salle 3D pour une expérience visuelle enrichie.', '3D', 50, 1, 5, 44),
('Salle 9', 'Salle SENSE avec effets spéciaux immersifs.', 'SENSE', 50, 1, 5, 45),
('Salle 1', 'Salle IMAX pour des films spectaculaires.', 'IMAX', 50, 1, 6, 46),
('Salle 2', 'Salle 3D avec images réalistes.', '3D', 50, 1, 6, 47),
('Salle 3', 'Salle SENSE pour une expérience interactive.', 'SENSE', 50, 1, 6, 48),
('Salle 4', 'Salle IMAX avec technologie avancée.', 'IMAX', 50, 1, 6, 49),
('Salle 5', 'Salle 3D pour des sensations visuelles.', '3D', 50, 1, 6, 50),
('Salle 6', 'Salle SENSE avec sièges dynamiques.', 'SENSE', 50, 1, 6, 51),
('Salle 7', 'Salle IMAX pour une qualité incomparable.', 'IMAX', 50, 1, 6, 52),
('Salle 8', 'Salle 3D pour des projections impressionnantes.', '3D', 50, 1, 6, 53),
('Salle 9', 'Salle SENSE pour une expérience unique en son genre.', 'SENSE', 50, 1, 6, 54),
('Salle 1', 'Salle IMAX pour une immersion visuelle totale.', 'IMAX', 50, 1, 7, 55),
('Salle 2', 'Salle 3D avec technologie de dernière génération.', '3D', 50, 1, 7, 56),
('Salle 3', 'Salle SENSE pour une aventure cinématographique immersive.', 'SENSE', 50, 1, 7, 57),
('Salle 4', 'Salle IMAX avec écran géant incurvé.', 'IMAX', 50, 1, 7, 58),
('Salle 5', 'Salle 3D pour des images plus vraies que nature.', '3D', 50, 1, 7, 59),
('Salle 6', 'Salle SENSE avec effets sensoriels.', 'SENSE', 50, 1, 7, 60),
('Salle 7', 'Salle IMAX pour des projections en haute résolution.', 'IMAX', 50, 1, 7, 61),
('Salle 8', 'Salle 3D pour une expérience visuelle dynamique.', '3D', 50, 1, 7, 62),
('Salle 9', 'Salle SENSE pour une immersion totale dans le film.', 'SENSE', 50, 1, 7, 63),
('Salle 1', 'Salle IMAX pour des films grandeur nature.', 'IMAX', 50, 1, 8, 64),
('Salle 2', 'Salle 3D avec technologie active.', '3D', 50, 1, 8, 65),
('Salle 3', 'Salle SENSE pour une expérience multisensorielle unique.', 'SENSE', 50, 1, 8, 66),
('Salle 4', 'Salle IMAX avec système audio immersif.', 'IMAX', 50, 1, 8, 67),
('Salle 5', 'Salle 3D pour des images en profondeur.', '3D', 50, 1, 8, 68),
('Salle 6', 'Salle SENSE avec effets de mouvement.', 'SENSE', 50, 1, 8, 69),
('Salle 7', 'Salle IMAX pour des sensations inédites.', 'IMAX', 50, 1, 8, 70),
('Salle 8', 'Salle 3D pour une expérience cinématographique améliorée.', '3D', 50, 1, 8, 71),
('Salle 9', 'Salle SENSE avec ambiance interactive.', 'SENSE', 50, 1, 8, 72),
('Salle 1', 'Salle IMAX pour une qualité d\'image inégalée.', 'IMAX', 50, 1, 9, 73),
('Salle 2', 'Salle 3D avec technologie passive.', '3D', 50, 1, 9, 74),
('Salle 3', 'Salle SENSE pour une expérience sensorielle complète.', 'SENSE', 50, 1, 9, 75),
('Salle 4', 'Salle IMAX avec projection laser.', 'IMAX', 50, 1, 9, 76),
('Salle 5', 'Salle 3D pour des films plus immersifs.', '3D', 50, 1, 9, 77),
('Salle 6', 'Salle SENSE avec effets spéciaux en salle.', 'SENSE', 50, 1, 9, 78),
('Salle 7', 'Salle IMAX pour une immersion visuelle et sonore.', 'IMAX', 50, 1, 9, 79),
('Salle 8', 'Salle 3D pour des sensations visuelles exceptionnelles.', '3D', 50, 1, 9, 80),
('Salle 9', 'Salle SENSE pour vivre le film autrement.', 'SENSE', 50, 1, 9, 81),
('Salle 1', 'Salle IMAX pour une projection grand format.', 'IMAX', 50, 1, 10, 82),
('Salle 2', 'Salle 3D avec images nettes et précises.', '3D', 50, 1, 10, 83),
('Salle 3', 'Salle SENSE pour une expérience immersive.', 'SENSE', 50, 1, 10, 84),
('Salle 4', 'Salle IMAX avec technologie immersive.', 'IMAX', 50, 1, 10, 85),
('Salle 5', 'Salle 3D pour des projections en relief saisissantes.', '3D', 50, 1, 10, 86),
('Salle 6', 'Salle SENSE avec sièges réactifs.', 'SENSE', 50, 1, 10, 87),
('Salle 7', 'Salle IMAX pour une qualité sonore exceptionnelle.', 'IMAX', 50, 1, 10, 88),
('Salle 8', 'Salle 3D pour une expérience cinématographique immersive.', '3D', 50, 1, 10, 89),
('Salle 9', 'Salle SENSE avec technologie interactive.', 'SENSE', 50, 1, 10, 90),
('Salle 1', 'Salle IMAX pour des films à couper le souffle.', 'IMAX', 50, 1, 11, 91),
('Salle 2', 'Salle 3D avec haute résolution.', '3D', 50, 1, 11, 92),
('Salle 3', 'Salle SENSE pour une immersion totale.', 'SENSE', 50, 1, 11, 93),
('Salle 4', 'Salle IMAX avec son surround 360°.', 'IMAX', 50, 1, 11, 94),
('Salle 5', 'Salle 3D pour des images en relief impressionnantes.', '3D', 50, 1, 11, 95),
('Salle 6', 'Salle SENSE avec effets tactiles.', 'SENSE', 50, 1, 11, 96),
('Salle 7', 'Salle IMAX pour une expérience visuelle immersive.', 'IMAX', 50, 1, 11, 97),
('Salle 8', 'Salle 3D pour une immersion visuelle complète.', '3D', 50, 1, 11, 98),
('Salle 9', 'Salle SENSE avec technologie avancée.', 'SENSE', 50, 1, 11, 99),
('Salle 1', 'Salle IMAX pour des projections époustouflantes.', 'IMAX', 50, 1, 12, 100),
('Salle 2', 'Salle 3D avec qualité d\'image supérieure.', '3D', 50, 1, 12, 101),
('Salle 3', 'Salle SENSE pour une expérience unique.', 'SENSE', 50, 1, 12, 102),
('Salle 4', 'Salle IMAX avec écran haute définition.', 'IMAX', 50, 1, 12, 103),
('Salle 5', 'Salle 3D pour des images plus profondes.', '3D', 50, 1, 12, 104),
('Salle 6', 'Salle SENSE avec effets de mouvement synchronisés.', 'SENSE', 50, 1, 12, 105),
('Salle 7', 'Salle IMAX pour une immersion totale.', 'IMAX', 50, 1, 12, 106),
('Salle 8', 'Salle 3D pour une expérience cinématographique en relief.', '3D', 50, 1, 12, 107),
('Salle 9', 'Salle SENSE pour une expérience cinématographique immersive.', 'SENSE', 50, 1, 12, 108),
('Salle 1', 'Salle IMAX pour des sensations visuelles intenses.', 'IMAX', 50, 1, 13, 109),
('Salle 2', 'Salle 3D avec technologie avancée.', '3D', 50, 1, 13, 110),
('Salle 3', 'Salle SENSE pour une expérience sensorielle.', 'SENSE', 50, 1, 13, 111),
('Salle 4', 'Salle IMAX avec qualité d\'image exceptionnelle.', 'IMAX', 50, 1, 13, 112),
('Salle 5', 'Salle 3D pour des films en relief.', '3D', 50, 1, 13, 113),
('Salle 6', 'Salle SENSE avec technologie immersive.', 'SENSE', 50, 1, 13, 114),
('Salle 7', 'Salle IMAX pour une immersion complète.', 'IMAX', 50, 1, 13, 115),
('Salle 8', 'Salle 3D pour des projections impressionnantes.', '3D', 50, 1, 13, 116),
('Salle 9', 'Salle SENSE avec effets spéciaux en salle.', 'SENSE', 50, 1, 13, 117),
('Salle 1', 'Salle IMAX pour une expérience cinématographique unique.', 'IMAX', 50, 1, 14, 118),
('Salle 2', 'Salle 3D avec images de haute qualité.', '3D', 50, 1, 14, 119),
('Salle 3', 'Salle SENSE pour une immersion sensorielle totale.', 'SENSE', 50, 1, 14, 120),
('Salle 4', 'Salle IMAX avec écran géant.', 'IMAX', 50, 1, 14, 121),
('Salle 5', 'Salle 3D pour une expérience visuelle améliorée.', '3D', 50, 1, 14, 122),
('Salle 6', 'Salle SENSE avec sièges interactifs.', 'SENSE', 50, 1, 14, 123),
('Salle 7', 'Salle IMAX pour des projections exceptionnelles.', 'IMAX', 50, 1, 14, 124),
('Salle 8', 'Salle 3D pour des films plus réalistes.', '3D', 50, 1, 14, 125),
('Salle 9', 'Salle SENSE pour une expérience unique en son genre.', 'SENSE', 50, 1, 14, 126);

-- --------------------------------------------------------

--
-- Structure de la table `movie`
--

CREATE TABLE `movie` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  `releaseDate` datetime NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `trailerYoutubeId` varchar(255) NOT NULL DEFAULT 'dQw4w9WgXcQ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `movie`
--

INSERT INTO `movie` (`id`, `title`, `description`, `duration`, `releaseDate`, `isActive`, `trailerYoutubeId`) VALUES
(1, 'Les Évadés', 'Un homme injustement condamné est envoyé en prison pour le meurtre de sa femme. En prison, il forge une amitié avec un autre détenu et découvre des moyens d\'apporter de l\'espoir à ses codétenus. Ensemble, ils cherchent la rédemption et planifient une évas', 142, '1994-09-22 00:00:00', 1, '2e8Otbbcowc'),
(2, 'Le Parrain', 'Le patriarche vieillissant d\'une famille mafieuse transmet le contrôle de son empire criminel à son fils réticent. Les rivalités entre familles éclatent, menant à une guerre sanglante. Le fils doit naviguer dans ce monde dangereux pour protéger sa famille', 175, '1972-03-24 00:00:00', 1, 'bmtuIhesQWA'),
(3, 'The Dark Knight : Le Chevalier Noir', 'Batman affronte le Joker, un criminel imprévisible semant le chaos à Gotham City. Avec l\'aide du commissaire Gordon et du procureur Harvey Dent, il tente de stopper la vague de crimes. Le Joker pousse Batman à ses limites morales.', 152, '2008-07-18 00:00:00', 1, 'wrcaivEjWCo'),
(4, 'Pulp Fiction', 'Des histoires entrecroisées de criminels, de gangsters et de boxeurs à Los Angeles. Un couple décide de braquer un restaurant, tandis que deux tueurs à gages récupèrent une mallette mystérieuse. Chaque personnage est lié par une série d\'événements inatten', 154, '1994-10-14 00:00:00', 1, 'h9041zYF5ZA'),
(5, 'Le Seigneur des anneaux : Le Retour du roi', 'La bataille finale pour la Terre du Milieu est imminente. Frodon et Sam continuent leur périlleux voyage vers le Mont Doom pour détruire l\'Anneau Unique. Pendant ce temps, Aragorn mène les forces du bien contre l\'armée de Sauron.', 201, '2003-12-17 00:00:00', 1, 'RCuDRcK0BBM'),
(6, 'Forrest Gump', 'Forrest Gump, un homme au grand cœur mais à l\'esprit simple, traverse des décennies d\'histoire américaine. Il participe à des événements majeurs sans vraiment le réaliser. Son amour pour Jenny le guide tout au long de sa vie extraordinaire.', 142, '1994-07-06 00:00:00', 1, 'GRe3ZsXAZE4'),
(7, 'Inception', 'Dom Cobb est un voleur qui s\'infiltre dans les rêves pour extraire des secrets. On lui offre une chance de se racheter en implantant une idée dans l\'esprit d\'un homme d\'affaires. L\'équipe doit naviguer à travers des couches de rêves complexes.', 148, '2010-07-16 00:00:00', 1, 'HcoZbHBDHQA'),
(8, 'Fight Club', 'Un homme souffrant d\'insomnie rencontre un vendeur de savon charismatique nommé Tyler Durden. Ensemble, ils fondent un club de combat clandestin pour évacuer leur frustration. Les choses dégénèrent lorsque le club prend une tournure anarchiste.', 139, '1999-10-15 00:00:00', 1, 'BBCgux99CEg'),
(9, 'Matrix', 'Thomas Anderson, alias Neo, découvre que le monde qu\'il connaît est une simulation. Il est entraîné par Morpheus pour combattre les machines qui contrôlent l\'humanité. Neo doit accepter son rôle de l\'Élu pour libérer les esprits humains.', 136, '1999-03-31 00:00:00', 1, '8xx91zoASLY'),
(10, 'Interstellar', 'La Terre est mourante, et un groupe d\'astronautes voyage à travers un trou de ver pour trouver une nouvelle planète habitable. Cooper, un ancien pilote, laisse sa famille derrière lui pour cette mission cruciale. Le temps et l\'espace deviennent des obstac', 169, '2014-11-07 00:00:00', 1, 'HsPP6xSzQoE'),
(11, 'Gladiator', 'Maximus, un général romain trahi, est réduit en esclavage. Forcé de devenir gladiateur, il gagne en popularité dans l\'arène. Il cherche à se venger de l\'empereur qui a tué sa famille.', 155, '2000-05-05 00:00:00', 1, 'ChcgxBAzrks'),
(12, 'Titanic', 'Jack et Rose, de milieux sociaux différents, tombent amoureux à bord du Titanic. Leur romance est entravée par les conventions sociales et la jalousie. Lorsque le navire heurte un iceberg, ils luttent pour survivre.', 195, '1997-12-19 00:00:00', 1, 'Quf4qIkD3KY'),
(13, 'Il faut sauver le soldat Ryan', 'Pendant la Seconde Guerre mondiale, un groupe de soldats est envoyé pour retrouver le soldat James Ryan. Ses frères sont morts au combat, et l\'armée veut le rapatrier. La mission expose les soldats à des dangers mortels et des dilemmes moraux.', 169, '1998-07-24 00:00:00', 1, '7VBsDfsXJfQ'),
(14, 'Jurassic Park', 'Un parc à thème présente des dinosaures clonés à partir d\'ADN fossile. Lorsque les systèmes de sécurité tombent en panne, les dinosaures s\'échappent. Les visiteurs doivent survivre et trouver un moyen de s\'échapper de l\'île.', 127, '1993-06-11 00:00:00', 1, 'ZEY7iMX_oZs'),
(15, 'Le Roi Lion', 'Simba, un jeune lion princier, est accusé de la mort de son père. Il s\'exile et grandit loin de son royaume. Avec l\'aide de nouveaux amis, il décide de retourner pour affronter son oncle usurpateur.', 88, '1994-06-24 00:00:00', 1, '-KfIYw-D4Iw'),
(16, 'Avatar', 'Jake Sully, un marine paraplégique, est envoyé sur la planète Pandora. Il prend le contrôle d\'un avatar pour infiltrer les Na\'vi, les habitants indigènes. Déchiré entre son devoir et sa conscience, il doit choisir son camp.', 162, '2009-12-18 00:00:00', 1, 'O1CzgULNRGs'),
(17, 'Avengers', 'Des super-héros doivent unir leurs forces pour arrêter Loki, le frère de Thor. Ils surmontent leurs différences pour protéger la Terre. Une bataille épique s\'ensuit à New York contre une armée extraterrestre.', 143, '2012-05-04 00:00:00', 1, 'b-kTeJhHOhc'),
(18, 'Retour vers le futur', 'Marty McFly, un adolescent, est accidentellement envoyé en 1955. Il rencontre ses parents adolescents et perturbe leur rencontre. Avec l\'aide du Dr Emmett Brown, il doit réparer le passé pour retourner au présent.', 116, '1985-07-03 00:00:00', 1, 'cU5BREZ9ke0'),
(19, 'Toy Story', 'Woody, un jouet cowboy, est le favori d\'Andy jusqu\'à l\'arrivée de Buzz l\'Éclair. Une rivalité naît entre eux, menant à des aventures inattendues. Ils doivent collaborer pour retourner auprès d\'Andy.', 81, '1995-11-22 00:00:00', 1, 'YzuUSdxoGUU'),
(20, 'Le Silence des agneaux', 'Clarice Starling, une stagiaire du FBI, cherche à arrêter un tueur en série. Elle sollicite l\'aide du Dr Hannibal Lecter, un psychiatre cannibale emprisonné. Leur relation complexe la conduit sur la piste du meurtrier.', 118, '1991-02-14 00:00:00', 1, 'ZDbh9f9GoNM'),
(21, 'La Liste de Schindler', 'Oskar Schindler, un industriel allemand, emploie des juifs pendant l\'Holocauste. Touché par leur sort, il décide de sauver autant de vies que possible. Il risque tout pour protéger ses employés des camps de la mort.', 195, '1993-12-15 00:00:00', 1, '3D5lsFRMlZk'),
(22, 'Star Wars, épisode IV : Un nouvel espoir', 'Luke Skywalker découvre qu\'il est destiné à devenir un Jedi. Avec Obi-Wan Kenobi, il rejoint la Rébellion contre l\'Empire. Ils tentent de détruire l\'Étoile de la mort pour rétablir la paix dans la galaxie.', 121, '1977-05-25 00:00:00', 1, 'PNyht4iTMX8'),
(23, 'La Ligne verte', 'Paul Edgecomb est gardien dans le couloir de la mort. Il rencontre John Coffey, un détenu aux pouvoirs surnaturels. Leurs vies changent à jamais alors qu\'ils explorent les mystères du destin et de la compassion.', 189, '1999-12-10 00:00:00', 1, 'mccs8Ql8m8o'),
(24, 'Les Infiltrés', 'Un policier infiltré dans la mafia et une taupe dans la police cherchent à s\'identifier mutuellement. La tension monte alors que leurs chemins se croisent. La loyauté et la trahison deviennent des enjeux de vie ou de mort.', 151, '2006-10-06 00:00:00', 1, 'btA3UIniGts'),
(25, 'Le Prestige', 'Deux magiciens rivaux cherchent à surpasser l\'autre. Leur obsession les conduit à des sacrifices personnels et moraux. Le mystère entourant un tour de magie devient une quête destructrice.', 130, '2006-10-20 00:00:00', 1, '8UYo3uBaLe8'),
(26, 'Gatsby le Magnifique', 'Nick Carraway emménage à côté du mystérieux millionnaire Jay Gatsby. Fasciné par Gatsby, Nick est entraîné dans un monde de luxe et d\'illusion. Gatsby cherche à reconquérir son amour perdu, Daisy Buchanan.', 143, '2013-05-10 00:00:00', 1, '3DZBGR0vP8I'),
(27, 'Memento', 'Leonard Shelby souffre de perte de mémoire à court terme. Il utilise des notes et des tatouages pour traquer l\'assassin de sa femme. Sa quête de vengeance est compliquée par sa condition.', 113, '2001-03-16 00:00:00', 1, 'sk4NyqHXT3Y'),
(28, 'Parasite', 'La famille Kim, pauvre et astucieuse, s\'infiltre dans la riche maison des Park. Ils prennent progressivement le contrôle des emplois domestiques. Un incident inattendu menace de révéler leur imposture.', 132, '2019-05-30 00:00:00', 1, '-Yo_lxZ6Z0k'),
(29, 'Whiplash', 'Andrew Neiman est un batteur de jazz ambitieux. Sous la tutelle du professeur exigeant Terence Fletcher, il pousse ses limites. Leur relation intense teste les frontières entre passion et obsession.', 106, '2014-10-10 00:00:00', 1, 'qpxjxhvP904'),
(30, 'Coco', 'Miguel, un jeune garçon passionné de musique, voyage au Pays des Morts. Il cherche son arrière-arrière-grand-père pour comprendre l\'histoire de sa famille. Son voyage révèle des secrets et renforce les liens familiaux.', 105, '2017-11-22 00:00:00', 1, 'aTaW-HtvkQo'),
(31, 'Mad Max: Fury Road', 'Dans un désert post-apocalyptique, Imperator Furiosa se rebelle contre le tyran Immortan Joe. Elle s\'allie avec Max Rockatansky pour fuir avec les épouses captives du tyran. Une course-poursuite intense s\'engage pour leur liberté.', 120, '2015-05-15 00:00:00', 1, 'mtolAJbj44s'),
(32, 'La La Land', 'Mia, une actrice en herbe, et Sebastian, un pianiste de jazz, tombent amoureux à Los Angeles. Ils poursuivent leurs rêves tout en naviguant dans leur relation. Le succès et les sacrifices mettent leur amour à l\'épreuve.', 128, '2016-12-09 00:00:00', 1, 'jOIba1EI6a4'),
(33, 'Blade Runner 2049', 'K, un blade runner, découvre un secret qui menace la société. Sa quête le conduit à chercher Rick Deckard, un ancien blade runner disparu depuis des décennies. Ensemble, ils confrontent les implications de leur découverte.', 164, '2017-10-06 00:00:00', 1, 'O4C5cwSbXZ8'),
(34, 'The Social Network', 'Mark Zuckerberg crée Facebook depuis sa chambre d\'étudiant. Son succès rapide mène à des conflits personnels et juridiques. Le film explore les thèmes de l\'ambition, de la trahison et de l\'innovation.', 120, '2010-10-01 00:00:00', 1, 'K3Nss06OFMw'),
(35, 'Inglourious Basterds', 'Pendant la Seconde Guerre mondiale, un groupe de soldats juifs américains planifie l\'assassinat de dirigeants nazis. Parallèlement, une femme française prépare sa propre vengeance contre les nazis. Leurs plans convergent lors d\'une projection de film.', 153, '2009-08-21 00:00:00', 1, 'BiPUoLI9eGM'),
(36, 'Joker', 'Arthur Fleck, un homme souffrant de troubles mentaux, est marginalisé par la société. Sa descente aux enfers le transforme en Joker, un criminel notoire. Le film explore les origines sombres du personnage.', 122, '2019-10-04 00:00:00', 1, 'OoTx1cYC5u8'),
(37, 'Get Out', 'Chris rend visite à la famille de sa petite amie Rose pour le week-end. Il découvre des comportements étranges parmi les habitants. Une série de révélations effrayantes met sa vie en danger.', 104, '2017-02-24 00:00:00', 1, 'XzmeT5rEPDg'),
(38, 'Moonlight', 'Le film suit Chiron, un jeune homme afro-américain, à trois étapes de sa vie. Il lutte avec son identité, sa sexualité et les défis de grandir dans un quartier difficile. Son parcours est une exploration profonde de la découverte de soi.', 111, '2016-10-21 00:00:00', 1, 'hxdQ_QKvPTk'),
(39, 'The Grand Budapest Hotel', 'M. Gustave, concierge d\'un hôtel prestigieux, est accusé de meurtre. Avec l\'aide de Zero, le garçon lobby, il tente de prouver son innocence. Leur aventure extravagante les mène à travers un paysage européen en mutation.', 99, '2014-03-28 00:00:00', 1, 'U6jDsUZmRXM'),
(40, 'Her', 'Theodore Twombly, un homme solitaire, achète un système d\'exploitation avancé. Il développe une relation profonde avec l\'IA nommée Samantha. Leur connexion soulève des questions sur l\'amour et la nature humaine.', 126, '2013-12-18 00:00:00', 1, 'fAs4qKLnRZI');

-- --------------------------------------------------------

--
-- Structure de la table `reservation_entity`
--

CREATE TABLE `reservation_entity` (
  `reference` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `qrCode` text,
  `userId` int DEFAULT NULL,
  `sessionId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `seat_entity`
--

CREATE TABLE `seat_entity` (
  `id` int NOT NULL,
  `seatNumber` int NOT NULL,
  `sessionId` int DEFAULT NULL,
  `reservationReference` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

-- --------------------------------------------------------

--
-- Structure de la table `theater_entity`
--

CREATE TABLE `theater_entity` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `streetName` varchar(255) NOT NULL,
  `streetNumber` varchar(255) NOT NULL,
  `postalCode` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `theater_entity`
--

INSERT INTO `theater_entity` (`id`, `name`, `description`, `streetName`, `streetNumber`, `postalCode`, `city`, `country`, `latitude`, `longitude`) VALUES
(1, 'NAT Parnasse', 'Cinéma moderne et convivial.', 'Rue d\'Odessa', '3', '75014', 'Paris', 'France', 48.843129, 2.324447),
(2, 'NAT Palace', 'Cinéma historique avec des salles luxueuses.', 'Bd des Capucines', '2', '75009', 'Paris', 'France', 48.871145, 2.333884),
(3, 'NAT Lyon Bastille', 'Cinéma familial proche de la Bastille.', 'Rue de Lyon', '12', '75012', 'Paris', 'France', 48.847576, 2.372008),
(4, 'NAT Nation', 'Cinéma spacieux avec technologie moderne.', 'Bd Diderot', '133', '75012', 'Paris', 'France', 48.848234, 2.393133),
(5, 'NAT Pionnier', 'Cinéma confortable avec programmation variée.', 'Rue Godefroy Cavaignac', '36', '75011', 'Paris', 'France', 48.856199, 2.380618),
(6, 'NAT Fironde', 'Petit cinéma chaleureux.', 'Rue du Dahomey', '1', '75011', 'Paris', 'France', 48.851229, 2.381955),
(7, 'NAT Vermeil', 'Cinéma élégant avec des sièges confortables.', 'Rue du Sergent Bauchat', '31', '75012', 'Paris', 'France', 48.845505, 2.392789),
(8, 'NAT Control', 'Cinéma dynamique avec les dernières sorties.', 'Rue de Charenton', '163', '75012', 'Paris', 'France', 48.844501, 2.384080),
(9, 'NAT Alfort', 'Cinéma familial dans un cadre agréable.', 'Av. du Général-Leclerc', '159', '94700', 'Maisons-Alfort', 'France', 48.808496, 2.436188),
(10, 'NAT Sabai', 'Cinéma moderne avec écran IMAX.', 'Av. de la République', '239', '94700', 'Maisons-Alfort', 'France', 48.809474, 2.453680),
(11, 'NAT Bercy', 'Cinéma situé au cœur de Bercy Village.', 'Cour Saint-Emilion', '2', '75012', 'Paris', 'France', 48.832147, 2.385240),
(12, 'NAT Pierrot', 'Cinéma avec vue panoramique sur la ville.', 'Rue du Mont Valérien', '6', '92210', 'Saint-Cloud', 'France', 48.852507, 2.216671),
(13, 'NAT Normandy', 'Cinéma convivial avec programmation pour tous.', 'Bd de la République', '72', '92420', 'Vaucresson', 'France', 48.838232, 2.157599),
(14, 'NAT Garches', 'Cinéma de quartier avec ambiance familiale.', 'Grande Rue', '86', '92380', 'Garches', 'France', 48.844191, 2.189064);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `favoriteTheaterId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `isActive`, `favoriteTheaterId`) VALUES
(1, 'noam', '$2b$12$.I1RKb7WJP8BWEHbFzYOcuECgmblPIiOZWyFkBKiEsgiPAgocsWFu', 1, 1),
(2, 'anaelle', '$2b$12$.I1RKb7WJP8BWEHbFzYOcuECgmblPIiOZWyFkBKiEsgiPAgocsWFu', 1, 4),
(3, 'tom', '$2b$12$.I1RKb7WJP8BWEHbFzYOcuECgmblPIiOZWyFkBKiEsgiPAgocsWFu', 1, 5);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cinema_room`
--
ALTER TABLE `cinema_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_62099d0ce8b24d122d91e0e106c` (`theaterId`);

--
-- Index pour la table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservation_entity`
--
ALTER TABLE `reservation_entity`
  ADD PRIMARY KEY (`reference`),
  ADD KEY `FK_4e79ec0e365b33491cdb38f6e02` (`userId`),
  ADD KEY `FK_299fb2dfac562cb55d9caddab93` (`sessionId`);

--
-- Index pour la table `seat_entity`
--
ALTER TABLE `seat_entity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_95b1e38785a3615865e9d681dce` (`sessionId`),
  ADD KEY `FK_6cf9c79f4fa08baac2bae07abf8` (`reservationReference`);

--
-- Index pour la table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f056a463749c7b7b6700511bed7` (`movieId`),
  ADD KEY `FK_6bfcd8b79900d13de31fc4098f2` (`roomId`);

--
-- Index pour la table `theater_entity`
--
ALTER TABLE `theater_entity`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  ADD KEY `FK_3af29bd98c99ac6f84f40dd1e05` (`favoriteTheaterId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cinema_room`
--
ALTER TABLE `cinema_room`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT pour la table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `seat_entity`
--
ALTER TABLE `seat_entity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `session`
--
ALTER TABLE `session`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `theater_entity`
--
ALTER TABLE `theater_entity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cinema_room`
--
ALTER TABLE `cinema_room`
  ADD CONSTRAINT `FK_62099d0ce8b24d122d91e0e106c` FOREIGN KEY (`theaterId`) REFERENCES `theater_entity` (`id`);

--
-- Contraintes pour la table `reservation_entity`
--
ALTER TABLE `reservation_entity`
  ADD CONSTRAINT `FK_299fb2dfac562cb55d9caddab93` FOREIGN KEY (`sessionId`) REFERENCES `session` (`id`),
  ADD CONSTRAINT `FK_4e79ec0e365b33491cdb38f6e02` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `seat_entity`
--
ALTER TABLE `seat_entity`
  ADD CONSTRAINT `FK_6cf9c79f4fa08baac2bae07abf8` FOREIGN KEY (`reservationReference`) REFERENCES `reservation_entity` (`reference`),
  ADD CONSTRAINT `FK_95b1e38785a3615865e9d681dce` FOREIGN KEY (`sessionId`) REFERENCES `session` (`id`);

--
-- Contraintes pour la table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `FK_6bfcd8b79900d13de31fc4098f2` FOREIGN KEY (`roomId`) REFERENCES `cinema_room` (`id`),
  ADD CONSTRAINT `FK_f056a463749c7b7b6700511bed7` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_3af29bd98c99ac6f84f40dd1e05` FOREIGN KEY (`favoriteTheaterId`) REFERENCES `theater_entity` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
