DROP DATABASE IF EXISTS trouve_ton_artisan;

CREATE DATABASE trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE trouve_ton_artisan;

-- Table des catégories (Bâtiment, Services, Alimentation, Fabrication)
CREATE TABLE categorie (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL
);

-- Table des spécialités (Boucher, Coiffeur, etc.)
CREATE TABLE specialite (
    id_specialite INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    id_categorie INT NOT NULL,
    CONSTRAINT fk_specialite_categorie
      FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
      ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Table des artisans
CREATE TABLE artisan (
    id_artisan INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(150) NOT NULL,
    note DECIMAL(2,1),              -- exemple : 4.5, 5.0
    localisation VARCHAR(150),
    email_contact VARCHAR(150),
    site_web VARCHAR(150),
    description TEXT,
    image_url VARCHAR(255),
    id_specialite INT NOT NULL,
    CONSTRAINT fk_artisan_specialite
      FOREIGN KEY (id_specialite) REFERENCES specialite(id_specialite)
      ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Table des messages envoyés via le formulaire de contact
CREATE TABLE message_contact (
    id_message INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(150),
    email VARCHAR(150),
    objet VARCHAR(150),
    message TEXT,
    date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_artisan INT NOT NULL,
    CONSTRAINT fk_message_artisan
      FOREIGN KEY (id_artisan) REFERENCES artisan(id_artisan)
      ON DELETE CASCADE ON UPDATE CASCADE
);
